import api from "../../src/store/modules/api"
import projects from '../fixtures/projects.json'
import projectsDetails from '../fixtures/projectsDetails.json'

describe('Projects page', () => {
  describe('Success data fetching', () => {
    beforeEach(function () {
      cy
        .intercept('GET', `${api.projects}?updatedSince=2024-01-7`, {
          statusCode: 200,
          body: projects
        })
        .as('projects')
        .intercept('GET', `${api.projects}/*`, (req) => {
          const idNumber = req.url.split('/').pop();
          req.reply({
            statusCode: 200,
            body: projectsDetails[idNumber],
          });
        })
        .as('projects_details')
        .visit('/projects')
    })

    it('should show the list of projects with 10 items per page', function () {
      cy
        .get('[cy="fetching"]')
        .should('exist')
        .wait('@projects')
        .wait('@projects_details')
        .get('[cy="fetching"]')
        .should('not.exist')
        .get('[cy="data-table"] tbody tr')
        .should('have.length', 10)
        .first()
        .should('contain', projectsDetails[projects.projects[0].projectId].project.title)
    });

    it(`should change the items per page and not to reload them if the selected number of items is smaller the current`, function () {
      cy
        .get('[cy="select-items-per-page"] select')
        .select('25')
        .get('[cy="fetching"]')
        .should('exist')
        .wait('@projects_details')
        .get('[cy="data-table"] tbody tr')
        .should('have.length', 25)
        .get('[cy="select-items-per-page"] select')
        .select('50')
        .get('[cy="fetching"]')
        .should('exist')
        .wait('@projects_details')
        .get('[cy="data-table"] tbody tr')
        .should('have.length', 50)
        .get('[cy="select-items-per-page"] select')
        .select('25')
        .get('[cy="data-table"] tbody tr')
        .should('have.length', 25)
    });

    it(`should test the pagination - next/back, and the total pages, without changing the items per page before`, function () {
      cy
        .get('[cy="next-page"]')
        .click()
        .wait('@projects_details')
        .get('[cy="data-table"] tbody tr')
        .should('have.length', 10)
        .first()
        .should('contain', projectsDetails[projects.projects[10].projectId].project.title)
        .get('[cy="page-and-total"]')
        .should('contain', `2 / ${Math.ceil(projects.projects.length / 10)}`)
        .url()
        .should('contain', 'page=2')
    });

    it('should not fetch data if we switch from 50 to 25 items per page', function () {
      cy
        .get('[cy="select-items-per-page"] select')
        .select('25')
        .get('[cy="fetching"]')
        .should('exist')
        .wait('@projects_details')
        .get('[cy="select-items-per-page"] select')
        .select('10')
        .get('[cy="fetching"]')
        .should('not.exist')
    });

    it('should update the data table if updatedSince date is changed', function () {
      cy
        .get('[cy="updated-since-datepicker"]')
        .click()
        .get('[cy="updated-since-datepicker"] .dp__calendar .dp__calendar_row')
        .eq(1)
        .find('div')
        .last()
        .click()
        .get('[cy="updated-since-datepicker"] .dp__action_select')
        .click()
    });

    it('should navigate to project details', function () {
      cy
        .get('[cy="data-table"] tbody tr')
        .first()
        .click()
        .url()
        .should('contain', '/project/')
        .get('h1')
        .should('have.text', projectsDetails[105782].project.title)
        .get('[cy="back-btn"]')
        .click()
        .url()
        .should('contain', '/projects')
    });
  });

  describe('Error data fetching', () => {
    beforeEach(function () {
      cy
        .intercept('GET', `${api.projects}?updatedSince=2024-01-7`, {
          statusCode: 404
        })
        .as('projects')
        .visit('/projects')
    })

    it('should handle error fetching projects', function () {
      cy
        .wait('@projects')
        .get('[cy="fetching"]')
        .should('not.exist')
        .get('[cy="fetching-error"]')
        .should('exist')
    });
  })
})