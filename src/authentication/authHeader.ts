export default function authHeader() {
  const token = localStorage.getItem('token');
  return { Authorization: `Bearer ${token}` };
}
const token = localStorage.getItem('token');

export const bearerToken = () => {
  return { Authorization: `Bearer ${token}` };
};

export const bearer = () => {
  return `Bearer ${token}`;
};
