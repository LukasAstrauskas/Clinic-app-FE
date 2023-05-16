//General
export const LOGIN_URL = 'http://localhost:8080/login';
export const USERS_URL = 'http://localhost:8080/user';
export const BASE_USER_URL = 'http://localhost:8080/user/';
//Admins
export const ADMINS_URL = 'http://localhost:8080/user/admins';
export const BASE_ADMINS_URL = 'http://localhost:8080/user/admins/';
export const INCOMING_ADMINS_TO_BE_RENDERED_URL =
  'http://localhost:8080/user/admins/offset/';
export const ADMIN_SEARCH_URL = 'http://localhost:8080/user/adminSearch/';
export const ADMIN_SIZE_URL = 'http://localhost:8080/user/adminSize';

//Patients
export const PATIENTS_URL = 'http://localhost:8080/user/patients';
export const BASE_PATIENTS_URL = 'http://localhost:8080/user/patients/';
export const INCOMING_PATIENTS_TO_BE_RENDERED_URL =
  'http://localhost:8080/user/patients/offset/';
export const PATIENTS_BY_PHYSICIANS_ID_SIZE_URL =
  'http://localhost:8080/user/patientsByPhysicianIdSize/';
export const PATIENT_SIZE_URL = 'http://localhost:8080/user/patientSize';
export const PATIENT_SEARCH_URL = 'http://localhost:8080/user/patientSearch/';
export const PATIENTS_ADDITIONAL_INFO_URL =
  'http://localhost:8080/patientInfo/';
export const PATIENT_APPOINTMENTS =
  'http://localhost:8080/user/patientUpcomingAppointments/';
export const PATIENT_PAST_APPOINTMENTS =
  'http://localhost:8080/user/patientPastAppointments/';
export const PATIENT_REMOVE_APPOINTMENT = 'http://localhost:8080/timeslot/';
//Physicians
export const PHYSICIANS_FULL_URL = 'http://localhost:8080/physicianInfo';
export const BASE_PHYSICIANS_FULL_URL = 'http://localhost:8080/physicianInfo/';
export const PHYSICIANS_URL_FOR_DELETE =
  'http://localhost:8080/physicianInfo/physician/';
export const PHYSICIAN_SEARCH_URL =
  'http://localhost:8080/user/physicianSearch/';
export const PHYSICIANS_URL = 'http://localhost:8080/user/physicians';
export const BASE_PHYSICIANS_URL = 'http://localhost:8080/user/physicians/';
export const PHYSICIAN_SIZE_URL = 'http://localhost:8080/user/physicianSize';
export const INCOMING_PHYSICIANS_TO_BE_RENDERED_URL =
  'http://localhost:8080/physicianInfo/physcians/offset/';

//Occupations
export const PHYNAMEOCCUPATION_URL =
  'http://localhost:8080/physicianInfo/physicianNamesOccupations';
export const OCCUPATIONS_URL = 'http://localhost:8080/occupations';
//Timeslots
export const TIMESLOTS_URL = 'http://localhost:8080/timeslot/getPhyTimeslots';
export const DELETE_TIMESLOT = 'http://localhost:8080/timeslot/';
