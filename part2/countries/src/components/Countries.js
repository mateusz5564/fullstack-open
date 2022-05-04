import CountryItem from "./CountryItem";

const Countries = ({ countries }) => {
  return (
    <section>
      {countries.map(country => (
        <CountryItem key={country.name.common} country={country} />
      ))}
    </section>
  );
};

export default Countries;
