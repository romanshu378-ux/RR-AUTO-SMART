const BASE_URL = import.meta.env.VITE_API_URL;

export const apiService = {
  // 🔐 AUTH
  login: async (email: string, password: string) => {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return res.json();
  },

  register: async (data: any) => {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // 📩 INQUIRY
  sendInquiry: async (data: any) => {
    const res = await fetch(`${BASE_URL}/inquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.json();
  },

  // 🧪 TEST
  health: async () => {
    const res = await fetch(`${BASE_URL.replace("/api", "")}`);
    return res.text();
  }
};
