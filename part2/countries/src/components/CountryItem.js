import { useState } from "react";
import Country from "./Country";

const CountryItem = ({ country }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleClick = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div key={country.name.common}>
      {country.name.common} <button onClick={handleClick}>{showInfo ? "hide" : "show"}</button>
      {showInfo && (
        <Country
          name={country.name.common}
          capital={country.capital[0]}
          area={country.area}
          languages={country.languages}
        />
      )}
    </div>
  );
};

export default CountryItem;
