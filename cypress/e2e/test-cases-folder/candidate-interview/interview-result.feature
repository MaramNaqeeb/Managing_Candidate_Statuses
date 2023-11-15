Feature: Verify candidate interview results

    Scenario: Assert Passed Interview
        Given The admin visits the page of a candidate that has the status Interview Scheduled
        When The admin clicks the button Mark Interview as Passed
        When The admin clicks save in the form entitled "Mark Interview Passed"
        Then The status of that candidate should become "Interview Passed"
        Then The buttons resulted from are "Reject", "Schedule Interview", and "Offer Job"


    Scenario: Assert Failed Interview
        Given The admin visits the page a candidate that has the status Interview Scheduled
        When The admin clicks the button Mark Interview as failed.
        When The admin clicks save in the form entitled "Mark Interview Failed".
        Then The status of that candidate should become "Interview Failed".
        Then The button resulted from is "Reject"


