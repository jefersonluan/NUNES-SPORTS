import axios from "axios";
import React, { useEffect, useRef } from "react";
import styled from "styled-components";
import { toast } from "react-toastify";
//import { getProdutos } from "../../../api/controllers/produto";

const FormContainer = styled.form`
    display: flex;
    align-items: flex-end;
    gap: 10px;
    flex-wrap: wrap;
    background-color:#fff;
    padding: 20px;
    box-shadow: 0px 0px 5px #ccc;
    border-radius: 5px;
`;

const InputArea = styled.div`
    display: flex;
    flex-direction: column;
`;

const Label = styled.label``;

const Input = styled.input`
    width: 120px;
    padding: 0px 10px;
    border: 1px solid #bbb;
    border-radius: 5px;
    height: 40px;
`;

const Button = styled.button`
    padding: 10px;
    height: 42px;
`;


const Form = ({getProdutos, onEdit, setOnEdit}) => {
    const ref = useRef();

    useEffect(() => {
        if (onEdit) {
          const produto = ref.current;
    
          produto.nome_produto.value = onEdit.nome_produto;
          produto.cod_produto.value = onEdit.cod_produto;
          produto.desc_produto.value = onEdit.desc_produto;
          produto.preco_produto.value = onEdit.preco_produto;
        }
      }, [onEdit]);

      const handleSubmit = async (e) => {
        e.preventDefault();
    
        const produto = ref.current;
    
        if (
          !produto.nome_produto.value ||
          !produto.cod_produto.value ||
          !produto.desc_produto.value ||
          !produto.preco_produto.value
        ) {
          return toast.warn("Preencha todos os campos!");
        }
    
        if (onEdit) {
          await axios
            .put("http://localhost:8800/" + onEdit.id_produtos, {
              nome_produto: produto.nome_produto.value,
              cod_produto: produto.cod_produto.value,
              desc_produto: produto.desc_produto.value,
              preco_produto: produto.preco_produto.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        } else {
          await axios
            .post("http://localhost:8800", {
                nome_produto: produto.nome_produto.value,
                cod_produto: produto.cod_produto.value,
                desc_produto: produto.desc_produto.value,
                preco_produto: produto.preco_produto.value,
            })
            .then(({ data }) => toast.success(data))
            .catch(({ data }) => toast.error(data));
        }
    
        produto.nome_produto.value = "";
        produto.cod_produto.value = "";
        produto.desc_produto.value = "";
        produto.preco_produto.value = "";
    
        setOnEdit(null);
        getProdutos();
      };
    

    return (
        <FormContainer ref={ref} onSubmit={handleSubmit}>
            <InputArea>
            <Label>Nome</Label>
            <Input name="nome_produto"/>
            </InputArea>
            <InputArea>
            <Label>Código</Label>
            <Input name="cod_produto"/>
            </InputArea>
            <InputArea>
            <Label>Descrição</Label>
            <Input name="desc_produto"/>
            </InputArea>
            <InputArea>
            <Label>Preço</Label>
            <Input name="preco_produto"/>
            </InputArea>

            <Button type="submit">SALVAR</Button>
        </FormContainer>
    );
};

export default Form;