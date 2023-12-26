import GlobalStyle from "./styles/global";
import styled from "styled-components";
import Form from "./components/Forms.js";
import Grid from "./components/Grid.js";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const Container = styled.div`
  width: 100%;
  max-width: 800px;
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const Title = styled.h2``;

function App() {
  const [produtos, setProdutos] = useState([]);
  const [onEdit, setOnEdit] = useState(null);

  const getProdutos = async () => {
    try {
      const res = await axios.get("http://localhost:8800");
      setProdutos(res.data.sort((a, b) => (a.nome > b.nome ? 1 : -1)));
    } catch (error) {
      toast.error(error);
    }
  };

  useEffect(() => {
    getProdutos();
  }, [setProdutos]);

  return (
    <>
      <Container>
        <Title>PRODUTOS</Title>
        <Form onEdit={onEdit} setOnEdit={setOnEdit} getProdutos={getProdutos}/>
        <h2>LISTA DE PRODUTOS</h2>
        <Grid produtos={produtos} setProdutos={setProdutos} setOnEdit={setOnEdit}/>
      </Container>
      <ToastContainer autoClose={3000} position={toast.POSITION.TOP_CENTER} />
      <GlobalStyle />
    </>
  );
}

export default App;