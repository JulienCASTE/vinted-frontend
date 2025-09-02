import "./App.css";
import { BrowserRouter as Router, Link, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Error404 from "./pages/Error404";
import Offer from "./pages/Offer";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import { useState } from "react";
import Publish from "./pages/Publish";
import Payment from "./pages/Payment";

function App() {
  const [search, setSearch] = useState("");
  const [priceSort, setPriceSort] = useState("price-asc");
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(100);
  const [offers, setOffers] = useState([]);

  return (
    <Router>
      <Header
        search={search}
        setSearch={setSearch}
        priceSort={priceSort}
        setPriceSort={setPriceSort}
        priceMin={priceMin}
        setPriceMin={setPriceMin}
        priceMax={priceMax}
        setPriceMax={setPriceMax}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              search={search}
              priceSort={priceSort}
              priceMin={priceMin}
              priceMax={priceMax}
              offers={offers}
              setOffers={setOffers}
            />
          }
        />
        <Route path="/offers/:id" element={<Offer />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/publish" element={<Publish />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="*" element={<Error404 />} />
      </Routes>
    </Router>
  );
}

export default App;
