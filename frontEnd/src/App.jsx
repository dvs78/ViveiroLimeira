import Header from "./components/Header";
import {
  faTruck,
  faBook,
  faSeedling,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <Header
      truck={faTruck}
      book={faBook}
      seedling={faSeedling}
      iconUser={faUser}
      iconCart={faCartShopping}
    />
  );
}

export default App;
