import CardMuda from "../components/CardMuda";
import Header from "../components/Header";

import {
  faTruck,
  faBook,
  faSeedling,
  faUser,
  faCartShopping,
} from "@fortawesome/free-solid-svg-icons";

const Home = () => {
  return (
    <>
      <Header
        truck={faTruck}
        book={faBook}
        seedling={faSeedling}
        iconUser={faUser}
        iconCart={faCartShopping}
      />
      <div className="home__container-card">
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
        <CardMuda />
      </div>
    </>
  );
};

export default Home;
