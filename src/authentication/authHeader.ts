// const token = localStorage.getItem('token');
// !== null ? localStorage.getItem('token') : '';
// const realToken: string = JSON.parse('');

// const token = (): string => {
//   const tokenOrNull = localStorage.getItem('token');
//   const tokenString = tokenOrNull === null ? `"No token"` : tokenOrNull;
//   return JSON.parse(tokenString);
// };

const tokenOrNull = localStorage.getItem('token');
const token: string = JSON.parse(
  tokenOrNull !== null ? tokenOrNull : `"No token"`,
);

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

  console.log(token);
  return { Authorization: `Bearer ${token}` };
};
