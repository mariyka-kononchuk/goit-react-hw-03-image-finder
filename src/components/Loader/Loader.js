import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import React from 'react';


const SpinnerLoader = () => (
    // <Loader
    //     type="Puff"
    //     color="#00BFFF"
    //     height={100}
    //     width={100}
    //     timeout={3000} //3 secs
    // />
    <Loader className="Loader" type="BallTriangle" color="#00BFFF" height={80} width={80} />
)

export default SpinnerLoader;
