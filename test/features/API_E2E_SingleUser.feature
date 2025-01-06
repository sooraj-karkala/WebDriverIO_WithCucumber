Feature: Performing API end to end testing

    @GETCALL
    Scenario Outline: Validate end to end GET call

        Given I launch the API application
        When I send UI GET request to endpoint <endpoint>
        And I send API GET request to endpoint <endpoint>
        Then I verify the UI responce status <status> is displayed
        And I verify the UI responce output is displayed
        And I verify the UI responce is equal to API responce for GET request

        Examples:
            | endpoint     | status |
            | /api/users/2 | 200    |

    # @POSTCALL
    # Scenario Outline: Validate end to end POST call

    #     Given I launch the API application
    #     When I send UI POST request to endpoint <endpoint>
    #     And I send API POST request to endpoint <endpoint> with datatable
    #     | name     | sooraj  |
    #     | role     | king    |
    #     Then I verify the UI responce status <status> is displayed
    #     And I verify the UI responce output is displayed
    #     And I verify the UI responce is equal to API responce for POST request

    #     Examples:
    #         | endpoint     | status |
    #         | /api/users   | 201    |