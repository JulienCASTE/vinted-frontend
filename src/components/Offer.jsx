import { Link } from "react-router-dom";

const Offer = ({ offer }) => {
  const getProductDetails = (types) => {
    const productDetails = types
      .map((type) => {
        const productDetail = offer.product_details.find((productDetail) => {
          return undefined !== productDetail[type];
        });

        return productDetail ? productDetail[type] : null;
      })
      .filter((productDetail) => productDetail !== null);

    return productDetails.join(" · ");
  };

  return (
    <>
      <Link className="article" to={`/offers/${offer._id}`}>
        <img
          className="article-image"
          src={offer.product_image.secure_url}
          alt={offer.product_name}
        />
        <p>{offer.product_name}</p>
        <p>{getProductDetails(["TAILLE", "ÉTAT"])}</p>
        <p>{offer.product_price.toFixed(2).replace(".", ",")} €</p>
      </Link>
    </>
  );
};

export default Offer;
