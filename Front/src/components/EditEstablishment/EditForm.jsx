import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useForm from "../../hooks/useForm";
import { EditFormContainer, InputsContainer } from "./styled";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import CircularProgress from "@mui/material/CircularProgress";
import CloseIcon from "@mui/icons-material/Close";
import { FormControl, IconButton, InputLabel } from "@mui/material";
import { getAddressByCep } from "../../services/getAddressByCep";
import { getCoordinates } from "../../services/getCoordinates";
import { editEstablishment } from "../../services/establishment";
import { primaryColor, secundaryColor } from "../../constants/colors";
import { estados } from "../../constants/states";

const EditForm = (props) => {
  const { setEditFormActive, setEstablishments, establishment } = props;

  const [form, onChange, clear, setForm] = useForm({
    name: "",
    cep: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
  });

  useEffect(() => {
    if (establishment) {
      const splitAddress = establishment.address.split(/[\-,]+/);
      setForm({
        ...form,
        name: establishment.name,
        street: splitAddress[0].trim(),
        number: Number(splitAddress[1].trim()),
        cep: Number(splitAddress[5].trim()),
        neighborhood: splitAddress[2].trim(),
        state: splitAddress[4].trim(),
        city: splitAddress[3].trim(),
      });
    }
  }, []);

  const states = estados;

  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = async (event) => {
    event.preventDefault();
    const address = `${form.street}, ${form.number} - ${form.neighborhood}, ${form.city} - ${form.state}, ${form.cep}`;
    try {
      const coordinates = await getCoordinates(address);
      const input = {
        name: form.name,
        status: establishment.status,
        address: address,
        lat: coordinates.lat,
        lng: coordinates.lng,
      };
      editEstablishment(
        input,
        clear,
        setIsLoading,
        setEstablishments,
        establishment.id,
        navigate
      );
      setEditFormActive(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <EditFormContainer>
      <IconButton aria-label="close" onClick={() => setEditFormActive(false)}>
        <CloseIcon />
      </IconButton>
      <form onSubmit={onSubmitForm}>
        <InputsContainer>
          <TextField
            size="small"
            name={"name"}
            value={form.name}
            onChange={onChange}
            label={"Nome do Local"}
            variant={"outlined"}
            fullWidth
            required
            type={"text"}
          />
          <TextField
            size="small"
            name={"cep"}
            value={form.cep}
            onChange={onChange}
            label={"CEP"}
            variant={"outlined"}
            fullWidth
            required
            type={"number"}
            onBlur={() => getAddressByCep(form, setForm)}
            inputProps={{
              minLength: 8,
            }}
            onInput={(e) => {
              e.target.value = Math.max(0, parseInt(e.target.value))
                .toString()
                .slice(0, 8);
            }}
          />
          <TextField
            size="small"
            name={"street"}
            value={form.street}
            onChange={onChange}
            label={"Logradouro"}
            variant={"outlined"}
            fullWidth
            required
            type={"text"}
          />
          <TextField
            size="small"
            name={"number"}
            value={form.number}
            onChange={onChange}
            label={"N??mero"}
            variant={"outlined"}
            fullWidth
            required
            type={"number"}
          />
          <TextField
            size="small"
            name={"neighborhood"}
            value={form.neighborhood}
            onChange={onChange}
            label={"Bairro"}
            variant={"outlined"}
            fullWidth
            required
            type={"text"}
          />

          <FormControl fullWidth>
            <InputLabel id="state-select" size="small">
              Estado
            </InputLabel>
            <Select
              labelId="state-select"
              name="state"
              id="state"
              value={form.state}
              label="Estado"
              onChange={onChange}
              size="small"
            >
              {states &&
                states.map((state) => (
                  <MenuItem value={state.sigla} key={state.sigla}>
                    {state.sigla}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="city-select" size="small">
              Cidade
            </InputLabel>
            <Select
              name="city"
              labelId="city-select"
              id="city"
              value={form.city}
              label="Cidade"
              onChange={onChange}
              size="small"
            >
              {form.state &&
                states
                  .filter((state) => state.sigla === form.state)[0]
                  .cidades.map((city) => (
                    <MenuItem value={city} key={city}>
                      {city}
                    </MenuItem>
                  ))}
            </Select>
          </FormControl>

          <Button
            fullWidth
            type={"submit"}
            variant={"contained"}
            sx={{
              textTransform: "none",
              borderRadius: "100px",
              backgroundImage: `linear-gradient(to right, ${primaryColor} 0%, ${primaryColor}  51%, ${secundaryColor}  100%)`,
              transition: "0.5s",
              backgroundSize: "200% auto",
              "&:hover": {
                backgroundPosition: "right center",
                textDecoration: "none",
              },
            }}
          >
            {isLoading ? (
              <CircularProgress color={"inherit"} size={24} />
            ) : (
              <>Salvar</>
            )}
          </Button>
        </InputsContainer>
      </form>
    </EditFormContainer>
  );
};

export default EditForm;
