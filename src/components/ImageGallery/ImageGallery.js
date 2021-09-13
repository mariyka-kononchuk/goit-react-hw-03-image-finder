import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
//import s from './ContactList.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import LoadMoreButton from '../Button';
import SpinnerLoader from '../Loader';
import { toast } from 'react-toastify';
import {fetchImages} from '../../services/images-api'


// const baseUrl = "https://pixabay.com/api/";
// axios.defaults.baseURL = baseUrl;
// const apiKey = "22651538-53630abe578d2561aeb41817a";

export default class ImageGallery extends Component {
    state = {
        images: null,
        // loading: false,
        error:null,
        status: 'idle'
  }

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.searchName;
        const nextName = this.props.searchName;

        if (prevName !== nextName) {
            this.setState({ status: 'pending' });
            fetchImages(nextName)
            .then((images) => {
                    this.setState({ images: images.hits, status: 'resolved' });
                    console.log(this.state.images);})
                        
            .catch (error => this.setState({ error, status: 'rejected' }))
        } 
        // setTimeout( ()=> {if (this.state.images.length === 0) {
        //     return toast.error('Извините, по вашему запросу ничего не найдено')
        // }}, 2000);
    }

    toggleLoadMore() {
        
    }
            
      
    render() {
        const { images, status } = this.state;

        if (status === 'idle') {
            return <div>Введите слово для поиска</div>
        }

        if (status === 'pending') {
            return <SpinnerLoader />
        }

        if (status === 'rejected') {
            return toast.error('Извините, по вашему запросу ничего не найдено');
        }

        if (status === 'resolved') {
            return (
                <div>
                    <ul className="GalleryList" >
                        {images.map(image=> (
                            <li className="ImageGalleryItem" key={image.id}  >
                                <ImageGalleryItem src={image.previewURL} alt={image.tags} />
                            </li>
                        ))}
                    </ul>
                    <LoadMoreButton onClick ={this.toggleLoadMore} />
               </div>
            )
        }

        // return (
        //     <div>
        //         {loading && <h1>Loading...</h1>}
        //         {!searchName && <div>Введите слово для поиска</div>}
        //         {this.state.images &&
        //             <ul className="GalleryList" >
        //                 {images.map(image=> (
        //                     <li className="ImageGalleryItem" key={image.id}  >
        //                         <ImageGalleryItem src={image.previewURL} alt={image.tags} />
        //                     </li>
        //                 ))}
        //             </ul>}
        //             <p>{searchName}</p>
        //     </div>
    
        // )
    }
}


// ImageGallery.propTypes = {
//     contacts: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//         })
//     ),
//     onDeleteContact:PropTypes.func.isRequired
// };

