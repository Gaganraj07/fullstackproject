import React, { useEffect, useState } from "react";
import api from "./services/api";

function App() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/hotels")
      .then((response) => {
        setHotels(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load hotels");
        setLoading(false);
      });
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Hotel Management System</h1>

      {loading && <p>Loading hotels...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <ul>
          {hotels.map((hotel) => (
            <li key={hotel.id}>
              <strong>{hotel.name}</strong> – {hotel.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
