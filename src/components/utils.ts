export function isValidFirstName(firstName: string) {
  const MIN_LENGTH = 2;
  const MAX_LENGTH = 21;

  return (
    firstName.trim().length > MIN_LENGTH && firstName.trim().length < MAX_LENGTH
  );
}

export function isValidLastName(lastName: string) {
  const MIN_LENGTH = 2;
  const MAX_LENGTH = 21;

  return (
    lastName.trim().length > MIN_LENGTH && lastName.trim().length < MAX_LENGTH
  );
}

export function isValidName(name: string) {
  const MIN_LENGTH = 2;
  const MAX_LENGTH = 21;

  return name.trim().length > MIN_LENGTH && name.trim().length < MAX_LENGTH;
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

export function isValidPasswordOrEmpty(password: string) {
  return isValidPassword(password) || password.length === 0;
}

export const getWeekDay = (date: string): string => {
  const weekday = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return weekday[new Date(date).getDay()];
};
