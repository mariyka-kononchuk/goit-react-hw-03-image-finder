import React, { Component } from 'react';
import PropTypes, { string } from 'prop-types';
import IconButton from '../IconButton/IconButton';
import { ReactComponent as SearchIcon } from '../../icons/search.svg';
//import { toast } from 'react-toastify';
import toast from 'react-hot-toast';

//import s from './ContactList.module.css';

export default class Searchbar extends Component {
    state = {
        searchName: '',
    };

    handleNameChange = e => {
        this.setState({ searchName: e.currentTarget.value.toLowerCase() })
    }

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.searchName.trim() === '') {
            // return toast.error('Введите слово в поиск');
            return toast('Введите слово в поиск', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                }
            });
        }
        this.props.onSubmit(this.state.searchName);
        //this.props.onSubmit(this.state.searchName);
        this.setState({ searchName: '' });
    }

    render() {
        return (
            <header className="Searchbar">
                <form className="SearchForm" onSubmit={this.handleSubmit}>
                    <button type="submit" className="SearchForm-button">
                        <span className="SearchForm-button-label">Search</span>
                    </button>
                    <input
                        className="SearchForm-input"
                        type="text"
                        name="searchName"
                        value={this.state.searchName}
                        onChange = {this.handleNameChange}
                        autocomplete="off"
                        autofocus
                        placeholder="Search images and photos"
                    />
                    {/* <IconButton type = "submit" onClick={this.props.onSubmit} aria-label="Search images">
                        <SearchIcon width="40" height="40" fill="black" />
                    </IconButton> */}
                </form>
            </header>
        )
    }
}

   


// Searchbar.propTypes = {
//     contacts: PropTypes.arrayOf(
//         PropTypes.shape({
//             id: PropTypes.string.isRequired,
//         })
//     ),
//     onDeleteContact:PropTypes.func.isRequired
// };

