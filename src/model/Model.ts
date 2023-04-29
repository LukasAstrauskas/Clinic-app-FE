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

export interface PatientInfo {
  user_id: string | undefined;
  gender: string | undefined;
  birth_date: Date | undefined;
  phone: number | undefined;
  street: string | undefined;
  city: string | undefined;
  postal_code: string | undefined;
  country: string | undefined;
  emergency_name: string | undefined;
  emergency_surname: string | undefined;
  emergency_phone: number | undefined;
  emergency_relation: string | undefined;
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
