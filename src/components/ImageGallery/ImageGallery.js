import React, { Component } from 'react';
import toast from 'react-hot-toast';
import PropTypes from 'prop-types';

import ImageGalleryItem from '../ImageGalleryItem';
import LoadMoreButton from '../Button';
import SpinnerLoader from '../Loader';

import { fetchImages } from '../../services/images-api';
import {List} from './ImageGallery.styled.jsx'

export default class ImageGallery extends Component {

    state = {
        images: null,
        error: null,
        page: 1,
        searchResult: null,
        status: 'idle'
    }

    componentDidUpdate(prevProps, prevState) {
        const prevName = prevProps.searchName;
        const nextName = this.props.searchName;
        const prevPage = prevState.page;
        const nextPage = this.state.page;
        const images = this.state.images;

        if (prevPage < nextPage) {
            this.setState({ status: 'pending'});
            fetchImages(nextName, nextPage)
            .then((data) => {
                let newImages = [...images, ...data.hits];
                this.setState({ images:newImages, status: 'resolved' });
                console.log(this.state.images);
            })
            .catch (error => this.setState({ error, status: 'rejected' }))
        }

        if (prevName !== nextName) {
            this.setState({ status: 'pending', page:1 });
            fetchImages(nextName, nextPage)
                .then((data) => {
                    console.log(data.hits);
                this.setState({ images: data.hits, searchResult: data.total, status: 'resolved' });
                console.log(this.state.images);
                if (this.state.images.length === 0) {
                    // this.setState({ status: 'rejected' });
                    return toast('Извините, по вашему запросу ничего не найдено', {style: {
                                borderRadius: '10px',
                                background: '#333',
                                color: '#fff',
                    },});
                }
            })
            .catch (error => this.setState({ error, status: 'rejected' }))
        }
    }

    toggleLoadMore = () => {
        this.setState({ status: 'pending', page: this.state.page + 1 });
        this.scrollTo();
    }

    scrollTo() {
        window.scroll({
            top: 1000,
            behavior: 'smooth',
        });
    }

    // const { height: cardHeight } = document
    //             .querySelector('.gallery')
    //         .firstElementChild.getBoundingClientRect();
    //     window.scrollBy({
    //                 top: cardHeight*2,
    //                 behavior: 'smooth',
    //             });
        
    render() {
        const { images, status, searchResult } = this.state;

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
                    <List >
                        {images.map(image=> (
                            <ImageGalleryItem src={image.webformatURL} alt={image.tags} onClick={() => this.props.onSelect(image.largeImageURL)} key={image.id}/>
                        ))}
                    </List>
                    {searchResult>12 && <LoadMoreButton onClick={this.toggleLoadMore} />}
               </div>
            )
        }
    }
}

ImageGallery.propTypes = {
    onSubmit: PropTypes.func,
    onSelect: PropTypes.func,
    searchName: PropTypes.string.isRequired,
};

