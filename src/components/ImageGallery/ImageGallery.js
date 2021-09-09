import React from 'react';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';
import ImageGalleryItem from '../ImageGalleryItem';

const ImageGallery = ({ contacts, onDeleteContact }) => (
    <ul className={s.list}>
        {contacts.map((contacts)=> (
            <li className="ImageGalleryItem" key={contacts.id}  >
                 <ImageGalleryItem contacts={contacts} onDeleteContact={onDeleteContact} />
            </li>
        ))}
    </ul>
)

// ImageGallery.propTypes = {
//     contacts: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//         })
//     ),
//     onDeleteContact:PropTypes.func.isRequired
// };

export default ImageGallery;