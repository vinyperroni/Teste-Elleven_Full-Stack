import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/user";
import { InputsContainer, LoginFormContainer } from "./styled";
import CircularProgress from "@mui/material/CircularProgress";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import useForm from "../../hooks/useForm";

const LoginForm = () => {
  const [form, onChange, clear] = useForm({ username: "", password: "" });
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitForm = (event) => {
    event.preventDefault();
    login(form, clear, navigate, setIsLoading);
  };

  return (
    <LoginFormContainer>
      <form onSubmit={onSubmitForm}>
        <InputsContainer>
          <TextField
            name={"username"}
            value={form.username}
            onChange={onChange}
            label={"Username"}
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
            required
            type={"password"}
            inputProps={{
              maxLength: 30,
              minLength: 8,
            }}
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
            <>Fazer Login</>
          )}
        </Button>
      </form>
    </LoginFormContainer>
  );
};

export default LoginForm;
