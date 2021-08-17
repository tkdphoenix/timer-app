beforeEach(() => {
	cy.visit('http://localhost:8080/')
})

context('Timer', () => {
	describe('general app', () => {
		it('has the characterset equal to utf-8', () => {
			cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
		})

		it('has the title element "Project Timer"', () => {
			cy.title().should('include', 'Project Timer')
		})
	})

	describe('header area', () => {
		beforeEach(() => {
			cy.get('timer-app').shadow().as('timerApp')
		})

		// Find all the pieces of the timer-app element and ensure they exist
		it('has a timer display area that is set to 00:00:00', () => {
      cy.get('@timerApp')
        .find('[data-cy="timerDisplay"]')
        .should('exist')
        .and('contain', '00:00:00')
		})

		it('has a button labeled "Start"', () => {
      cy.get('@timerApp')
        .find('[data-cy="startBtn"]')
        .should('exist')
        .and('contain', 'Start')
		})

		it('when a user clicks the "Start" button the timer begins counting', () => {
			cy.get('@timerApp')
				.find('[data-cy="startBtn"]')
				.click()
				.then(() => {
          cy.get('@timerApp')
            .find('[data-cy="timerDisplay"]')
            .should('not.contain', '00:00:00')
				})
		})

		it('has a button labeled "Pause"', () => {
      cy.get('@timerApp')
        .find('[data-cy="pauseBtn"]')
        .should('contain', 'Pause')
		})

		it('when a user clicks the "Pause" button the timer stops counting', () => {
			cy.get('@timerApp')
				.find('[data-cy="pauseBtn"]')
				.click()
				.then(() => {
					// find a way to get the value of the timer and wait 1 second and see that it is the same.
          cy.get('@timerApp')
            .find('[data-cy="timerDisplay"]')
            .wait(1000)
					// cy.get('@timerApp').find('[data-cy="timerDisplay]')
				})
		})

		describe('Project name input', () => {
			it('has the label "Project Name"', () => {
        cy.get('@timerApp')
          .find('[data-cy="projectLabel"]')
          .should('contain', 'Project Name')
			})

			it(`when a user types "Test Project" into the text box 
        it has that value in the input`, () => {
				cy.get('@timerApp')
					.find('[data-cy="projectName"]')
					.type('Test Project')
					.should('exist')
					.and('have.value', 'Test Project')
			})

			// it(`when a user leaves the text box (onFocusOut) after 
      //   typing a name into the text box it changes into a title <span>`, () => {
			// 	cy.get('@timerApp')
      //     .find('[data-cy="projectName"]')
      //     .type('Test Project')
      //     .then(() => {
      //       cy.get('timer-app')
      //         .click()
      //         .then(() => {
      //           cy.get('@timerApp')
      //             .find('[data-cy="projectName"]')
      //             .should('not.exist')
                  // .then(() => {
                  //   cy.get('@timerApp')
                  //     .find('[data-cy="projectTitle"]')
                  //     .should('exist')
                  //     .and('contain', 'Test Project')
                  //     .then(() => {
                  //       cy.filter('@timerApp')
                  //         .find('[data-cy="editTitleBtn"]')
                  //         .click()
                  //         .then(() => {
                  //           cy.get('@timerApp')
                  //             .find('[data-cy="projectName"]')
                  //             .type(' Project 2')
                  //             .should('exist')
                  //             .and('have.value', 'Test Project Project 2')
                  //         })
                  //     })
                  // })
          //     })
          // })
        
        // cy.get('timer-app')
        //   .blur()
        //   .then(() => {

        //   })
      // })

			it(`when a user clicks the edit icon the input field returns, the span element is removed from the DOM, and focus shifts back to the project name`, () => {
				cy.get('@timerApp')
					.find('[data-cy="editTitleBtn"]')
					.should('exist')
          .type('Test Project')
					.then(() => {
            cy.get('@timerApp')
              .find('[data-cy="projectTitle"]')
              .should('not.exist')

						cy.get('@timerApp')
              .find('[data-cy="projectName"]')
              .should('be.focused')
              .and('have.value', 'Test Project')
          })
			})
		})

		it('has a clock icon that creates a new timer-app component when clicked', () => {
			cy.get('@timerApp').find('[data-cy="createNewTimerBtn"]').click().should('exist')
			// Go to the body of the page and count the number of timer-app components.
			// After clicking the clock icon, count the number of components again and compare.
			// It should be +1
			// .and('')
		})

		it('has a trash can icon that exists within the component', () => {
			cy.get('@timerApp').find('[data-cy="removeTimerBtn"]').should('exist')
		})

		it('has a trash can icon that deletes the current timer-app component when clicked', () => {
			cy.get('@timerApp').find('[data-cy="removeTimerBtn"]').click().should('not.exist')
			// Go to the body of the page and count the number of timer-app components.
			// After clicking the trash can icon, count the number of components again and compare.
			// It should be -1
			// .and('')
		})

		// it('has a set of numbers to represent the hours, minutes, and seconds', () => {
		// 	cy.get('@timerApp').find('[data-cy="timerDisplay"]').should('exist')
		// })
	})
})
