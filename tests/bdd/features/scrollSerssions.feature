@evf @scroll
Feature: Scroll Sessions
  As an user,
  I should be able to scroll the page,
  so that I can see new sessions

  Scenario: Navigate Forward
    Given I open the site "https://simpleviewinc.github.io/keg-test-consumer/"
    When I click the element ".ef-sessions-date-button-decrement"
    Then the element ".ef-sessions-date-text" contains the text "Day 1"
