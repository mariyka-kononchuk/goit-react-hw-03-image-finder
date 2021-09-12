import React, { Component }  from 'react';
import PropTypes from 'prop-types';
import axios from "axios";
//import s from './ContactList.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const baseUrl = "https://pixabay.com/api/";
axios.defaults.baseURL = baseUrl;
const apiKey = "22651538-53630abe578d2561aeb41817a";

export default class ImageGallery extends Component {
    state = {
        images: null,
        loading:false
  }

    async componentDidUpdate(prevProps, prevState) {
        this.setState({ loading: true });
        const prevName = prevProps.searchName;
        const nextName = this.props.searchName;

        if (prevName !== nextName) {
            console.log("изменилось имя покемона");
            let queryParams = `?key=${apiKey}&q=${nextName}&image_type=photo&per_page=12&page=1&orientation=horizontal&safesearch=true`;
            let url = baseUrl + queryParams;
            const response = await  axios.get(url);
            const images = response.data.hits;
            console.log(images);
            this.setState({ images, loading: false});
        }
    }
    render() {
        const { images, loading } = this.state;
        const { searchName } = this.props;
        return (
            <div>
                {loading && <h1>Loading...</h1>}
                {!searchName && <div>Введите слово для поиска</div>}
                {this.state.images &&
                    <ul >
                        {images.map(image=> (
                            <li className="ImageGalleryItem" key={images.id}  >
                                <ImageGalleryItem src={images.previewURL} alt={images.tags } />
                            </li>
                        ))}
                    </ul>}
                    <p>{searchName}</p>
            </div>
    
        )
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

