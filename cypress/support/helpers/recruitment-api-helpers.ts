const baseUrl = Cypress.config().baseUrl;
import {
  newjobTitleData,
  newEmployeeData,
  addVacancyData,
  newCandidateData,
  shortlistStatus,
  scheduleInterviewData,
  deleteEmployeeData,
  deleteJobData,
  deleteVacancyData,
  InterviewPassedData,
  OfferJobData,
  hireCandidateData,
  deleteCandidateData,
} from "./recruitment-payload-functions";
import { EmployeePayload } from "../api/payload/employeePayload";
import { JobTitlePayload } from "../api/payload/jobTitlePayload";
import { VacancyPayload } from "../api/payload/vacancyPayload";
import { candidatePayload } from "../api/payload/candidatePayload";
import { InterviewPaload } from "../api/payload/interviewPayload";

export let empId: any;
export let vacancyId: any;
export let jobTitleId: any;
export var candidateId: number;
let interviewId: number;

export const URLs = {
  employee: `${baseUrl}/web/index.php/api/v2/pim/employees`,
  jobTitle: `${baseUrl}/web/index.php/api/v2/admin/job-titles`,
  vacancy: `${baseUrl}/web/index.php/api/v2/recruitment/vacancies`,
  candidate: `${baseUrl}/web/index.php/api/v2/recruitment/candidates`,
};

export default class ApiHelpers {
  static addEmployee(payload: EmployeePayload) {
    return cy
      .API("POST", URLs.employee, newEmployeeData(payload))
      .then((response) => {
        empId = response.body.data.empNumber;
      });
  }

  static addJobTitle(payload: JobTitlePayload) {
    return cy
      .API("POST", URLs.jobTitle, newjobTitleData(payload))
      .then((response) => {
        jobTitleId = response.body.data.id;
      });
  }
  static addVacancy(payload: VacancyPayload) {
    return cy
      .API("POST", URLs.vacancy, addVacancyData(payload))
      .then((response) => {
        vacancyId = response.body.data.id;
      });
  }

  static addCandidate(payload: candidatePayload) {
    return cy
      .API("POST", URLs.candidate, newCandidateData(payload))
      .then((response) => {
        candidateId = response.body.data.id;
      });
  }
  static stateShortlistStatus() {
    cy.visit(`/web/index.php/recruitment/addCandidate/${candidateId}`);
    return cy.API(
      "PUT",
      `${baseUrl}/web/index.php/api/v2/recruitment/candidates/${candidateId}/shortlist`,
      shortlistStatus()
    );
  }
  static scheduleInterview(payload: InterviewPaload) {
    return cy
      .API(
        "POST",
        `${baseUrl}/web/index.php/api/v2/recruitment/candidates/${candidateId}/shedule-interview`,
        scheduleInterviewData(payload)
      )
      .then((response) => {
        interviewId = response.body.data.id;
      });
  }
  static MarkInterviewPassed() {
    return cy.API(
      "PUT",
      `${baseUrl}/web/index.php/api/v2/recruitment/candidates/${candidateId}/interviews/${interviewId}/pass`,
      InterviewPassedData()
    );
  }
  static offerJob() {
    return cy.API(
      "PUT",
      `${baseUrl}/web/index.php/api/v2/recruitment/candidates/${candidateId}/job/offer`,
      OfferJobData()
    );
  }
  static hireCandidate() {
    return cy.API(
      "PUT",
      `${baseUrl}/web/index.php/api/v2/recruitment/candidates/${candidateId}/hire`,
      hireCandidateData()
    );
  }
  static deleteEmployee() {
    cy.API("DELETE", URLs.employee, deleteEmployeeData());
  }
  static deleteJob() {
    return cy.API("DELETE", URLs.jobTitle, deleteJobData());
  }
  static deleteVacancy() {
    return cy.API("DELETE", URLs.vacancy, deleteVacancyData());
  }
  static deleteCandidate() {
    return cy.API("DELETE", URLs.candidate, deleteCandidateData());
  }
}
