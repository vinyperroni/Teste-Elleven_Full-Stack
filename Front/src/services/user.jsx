import axios from "axios";
import { BASE_URL } from "../constants/urls";
import { goToHomePage, goToLoginPage } from "../routes/coordinator";

export const login = (body, clear, navigate, setIsLoading) => {
  setIsLoading(true);
  axios
    .post(`${BASE_URL}/users/login`, body)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      goToHomePage(navigate);
      clear();
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      alert(err.response.data.message);
      console.log(err);
    });
};

export const signUp = (body, clear, navigate, setIsLoading) => {
  setIsLoading(true);
  axios
    .post(`${BASE_URL}/users/signup`, body)
    .then((res) => {
      localStorage.setItem("token", res.data.token);
      goToHomePage(navigate);
      clear();
      setIsLoading(false);
    })
    .catch((err) => {
      setIsLoading(false);
      alert(err.response.data.message);
    });
};

export const logOut = (navigate) => {
  localStorage.removeItem("token");
  goToLoginPage(navigate);
};
