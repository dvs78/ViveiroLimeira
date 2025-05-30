import { catalogo } from "./src/produtos.js";
import { renderizarCatalogo, containerCartoes } from "./src/cartaoProduto.js";
import { inicializarCarrinho } from "./src/menuCarrinho.js";

// RENDERIZAR CATÁLOGO
renderizarCatalogo(catalogo, containerCartoes);

// INICIALIZAR CARRINHO
inicializarCarrinho();
