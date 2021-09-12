import React from 'react';
import PropTypes, { string } from 'prop-types';
import IconButton from '../IconButton/IconButton';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
//import s from './ContactList.module.css';

const Searchbar = ({ onSubmit }) => (
    <header className="Searchbar">
        <form className="SearchForm" onSubmit={onSubmit}>
            <button type="submit" className="SearchForm-button">
                <span className="SearchForm-button-label">Search</span>
            </button>
            <input
                className="SearchForm-input"
                type="text"
                autocomplete="off"
                autofocus
                placeholder="Search images and photos"
            />
            <IconButton onClick={onSubmit}>
                <SearchIcon width="40" height="40" fill = "black"/>
            </IconButton>
        </form>
    </header>
)

// Searchbar.propTypes = {
//     contacts: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//         })
//     ),
//     onDeleteContact:PropTypes.func.isRequired
// };

export default Searchbar;