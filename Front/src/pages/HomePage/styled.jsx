import styled from "styled-components";

export const HomePageContainer = styled.div`
  display: flex;
  width: 100vw;
  height: 90vh;
  box-sizing: border-box;
  align-items: center;
  .leaflet-container {
    width: 60vw;
    height: 90vh;
    @media (max-width: 800px) {
      width: 100vw;
      height: 50vh;
    }
  }
  @media (max-width: 800px) {
    flex-direction: column;
  }
`;

export const EstablishmentsContainer = styled.div`
  overflow-y: scroll;
  height: 90vh;
  width: 40vw;
  @media (max-width: 800px) {
    width: 100vw;
    height: 40vh;
  }
  #filter {
    display: flex;
    justify-content: space-between;
    padding: 1em;
    column-gap: 1em;
  }
`;
