import './css/style.css';
import React from 'react';

export default ({
    title           = '',
    iconLeftName    = '',
    iconRightName   = '',
    iconSize        = 25,
    style           = null,
    onLeftButton    = _ => { },
    onRightButton   = _ => { },
}) => {

    iconRightName = Array.isArray(iconRightName) ? iconRightName : [{ name: iconRightName }];

    return (
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
                <div className="right-button">
                    {
                        iconRightName.map((i, index) => (
                            <span
                                key={`icon-right-${index}`}
                                onClick={(event) => onRightButton(event, index)}
                                >
                                <i
                                    className="material-icons"
                                    style={{ fontSize: iconSize }}
                                    >
                                    {i.name}
                                </i>
                                <span>{i.text}</span>
                            </span>
                        ))
                    }
                </div>
            </div>
        </div>
    );
}


