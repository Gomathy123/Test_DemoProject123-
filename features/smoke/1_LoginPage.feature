Feature:Validate login functionality

        # @Login1
        # Scenario Outline: Verify Login functionality
        #     Given I am on the bustle login page "<Environment>"
        #      When I enter the valid "<UserName>" and "<Password>"
        #      Then I should see the bustle home page
		
        # Examples:
        #           | Environment | UserName | Password |
        #           | Prod        | UserName | Password |


        @Login
        Scenario Outline: Verify Login functionality
            Given I am on the bustle login page
             When I enter the valid username and password
             Then I should see the bustle home page


       
       
  