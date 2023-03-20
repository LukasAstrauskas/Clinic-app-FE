export interface Doctor {
  id: string;
  name: string;
  occupation: string;
}

const doctors: Doctor[] = [
  { id: '1', name: 'Jane Patrick', occupation: 'Mentalist' },
  { id: '2', name: 'Eric Foreman', occupation: 'Chiropractor' },
  { id: '3', name: 'Robert Chase', occupation: 'Therapist' },
  { id: '4', name: 'Kyle Kutner', occupation: 'Radiologist' },
  { id: '5', name: 'Gregory House', occupation: 'Diagnostician' },
  { id: '6', name: 'James Wilson	', occupation: 'Herbalist' },
  { id: '7', name: 'Yen Vengerberg', occupation: 'Homeopath' },
];

export default doctors;
