import React from 'react';
import './css/style.css';

export default (props) => {

    return (
        <div
            className="start-contanier"
            style={{ background: `url(${props.url}) center center` }}
            >
            <div className="logo">
                <img src={require("./css/C_.png")} alt=''/>
                知乎日报
            </div>
        </div>
    )
}