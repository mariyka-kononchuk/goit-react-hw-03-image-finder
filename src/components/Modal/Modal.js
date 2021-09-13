import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import '../../styles.css';
//import s from './ContactList.module.css';
//import ImageGalleryItem from '../ImageGalleryItem';
const modalRoot = document.querySelector('#modal-root');

class Modal extends Component  {
    
    componentDidMount() {
        console.log('Modal componentDidMount');
        window.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        console.log('Modal componentWillUnmount');
        window.removeEventListener('keydown', this.handleKeyDown);
    }

    handleKeyDown = e => {
        if (e.code === 'Escape') {
            this.props.onClose();
        }
    }

    handleBackdropClick = e => {
        if (e.currentTarget === e.target) {
            this.props.onClose();
        }
    }

    render() {
        return createPortal(

            <div className="Overlay" onClick={this.handleBackdropClick}>
                <div className="Modal">
                    {this.props.children}
                {/* <img src={src} alt={alt} /> */}
                </div>
            </div>, modalRoot
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

export default Modal;