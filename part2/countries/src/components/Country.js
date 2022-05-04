const Country = ({ name, capital, area, languages }) => {
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
    </article>
  );
};

export default Country;
