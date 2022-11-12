import styled from "styled-components";
import { primaryColor, secundaryColor } from "../../constants/colors";

export const HeaderContainer = styled.div`
  z-index: 1000;
  height: 10vh;
  display: flex;
  justify-content: space-between;
  width: 100vw;
  background-color: ${primaryColor};
  align-items: center;
  box-sizing: border-box;
  padding: 1em;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  color: ${secundaryColor};
  > p {
    margin: 0;
    font-size: 20px;
    font-weight: 400;
  }
`;
