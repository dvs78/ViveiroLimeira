import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartPlus, faCalendarDays } from "@fortawesome/free-solid-svg-icons";

const CardMuda = ({
  cultivar,
  ano,
  semente,
  embalagem,
  producao,
  pedido,
  estoque,
  onAdd,
}) => {
  const percEstoque = Math.max(
    0,
    Math.min(100, Math.round((estoque / producao) * 100))
  );

  return (
    <article className="card__muda">
      <header className="card__muda-header">
        <div className="card__muda-title">{cultivar}</div>
        <span className="card__muda-badge">
          <FontAwesomeIcon icon={faCalendarDays} /> {ano}
        </span>
      </header>
      <span className="card__muda-badge">{semente}</span>
      <span className="card__muda-badge">{embalagem}</span>

      <ul className="card__muda-stats">
        <li>
          <span>Produção</span>
          <strong>{Number(producao).toLocaleString("pt-BR")}</strong>
        </li>
        <li>
          <span>Pedido</span>
          <strong>{Number(pedido).toLocaleString("pt-BR")}</strong>
        </li>
        <li>
          <span>Estoque</span>
          <strong>{Number(estoque).toLocaleString("pt-BR")}</strong>
        </li>
      </ul>

      <div className="card__muda-bar" aria-label={`Estoque ${percEstoque}%`}>
        <div style={{ width: `${percEstoque}%` }} />
      </div>

      <button
        type="button"
        className="card__muda-btn"
        onClick={() => onAdd?.({ cultivar, embalagem, quantidade: 1 })}
        title="Adicionar ao carrinho"
      >
        <FontAwesomeIcon icon={faCartPlus} />
      </button>
    </article>
  );
};

export default CardMuda;
