import axios from "axios";
import Cookies from "js-cookie";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleNewsletterChange = (event) => {
    setNewsletter(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setErrorMessage("");
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/user/signup`,
        {
          username: username,
          email: email,
          password: password,
          newsletter: newsletter,
        }
      );

      if (201 === response.status && response.data.token) {
        Cookies.set("token", response.data.token, { expires: 7 });

        const fromUrl = Cookies.get("fromUrl");
        Cookies.remove("fromUrl");
        navigate(fromUrl ?? "/");

        return;
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error.response.data.message);
    }
  };

  return (
    <main id="signup">
      <h1>S'inscrire</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Nom d'utilisateur"
          autoFocus="autofocus"
          value={username}
          onChange={handleUsernameChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={password}
          onChange={handlePasswordChange}
        />
        <label htmlFor="newsletter">
          <input
            id="newsletter"
            type="checkbox"
            name="newsletter"
            checked={newsletter}
            onChange={handleNewsletterChange}
          />
          S'inscrire à notre newsletter
        </label>
        <span className="help-text">
          En m'inscrivant je confirme avoir lu et accepté les Termes &
          Conditions et Politique de Confidentialité de Vinted. Je confirme
          avoir au moins 18 ans.
        </span>
        {errorMessage && (
          <span className="help-text error">{errorMessage}</span>
        )}
        <input type="submit" value="S'inscrire" />
        <Link to="/login">Tu as déjà un compte ? Connecte-toi !</Link>
      </form>
    </main>
  );
};

export default Signup;
