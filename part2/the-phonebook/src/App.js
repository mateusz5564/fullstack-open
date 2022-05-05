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

  const clearForm = () => {
    setNewName("");
    setNewNumber("");
  };

  const updatePerson = existingPerson => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personsService.update({ ...existingPerson, number: newNumber }).then(updatedPerson => {
        const personIndex = persons.findIndex(person => person.id === updatedPerson.id);
        const updatedPersons = [...persons];
        updatedPersons[personIndex] = updatedPerson;
        clearForm();
        setPersons(updatedPersons);
      });
    }
  };

  const addPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personsService.create(newPerson).then(person => {
      clearForm();
      setPersons(persons.concat(person));
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!newName || !newNumber) {
      alert("Insert name and number");
      return;
    }

    const existingPerson = persons.find(
      person => person.name.toLocaleLowerCase() === newName.toLocaleLowerCase()
    );

    if (existingPerson) {
      updatePerson(existingPerson);
    } else {
      addPerson();
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
        onSubmit={handleSubmit}
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
