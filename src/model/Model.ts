import { UUID } from 'crypto';

export interface TimePatient {
  time: string;
  patientId: string;
}
export interface Timeslots {
  date: string;
  timePatientList: TimePatient[];
}

export interface PatientPastAppointments {
  data: {
    physicianId: string;
    physicianName: string;
    physicianEmail: string;
    occupation: {
      id: string;
      name: string;
    };
    timeslot: {
      physicianId: string;
      date: string;
      patientId: string;
    };
  };
  offset: number;
  total: number;
}

export interface PatientAppointments {
  physicianId: UUID;
  physicianName: string;
  physicianEmail: string;
  occupation: {
    id: string;
    name: string;
  };
  timeslot: {
    physicianId: string;
    date: string;
    patientId: string;
  };
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
export interface TimeslotWithPhysicianAndPatient {
  physicianId: string;
  patientId?: string | null;
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
  patientId?: string | null;
}

export interface AppointmentState {
  appointment: Appointment;
  setAppointment: React.Dispatch<React.SetStateAction<Appointment>>;
}
