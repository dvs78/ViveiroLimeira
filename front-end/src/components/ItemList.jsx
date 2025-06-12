import React from "react";
import CardProduct from "./CardProduct";
// import { comprasArray } from "../assets/database/compras";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { faTree } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const ItemList = ({ title, items, itemsArray, pathClientes, pathMudas }) => {
  // console.log(props); // {title: 'Mudas'}
  // console.log(props.title); // Mudas
  // console.log(title); // Mudas
  return (
    <div className="item-list">
      <div className="item-list__header">
        <h2>{title}</h2>
        <div className="item-list__header-icon">
          <Link to={pathClientes} className="item-list__link">
            <FontAwesomeIcon className="item-list__link--icon" icon={faUser} />
          </Link>
          <Link to={pathMudas} className="item-list__link">
            <FontAwesomeIcon className="item-list__link--icon" icon={faTree} />
          </Link>
        </div>
      </div>

      <div className="item-list__container">
        {itemsArray
          .filter((currentValue, index) => index < items)
          .map((currentObj, index) => (
            <CardProduct
              // id={currentObj.id}
              // name={currentObj.nomeproduto}
              // semente={currentObj.semente}
              // embalagem={currentObj.embalagem}
              // pedido={currentObj.pedido}
              {...currentObj}
              key={`${title}-${index}`}
            />
          ))}
      </div>
    </div>
  );
};

export default ItemList;
