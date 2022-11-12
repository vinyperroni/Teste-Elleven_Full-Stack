import axios from "axios";

export const getAddressByCep = (form, setForm) => {
  axios
    .get(`https://viacep.com.br/ws/${form.cep}/json/`)
    .then((res) => {
      if (res.data.erro) {
        console.log("Erro ao buscar por CEP");
      } else {
        setForm({
          ...form,
          street: res.data.logradouro,
          state: res.data.uf,
          neighborhood: res.data.bairro,
          city: res.data.localidade,
        });
      }
    })
    .catch((err) => console.log(err));
};
