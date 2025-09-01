import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import PriceRange from "./PriceRange";

const Header = ({
  search,
  setSearch,
  priceSort,
  setPriceSort,
  priceMin,
  setPriceMin,
  priceMax,
  setPriceMax,
}) => {
  const navigate = useNavigate();
  const authToken = Cookies.get("token");

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handlePriceSortChange = (event) => {
    setPriceSort(event.target.checked ? "price-desc" : "price-asc");
  };

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Vinted" />
        </Link>
        <div id="searchForm">
          <input
            type="search"
            name="search"
            placeholder="Recherche des articles"
            value={search}
            onChange={handleSearchChange}
          />
          <div>
            <label htmlFor="priceSort">
              Trier par prix :
              <input
                id="priceSort"
                type="checkbox"
                name="priceSort"
                checked={priceSort === "price-desc"}
                onChange={handlePriceSortChange}
              />
            </label>
            <label>
              Prix entre :
              <PriceRange
                priceMin={priceMin}
                setPriceMin={setPriceMin}
                priceMax={priceMax}
                setPriceMax={setPriceMax}
              />
            </label>
          </div>
        </div>
        <div className="right-buttons">
          {authToken ? (
            <button
              type="button"
              className="red"
              onClick={() => {
                Cookies.remove("token");
                navigate("/");
              }}
            >
              Se déconnecter
            </button>
          ) : (
            <>
              <button type="button" onClick={() => navigate("/signup")}>
                S'inscrire
              </button>
              <button type="button" onClick={() => navigate("/login")}>
                Se connecter
              </button>
            </>
          )}
          <button type="button" className="dark">
            Vends tes articles
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
