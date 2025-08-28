import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo.svg";
import { useEffect, useState } from "react";

const Header = () => {
  const navigate = useNavigate();
  const authToken = Cookies.get("token");

  return (
    <header>
      <div className="container">
        <Link to="/">
          <img src={logo} alt="Vinted" />
        </Link>
        <div>
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
