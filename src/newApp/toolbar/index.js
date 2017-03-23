import './css/style.css';
import React from 'react';

export default ({
    title         = '首页',
    iconName      = '',
    iconSize      = 25,
    style         = null,
    onLeftButton  = _ => { },
    onRightButton = _ => { },
}) => (
    <div className="toolbar-contanier" style={style}>
        <div className="left">
            <div className="left-button" onClick={onLeftButton}>
                <i
                    className={`icon ${iconName}`}
                    style={{ fontSize: iconSize }}
                    />
            </div>
            <span className="title">{title}</span>
        </div>
        <div className="right">
            <div className="right-button" onClick={onRightButton}>

            </div>
        </div>
    </div>
);
