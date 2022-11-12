import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { InputsContainer, SignUpFormContainer } from "./styled";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import CircularProgress from "@mui/material/CircularProgress";
import useForm from "../../hooks/useForm";
import { signUp } from "../../services/user";

const SignUpForm = () => {
  const [form, onChange, clear] = useForm({
    name: "",
    username: "",
    password: "",
  });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = (event) => {
    event.preventDefault();
    signUp(form, clear, navigate, setIsLoading);
  };

  return (
    <SignUpFormContainer>
      <form onSubmit={onSubmitForm}>
        <InputsContainer>
          <TextField
            name={"name"}
            value={form.name}
            onChange={onChange}
            label={"Nome"}
            variant={"outlined"}
            fullWidth
            margin={"normal"}
            required
            type={"text"}
          />
          <TextField
            name={"username"}
            value={form.username}
            onChange={onChange}
            label={"Nome de usuário"}
            variant={"outlined"}
            fullWidth
            margin={"normal"}
            required
            type={"username"}
          />
          <TextField
            name={"password"}
            value={form.password}
            onChange={onChange}
            label={"Senha"}
            variant={"outlined"}
            fullWidth
            margin={"normal"}
            inputProps={{
              maxLength: 30,
              minLength: 8,
            }}
            required
            type={"password"}
          />
        </InputsContainer>
        <Button
          fullWidth
          type={"submit"}
          variant={"contained"}
          sx={{
            textTransform: "none",
            borderRadius: "100px",
          }}
        >
          {isLoading ? (
            <CircularProgress color={"inherit"} size={24} />
          ) : (
            <>Cadastrar</>
          )}
        </Button>
      </form>
    </SignUpFormContainer>
  );
};

export default SignUpForm;
