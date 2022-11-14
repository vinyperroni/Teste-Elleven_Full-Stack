import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { protectedPage } from "../../routes/protectedPage";
import Header from "../../components/Header/Header";
import { EstablishmentsContainer, HomePageContainer } from "./styled";
import { ScreenContainer } from "../../styled";
import EstablismentCard from "../../components/EstablishmentCard/EstablishmentCard";
import AddEstablishment from "../../components/AddEstablishment/AddEstablishment";
import { getEstablishments } from "../../services/establishment";
import { IconButton, TextField } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {
  CircleMarker,
  MapContainer,
  Marker,
  Polygon,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";

const HomePage = () => {
  const navigate = useNavigate();

  const success = (pos) => {
    setLocation([pos.coords.latitude, pos.coords.longitude]);
    setCenter([pos.coords.latitude, pos.coords.longitude]);
  };

  const [location, setLocation] = useState(null);

  const [center, setCenter] = useState(null);

  const [selectedEstablishment, setSelectedEstablishment] = useState();

  const [establishments, setEstablishments] = useState();

  const [addFormActive, setAddFormActive] = useState(false);

  const [search, setSearch] = useState("");

  useEffect(() => {
    getEstablishments(setEstablishments, navigate);
    if (!center) {
      navigator.geolocation.getCurrentPosition(
        success,
        setCenter([-10.566516, -51.857018])
      );
    }
    protectedPage(navigate);
  }, []);

  const purpleOptions = { color: "purple" };
  const locationOptions = { color: "blue", fillColor: "blue" };

  function FlyMapTo() {
    const map = useMap();

    useEffect(() => {
      map.flyTo(center);
    }, [center]);

    return null;
  }

  function FlyToLocation() {
    const map = useMapEvents({
      click() {
        map.locate();
      },
      locationfound(e) {
        setLocation([e.latlng.lat, e.latlng.lng]);
        map.flyTo(e.latlng, map.getZoom());
      },
    });
  }

  return (
    <ScreenContainer>
      <Header />
      <HomePageContainer>
        {center && (
          <MapContainer
            center={center}
            zoom={location ? 13 : 4}
            scrollWheelZoom={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {establishments?.length >= 3 && (
              <Polygon
                pathOptions={purpleOptions}
                positions={establishments
                  .filter((establishment) => establishment.status)
                  .map((establishment) => [
                    establishment.coordinates.lat,
                    establishment.coordinates.lng,
                  ])}
              />
            )}
            {location?.length === 2 && (
              <CircleMarker
                center={location}
                pathOptions={locationOptions}
                radius={2}
              >
                <Popup>
                  Você está aqui. <br /> {location[0]} / {location[1]}
                </Popup>
              </CircleMarker>
            )}
            {selectedEstablishment?.length === 2 && (
              <Marker position={selectedEstablishment}></Marker>
            )}
            {!selectedEstablishment && <FlyToLocation />}

            {selectedEstablishment && <FlyMapTo />}
          </MapContainer>
        )}

        <EstablishmentsContainer>
          <div id="filter">
            <TextField
              fullWidth
              placeholder="Pesquisa"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <IconButton onClick={() => setAddFormActive(true)}>
              <AddIcon fontSize="large" />
            </IconButton>
          </div>

          {establishments?.length > 0 &&
            establishments
              .filter((establishment) => {
                if (search) {
                  return establishment.name
                    .toLowerCase()
                    .includes(search.toLocaleLowerCase());
                }

                return true;
              })
              .map((establishment) => (
                <EstablismentCard
                  key={establishment.name}
                  establishment={establishment}
                  setSelectedEstablishment={setSelectedEstablishment}
                  setEstablishments={setEstablishments}
                  setCenter={setCenter}
                />
              ))}
        </EstablishmentsContainer>
      </HomePageContainer>
      {addFormActive && (
        <AddEstablishment
          setAddFormActive={setAddFormActive}
          setEstablishments={setEstablishments}
        />
      )}
    </ScreenContainer>
  );
};

export default HomePage;
