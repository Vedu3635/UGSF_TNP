import { jwtDecode } from "jwt-decode";

export const isTokenExpired = (token) => {
  if (!token) return true; // If there's no token, consider it expired

  try {
    const decoded = jwtDecode(token); // Decode the token
    const currentTime = Date.now() / 1000; // Get the current time in seconds

    return decoded.exp < currentTime; // Check if the token is expired
  } catch (error) {
    console.error("Error decoding token:", error);
    return true; // If decoding fails, treat the token as expired
  }
};
