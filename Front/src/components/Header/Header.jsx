import { HeaderContainer } from "./styled";
import { goToHomePage, goToLoginPage } from "../../routes/coordinator";
import { Button, IconButton } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { NavigateBefore } from "@mui/icons-material";
import { logOut } from "../../services/user";

const Header = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [token, setToken] = useState();

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  return (
    <HeaderContainer>
      <p>Meus Estabelecimentos</p>
      <Button
        color="secondary"
        variant="outlined"
        onClick={() => logOut(navigate)}
      >
        Sair
      </Button>
    </HeaderContainer>
  );
};

export default Header;
