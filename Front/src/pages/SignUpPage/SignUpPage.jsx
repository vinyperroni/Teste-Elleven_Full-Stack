import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { goToLoginPage } from "../../routes/coordinator";
import { unprotectedPage } from "../../routes/unprotectedPage";
import { Hr, ScreenContainer } from "../../styled";
import SignUpForm from "./SignUpForm";
import { Button } from "@mui/material";

const SignUpPage = () => {
  const navigate = useNavigate();
  useEffect(() => {
    unprotectedPage(navigate);
  });

  return (
    <ScreenContainer id="signup">
      <h1>Olá, seja bem vindo</h1>
      <SignUpForm />
      <Hr />
      <Button
        onClick={() => goToLoginPage(navigate)}
        fullWidth
        variant={"outlined"}
        sx={{
          textTransform: "none",
          borderRadius: "100px",
        }}
      >
        Já tem uma conta ?
      </Button>
    </ScreenContainer>
  );
};

export default SignUpPage;
