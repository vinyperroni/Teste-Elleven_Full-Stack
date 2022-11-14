import axios from "axios";
import { BASE_URL } from "../constants/urls";
import { logOut } from "./user";

export const addEstablishment = (
  body,
  clear,
  setIsLoading,
  setEstablishments,
  navigate
) => {
  setIsLoading(true);
  axios
    .post(`${BASE_URL}/establishments`, body, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      clear();
      setIsLoading(false);
      getEstablishments(setEstablishments, navigate);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};

export const editEstablishment = (
  body,
  clear,
  setIsLoading,
  setEstablishments,
  id,
  navigate
) => {
  setIsLoading(true);
  axios
    .put(`${BASE_URL}/establishments/${id}`, body, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      clear();
      setIsLoading(false);
      getEstablishments(setEstablishments, navigate);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};

export const editEstablishmentStatus = (
  establishment,
  setEstablishments,
  navigate
) => {
  const body = {
    name: establishment.name,
    status: !establishment.status,
    address: establishment.address,
    lat: establishment.coordinates.lat,
    lng: establishment.coordinates.lng,
  };
  axios
    .put(`${BASE_URL}/establishments/${establishment.id}`, body, {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((res) => {
      getEstablishments(setEstablishments, navigate);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getEstablishments = (setEstablishments, navigate) => {
  axios
    .get(`${BASE_URL}/establishments`, {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      setEstablishments(response.data);
    })
    .catch((error) => {
      if (error.response.status === 401) {
        logOut(navigate);
      }
      console.log(error);
    });
};

export const deleteEstablishments = (id, setEstablishments, navigate) => {
  axios
    .delete(`${BASE_URL}/establishments/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      getEstablishments(setEstablishments, navigate);
    })
    .catch((error) => {
      console.log(error);
    });
};
