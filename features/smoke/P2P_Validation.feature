Feature: Validate Consignment Creation for P2P Movement

# # @Login 
# Scenario Outline: Verify Login functionality
# Given I am on the bustle login page
# When I enter the valid "<UserName>" and "<Password>"
# Then I should see the bustle home page
		
# Examples:
# | UserName | Password |
# | UserName | Password |

        # @P2P @Smoke @QB80
        # Scenario Outline: Create Consignment with P2P Movement (without Freight Code)
        #     Given I am on the jobs section
        #      When I navigate to the Create Consignment page
        #       And I create a consignment for "<Movement>"
        #      Then I should see the Success message "<Movement>"

        # Examples:
        #           | Movement |
        #           | P2P      |

        # @P2P @Smoke @QB80
        # Scenario Outline: User complete the created P2P job and verify Invoice ID (without Freight Code)
        #     Given I am on my jobs page
        #       And I see the created "<Job>"
        #       And I assign the driver to the "<Job>"
        #      When I move the "<Job>" to the completed stage
        #      Then I should see the completed "<Job>" without freight code

        # Examples:
        #           | Job |
        #           | P2P |

        # @P2P @Smoke @QB80
        # Scenario Outline: User move the P2P job to invoice (without Freight Code)
        #     Given I am on the invoice page
        #       And I should see Invoice reference ID for "<Movement>" without Freight Code
        #       And I complete job as invoiced
        #      Then I should see the job details

        # Examples:
        #           | Movement |
        #           | P2P      |

# =======================================================

       @P2P @Smoke @QB81
        Scenario Outline: Create Consignment with P2P Movement (with Freight Code)
            Given I am on the jobs section
             When I navigate to the Create Consignment page
             Then I create a consignment for "<Movement>" with freight code
             Then I should see the Success message "<Movement>"
 
        Examples:
                  | Movement |
                  | P2P      |

       @P2P @Smoke @QB81
        Scenario Outline: User complete the created job and verify Invoice ID (with Freight Code)
            Given I am on my jobs page
              And I see the created "<Job>" and update the job
              # And I see the created "<Job>"
              And I assign the driver to the "<Job>"
             When I move the "<Job>" to the completed stage
             Then I should see Completed "<Job>" with freight code

        Examples:
                  | Job |
                  | P2P |

       @P2P @Smoke @QB81
        Scenario Outline: User moved the P2P job to invoice (with Freight Code)
            Given I am on the invoice page
              And I should see Invoice reference ID for "<Movement>"
             When I complete job as invoiced
             Then I should see the job details

        Examples:
                  | Movement |
                  | P2P      |


#============================================== 
        # @P2P  @Smoke @QB141
        # Scenario Outline: Create Consignment with P2P Movement (with Freight Code at package level)
        #     Given I am on the jobs section
        #      When I navigate to the Create Consignment page
        #       And I create a consignment for "<Movement>" with freight code at package level
        #      Then I should see the Success message "<Movement>"
 
        # Examples:
        #           | Movement |
        #           | P2P      |

        # @P2P @Smoke @QB141
        # Scenario Outline: User complete the created job and verify Invoice ID (with Freight Code at package level)
        #     Given I am on my jobs page
        #       And I see the created "<Job>"
        #       And I assign the driver to the "<Job>"
        #      When I move the "<Job>" to the completed stage
        #      Then I should see Completed "<Job>" with freight code

        # Examples:
        #           | Job |
        #           | P2P |

        # @P2P @Smoke @QB141
        # Scenario Outline: User moved the P2P job to invoice (with Freight Code at package level)
        #     Given I am on the invoice page
        #       And I should see Invoice reference ID for "<Movement>" with Freight Code at package level
        #      When I complete job as invoiced
        #      Then I should see the job details

        # Examples:
        #           | Movement |
        #           | P2P      |
 
# ===================================================================