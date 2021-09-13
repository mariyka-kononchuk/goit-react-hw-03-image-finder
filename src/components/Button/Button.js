import React from 'react';
import PropTypes from 'prop-types';


const Button = ({ toggleLoadMore}) => (
    <button type="button" onClick ={toggleLoadMore}>Load More</button>
)

export default Button;