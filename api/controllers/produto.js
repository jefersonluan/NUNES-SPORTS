import { db } from "../db.js";

export const getProdutos = (_, res) => {
  const q = "SELECT * FROM produtos";

  db.query(q, (err, data) => {
    if (err) return res.json(err);

    return res.status(200).json(data);
  });
};

export const addProduto = (req, res) => {
  const q =
    "INSERT INTO produtos(`nome_produto`, `cod_produto`, `desc_produto`, `preco_produto`) VALUES(?)";

  const values = [
    req.body.nome_produto,
    req.body.cod_produto,
    req.body.desc_produto,
    req.body.preco_produto,
  ];

  db.query(q, [values], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto adicionado com sucesso.");
  });
};

export const updateProduto = (req, res) => {
  const q =
    "UPDATE produtos SET `nome_produto` = ?, `cod_produto` = ?, `desc_produto` = ?, `preco_produto` = ? WHERE `id_produtos` = ?";

  const values = [
    req.body.nome_produto,
    req.body.cod_produto,
    req.body.desc_produto,
    req.body.preco_produto,
  ];

  db.query(q, [...values, req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto atualizado com sucesso.");
  });
};

export const deleteProduto = (req, res) => {
  const q = "DELETE FROM produtos WHERE `id_produtos` = ?";

  db.query(q, [req.params.id], (err) => {
    if (err) return res.json(err);

    return res.status(200).json("Produto deletado com sucesso.");
  });
};