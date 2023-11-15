export interface InterviewResponse {
  data: {
    id: number;
    name: string;
    candidate: {
      id: number;
      firstName: string;
      middleName: string;
      lastName: string;
    };
    vacancy: {
      id: number;
      name: string;
    };
    interviewers: [
      {
        empNumber: number;
        lastName: string;
        firstName: string;
        middleName: string;
        terminationId: null;
      }
    ];
    interviewDate: string;
    interviewTime: string;
    note: string;
  };
  meta: {
    historyId: number;
  };
  rels: [];
}
