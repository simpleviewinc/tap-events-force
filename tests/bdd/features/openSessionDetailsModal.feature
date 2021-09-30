@evf @session
Feature: Open Session Details Modal
  As a user,
  I can open the session details modal,
  so that I can read details about the session

  Scenario: Open session details modal
    Given I open the site "$world.app.url"
    When I click the element "text=Session Title"
    Then the element ".ef-modal-body-header" contains the text "Session Title"