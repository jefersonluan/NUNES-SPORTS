import express from "express";
import {  getProdutos, addProduto, updateProduto, deleteProduto } from "../controllers/produto.js";

const router = express.Router();

router.get("/", getProdutos);

router.post("/", addProduto);

router.put("/:id", updateProduto);

router.delete("/:id", deleteProduto);

export default router;