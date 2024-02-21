const API_URL = (import.meta.env.VITE_SIMPLE_PLAN_API_URL as string) || "";

if (!API_URL) {
  console.error("Missing API environment variable");
}

const config = {
  API_URL,
};

export default config;
