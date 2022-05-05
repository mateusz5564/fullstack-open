const Persons = ({ persons }) => {
  return (
    <>
      {persons.map(person => (
        <p key={person.number}>
          {person.name} {person.number}
        </p>
      ))}
    </>
  );
};

export default Persons;
