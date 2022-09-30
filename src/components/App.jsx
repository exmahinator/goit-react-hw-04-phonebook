import React, { useState, useEffect } from 'react';
import PhoneBook from './contactList';
import HandleForm from './handleForm';
import FilterContacts from './filterContacts';

const App = () => {
  const [contacts, setContacts] = useState(() => {
    const savedContacts = localStorage.getItem('contacts');
    const parsedContacts = JSON.parse(savedContacts);
    return (
      parsedContacts || [
        { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
        { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
        { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
        { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
      ]
    );
  });

  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const formSubmitHandler = contact => {
    setContacts([contact, ...contacts]);
  };

  const changeFilter = event => {
    const { value } = event.target;
    setFilter(value);
  };

  const getVisibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    return filter
      ? contacts.filter(contact =>
          contact.name.toLowerCase().includes(normalizedFilter)
        )
      : contacts;
  };

  const deleteContact = id => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  return (
    <>
      <HandleForm contacts={contacts} onSubmit={formSubmitHandler} />
      <FilterContacts value={filter} onChange={changeFilter} />
      <PhoneBook
        contacts={getVisibleContacts}
        onContactDelete={deleteContact}
      />
    </>
  );
};

export default App;

// -------------------------------------------------------------------------------------------------------------------------------------------

// import React, { Component } from 'react';
// import PhoneBook from './contactList';
// import HandleForm from './handleForm';
// import FilterContacts from './filterContacts';

// class App extends Component {
//   state = {
//     // contacts: [],
//     contacts: [
//       { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
//       { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
//       { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
//       { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
//     ],
//     filter: '',
//   };

//   componentDidMount() {
//     const savedContacts = localStorage.getItem('contacts');
//     const parsedContacts = JSON.parse(savedContacts);

//     if (Array.isArray(parsedContacts) && parsedContacts.length) {
//       this.setState({
//         contacts: parsedContacts,
//       });
//     }
//   }

//   formSubmitHandler = contact => {
//     this.setState(({ contacts }) => {
//       const newContacts = [contact, ...contacts];
//       localStorage.setItem('contacts', JSON.stringify(newContacts));

//       return {
//         contacts: newContacts,
//       };
//     });
//   };

//   changeFilter = event => {
//     const { value } = event.target;
//     this.setState({ filter: value });
//   };

//   getVisibleContacts = (contacts, filter) => {
//     const normalizedFilter = filter.toLowerCase();
//     return contacts.filter(contact =>
//       contact.name.toLowerCase().includes(normalizedFilter)
//     );
//   };

//   deleteContact = id => {
//     this.setState(prevState => {
//       const newContacts = prevState.contacts.filter(
//         contact => contact.id !== id
//       );
//       localStorage.setItem('contacts', JSON.stringify(newContacts));

//       return {
//         contacts: newContacts,
//       };
//     });
//   };

//   render() {
//     const { contacts, filter } = this.state;
//     const visibleContacts = this.getVisibleContacts(contacts, filter);

//     return (
//       <>
//         <HandleForm contacts={contacts} onSubmit={this.formSubmitHandler} />
//         <FilterContacts value={filter} onChange={this.changeFilter} />
//         <PhoneBook
//           contacts={visibleContacts}
//           onContactDelete={this.deleteContact}
//         />
//       </>
//     );
//   }
// }

// export default App;
