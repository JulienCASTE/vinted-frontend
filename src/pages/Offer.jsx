import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BACKEND_URL } from "../const";

const Offer = () => {
  const navigate = useNavigate();
  const [offer, setOffer] = useState(null);
  const [productDetails, setProductDetails] = useState({});
  const { id } = useParams();

  const getProductDetail = (type) => {
    const productDetail = offer.product_details.find((productDetail) => {
      return undefined !== productDetail[type];
    });

    return productDetail ? productDetail[type] : null;
  };

  const getProductDetails = (types) => {
    const productDetails = types
      .map((type) => getProductDetail(type))
      .filter((productDetail) => productDetail !== null);

    return productDetails.join(" · ");
  };

  useEffect(() => {
    const fetchOffer = async () => {
      try {
        const response = await axios.get(`${BACKEND_URL}/offers/${id}`);

        setOffer(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchOffer();
  }, []);

  useEffect(() => {
    if (!offer) {
      return;
    }

    setProductDetails({
      brand: getProductDetail("MARQUE"),
      size: getProductDetail("TAILLE"),
      state: getProductDetail("ÉTAT"),
      color: getProductDetail("COULEUR"),
    });
  }, [offer]);

  return (
    <main className="container">
      {offer ? (
        <article>
          <img
            className="offer-image"
            src={offer.product_image.secure_url}
            alt={offer.product_name}
          />
          <div>
            <h1>{offer.product_name}</h1>
            <p>{getProductDetails(["TAILLE", "ÉTAT", "MARQUE"])}</p>
            <p>{offer.product_price.toFixed(2).replace(".", ",")} €</p>

            <div className="details">
              {productDetails.brand && (
                <div>
                  <span>Marque</span>
                  <strong>{productDetails.brand}</strong>
                </div>
              )}
              {productDetails.size && (
                <div>
                  <span>Taille</span>
                  <strong>{productDetails.size}</strong>
                </div>
              )}
              {productDetails.state && (
                <div>
                  <span>État</span>
                  <strong>{productDetails.state}</strong>
                </div>
              )}
              {productDetails.color && (
                <div>
                  <span>Couleur</span>
                  <strong>{productDetails.color}</strong>
                </div>
              )}
              {offer.product_date && (
                <div>
                  <span>Ajouté</span>
                  <strong>{offer.product_date}</strong>
                </div>
              )}
            </div>
            <p>{offer.product_description}</p>
            <button
              type="button"
              onClick={() => navigate("/payment", { state: { offer: offer } })}
            >
              Acheter
            </button>
          </div>
        </article>
      ) : (
        <p className="loading">Chargement...</p>
      )}
    </main>
  );
};

export default Offer;
