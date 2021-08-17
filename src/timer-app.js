import { LitElement, html, css } from 'lit-element/lit-element'
import '@polymer/iron-icon/iron-icon'
import '@polymer/iron-icons/iron-icons'
import '@polymer/iron-icons/device-icons'
import '@polymer/iron-icons/editor-icons'

/**
 * @customElement `timer-app`
 */
class TimerApp extends LitElement {
	static get properties() {
		return {
			timerDisplay: { type: Object },
			startButton: { type: Object },
			stopTimerButton: { type: Object },
			running: { type: Boolean },
			paused: { type: Boolean },
			tInterval: { type: Object },
			savedTime: { type: Number },
			difference: { type: Object },
		}
	}

	constructor() {
		super()
		this.running = false
		this.paused = false
		this.timerDisplay = {}
	}

	firstUpdated() {
		if (super.firstUpdated) {
			super.firstUpdated()
		}
		// calculate color value for background, and if it is dark set white as text color
		// if it is light, set black as text color
		const bgArr = this.generateRandomRGBValues(3)
		const [bgColor, textColor] = bgArr
		this.outerDiv = this.shadowRoot.querySelector('.outer')
		this.timerDisplay = this.shadowRoot.querySelector('.timerDisplay')
		this.startButton = this.shadowRoot.querySelector('.startBtn')
		this.pauseButton = this.shadowRoot.querySelector('.pauseBtn')
		this.projectLabel = this.shadowRoot.querySelector('#projectLabel')
		this.projectInput = this.shadowRoot.querySelector('#projectName')
		this.outerDiv.style.backgroundColor = bgColor
		this.startButton.style.backgroundColor = bgColor
		this.pauseButton.style.backgroundColor = bgColor
		this.projectInput.style.backgroundColor = bgColor
		this.outerDiv.style.color = textColor
		this.startButton.style.color = textColor
		this.pauseButton.style.color = textColor
		this.projectInput.style.color = textColor
		this.projectInput.style.borderBottom = `1px solid ${textColor}`
		this.timerDisplay.style.color = textColor
		this.timerDisplay.innerHTML = '00:00:00'
	}

	startTimer() {
		if (!this.running) {
			this.startTime = new Date().getTime()
			this.tInterval = setInterval(() => {
				this.getShowTime(this)
			}, 1)
			// Change 1 to 1000 above to run script every second instead of every
			// millisecond. One other change will be needed in the getShowTime()
			// function below for this to work. see comment there.

			this.paused = false
			this.running = true
			this.timerDisplay.style.cursor = 'auto'
			this.startButton.style.cursor = 'auto'
			this.pauseButton.style.cursor = 'pointer'
		}
	}

