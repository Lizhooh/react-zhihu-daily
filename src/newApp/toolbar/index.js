import './css/style.css';
import React from 'react';

export default ({
    title         = '首页',
    iconLeftName  = '',
    iconRightName = '',
    iconSize      = 25,
    style         = null,
    onLeftButton  = _ => { },
    onRightButton = _ => { },
}) => (
    <div className="toolbar-contanier" style={style}>
        <div className="left">
            <div className="left-button" onClick={onLeftButton}>
                <i
                    className="material-icons"
                    style={{ fontSize: iconSize }}
                    >
                    {iconLeftName}
                </i>
            </div>
            <span className="title">{title}</span>
        </div>
        <div className="right">
            <div className="right-button" onClick={onRightButton}>
                <i
                    className="material-icons"
                    style={{ fontSize: iconSize }}
                    >
                    {iconRightName}
                </i>
            </div>
        </div>
    </div>
);
