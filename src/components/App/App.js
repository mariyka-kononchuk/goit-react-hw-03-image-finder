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
  }

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
        </div>
      </Container>
    );
  }
}

export default App;
