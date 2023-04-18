import React from 'react';
import PatientContactInfo from './PatientContactInfo';

const patient = {
  firstName: 'Name',
  lastName: 'Surname',
  gender: 'male',
  birthDate: '2000-01-01',
  phone: '555-555-5555',
};

const address = {
  street: 'Zalgiris',
  city: 'Vilnius',
  postalCode: '09300',
  country: 'Lithuania',
};

const emergencyContact = {
  firstName: 'Joe',
  lastName: 'Smith',
  phone: '666-666-6666',
  relation: 'grandchild',
};

const App: React.FC = () => {
  return (
    <div>
      <PatientContactInfo
        patientData={patient}
        addressData={address}
        emergencyContactData={emergencyContact}
      />
    </div>
  );
};

export default App;
