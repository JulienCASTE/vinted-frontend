import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Dropzone from "../components/Dropzone";

const Publish = () => {
  const navigate = useNavigate();

  const authToken = Cookies.get("token");
  useEffect(() => {
    if (!authToken) {
      Cookies.set("fromUrl", "/publish");
      navigate("/login");

      return;
    }
  }, []);

  const [picture, setPicture] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [condition, setCondition] = useState("");
  const [city, setCity] = useState("");
  const [price, setPrice] = useState("");

  const [exchangeAccepted, setExchangeAccepted] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append("picture", picture);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("brand", brand);
      formData.append("size", size);
      formData.append("color", color);
      formData.append("condition", condition);
      formData.append("city", city);
      formData.append("price", price);
      formData.append("exchangeAccepted", exchangeAccepted);

      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/offers/publish`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (201 === response.status && response.data._id) {
        navigate(`/offers/${response.data._id}`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePictureChange = (event) => {
    setPicture(event.target.files[0]);
  };

  const handleTextValueChange = (event, setValue) => {
    setValue(event.target.value);
  };

  const handleExchangeAcceptedChange = (event) => {
    setExchangeAccepted(event.target.checked);
  };

  return (
    <main id="publish">
      <div className="container">
        <h1>Vends ton article</h1>
        <form onSubmit={handleSubmit}>
          <fieldset>
            <Dropzone handlePictureChange={handlePictureChange} />
          </fieldset>

          <fieldset>
            <div className="input-form">
              <label htmlFor="title">Titre</label>
              <input
                id="title"
                name="title"
                placeholder="ex: Chemise Sézane verte"
                type="text"
                value={title}
                onChange={(event) => {
                  handleTextValueChange(event, setTitle);
                }}
              />
            </div>
            <div className="input-form">
              <label htmlFor="description">Décris ton article</label>
              <textarea
                id="description"
                name="description"
                placeholder="ex: porté quelque fois, taille correctement"
                type="text"
                onChange={(event) => {
                  handleTextValueChange(event, setDescription);
                }}
                value={description}
              ></textarea>
            </div>
          </fieldset>

          <fieldset>
            <div className="input-form">
              <label htmlFor="brand">Marque</label>
              <input
                id="brand"
                name="brand"
                placeholder="ex: Zara"
                type="text"
                value={brand}
                onChange={(event) => {
                  handleTextValueChange(event, setBrand);
                }}
              />
            </div>
            <div className="input-form">
              <label htmlFor="size">Taille</label>
              <input
                id="size"
                name="size"
                placeholder="ex: L / 40 / 12"
                type="text"
                value={size}
                onChange={(event) => {
                  handleTextValueChange(event, setSize);
                }}
              />
            </div>
            <div className="input-form">
              <label htmlFor="color">Couleur</label>
              <input
                id="color"
                name="color"
                placeholder="ex: Fuschia"
                type="text"
                value={color}
                onChange={(event) => {
                  handleTextValueChange(event, setColor);
                }}
              />
            </div>
            <div className="input-form">
              <label htmlFor="condition">Etat</label>
              <input
                id="condition"
                name="condition"
                placeholder="Neuf avec étiquette"
                type="text"
                value={condition}
                onChange={(event) => {
                  handleTextValueChange(event, setCondition);
                }}
              />
            </div>
            <div className="input-form">
              <label htmlFor="city">Lieu</label>
              <input
                id="city"
                name="city"
                placeholder="ex: Paris"
                type="text"
                value={city}
                onChange={(event) => {
                  handleTextValueChange(event, setCity);
                }}
              />
            </div>{" "}
          </fieldset>

          <fieldset>
            <div className="input-form">
              <label htmlFor="price">Prix</label>
              <input
                id="price"
                name="price"
                placeholder="0,00 €"
                type="number"
                value={price}
                onChange={(event) => {
                  handleTextValueChange(event, setPrice);
                }}
              />
            </div>
            <div>
              <label htmlFor="exchangeAccepted">
                <input
                  id="exchangeAccepted"
                  name="exchangeAccepted"
                  type="checkbox"
                  value={exchangeAccepted}
                  onChange={handleExchangeAcceptedChange}
                />
                Je suis intéressé(e) par les échanges
              </label>
            </div>
          </fieldset>
          <div className="submit-block">
            <button>Ajouter</button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Publish;
