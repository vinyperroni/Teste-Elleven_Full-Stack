import axios from "axios";

export const getCoordinates = async (address) => {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBp_Fm-sEK4F1gw2zNuCAgIbgYVJNxBTj8`
    );
    return {
      lat: response.data.results[0].geometry.location.lat,
      lng: response.data.results[0].geometry.location.lng,
    };
  } catch (error) {
    console.log(error);
  }
};
