import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToSignUpPage } from "../../routes/coordinator";
import { unprotectedPage } from "../../routes/unprotectedPage";
import { Hr, ScreenContainer } from "../../styled";
import { Button } from "@mui/material";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    unprotectedPage(navigate);
  });

  return (
    <ScreenContainer id="login">
      <h1>Login</h1>
      <LoginForm />
      <Hr />
      <Button
        onClick={() => goToSignUpPage(navigate)}
        fullWidth
        variant={"outlined"}
        sx={{
          textTransform: "none",
          borderRadius: "100px",
        }}
      >
        Crie uma conta
      </Button>
    </ScreenContainer>
  );
};

export default LoginPage;
