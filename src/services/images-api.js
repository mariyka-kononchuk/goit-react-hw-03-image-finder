import axios from "axios";
const baseUrl = "https://pixabay.com/api/";
axios.defaults.baseURL = baseUrl;
const apiKey = "22651538-53630abe578d2561aeb41817a";


export async function fetchImages(name) {
    let queryParams = `?key=${apiKey}&q=${name}&image_type=photo&per_page=12&page=1&orientation=horizontal&safesearch=true`;
    let url = baseUrl + queryParams;
    return await fetch(url)
                .then(response => {
                    if (response.ok) {
                        return response.json();
                    }
                    return Promise.reject(
                        new Error('Извините, по вашему запросу ничего не найдено'),
                    );
                })
                
    // axios  
            // try {
            //     const response = await axios.get(url);
            //     const images = response.data.hits;
            //     console.log(images);
            //     this.setState({ images, status: 'resolved' });
            // } catch (error) {
            //     this.setState({ status: 'rejecting' });
            //     throw error;
            // }
            // if (this.state.images.length === 0) {
            //     return toast.error('Извините, по вашему запросу ничего не найдено');
            // }
}