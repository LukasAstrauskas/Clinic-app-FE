export function isValidFirstName(firstName: string) {
  const MIN_LENGTH = 2;
  const MAX_LENGTH = 21;
  const LETTERS_ONLY = /^[a-zA-Z]+[a-zA-Z]+$/;

  return (
    firstName.trim().length > MIN_LENGTH &&
    firstName.trim().length < MAX_LENGTH &&
    LETTERS_ONLY.test(firstName)
  );
}

export function isValidLastName(lastName: string) {
  const MIN_LENGTH = 2;
  const MAX_LENGTH = 21;
  const LETTERS_ONLY = /^[a-zA-Z]+[a-zA-Z]+$/;

  return (
    lastName.trim().length > MIN_LENGTH &&
    lastName.trim().length < MAX_LENGTH &&
    LETTERS_ONLY.test(lastName)
  );
}

export function isValidName(name: string) {
  const MIN_LENGTH = 2;
  const MAX_LENGTH = 21;
  const LETTERS_ONLY = /^[a-zA-Z]+[a-zA-Z]+$/;

  return (
    name.trim().length > MIN_LENGTH &&
    name.trim().length < MAX_LENGTH &&
    LETTERS_ONLY.test(name)
  );
}

export function isValidEmail(email: string) {
  const MIN_LENGTH = 5;
  const MAX_LENGTH = 254;

  return (
    email.length >= MIN_LENGTH &&
    email.length <= MAX_LENGTH &&
    /\S+@\S+\.\S+/.test(email)
  );
}

export function isValidPassword(password: string) {
  const MIN_LENGTH = 8;
  const MAX_LENGTH = 20;

  return (
    password.length >= MIN_LENGTH &&
    password.length <= MAX_LENGTH &&
    /[a-z]/i.test(password) &&
    /[0-9]/.test(password)
  );
}

export function isValidOccupation(occupation: string) {
  const MIN_LENGTH = 3;
  const MAX_LENGTH = 50;

  return occupation.length >= MIN_LENGTH && occupation.length <= MAX_LENGTH;
}

export function isValidPasswordOrEmpty(password: string) {
  return isValidPassword(password) || password.length === 0;
}

export const getWeekDay = (date: string): string => {
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return weekday[new Date(date).getDay()];
};
