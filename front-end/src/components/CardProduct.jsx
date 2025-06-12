import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus } from "@fortawesome/free-solid-svg-icons/faCartPlus";
import { Link } from "react-router-dom";

const CardProduct = ({
  id,
  nomeproduto,
  nomecliente,
  semente,
  embalagem,
  precoUni,
  producao,
  pedido,
  entrega,
}) => {
  // console.log(nomeproduto);
  return (
    <Link to="/">
      <div id={id} className="card-product">
        <div className="card-product__icon-wrapper">
          <FontAwesomeIcon className="card-product__icon" icon={faCartPlus} />
        </div>

        <h3 className="card-product__tittle">{nomeproduto}</h3>
        <h4 className="card-product__subtittle">{embalagem}</h4>
        <h4 className="card-product__subtittle">{semente}</h4>
        <h5 className="card-product__text">
          Produção: {Number(producao).toLocaleString("pt-BR")}
        </h5>
        <h5 className="card-product__text">
          Pedido: {Number(pedido).toLocaleString("pt-BR")}
        </h5>
        <h5 className="card-product__text">
          Estoque: {(Number(producao) - Number(pedido)).toLocaleString("pt-BR")}
        </h5>
      </div>
    </Link>
  );
};

export default CardProduct;
