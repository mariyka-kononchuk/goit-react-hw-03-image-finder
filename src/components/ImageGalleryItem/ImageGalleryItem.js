import React from 'react';
import PropTypes from 'prop-types';
//import s from './ContactListItem.module.css';

const ImageGalleryItem = ({ src, alt}) => (
    <img src={src} alt={alt} className="ImageGalleryItem-image" />
)

// ImageGalleryItem.propTypes = {
//   contacts: PropTypes.shape({
//     id: PropTypes.string.isRequired,
//     name: PropTypes.string.isRequired,
//     number: PropTypes.string.isRequired
//   }),
//     onDeleteContact:PropTypes.func.isRequired
// };

export default ImageGalleryItem;