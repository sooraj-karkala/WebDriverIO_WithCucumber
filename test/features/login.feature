Feature: Working on Nopcommerce website

  Scenario Outline: As a user, I want to login to nop commerce  website

    Given I launch the application using url <appurl>
    Then I verify the page title to contain the text <title1>
    When I click on Login button
    And I login with <username> and <password>
    Then I verify the page title to contain the text <title2>

    Examples:
      | username         | password  | title1                 | title2                 | appurl                        |
      | sooraj@gmail.com | sooraj123 | nopCommerce demo store | nopCommerce demo store | https://demo.nopcommerce.com/ |