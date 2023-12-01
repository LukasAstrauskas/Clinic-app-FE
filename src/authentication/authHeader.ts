export default function authHeader() {
  const tokenOrNull = localStorage.getItem('token');
  const token: string = JSON.parse(
    tokenOrNull !== null ? tokenOrNull : `"No token"`,
  );
  return { Authorization: `Bearer ${token}` };
}

export const bearerToken = () => {
  const tokenOrNull = localStorage.getItem('token');
  const token: string = JSON.parse(
    tokenOrNull !== null ? tokenOrNull : `"No token"`,
  );
  return { Authorization: `Bearer ${token}` };
};