	getShowTime() {
		const updatedTime = new Date().getTime()
		if (this.savedTime) {
			this.difference = updatedTime - this.startTime + this.savedTime
		} else {
			this.difference = updatedTime - this.startTime
		}
		// this.days = Math.floor(difference / (1000 * 60 * 60 * 24))
		let hours = Math.floor((this.difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
		let minutes = Math.floor((this.difference % (1000 * 60 * 60)) / (1000 * 60))
		let seconds = Math.floor((this.difference % (1000 * 60)) / 1000)
		hours = hours < 10 ? `0${hours}` : hours
		minutes = minutes < 10 ? `0${minutes}` : minutes
		seconds = seconds < 10 ? `0${seconds}` : seconds

		this.timerDisplay.innerHTML = `${hours}:${minutes}:${seconds}`
	}

	pauseTimer() {
		if (!this.difference) {
			// if timer never started, don't allow pause button to do anything
		} else if (!this.paused) {
			clearInterval(this.tInterval)
			this.savedTime = this.difference
			this.paused = true
			this.running = false
			this.timerDisplay.style.cursor = 'pointer'
			this.startButton.style.cursor = 'pointer'
			this.pauseButton.style.cursor = 'auto'
			this.pauseButton.classList.add('glowEffect')
		} else {
			// if the timer was already paused, when they click pause again, start the timer again
			this.startTimer()
			this.pauseButton.classList.remove('glowEffect')
		}
	}

	generateRandomRGBValues(numTimes) {
		const tempArr = []
		for (let i = 0; i < numTimes; i += 1) {
			const val = Math.floor(Math.random() * Math.floor(256))
			tempArr.push(val)
		}
		// deconstruct the array into three color values
		const [r, g, b] = tempArr
		// this calculation tells us if the value is dark or light
		// so that we can provide contrast for the text against the background
		const sum = Math.round(
			(Number.parseInt(r, 10) * 299 + Number.parseInt(g, 10) * 587 + Number.parseInt(b, 10) * 114) /
				1000
		)
		const textColor = sum > 128 ? 'black' : 'white'
		return [`rgb(${r},${g},${b})`, textColor]
	}

	generateRandomHexColorCode() {
		const n = (Math.random() * 0xfffff * 1000000).toString(16)
		return `#${n.slice(0, 6)}`
	}

	_setTitle(e) {
		const input = e.currentTarget
		const val = input.value
		const newNode = document.createElement('span')
		newNode.classList.add('dynaSpan')
		newNode.setAttribute('data-cy', 'projectTitle')
		newNode.innerText = val
		input.parentNode.insertBefore(newNode, input)
		input.style.display = 'none'
	}

	_editTitle() {
		if (this.shadowRoot.querySelector('.dynaSpan') !== null) {
			const spanElem = this.shadowRoot.querySelector('.dynaSpan')
			spanElem.parentNode.removeChild(spanElem)
			this.shadowRoot.querySelector('#projectName').style.display = 'inline'
			this.shadowRoot.querySelector('#projectName').focus()
		}
		this.shadowRoot.querySelector('#projectName').style.display = 'inline'
		this.shadowRoot.querySelector('#projectName').focus()
	}

	_createNewTimer() {
		const newTimer = document.createElement('timer-app')
		this.after(newTimer)
	}

	_removeTimer() {
		// TODO: user should confirm - build a modal or banner to ask if they are sure
		// they want to delete the timer. If it is the last timer, create a new blank
		// one for good UX.
		const parent = this.parentElement
		parent.removeChild(this)
	}

	render() {
		return html`
			<div class="outer">
				<div class="header">
					<button class="startBtn" @click="${this.startTimer}" data-cy="startBtn">Start</button>
					<button class="pauseBtn" @click="${this.pauseTimer}" data-cy="pauseBtn">Pause</button>
					<label id="projectLabel" for="projectName" data-cy="projectLabel">Project Name</label>
					<input
						id="projectName"
						type="text"
						role="textbox"
						@focusout="${e => this._setTitle(e)}"
						data-cy="projectName"
					/>
					<iron-icon
						icon="editor:mode-edit"
						@click="${this._editTitle}"
						data-cy="editTitleBtn"
						title="edit title"
					></iron-icon>
					<iron-icon
						icon="device:add-alarm"
						@click="${this._createNewTimer}"
						data-cy="createNewTimerBtn"
						title="create a timer"
					></iron-icon>
					<iron-icon
						icon="icons:delete"
						@click="${this._removeTimer}"
						data-cy="removeTimerBtn"
						title="remove timer"
					></iron-icon>
				</div>
				<div class="timerDisplay" data-cy="timerDisplay"></div>
			</div>
		`
	}

	static get styles() {
		return [
			css`
				:host {
					display: block;
					font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
						Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
				}
				.outer {
					width: 370px;
					height: 150px;
					margin-bottom: 20px;
					padding: 15px;
					border-radius: 8px;
				}
				.header {
					position: relative;
					padding-top: 10px;
				}
				#projectLabel {
					position: absolute;
					top: -5px;
					margin-left: 7px;
					font-size: 0.8em;
				}
				input[type='text'] {
					border: none;
					border-bottom: 1px solid;
					margin: 0 6px;
				}
				input[type='text']:focus {
					border: none;
					outline: none;
				}
				.dynaSpan {
					display: inline-block;
					width: 40%;
					margin-left: 5px;
					font-weight: bold;
				}
				.timerDisplay {
					margin-top: 25px;
					text-align: center;
					font-size: 3em;
				}
				.pauseBtn,
				.startBtn {
					color: #000;
					background-color: #fff;
					border-radius: 18px;
					padding: 4px 10px;
					outline: none;
				}
				@keyframes glowing {
					0% {
						background-color: #2ba805;
						box-shadow: 0 0 3px #2ba805;
					}
					50% {
						background-color: #49e819;
						box-shadow: 0 0 10px #49e819;
					}
					100% {
						background-color: #2ba805;
						box-shadow: 0 0 3px #2ba805;
					}
				}
				.glowEffect {
					animation: glowing 1300ms infinite;
				}
			`,
		]
	}
}

customElements.define('timer-app', TimerApp)
