import React, { Component }  from 'react';
import PropTypes from 'prop-types';
//import s from './ContactList.module.css';
import ImageGalleryItem from '../ImageGalleryItem';
import LoadMoreButton from '../Button';
import SpinnerLoader from '../Loader';
//import { toast } from 'react-toastify';
import toast from 'react-hot-toast';
import {fetchImages} from '../../services/images-api'


// const baseUrl = "https://pixabay.com/api/";
// axios.defaults.baseURL = baseUrl;
// const apiKey = "22651538-53630abe578d2561aeb41817a";

export default class ImageGallery extends Component {
    state = {
        images: null,
        // loading: false,
        error: null,
        page:1,
        status: 'idle'
  }

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.searchName;
        const nextName = this.props.searchName;
        const prevPage = prevState.page;
        const nextPage = this.state.page;

        if (prevPage < nextPage) {
            //fetch
            this.setState({ status: 'pending'});
            fetchImages(nextName, nextPage)
                .then((images) => {
                let result = [...this.state.images, ...images.hits];
                this.setState({ images:result, status: 'resolved' });
                    //this.setState({ images: images.hits, status: 'resolved' });
                    console.log(this.state.images);})
                        
            .catch (error => this.setState({ error, status: 'rejected' }))
        }

        if (prevName !== nextName) {
            this.setState({ status: 'pending', page:1 });
            fetchImages(nextName, this.state.page)
            .then((images) => {
                    this.setState({ images: images.hits, status: 'resolved' });
                    console.log(this.state.images);})
                        
            .catch (error => this.setState({ error, status: 'rejected' }))
        } 
        // setTimeout( ()=> {if (this.state.images.length === 0) {
        //     return toast('Извините, по вашему запросу ничего не найдено')
        // }}, 2000);
    }

    toggleLoadMore = () => {
        this.setState({ status: 'pending', page: this.state.page + 1 });
        
//         setTimeout( ()=> fetchImages(this.props.searchName, this.state.page)
//             .then((images) => {
                
//                 let result = [...this.state.images, ...images.hits];
//                 this.setState({ images:result, status: 'resolved' });
//                 console.log(this.state.images);})
                        
//             .catch(error => this.setState({ error, status: 'rejected' })), 2000)
        
//         window.scrollTo({
//   top: document.documentElement.scrollHeight,
//   behavior: 'smooth',
// });
    }
            
      
    render() {
        const { images, status } = this.state;

        if (status === 'idle') {
            return <div></div>
        }

        if (status === 'pending') {
            return <SpinnerLoader />
        }

        if (status === 'rejected') {
            return toast('Извините, по вашему запросу ничего не найдено', {style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                            },
            });
        }

        if (status === 'resolved') {
            return (
                <div>
                    <ul className="GalleryList" >
                        {images.map(image=> (
                            <li onClick={()=>this.props.onSelect(image.pageURL) } className="ImageGalleryItem" key={image.previewURL} >
                                <ImageGalleryItem src={image.previewURL} alt={image.tags}/>
                            </li>
                        ))}
                    </ul>
                    <LoadMoreButton onClick={this.toggleLoadMore} />
                    
               </div>
            )
        }
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

