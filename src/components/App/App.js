import React, { Component } from 'react';
import axios from "axios";
import { v4 as uuidv4 } from 'uuid';
import { ToastContainer } from 'react-toastify';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css'

//import s from './App.module.css';

import Container from '../Container';

import Modal from '../Modal';
import Loader from '../Loader';
import Searchbar from '../Searchbar';
import ImageGallery from '../ImageGallery';

class App extends Component {

  state = {
    searchName: '',
    images: null,
    showModal: false,
    selectedImage:null
  }

  toggleModal = () => this.setState({ selectedImage: null });

  handleSearchSubmit = searchName => {
    this.setState({ searchName });
  }

  handleSelectImage = imageUrl => {
    console.log(imageUrl);
    this.setState({ selectedImage: imageUrl })
  }

  render() {
    const { searchName, selectedImage  } = this.state;
    
    return (
      <Container>
        <div>
          <Searchbar onSubmit={this.handleSearchSubmit} />
          {/* <ToastContainer autoClose={3000} /> */}
          <Toaster/>
          <ImageGallery searchName={searchName} onSelect={this.handleSelectImage}/>
          {selectedImage && <Modal onClose = {this.toggleModal}>
            <img src={selectedImage} alt="" />
          </Modal>}
        </div>
      </Container>
    );
  }
}

export default App;
