@evf @daynav
Feature: Day Navigation
  As an event manager,
  I should be able to change the current day to a value within the event calendar,
  so that I can see different events
  
  Background:
    Given I open the site "https://simpleviewinc.github.io/keg-test-consumer/"

  Scenario: Navigate Forward
    When I click the element ".ef-sessions-date-button-increment"
    Then the element ".ef-sessions-date-text" contains the text "Day 2"

  Scenario: Navigate Backwards
    When I click the element ".ef-sessions-date-button-increment"
    When I click the element ".ef-sessions-date-button-decrement"
    Then the element ".ef-sessions-date-text" contains the text "Day 1"

  Scenario: Navigate Lower Bounds
    When I click the element ".ef-sessions-date-button-decrement"
    Then the element ".ef-sessions-date-text" contains the text "Day 1"
