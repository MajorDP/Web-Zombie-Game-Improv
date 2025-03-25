export const handleLogin = async (userData) => {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
    }),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    return { error: data.message };
  }

  return data;
};

export const handleRegister = async (userData) => {
  const res = await fetch("http://localhost:3000/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: userData.email,
      password: userData.password,
      repeatPassword: userData.repeatPassword,
    }),
    credentials: "include",
  });

  const data = await res.json();

  if (!res.ok) {
    return { error: data.message };
  }

  return data;
};

export const handleCheckSession = async () => {
  const res = await fetch("http://localhost:3000/auth/check", {
    method: "GET",
    credentials: "include",
  });

  const data = await res.json();
  return data;
};
