Feature: Verify candidate interview results

    Scenario: Assert Passed Interview
        Given The admin visits the page of a candidate that has the status Interview Scheduled
        When The admin clicks the button Mark Interview as Passed
        AND The admin clicks the button save in the Mark Interview Passed form 
        Then The status of that candidate should become "Interview Passed"
        AND The buttons resulted from are "Reject", "Schedule Interview", and "Offer Job"


    Scenario: Assert Failed Interview
        Given The admin visits the page a candidate that has the status Interview Scheduled
        When The admin clicks the button Mark Interview as failed.
        AND The admin clicks the button save in the Mark Interview Failed form. 
        Then The status of that candidate should become "Interview Failed".
        AND The button resulted from is "Reject"


