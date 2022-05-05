import axios from "axios";
import { useState, useEffect } from "react";
import Countries from "./components/Countries";
import Country from "./components/Country";
import CountryForm from "./components/CountryForm";

function App() {
  const [countries, setCountries] = useState([]);
  const [countrySearchField, setCountrySearchField] = useState("");

  const filterCountriesByName = (countries, name) =>
    countries.filter(country => country.name.common.toLowerCase().includes(name.toLowerCase()));

  const countriesToShow = filterCountriesByName(countries, countrySearchField);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then(res => {
      setCountries(res.data);
    });
  }, []);

  const handleCountrySearchField = e => {
    setCountrySearchField(e.target.value);
  };

  return (
    <div>
      <CountryForm countrySearchField={countrySearchField} onChange={handleCountrySearchField} />
      {countriesToShow.length > 10 && countrySearchField && <p>Too many catches, specify another filter</p>}
      {countriesToShow.length === 1 && (
        <Country
          name={countriesToShow[0].name.common}
          capital={countriesToShow[0].capital[0]}
          area={countriesToShow[0].area}
          languages={countriesToShow[0].languages}
          capitalCords={countriesToShow[0].capitalInfo.latlng}
        />
      )}
      {countriesToShow.length <= 10 && countriesToShow.length > 1 && <Countries countries={countriesToShow} />}
    </div>
  );
}

export default App;
