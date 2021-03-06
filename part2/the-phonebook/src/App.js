import { useState, useEffect } from "react";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Persons from "./components/Persons";
import Notification from "./components/Notification";
import personsService from "./services/persons";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);

  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [nameSearch, setNameSearch] = useState("");
  const [notification, setNotification] = useState({ type: "success", message: "" });

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

  const addPerson = () => {
    const newPerson = {
      name: newName,
      number: newNumber,
    };

    personsService
      .create(newPerson)
      .then(person => {
        clearForm();
        setPersons(persons.concat(person));
        setNotification({ type: "success", message: `Added ${person.name}` });
      })
      .catch(err => {
        setNotification({ type: "error", message: err.response.data.error });
      });
  };

  const updatePerson = existingPerson => {
    if (
      window.confirm(
        `${newName} is already added to phonebook, replace the old number with a new one?`
      )
    ) {
      personsService
        .update({ ...existingPerson, number: newNumber })
        .then(updatedPerson => {
          const personIndex = persons.findIndex(person => person.id === updatedPerson.id);
          const updatedPersons = [...persons];
          updatedPersons[personIndex] = updatedPerson;
          clearForm();
          setPersons(updatedPersons);
          setNotification({ type: "success", message: `${updatedPerson.name}'s number updated` });
        })
        .catch(err => {
          setNotification({ type: "error", message: err.response.data.error });
        });
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!newName || !newNumber) {
      alert("Insert name and number");
      return;
    }

    personsService.getByName(newName).then(existingPerson => {
      if (existingPerson.length) {
        updatePerson(existingPerson[0]);
      } else {
        addPerson();
      }
    });
  };

  const deletePerson = person => {
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personsService
        .remove(person.id)
        .then(res => {
          if (res.status === 204) {
            setPersons(persons.filter(el => el.id !== person.id));
          }
        })
        .catch(err => {
          if (err.response.status === 404) {
            setNotification({
              type: "error",
              message: `Information of ${person.name} has already been removed from server`,
            });
            setPersons(persons.filter(el => el.id !== person.id));
          }
        });
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {notification.message ? (
        <Notification
          type={notification.type}
          reset={() => setNotification({ ...notification, message: "" })}
        >
          {notification.message}
        </Notification>
      ) : null}
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
