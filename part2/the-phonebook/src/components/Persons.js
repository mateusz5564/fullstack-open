const Persons = ({ persons, onDelete }) => {
  return (
    <>
      {persons.map(person => (
        <p key={person.number}>
          {person.name} {person.number}
          <button onClick={() => onDelete(person)}>delete</button>
        </p>
      ))}
    </>
  );
};

export default Persons;
