// Base
export const BASE_URL = 'http://localhost:8080';
//General
export const LOGIN = '/login';

export const TIMESLOT = '/timeslot';
export const PAST_APPOINTMENTS = '/patientPastAppointments';
export const PAST_APPOINTMENTS_AMOUNT = '/patientPastAppointmentsAmount';
export const PATIENT_CANCEL_APPOINTMENT = '/patientCancelAppointment';

export const PATIENT_INFO = '/patientInfo';

export const ALL_OCCUPATIONS = '/occupations/all';

export const LOGIN_URL = 'http://localhost:8080/login';
export const BASE_USER_URL = 'http://localhost:8080/user/';
//Admin actions
export const ADMIN_ACTION = 'http://localhost:8080/user/admin';
//Admins
export const ADMINS_URL = 'http://localhost:8080/user/admins';
export const INCOMING_ADMINS_TO_BE_RENDERED_URL =
  'http://localhost:8080/user/admins/offset/';
export const ADMIN_SEARCH_URL = 'http://localhost:8080/user/adminSearch/';
export const ADMIN_SIZE_URL = 'http://localhost:8080/user/adminCount';

//Patients
export const PATIENTS_URL = 'http://localhost:8080/user/patients';
export const BASE_PATIENTS_URL = 'http://localhost:8080/user/patients/';
export const INCOMING_PATIENTS_TO_BE_RENDERED_URL =
  'http://localhost:8080/user/patients/offset/';
export const PATIENTS_BY_PHYSICIANS_ID_SIZE_URL =
  'http://localhost:8080/user/patientsByPhysicianIdSize/';
export const PATIENT_SIZE_URL = 'http://localhost:8080/user/patientCount';
export const PATIENT_SEARCH_URL = 'http://localhost:8080/user/patientSearch/';
export const PATIENTS_ADDITIONAL_INFO_URL =
  'http://localhost:8080/patientInfo/';
export const PATIENT_APPOINTMENTS =
  'http://localhost:8080/timeslot/patientUpcomingAppointments/';
export const PATIENT_PAST_APPOINTMENTS =
  'http://localhost:8080/timeslot/patientPastAppointments/';
export const PATIENT_REMOVE_APPOINTMENT = 'http://localhost:8080/timeslot/';
export const PATIENT_PAST_APPOINTMENTS_AMOUNT =
  'http://localhost:8080/timeslot/getPatientPastAppointmentAmount';
//Physicians
export const PHYSICIANS_FULL_URL = 'http://localhost:8080/physicianInfo';
export const BASE_PHYSICIANS_FULL_URL = 'http://localhost:8080/physicianInfo/';
export const PHYSICIAN_SEARCH_URL =
  'http://localhost:8080/user/physicianSearch/';
export const BASE_PHYSICIANS_URL = 'http://localhost:8080/user/physicians/';
export const PHYSICIAN_SIZE_URL = 'http://localhost:8080/user/physicianCount';
export const INCOMING_PHYSICIANS_TO_BE_RENDERED_URL =
  'http://localhost:8080/physicianInfo/physcians/offset/';

//Occupations
export const PHYNAMEOCCUPATION_URL =
  'http://localhost:8080/physicianInfo/physicianNamesOccupations';
export const OCCUPATIONS_URL = 'http://localhost:8080/occupations';
//Timeslots
export const TIMESLOTS_URL = 'http://localhost:8080/timeslot/getPhyTimeslots';
export const DELETE_TIMESLOT = 'http://localhost:8080/timeslot/';
