import React from 'react';
import './css/popup.css';

export default (props) => (
    <div
        className="popup-contanier"
        onClick={event => {
            props.router.push(`/themes/${props.params.id}`);
        }}
        >
        <div className="popup">
            <ul>
                <li>夜间模式</li>
                <li>设置选择</li>
                <li>关于</li>
            </ul>
        </div>
    </div>
);