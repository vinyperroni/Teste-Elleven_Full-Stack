import styled from "styled-components";

export const CardContainer = styled.div`
  cursor: pointer;
  padding: 1em;
  box-sizing: border-box;
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;

  display: grid;
  row-gap: 1em;
  grid-template-areas:
    "name status"
    "address edit";
  grid-template-columns: 1fr 40px;
  justify-content: center;
  align-items: center;
  h4,
  p {
    margin: 0;
  }
`;
