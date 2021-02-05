const isDev = process.env.NODE_ENV === "development";

export const BASE_URL = isDev
  ? "http://0.0.0.0:3000"
  : "https://green-got.flosrn.vercel.app";
