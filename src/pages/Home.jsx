import axios from "axios";
import { useEffect, useState } from "react";
import heroImage from "../assets/banner-wide.jpg";
import Offer from "../components/Offer";
import MessageAlert from "../components/MessageAlert";

const Home = ({ offers, setOffers, search, priceSort, priceMin, priceMax }) => {
  const [isLoadingOffers, setIsLoadingOffers] = useState(true);

  useEffect(() => {
    const fetchOffers = async (searchParams) => {
      setIsLoadingOffers(true);
      try {
        const response = await axios.get(
          `${
            import.meta.env.VITE_BACKEND_URL
          }/offers?${searchParams.toString()}`
        );

        setOffers(response.data);
        setIsLoadingOffers(false);
      } catch (error) {
        console.log(error);
      }
    };

    const filters = {};

    if (search !== "") {
      filters.title = search;
    }
    if (priceSort) {
      filters.sort = priceSort;
    }
    if (priceMin !== null) {
      filters.priceMin = priceMin;
    }
    if (priceMax !== null) {
      filters.priceMax = priceMax;
    }

    fetchOffers(new URLSearchParams(filters));
  }, [search, priceSort, priceMin, priceMax]);

  return (
    <>
      <div className="hero">
        <img src={heroImage} alt="Selfie d'une tenue" />
        <div className="container">
          <div>
            <h1>Prêt à faire du tri dans tes placards ?</h1>
            <button type="button" className="dark">
              Commencer à vendre
            </button>
            <button type="button">Découvrir comment ça marche</button>
          </div>
        </div>
      </div>
      <main className="container">
        <MessageAlert message="Les frais de port sont calculés lors du paiement." />
        <section id="articles">
          {isLoadingOffers ? (
            <p className="loading">Chargement...</p>
          ) : (
            offers.map((offer) => {
              return <Offer key={offer._id} offer={offer} />;
            })
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
