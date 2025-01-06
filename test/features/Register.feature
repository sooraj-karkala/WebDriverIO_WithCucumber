Feature: Working on Nopcommerce website

    Scenario Outline: Registering a new user

    Given I launch the application using url <appurl>
    Then I verify the page title to contain the text <title1>
    When I click on Register button
    Then I verify the page title to contain the text <title2>
    When I register with gender <gender> firstname <firstname> lastname <lastname> day <day> month <month> year <year> email <email> and password <password>
    Then I verify the text <text> is displayed in the screen
    When I click on Login button
    And I login with <username> and <password>

    Examples:
    | title1                 | title2                           | gender | firstname | lastname | day | month    | year | email            | password  | appurl                        | text                        |
    | nopCommerce demo store | nopCommerce demo store. Register | Male   | Soorya    | Nayak    | 5   | December | 1999 | soorya@gmail.com | soorya123 | https://demo.nopcommerce.com/ | Your registration completed |