import React, { Component } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import data from '../../data/contacts.json'
import s from './App.module.css';

import Container from '../Container';

import Modal from '../Modal';
import Loader from '../Loader';
import Searchbar from '../components/Searchbar';
import ImageGallery from '../components/ImageGallery';

const baseUrl = "https://pixabay.com/api/";
axios.defaults.baseURL = baseUrl;
const apiKey = "22651538-53630abe578d2561aeb41817a";

class App extends Component {

  state = {
    images: data,
    filter: ''
  }

  // addContact = ({ name, number }) => {
  //   const { contacts } = this.state;
  //   const contact = {
  //     id: uuidv4(),
  //     name,
  //     number
  //   };
    
  //   if (contacts.find(option => option.name.toLowerCase() === name.toLowerCase())) {
  //     alert(`${name} is already in contacts`);
  //     return;
  //   }
    
  //   this.setState(({ contacts }) => ({
  //     contacts: [contact, ...contacts]
  //   }))
  // }
  
  // deleteContact = contactId => {
  //   this.setState(prevState => ({
  //     contacts:prevState.contacts.filter(contact => contact.id !==contactId),
  //   }))
  // }

  changeFilter = e => {
    this.setState({ filter: e.currentTarget.value });
  }

  getVisibleContacts = () => {
    const { images, filter } = this.state;
    const normilizedFilter = filter.toLowerCase();
    return images.filter(image =>
      image.name.toLowerCase().includes(normilizedFilter));
  }
  
  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <div>
          <Searchbar onAddContact={this.addContact} />
          <ImageGallery value={filter} onChange={this.changeFilter} />
          <Modal contacts={visibleContacts} onDeleteContact={this.deleteContact} />
          <Loader contacts={visibleContacts} onDeleteContact={this.deleteContact} />
        </div>
      </Container>
    );
  }
}

export default App;
