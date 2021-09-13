import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
//import s from './ContactList.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import SpinnerLoader from '../Loader';
import { toast } from 'react-toastify';


const baseUrl = "https://pixabay.com/api/";
axios.defaults.baseURL = baseUrl;
const apiKey = "22651538-53630abe578d2561aeb41817a";

export default class ImageGallery extends Component {
    state = {
        images: null,
        // loading: false,
        error:null,
        status: 'idle'
  }

    async componentDidUpdate(prevProps, prevState) {
        
        const prevName = prevProps.searchName;
        const nextName = this.props.searchName;

        if (prevName !== nextName) {
            this.setState({ status: 'pending' });
            let queryParams = `?key=${apiKey}&q=${nextName}&image_type=photo&per_page=12&page=1&orientation=horizontal&safesearch=true`;
            let url = baseUrl + queryParams;

            //fetch
               await fetch(url)
                    .then(response => {
                        if (response.ok) {
                            return response.json();
                        }
                        return Promise.reject(
                            new Error('Извините, по вашему запросу ничего не найдено'),
                        );
                    })
                    .then(images =>
                        this.setState({images: images.hits, status: 'resolved'}))
                    .catch(error => this.setState({ error, status: 'rejected' }))
            
                // if (this.state.images.length === 0) {
                //     // this.setState({ status: 'rejected' });
                //     return toast.error('Извините, по вашему запросу ничего не найдено');
                // }
            };
           
            // if (this.state.images.length === 0) {
            //     return toast.error('Извините, по вашему запросу ничего не найдено');
            // }
        
    }
            
            // axios  
            // try {
            //     const response = await axios.get(url);
            //     const images = response.data.hits;
            //     console.log(images);
            //     this.setState({ images, status: 'resolved' });
            // } catch (error) {
            //     this.setState({ status: 'rejecting' });
            //     throw error;
            // }
            // if (this.state.images.length === 0) {
            //     return toast.error('Извините, по вашему запросу ничего не найдено');
            // }
        
    render() {
        const { images, status } = this.state;

        if (status === 'idle') {
            return <div>Введите слово для поиска</div>
        }

        if (status === 'pending') {
            <SpinnerLoader />
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

