export interface TimePatient {
  time: string;
  patientId: string;
  patientName?: string;
}
export interface Timeslots {
  date: string;
  timePatientList: TimePatient[];
}

export interface PatientAppointment {
  id: string;
  name: string;
  surname: string;
  date: string;
  occupation: string;
}

export interface PhyNameOccupation {
  physicianId: string;
  name: string;
  occupation: string;
}

export interface User {
  id: string;
  name: string;
  password: string;
  email: string;
  type: string;
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
  physicianId: string;
  date: string;
  time: string;
}

export type UniversalUser = {
  id: string;
  name: string;
  email: string;
  occupation?: Occupation;
};

export type Occupation = {
  id: string;
  name: string;
};

export type Physician = {
  id: string;
  name: string;
  email: string;
  type: string;
  occupation: Occupation;
};

export type PhysicianDto = {
  id: string;
  name: string;
  email: string;
  password: string;
  occupationId: string;
};

export type CreateUserDto = {
  name: string;
  email: string;
  password: string;
  occupationId?: string;
};

export type CreateUserDTO = {
  name: string;
  surname: string;
  email: string;
  password: string;
  type: string;
  infoID?: string;
};

export type UpdateUserDTO = {
  id: string;
  userDTO: CreateUserDTO;
};

export interface Appointment {
  physicianId: string;
  date: string;
  time: string;
  patientId?: string | null;
}

export interface AppointmentState {
  appointment: Appointment;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
}
