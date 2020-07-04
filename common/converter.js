/**
 *
 * @param { String } val - Hexidecimal value
 */
function validateCorrectString(val) {
	// check if the value is a string
	if (typeof val !== 'string') {
		return false
	}
	// check if the length is 6 or 7. If it is 7, the user may have included a # character
	if (val.length !== 6 || val.length !== 7) {
		return false
	}
	// check if the 1st character is a #. If not, return -1
	if (val.length === 7) {
		if (val.substring(0, 1) !== '#') {
			return false
		} else {
			return val.substring(1)
		}
	}
	return val
}

/**
 * Validates that a provided value is a number
 * @param { Number } red - red value from RGB
 * @param { Number } green - green value from RGB
 * @param { Number } blue - blue value from RGB
 */
function validateCorrectNumber(red, green, blue) {
	if (typeof red === 'number' && typeof green === 'number' && typeof blue === 'number') {
		if (red <= 255 && red >= 0 && green <= 255 && green >= 0 && blue <= 255 && blue >= 0) {
			return true
		} else {
			return false
		}
	} else {
		return false
	}
}

/**
 * Numbers passed in must be floats.
 * Splits the number on the decimal point to
 * make it ready for operations to be performed
 * to find hexidecimal values.
 * @param { Number } num - the number to prepare
 */
function prepareNumber(num) {
	const tempVal = num.toString() // "13.75"
	const decimalPlace = tempVal.indexOf('.') // 2
	const num1 = Number.parseFloat(tempVal.substring(0, decimalPlace)) // 13
	const num2 = Number.parseFloat(tempVal.substring(decimalPlace)) // 0.75
	return [num1, num2]
}

export const hexToRGB = val => {
	// CONVERT HEXIDECIMAL VALUE TO RGB:
	// start with #006fcf
	// 0 - convert to decimal = 0
	// multiply by 16 = 0
	// second digit is 0. Add it to first digit - 0 + 0 = 0
	// 6 - convert to decimal = 6
	// multiply by 16 -> 6 * 16 = 96
	// f - convert to decimal = 15
	// add this to the first part of the pair: 96 + 15 = 111
	// c - convert to decimal = 12
	// multiply by 16 -> 16 * 12 = 192
	// f - convert to decimal = 15
	// add this to the first part of the pair: 192 + 15 = 207
	// ===========================
	// Result:
	// rgb(0,111,207)

	// Conversion chart between decimal values and hexidecimal values
	// | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
	// | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A  | B  | C  | D  | E  | F  |

	// validate that value is a string with 6 or 7 characters
	const cleanVal = validateCorrectString(val)
	if (cleanVal) {
		const pt1 = cleanVal.substring(0, 2)
		const rValue = Number.parseInt(pt1, 16)

		const pt2 = cleanVal.substring(2, 4)
		const gValue = Number.parseInt(pt2, 16)

		const pt3 = cleanVal.substring(4)
		const bValue = Number.parseInt(pt3, 16)
		return `#${rValue}${gValue}${bValue}`
	}
	return -1
}

export const rgbToHex = (rVal, gVal, bVal) => {
	// CONVERT RGB VALUE TO HEXIDECIMAL:
	// start with rgb(220,20,60)
	// 220 / 16 = 13.75 13 === D
	// 0.75 *  16 = 12       === C

	// 20 / 16  = 1.25  1  === 1
	// 0.25 * 16 = 4    4  === 4

	// 60 / 16  = 3.75  3  === 3
	// .75 * 16 = 12    12 === C
	// ===========================
	// Result:
	// #DC143C

	// Conversion chart between decimal values and hexidecimal values
	// | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 |
	// | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | A  | B  | C  | D  | E  | F  |

	const cleanVals = validateCorrectNumber(rVal, gVal, bVal)
	if (cleanVals) {
		// if we start with rgb(0,111,207)
		const red = rVal.toString(16) === 0 ? `0${rVal.toString(16)}` : rVal.toString(16)
		const blue = gVal.toString(16) === 0 ? `0${gVal.toString(16)}` : gVal.toString(16)
		const green = bVal.toString(16) === 0 ? `0${bVal.toString(16)}` : bVal.toString(16)
		return `#${red}${green}${blue}` // should result in #006FCF
	}
	return -1
}
