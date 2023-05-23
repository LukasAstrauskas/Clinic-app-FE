export default function authHeader() {
  const rawToken = localStorage.getItem('token');
  let token: string | null = null;
  if (rawToken) {
    token = JSON.parse(rawToken);
    return { Authorization: `Bearer ${token}` };
  }
}
