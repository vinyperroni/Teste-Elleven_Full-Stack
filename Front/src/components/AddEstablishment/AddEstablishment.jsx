import { useState } from "react";
import AddForm from "./AddForm";
import { AddContainer, CardContainer } from "./styled";

const AddEstablishment = (props) => {
  const { setAddFormActive, setEstablishments } = props;

  return (
    <AddContainer>
      <AddForm
        setAddFormActive={setAddFormActive}
        setEstablishments={setEstablishments}
      />
    </AddContainer>
  );
};

export default AddEstablishment;
