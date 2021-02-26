@evf @daynav
Feature: Day Navigation
  As an event manager,
  I should be able to change the current day to a value within the event calendar,
  so that I can see different events
  
  Scenario: Navigate Forward
    Given I open the site "$world.app.url"
    When I click the element ".ef-sessions-date-button-increment"
    Then the element ".ef-sessions-date-text" contains the text "Day 2"

  Scenario: Navigate Backwards
    Given I open the site "$world.app.url"
    When I click the element ".ef-sessions-date-button-increment"
    When I click the element ".ef-sessions-date-button-decrement"
    Then the element ".ef-sessions-date-text" contains the text "Day 1"

  Scenario: Navigate Lower Bounds
    Given I open the site "$world.app.url"
    When I click the element ".ef-sessions-date-button-decrement"
    Then the element ".ef-sessions-date-text" contains the text "Day 1"

  Scenario: Navigate Upper Bounds
    Given I open the site "$world.app.url"
    When I click the element ".ef-sessions-date-button-increment"
    When I click the element ".ef-sessions-date-button-increment"
    When I click the element ".ef-sessions-date-button-increment"
    Then the element ".ef-sessions-date-text" contains the text "Day 3"

  # FILTER MODAL TESTS
  Scenario: Empty Filter
    Given I open the site "$world.app.url"
    When I click the element ".ef-sessions-filter-button"
    And I click the element ".modal >> text='Machine Learning'"
    Then the element ".ef-modal-body-highlight" contains the text "0 results"

  Scenario: Applied Filter Results
    Given I open the site "$world.app.url"
    When I open the filter modal
    And I click the element ".modal >> text=Analytics"
    And I wait for ".ef-modal-body-highlight" to be visible
    And I click the element ".ef-action-button-primary"
    Then the count of ".ef-timeslot-header" is 1

  # PRESENTER MODAL TESTS
  Scenario: Presenter Details has Text
    Given I open the site "$world.app.url"
    When I click the element ".ef-sessions-filter-button"

  # Group Booker
  Scenario: Open Group Booker
    Given I open the site "$world.app.url"
    And I open the group booker for session with id 2
    Then the element ".ef-modal-group-body" is visible
  
  Scenario: Book Attendees
    Given I open the site "$world.app.url"
    And I open the group booker for session with text "session with presenters and labels"
    And I click the element ".ef-action-button-primary"
    And I wait for ".ef-action-button-selected" to be attached
    Then the descendent '.ef-action-button-selected' contains the text "SELECTED"

  Scenario: Select Attendee
    Given I open the site "$world.app.url"
    And I open the group booker for session with id 3
    And the element ".modal-body" is ancestor
    And I click the descendent "input[data-testid='1']"
    Then the element ".ef-modal-body-highlight" contains the text "0 places remaining"
  
  Scenario: Unselect Waiting List
    Given I open the site "$world.app.url"
    And I open the group booker for session with id 3
    And I wait for "text=On waiting list" to be visible
    And I click the element ".modal-body input[data-testid='1']"
    Then I wait for "text=On waiting list" to be detached

  Scenario: Foo
    