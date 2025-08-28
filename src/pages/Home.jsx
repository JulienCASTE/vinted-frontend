import axios from "axios";
import { useEffect, useState } from "react";
import heroImage from "../assets/banner-wide.jpg";
import Offer from "../components/Offer";
import MessageAlert from "../components/MessageAlert";

const Home = () => {
  const [offers, setOffers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/offers`
        );

        setOffers(response.data);
      } catch (error) {
        console.log(error.response);
      }

      setIsLoading(false);
    };

    fetchOffers();
  }, []);

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
          {isLoading ? (
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
