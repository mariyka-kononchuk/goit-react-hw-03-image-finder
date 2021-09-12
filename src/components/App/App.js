import React, { Component } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';

//import s from './App.module.css';

import Container from '../Container';

import Modal from '../Modal';
import Loader from '../Loader';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';

const baseUrl = "https://pixabay.com/api/";
axios.defaults.baseURL = baseUrl;
const apiKey = "22651538-53630abe578d2561aeb41817a";

class App extends Component {

  state = {
    images: [],
    filter: '',
    showModal: false
  }

  componentDidMount() {
      const contacts = localStorage.getItem('contacts');
      const parsedContacts = JSON.parse(contacts);
      if (parsedContacts) {
        this.setState({ contacts: parsedContacts });
      }
    }

    componentDidUpdate(prevPops, prevState) {
      const { contacts} = this.state;
      if (contacts !== prevState.contacts) {
        console.log("Обновилось поле контактов");
        localStorage.setItem('contacts', JSON.stringify(contacts));
      }
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

  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal,
    }))
  }
  
  render() {
    const { filter, showModal } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <div>
          {/* <Searchbar onSubmit={this.submit} />
          <ImageGallery value={filter} onChange={this.changeFilter} /> */}
          <button type="button" onClick ={this.toggleModal}>
          Open modal
          </button>
          {showModal && <Modal onClose = {this.toggleModal}>
            <h1> Hello</h1>
            <img src="" alt="" />
            <button type="button" onClick={this.toggleModal}>Close Modal
            </button>
          </Modal>}
          {/* <Loader contacts={visibleContacts} /> */}
        </div>
      </Container>
    );
  }
}

export default App;
