import { IconButton, Switch } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useState } from "react";
import EditEstablishment from "../EditEstablishment/EditEstablishment";
import { CardContainer } from "./styled";
import {
  deleteEstablishments,
  editEstablishmentStatus,
} from "../../services/establishment";
import { useNavigate } from "react-router-dom";

const EstablismentCard = (props) => {
  const {
    establishment,
    selectedEstablishment,
    setSelectedEstablishment,
    setEstablishments,
    setCenter,
  } = props;

  const navigate = useNavigate();

  const [editFormActive, setEditFormActive] = useState(false);

  const [status, setStatus] = useState(establishment.status);

  const onClickEstablishment = () => {
    if (selectedEstablishment) {
      if (
        selectedEstablishment[0] - establishment.coordinates.lat === 0 &&
        selectedEstablishment[1] - establishment.coordinates.lng === 0
      ) {
        setSelectedEstablishment(null);
      } else {
        setSelectedEstablishment([
          establishment.coordinates.lat,
          establishment.coordinates.lng,
        ]);
      }
    } else {
      setSelectedEstablishment([
        establishment.coordinates.lat,
        establishment.coordinates.lng,
      ]);
    }

    setCenter([establishment.coordinates.lat, establishment.coordinates.lng]);
  };

  const onClickEdit = () => {
    setEditFormActive(true);
  };

  const onChangeStatus = (event) => {
    setStatus(event.target.checked);
    editEstablishmentStatus(establishment, setEstablishments, navigate);
  };

  return (
    <CardContainer onClick={onClickEstablishment}>
      <h4 id="name">{establishment.name}</h4>{" "}
      <Switch
        id="status"
        checked={status}
        size="small"
        onChange={onChangeStatus}
      />
      <p id="address">{establishment.address}</p>
      <IconButton id="edit" onClick={onClickEdit}>
        <EditIcon />
      </IconButton>
      <p>Criado em: {establishment.createAt}</p>
      <IconButton
        onClick={() =>
          deleteEstablishments(establishment.id, setEstablishments, navigate)
        }
      >
        <DeleteIcon />
      </IconButton>
      {editFormActive && (
        <EditEstablishment
          establishment={establishment}
          setEditFormActive={setEditFormActive}
          setEstablishments={setEstablishments}
        />
      )}
    </CardContainer>
  );
};

export default EstablismentCard;

// [
//   {
//     name: "Empa",
//     createAt: "2022-11-10T03:00:00.000Z",
//     status: false,
//     address: "R. Vit??ria, 177 - S??o Caetano, Itabuna - BA, 45607-045",
//     coordinates: {
//       lat: -15,
//       lng: -39,
//     },
//   },
// ];
