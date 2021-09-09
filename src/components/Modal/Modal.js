import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';
//import ImageGalleryItem from '../ImageGalleryItem';

const Modal = ({ src, alt }) => (
    <div className="Overlay">
    <div className="Modal">
        <img src={src} alt={alt} />
    </div>
    </div>
)

// ImageGallery.propTypes = {
//     contacts: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//         })
//     ),
//     onDeleteContact:PropTypes.func.isRequired
// };

export default Modal;