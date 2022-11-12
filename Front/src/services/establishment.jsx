import axios from "axios";
import { BASE_URL } from "../constants/urls";

export const addEstablishment = (
  body,
  clear,
  setIsLoading,
  setEstablishments
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
      getEstablishments(setEstablishments);
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
  id
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
      getEstablishments(setEstablishments);
    })
    .catch((err) => {
      console.log(err);
      setIsLoading(false);
    });
};

export const editEstablishmentStatus = (establishment, setEstablishments) => {
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
      getEstablishments(setEstablishments);
    })
    .catch((err) => {
      console.log(err);
    });
};

export const getEstablishments = (setEstablishments) => {
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
      console.log(error);
    });
};

export const deleteEstablishments = (id, setEstablishments) => {
  axios
    .delete(`${BASE_URL}/establishments/${id}`, {
      headers: {
        "Content-type": "application/json",
        Authorization: localStorage.getItem("token"),
      },
    })
    .then((response) => {
      getEstablishments(setEstablishments);
    })
    .catch((error) => {
      console.log(error);
    });
};
