import {
  Given,
  When,
  Then,
  BeforeAll,
  Before,
  AfterAll,
  After,
} from "@badeball/cypress-cucumber-preprocessor";
import ApiHelpers from "../../../support/helpers/recruitment-api-helpers";
import GenericFunctions from "../../../support/helpers/generic-functions";
import LogOut from "../../../support/page-objects/login-logout/logout";
import Login from "../../../support/page-objects/login-logout/login-page";
import Interview from "../../../support/page-objects/candidate-interview/interview";
import {
  empId,
  vacancyId,
  jobTitleId,
  candidateId,
} from "../../../support/helpers/recruitment-api-helpers";
import CommonFixtureHelper from "../../../support/helpers/common-fixture-helper";
const INTERVIEW: Interview = new Interview();
const LOGOUT: LogOut = new LogOut();
const LOGIN: Login = new Login();
const API_HELPERS:ApiHelpers=new ApiHelpers()

BeforeAll(() => {
   // Here I add an employee, jobTitle, and vacancy as prerequisites
  CommonFixtureHelper.loadDataFromFixture("admin.json", "admin").then(
    (admin: any) => {
      LOGIN.loginFUNC(admin.userName, admin.password);
    }
  );
  CommonFixtureHelper.loadDataFromFixture("employee.json", "employee").then(
    (emp: any) => {
      let employeeObject: any = {
        firstName: emp.firstName,
        lastName: `${emp.lastName}${GenericFunctions.randomNumber()}`,
        employeeId: `${GenericFunctions.randomNumber()}`,
      };
      API_HELPERS.addEmployee(employeeObject);
    }
  );

  CommonFixtureHelper.loadDataFromFixture("jobTitle.json", "jobTitle").then(
    (job: any) => {
      let jobTitleObject: any = {
        title: `${job}${GenericFunctions.randomNumber()}`,
      };
      API_HELPERS.addJobTitle(jobTitleObject).then(() => {
        CommonFixtureHelper.loadDataFromFixture("vacancy.json", "vacancy").then(
          (vacancy: any) => {
            let vacancyObject: any = {
              employeeId: empId,
              isPublished: vacancy.isPublished,
              jobTitleId: jobTitleId,
              name: `${vacancy.name}${GenericFunctions.randomNumber()}`,
              numOfPositions: vacancy.numOfPositions,
              status: vacancy.status,
            };

            API_HELPERS.addVacancy(vacancyObject).then(() => {});
          }
        );
      });
    }
  );
  LOGOUT.logout();
});

Before(() => {
  // Here I add a candidate which results in having an initiated status for that candidate

  CommonFixtureHelper.loadDataFromFixture("admin.json", "admin").then(
    (admin: any) => {
      LOGIN.loginFUNC(admin.userName, admin.password);
    }
  );
  CommonFixtureHelper.loadDataFromFixture("candidate.json", "candidate").then(
    (candidate: any) => {
      let candidateObject: any = {
        consentToKeepData: candidate.consentToKeepData,
        dateOfApplication: GenericFunctions.currentDate(),
        email: candidate.email,
        firstName: candidate.firstName,
        lastName: `${candidate.lastName}${GenericFunctions.randomNumber()}`,
        vacancyId: vacancyId,
      };
      API_HELPERS.addCandidate(candidateObject).then(() => {
        API_HELPERS.stateShortlistStatus();
        CommonFixtureHelper.loadDataFromFixture(
          "interview.json",
          "interview"
        ).then((interview: any) => {
          let interviewObject: any = {
            interviewDate: GenericFunctions.nextDayDate(),
            interviewName: `${interview.interviewName}${GenericFunctions.randomNumber()}`,
            interviewTime: interview.interviewTime,
            interviewerEmpNumbers: [empId],
          };
          API_HELPERS.scheduleInterview(interviewObject);
        });
      });
    }
  );
});

AfterAll(() => {
  // Here I delete the employee, jobTitle, and vacancy that I created in the BeforeAll
  API_HELPERS.deleteJob();
  API_HELPERS.deleteVacancy();
  API_HELPERS.deleteEmployee();
});
After(() => {
  // Here I delete the candidate that I created in the Before
  API_HELPERS.deleteCandidate();
});
// First scenario
Given(
  "The admin visits the page of a candidate that has the status Interview Scheduled",
  () => {
    cy.visit(`/web/index.php/recruitment/addCandidate/${candidateId}`);
  }
);

When("The admin clicks the button Mark Interview as Passed", () => {
  INTERVIEW.clickOnMarkInterviewPassedButton();
});
When(
  "The admin clicks the button save in the Mark Interview Passed form ",
  () => {
    INTERVIEW.saveForm();
  }
);

Then(
  "The status of that candidate should become {string}",
  (status: string) => {
    INTERVIEW.checkCandidateStatusIsExist(status);
  }
);
Then(
  "The buttons resulted from are {string}, {string}, and {string}",
  (buttonContent1: string, buttonContent2: string, buttonContent3: string) => {
   INTERVIEW.assertRejectButton(buttonContent1)
   INTERVIEW.assertScheduleInterviewButton(buttonContent2)
   INTERVIEW.assertOfferJobButton(buttonContent3)
  }
);
// Second scenario
Given(
  "The admin visits the page a candidate that has the status Interview Scheduled",
  () => {
    cy.visit(`/web/index.php/recruitment/addCandidate/${candidateId}`);
  }
);

When("The admin clicks the button Mark Interview as failed.", () => {
  INTERVIEW.clickOnMarkInterviewFailedButton();
});
When(
  "The admin clicks the button save in the Mark Interview Failed form.",
  () => {
    INTERVIEW.saveForm();
  }
);

Then(
  "The status of that candidate should become {string}.",
  (status: string) => {
    INTERVIEW.checkCandidateStatusIsExist(status);
  }
);
Then("The button resulted from is {string}", (buttonContent: string) => {
  INTERVIEW.assertRejectButton(buttonContent);
});
