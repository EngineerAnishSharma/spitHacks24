
const getMe = async () => {
  const res = await fetch(`http://localhost:3001/api/user/me`);
  if (res.status !== 200) {
    return null
  }
  const data = await res.json()
  return data;
};

export default getMe;
