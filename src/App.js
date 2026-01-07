import { useEffect, useState } from "react";
import "./App.css";

const API =
  "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false";

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState("");

  // async/await
  const fetchCoinsAsync = async () => {
    const res = await fetch(API);
    const data = await res.json();
    setCoins(data);
  };

  // .then()
  const fetchCoinsThen = () => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => setCoins(data));
  };

  useEffect(() => {
    fetchCoinsAsync();
    // fetchCoinsThen(); // also valid
  }, []);

  const sortByMarketCap = () => {
    const sorted = [...coins].sort(
      (a, b) => b.market_cap - a.market_cap
    );
    setCoins(sorted);
  };

  const sortByPercentage = () => {
    const sorted = [...coins].sort(
      (a, b) =>
        b.price_change_percentage_24h -
        a.price_change_percentage_24h
    );
    setCoins(sorted);
  };

  const filteredCoins = coins.filter(
    (coin) =>
      coin.name.toLowerCase().includes(search.toLowerCase()) ||
      coin.symbol.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container">
      <div className="controls">
        <input
          placeholder="Search By Name or Symbol"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={sortByMarketCap}>Sort By Mkt Cap</button>
        <button onClick={sortByPercentage}>Sort by Percentage</button>
      </div>

      <table>
        <tbody>
          {filteredCoins.map((coin) => (
            <tr key={coin.id}>
              <td className="name">
                <img src={coin.image} alt={coin.name} />
                {coin.name}
              </td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>${coin.current_price}</td>
              <td>${coin.total_volume.toLocaleString()}</td>
              <td
                className={
                  coin.price_change_percentage_24h >= 0
                    ? "green"
                    : "red"
                }
              >
                {coin.price_change_percentage_24h.toFixed(2)}%
              </td>
              <td>Mkt Cap : ${coin.market_cap.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
