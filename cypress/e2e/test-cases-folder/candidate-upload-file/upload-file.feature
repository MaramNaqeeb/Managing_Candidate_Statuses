Feature: Verify that the admin can upload a file to candidates

        Scenario: Upload a txt file to a candidate with an initiated status
                Given The admin visits the profile page of a candidate that has the status initiated
                When The admin switches the Edit button of the candidate's profile
                AND The admin clicks the input of the Resume to select a txt file from his device
                AND The amdin clicks the button save
                Then The selected file should get uploaded to that candidate's profile
                When The admin clicks the download icon next to the candidate
                Then The data in the downloaded file should match the data in the uploaded file

        Scenario: Upload a txt file to a candidate with an hired status
                Given The system has a candidate with a hired status
                AND The admin visits the profile page of a candidate that has the status hired
                When The admin switches the Edit button of the candidate's profile.
                AND The admin clicks the input of the Resume to select a txt file from his device.
                AND The amdin clicks the button save.
                Then The selected file should get uploaded to that candidate's profile.
                When The admin clicks the download icon next to the candidate.
                Then The data in the downloaded file should match the data in the uploaded file.