export interface PatientAppointment {
  id: string;
  name: string;
  surname: string;
  date: string;
  occupation: string;
}

export interface User {
  id: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  type: string;
  occupation: Occupation | null;
}

export interface UserDTO {
  id: string;
  name: string;
  surname: string;
  password: string;
  email: string;
  type: string;
  occupationId: string | null;
}

export interface LoggedUser {
  id: string;
  name: string;
  surname: string;
  initials: string;
  email: string;
  type: string;
  occupation: Occupation | null;
  patientInfo: PatientInfo | null;
  upcomingAppointment: PatientAppointment[];
  pastAppointment: PatientAppointment[];
}

export interface PatientInfo {
  userId: string | null;
  gender: string;
  birthDate: Date | null;
  phone: number;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  emergencyName: string;
  emergencyLastName: string;
  emergencyPhone: number;
  emergencyRelation: string;
}

export interface Timeslot {
  id: string;
  physicianId: string;
  date: string;
  patientId: string;
}

export interface GroupedTimeslots {
  date: string;
  timeslots: Timeslot[];
}

export type Occupation = {
  id: string;
  name: string;
};
