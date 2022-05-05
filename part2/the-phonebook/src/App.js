import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameSearch, setNameSearch] = useState("");

  useEffect(() => {
    personsService.getAll().then(persons => {
      setPersons(persons);
    });
  }, []);

  const getPersonsByName = () => {
    return persons.filter(person =>
      person.name.toLocaleLowerCase().startsWith(nameSearch.toLocaleLowerCase())
    );
  };

  const personsToShow = nameSearch.length > 0 ? getPersonsByName() : persons;

  const addPerson = e => {
    e.preventDefault();

    if (persons.some(person => person.name === newName)) {
      alert(`${newName} is already added to phonebook`);
      return;
    }

    if (newName && newNumber) {
      const newPerson = {
        name: newName,
        number: newNumber,
      };

      personsService.create(newPerson).then(person => {
        setPersons(persons.concat(person));
        setNewName("");
        setNewNumber("");
      });
    } else {
      alert("Insert name and number");
    }
  };

  const deletePerson = person => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personsService.remove(person.id).then(res => {
        if (res.status === 200) {
          setPersons(persons.filter(el => el.id !== person.id));
        }
      });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter nameSearch={nameSearch} setNameSearch={setNameSearch} />

      <h2>add a new</h2>
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        setNewName={setNewName}
        newNumber={newNumber}
        setNewNumber={setNewNumber}
      />

      <h2>Numbers</h2>
      <Persons persons={personsToShow} onDelete={deletePerson} />
    </div>
  );
};

export default App;
