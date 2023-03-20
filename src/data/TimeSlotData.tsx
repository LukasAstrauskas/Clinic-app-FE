export interface Timeslot {
  physicianID: string;
  date: string;
  times: string[];
}

const timeArr1 = ['8:00', '8:30', '9:00', '10:00', '11:30', '12:00'];
const timeArr2 = ['9:00', '10:00', '11:00', '11:30', '12:00'];
const timeArr3 = [
  '7:30',
  '8:30',
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
  '12:00',
  '13:00',
  '14:00',
  '14:30',
  '15:30',
  '16:00',
  '16:30',
];
const timeArr4 = [
  '8:00',
  '8:30',
  '9:00',
  '9:30',
  '10:00',
  '10:30',
  '11:00',
  '11:30',
];
const timeArr5 = ['7:00', '7:30', '8:00', '8:30', '9:00'];

const date1 = '2023-05-01';
const date2 = '2023-05-02';
const date3 = '2023-05-03';
const date4 = '2023-05-04';
const date5 = '2023-05-05';
const date6 = '2023-05-06';
const date7 = '2023-05-07';

const physiciansTimeslots: Timeslot[] = [
  { physicianID: '1', date: date1, times: timeArr1 },
  { physicianID: '1', date: date2, times: timeArr2 },
  { physicianID: '1', date: date3, times: timeArr3 },
  { physicianID: '1', date: date4, times: timeArr4 },
  { physicianID: '2', date: date1, times: timeArr3 },
  { physicianID: '2', date: date3, times: timeArr4 },
  { physicianID: '2', date: date4, times: timeArr1 },
  { physicianID: '3', date: date5, times: timeArr2 },
  { physicianID: '3', date: date6, times: timeArr3 },
  { physicianID: '3', date: date7, times: timeArr1 },
  { physicianID: '4', date: date1, times: timeArr1 },
  { physicianID: '4', date: date2, times: timeArr2 },
  { physicianID: '4', date: date5, times: timeArr5 },
  { physicianID: '5', date: date2, times: timeArr4 },
  { physicianID: '5', date: date4, times: timeArr2 },
  { physicianID: '5', date: date6, times: timeArr5 },
  { physicianID: '6', date: date1, times: timeArr1 },
  { physicianID: '6', date: date2, times: timeArr2 },
  { physicianID: '7', date: date3, times: timeArr5 },
];

export default physiciansTimeslots;
