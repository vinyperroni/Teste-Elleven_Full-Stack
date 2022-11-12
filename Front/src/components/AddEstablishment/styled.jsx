import styled from "styled-components";

export const AddContainer = styled.div`
  z-index: 1000;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  background-color: #00000068;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const AddFormContainer = styled.div`
  background-color: white;
  width: 80vw;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  position: relative;

  box-sizing: border-box;
  border-radius: 10px;
  max-height: 90vh;

  > :first-child {
    position: absolute;
    top: 0;
    right: 0;
  }
`;

export const InputsContainer = styled.div`
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  width: 80vw;
  max-width: 400px;
  align-items: center;
  margin-top: 1em;
  gap: 0.7em;

  > button {
    margin-top: 18px;
  }
`;
