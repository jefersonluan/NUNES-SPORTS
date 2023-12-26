import React from "react";
import axios from "axios";
import styled from "styled-components";
import { toast } from "react-toastify";


const Card = styled.div`
  width: 200px;
  background-color: #fff;
  padding: 20px;
  box-shadow: 0px 0px 5px #ccc;
  border-radius: 5px;
  margin: 10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const Button_Editar = styled.button`
  padding: 8px;
  background-color: #6564DB;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #1D1BDF;
  }
`;

const Button_Delete = styled.button`
  padding: 8px;
  background-color: #E53E3E;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #E70404;
  }
`;

const Grid = ({ produtos, setProdutos, setOnEdit }) => {

  const handleEdit = (item) => {
    setOnEdit(item);
  };

  const handleDelete = async (id) => {
    console.log("ID do Produto a ser Excluído (Frontend):", id);
    await axios
      .delete("http://localhost:8800/" + id)
      .then(({ data }) => {
        const newArray = produtos.filter((produto) => produto.id_produtos !== id);

        setProdutos(newArray);
        toast.success(data);
      })
      .catch(({ data }) => toast.error(data));

    setOnEdit(null);
  };


  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {produtos.map((item, i) => (
        <Card key={i}>
            <img src="produtos.jpeg" alt="" width="100%" marginBottom="10px"></img>
          <h3>{item.nome_produto}</h3>
          <p>Código: {item.cod_produto}</p>
          <p>Descrição: {item.desc_produto}</p>
          <p>Preço: {Number(item.preco_produto).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          <ButtonContainer>
            <Button_Editar onClick={()=>handleEdit(item)}>Editar</Button_Editar>
            <Button_Delete onClick={()=>handleDelete(item.id_produtos)}>Excluir</Button_Delete>
          </ButtonContainer>
        </Card>
      ))}
    </div>
  );
};

export default Grid;
