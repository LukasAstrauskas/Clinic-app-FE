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
  id: string;
  name: string;
  email: string;
  type: string;
}

export interface endPoint {
  endPoint: string;
  offset: number;
}

export interface Timeslot {
  physicianId: string;
  date: string;
  time: string;
}

export interface EditUser {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  selectedId: string;
}
export type UniversalUser = {
  id: string;
  name: string;
  email: string | number;
  occupation?: {
    id?: string;
    name?: string;
  };
};

export type Occupation = {
  id: string;
  name: string;
};

export type Physician = {
  id: string;
  name: string;
  email: string;
  password: string;
  type: string;
  occupation: {
    id: string;
    name: string;
  };
};

export type PhysicianDto = {
  id: string;
  name: string;
  email: string;
  password: string;
  occupationId: string;
};

export interface Appointment {
  physicianId: string;
  date: string;
  time: string;
  patientId: string;
}

export interface AppointmentState {
  appointment: Appointment;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
}
