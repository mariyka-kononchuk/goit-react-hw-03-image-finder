import React, { Component } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

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
    searchName: '',
    images: null,
    filter: '',
    showModal: false,
    loading:false
  }

  // async componentDidMount() {
  //   this.setState({ loading: true });
  //   let queryParams = `?key=${apiKey}&q=${this.state.searchName}&image_type=photo&per_page=12&page=1&orientation=horizontal&safesearch=true`;
  //   let url = baseUrl + queryParams;
  //   const response = await axios.get(url);
  //   const images = response.data.hits;
  //   console.log(images);
  //   // let id = images.id;
  //   // console.log(id);
  //   // let webformatURL = images.previewURL;
  //   // let largeImageURL = images.pageURL;
  //   // записываем в state полученные картинки
  //   this.setState({ images, loading: false });
  //   // this.setState({ loading: false });
  //   }

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

  // getVisibleContacts = () => {
  //   const { images, filter } = this.state;
  //   const normilizedFilter = filter.toLowerCase();
  //   return images.filter(image =>
  //     image.name.toLowerCase().includes(normilizedFilter));
  // }

  toggleModal = () => {
    this.setState(({showModal}) => ({
      showModal: !showModal,
    }))
  }

  handleSearchSubmit = searchName => {
    this.setState({ searchName });
  }
  
  render() {
    const { searchName, showModal, images, loading } = this.state;
    // const visibleContacts = this.getVisibleContacts();
    return (
      <Container>
        <div>
          <Searchbar onSubmit={this.handleSearchSubmit} />
          <ToastContainer autoClose={3000}/>
          <ImageGallery searchName={searchName} />
          <button type="button" onClick ={this.toggleModal}>
          Open modal
          </button>
          {showModal && <Modal onClose = {this.toggleModal}>
            <h1> Hello</h1>
            <img src="" alt="" />
            <button type="button" onClick={this.toggleModal}>Close Modal
            </button>
          </Modal>}
          <div>
            {/* проверяем: если что-то начинает грузиться- будет отрисовываться разметка... */}
            {loading && <h1>Loading...</h1>}
            {/* проверяем: если что-то есть в state в images - будет отрисовываться разметка... */}
            {images && (<div>тут будут картинки</div>)}
          </div>
          {/* <Loader contacts={visibleContacts} /> */}
        </div>
      </Container>
    );
  }
}

export default App;
