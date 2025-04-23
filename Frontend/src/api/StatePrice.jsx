import { createContext, useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";

const PriceContext = createContext();

const tokens = [
  {
    id: "0xf15f1f64891a3e2797328445cb28ba11fe468505",
    key: "stateUsdPrice",
    isPool: true,
  },
  {
    id: "0xf15f1f64891a3e2797328445cb28ba11fe468505",
    key: "stateWplsRatio",
    isRatio: true,
  },
 
];

const PriceProvider = ({ children }) => {
  const [prices, setPrices] = useState({});
  const [priceLoading, setPriceLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPrice = async ({ id, key, isPool = false, isRatio = false }) => {
    try {
      const url = `https://api.geckoterminal.com/api/v2/${
        isPool || isRatio
          ? "networks/pulsechain/pools"
          : "simple/networks/pulsechain/token_price"
      }/${id}${isPool ? "?include=dex" : ""}`;
      const response = await axios.get(url);

      const price = isPool
        ? response.data?.data?.attributes?.base_token_price_usd
        : isRatio
        ? response.data?.data?.attributes?.base_token_price_native_currency
        : response.data?.data?.attributes?.token_prices?.[id];

      setPrices((prev) => ({
        ...prev,
        [key]: price ? parseFloat(price).toFixed(9) : null,
      }));
      console.log(`Price fetched for ${key}: ${price}`);
    } catch (err) {
      setError(`Failed to fetch ${key}`);
      console.error(err);
    } finally {
      setPriceLoading(false);
    }
  };

  useEffect(() => {
    tokens.forEach(fetchPrice);
  }, []);

  return (
    <PriceContext.Provider value={{ ...prices, priceLoading, error }}>
      {children}
    </PriceContext.Provider>
  );
};

PriceProvider.propTypes = { children: PropTypes.node.isRequired };
export { PriceContext, PriceProvider };
