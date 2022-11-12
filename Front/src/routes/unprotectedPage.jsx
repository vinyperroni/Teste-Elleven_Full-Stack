import { goToHomePage } from "./coordinator";

export const unprotectedPage = (navigate) => {
  const token = localStorage.getItem("token");
  if (token) {
    goToHomePage(navigate);
  }
};
