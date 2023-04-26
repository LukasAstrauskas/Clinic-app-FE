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

export interface Patient {
  user_id: string;
  gender: string;
  birth_date: Date;
  phone: number;
  street: string;
  city: string;
  postal_code: string;
  country: string;
  emergency_name: string;
  emergency_surname: string;
  emergency_phone: number;
  emergency_relation: string;
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
