export interface TimePatient {
  time: string;
  patientId: string;
}
export interface Timeslots {
  date: string;
  timePatientList: TimePatient[];
}

export interface PhyNameOccupation {
  physicianId: string;
  name: string;
  occupation: string;
}

export interface User {
  name: string;
  email: string;
  type: string;
}

export interface Timeslot {
  physicianId: string;
  date: string;
  time: string;
}
