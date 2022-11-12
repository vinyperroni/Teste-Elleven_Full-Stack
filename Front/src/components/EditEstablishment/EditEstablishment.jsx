import { useState } from "react";
import EditForm from "./EditForm";
import { EditContainer, CardContainer } from "./styled";

const EditEstablishment = (props) => {
  const { setEditFormActive, setEstablishments, establishment } = props;

  return (
    <EditContainer>
      <EditForm
        establishment={establishment}
        setEditFormActive={setEditFormActive}
        setEstablishments={setEstablishments}
      />
    </EditContainer>
  );
};

export default EditEstablishment;
