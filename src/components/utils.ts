export function isValidFirstName(firstName: string) {
  return firstName.trim().length > 0;
}

export function isValidLastName(lastName: string) {
  return lastName.trim().length > 0;
}
export function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export function isValidPassword(password: string) {
  return (
    password.length >= 8 && /[a-z]/i.test(password) && /[0-9]/.test(password)
  );
}

export const timeInputIsValid = (time: string): boolean => {
  return /^(0[6-9]|(1\d{1}))(:)([0-5]\d{1})$/.test(time);
};
