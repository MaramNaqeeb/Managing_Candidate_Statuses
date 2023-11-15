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
import UploadFile from "../../../support/page-objects/candidate-file/upload-file";
import DownloadFile from "../../../support/page-objects/candidate-file/download-file";
import Login from "../../../support/page-objects/login-logout/login-page";
import {
  empId,
  vacancyId,
  jobTitleId,
  candidateId,
} from "../../../support/helpers/recruitment-api-helpers";
import CommonFixtureHelper from "../../../support/helpers/common-fixture-helper";
import AssertFileContent from "../../../support/helpers/assert-file-content";

const LOGIN_OBJ: Login = new Login();
const LOGOUT_OBJ: LogOut = new LogOut();
const UPLOAD_FILE: UploadFile = new UploadFile();
const DOWNLOAD_File: DownloadFile = new DownloadFile();

let filePath: string;
let uploadedFileName: any;

BeforeAll(() => {
  // Here I add an employee, jobTitle, and vacancy as prerequisites
  CommonFixtureHelper.loadDataFromFixture("admin.json", "admin").then(
    (admin: any) => {
      LOGIN_OBJ.loginFUNC(admin.userName, admin.password);
    }
  );
  CommonFixtureHelper.loadDataFromFixture("employee.json", "employee").then(
    (emp: any) => {
      let employeeObject: any = {
        firstName: emp.firstName,
        lastName: `${emp.lastName}${GenericFunctions.randomNumber()}`,
        employeeId: `${GenericFunctions.randomNumber()}`,
      };
      ApiHelpers.addEmployee(employeeObject);
    }
  );

  CommonFixtureHelper.loadDataFromFixture("jobTitle.json", "jobTitle").then(
    (job: any) => {
      let jobTitleObject: any = {
        title: `${job}${GenericFunctions.randomNumber()}`,
      };
      ApiHelpers.addJobTitle(jobTitleObject).then(() => {
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
            ApiHelpers.addVacancy(vacancyObject).then(() => {});
          }
        );
      });
    }
  );
  LOGOUT_OBJ.logout();
});

Before(() => {
  // Here I add a candidate and get his/her status up to Interview Scheduled 
  CommonFixtureHelper.loadDataFromFixture("admin.json", "admin").then(
    (admin: any) => {
      LOGIN_OBJ.loginFUNC(admin.userName, admin.password);
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
      ApiHelpers.addCandidate(candidateObject);
    }
  );
});
AfterAll(() => {
  // Here I delete the employee, jobTitle, and vacancy that I created in the BeforeAll
  ApiHelpers.deleteJob();
  ApiHelpers.deleteVacancy();
  ApiHelpers.deleteEmployee();
});
After(() => {
  // Here I delete the candidate that I created in the Before
  ApiHelpers.deleteCandidate();
});
// First scenario
Given(
  "The admin visits the profile page of a candidate that has the status initiated",
  () => {
    cy.visit(`/web/index.php/recruitment/addCandidate/${candidateId}`);
  }
);
When("The admin switches the Edit button of the candidate's profile", () => {
  UPLOAD_FILE.switchTheEditButtn();
});
When(
  "The admin clicks the input of the Resume to select a txt file from his device",
  () => {
    filePath = "cypress/fixtures/resume.txt";
    UPLOAD_FILE.uploadFile(filePath);
  }
);
When("The amdin clicks the button save", () => {
  UPLOAD_FILE.saveEditForm();
});
Then(
  "The selected file should get uploaded to that candidate's profile",
  () => {
    UPLOAD_FILE.assertUploadedFile(filePath);
  }
);
When("The admin clicks the download icon next to the candidate", () => {
  DOWNLOAD_File.downloadFile();
});

Then(
  "The data in the downloaded file should match the data in the uploaded file",
  () => {
    uploadedFileName = "resume.txt";
    AssertFileContent.assertDownloadedFile(uploadedFileName);
  }
);

//Second scenario
Given("The system has a candidate with a hired status", () => {
  // Here I prepare the data to get the candidate's status to hired
  ApiHelpers.stateShortlistStatus();
  CommonFixtureHelper.loadDataFromFixture("interview.json", "interview").then(
    (interview: any) => {
      let interviewObject: any = {
        interviewDate: GenericFunctions.nextDayDate(),
        interviewName: `${interview.interviewName}${GenericFunctions.randomNumber()}`,
        interviewTime: interview.interviewTime,
        interviewerEmpNumbers: [empId],
      };
      ApiHelpers.scheduleInterview(interviewObject).then(() => {
        ApiHelpers.MarkInterviewPassed();
        ApiHelpers.offerJob();
        ApiHelpers.hireCandidate();
      });
    }
  );
});
Given(
  "The admin visits the profile page of a candidate that has the status hired",
  () => {
    cy.visit(`/web/index.php/recruitment/addCandidate/${candidateId}`);
  }
);
When("The admin switches the Edit button of the candidate's profile.", () => {
  UPLOAD_FILE.switchTheEditButtn();
});
When(
  "The admin clicks the input of the Resume to select a txt file from his device.",
  () => {
    filePath = "cypress/fixtures/resume.txt";
    UPLOAD_FILE.uploadFile(filePath);
  }
);
When("The amdin clicks the button save.", () => {
  UPLOAD_FILE.saveEditForm();
});
Then(
  "The selected file should get uploaded to that candidate's profile.",
  () => {
    UPLOAD_FILE.assertUploadedFile(filePath);
  }
);
When("The admin clicks the download icon next to the candidate.", () => {
  DOWNLOAD_File.downloadFile();
});

Then(
  "The data in the downloaded file should match the data in the uploaded file.",
  () => {
    uploadedFileName = "resume.txt";
    AssertFileContent.assertDownloadedFile(uploadedFileName);
  }
);
