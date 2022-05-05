import WeatherCapital from "./WeatherCapital";

const Country = ({ name, capital, capitalCords, area, languages }) => {
  return (
    <article>
      <h1>{name}</h1>

      <p>capital {capital}</p>
      <p>area {area}</p>

      <p>
        <b>languages:</b>
      </p>

      <ul>
        {Object.entries(languages).map(language => (
          <li key={language[1]}>{language[1]}</li>
        ))}
      </ul>

      <WeatherCapital capital={capital} capitalCords={capitalCords} />
    </article>
  );
};

export default Country;
