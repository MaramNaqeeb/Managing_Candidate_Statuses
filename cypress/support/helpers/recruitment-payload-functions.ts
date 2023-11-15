import { EmployeePayload } from "../api/payload/employeePayload";
import { VacancyPayload } from "../api/payload/vacancyPayload";
import { JobTitlePayload } from "../api/payload/jobTitlePayload";
import { candidatePayload } from "../api/payload/candidatePayload";
import { candidateId, empId, jobTitleId, vacancyId } from "./recruitment-api-helpers";
import { InterviewPaload } from "../api/payload/interviewPayload";


export const newEmployeeData = (e?: EmployeePayload): any => {
  let employee: any = {
    empPicture: null,
    employeeId: e?.employeeId,
    firstName: e?.firstName,
    lastName: e?.lastName,
    middleName: "" || e?.middleName,
  };
  return employee;
};

export function newjobTitleData(j?: JobTitlePayload) {
  let job: any = {
    description: "" || j?.description,
    note: "" || j?.note,
    specification: null || j?.specification,
    title: j?.title,
  };
  return job;
}
export const addVacancyData = (v?: VacancyPayload): any => {
  let vacancy: any = {
    description: "" || v?.description,
    employeeId: v?.employeeId,
    isPublished: v?.isPublished,
    jobTitleId: v?.jobTitleId,
    name: v?.name,
    numOfPositions: v?.numOfPositions,
    status: v?.status,
  };
  return vacancy;
};
export const newCandidateData = (c?: candidatePayload): any => {
  let addCandidate: any = {
    comment: null,
    consentToKeepData: false,
    contactNumber: null,
    dateOfApplication: c?.dateOfApplication,
    email: c?.email,
    firstName: c?.firstName,
    keywords: null,
    lastName: c?.lastName,
    middleName: null,
    vacancyId: c?.vacancyId,
  };
  return addCandidate;
};
export const shortlistStatus = (): any => {
  let shortlist: any = {
    note: null,
  };
  return shortlist;
};

export const scheduleInterviewData = (i?: InterviewPaload): any => {
  let interview: any = {
    interviewDate: i?.interviewDate,
    interviewName: i?.interviewName,
    interviewTime: i?.interviewTime,
    interviewerEmpNumbers: i?.interviewerEmpNumbers,
    note: null,
  };
  return interview;
};
export const InterviewPassedData = (): any => {
  let passed: any = {
    note: null,
  };
  return passed;
};
export const OfferJobData = (): any => {
  let offer: any = {
    note: null,
  };
  return offer;
};
export const hireCandidateData = (): any => {
  let hire: any = {
    note: null,
  };
  return hire;
};
export const deleteEmployeeData = (): any => {
  let deleteEmployee: any = {
    ids: [empId],
  };
  return deleteEmployee;
};

export const deleteJobData = (): any => {
  let deleteJob: any = {
    ids: [jobTitleId],
  };
  return deleteJob;
};
export const deleteVacancyData = (): any => {
  let deleteVacancy: any = {
    ids: [vacancyId],
  };
  return deleteVacancy;
};
export const deleteCandidateData = (): any => {
  let deleteCandidate: any = {
    ids: [candidateId],
  };
  return deleteCandidate;
};
