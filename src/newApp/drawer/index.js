import './css/style.css';
import React from 'react';

export default ({
    drawerSize          = '70%',
    drawerMaxSize       = 320,
    drawerAnimatedTime  = 450,
    drawerPosition      = 'left',
    drawerColor         = '#fff',
    drawerShadeColor    = 'rgba(1, 1, 1, 0.35)',
    drawerZindex        = 1000,
    drawerOnClickModel  = () => { },
    open                = false,
    show                = false,
    active              = 0,
    children            = null,
}) => {

    const ContanierStyle = () => {
        let style = {
            display: show ? 'flex' : 'none',
            zIndex: drawerZindex,
            transition: `all ${drawerAnimatedTime}ms ease-in-out`,
            backgroundColor: open ? drawerShadeColor : '',
        };

        const position = drawerPosition;

        if (position === 'right') {
            style.alignItems = 'flex-end';
        }
        if (position === 'bottom') {
            style.justifyContent = 'flex-end';
        }

        return style;
    };

    const MenuStyle = () => {
        let style = {
            backgroundColor: drawerColor || null,
            transition: `all ${drawerAnimatedTime}ms ease-in-out`,
        };

        const position = drawerPosition;

        if (position === 'left' || position === 'right') {
            style.width = drawerSize;
            style.maxWidth = drawerMaxSize;
            style.height = '100%';
            style.transform = position === 'left' ? 'translate(-101%, 0%)' : 'translate(101%, 0%)';
        }
        if (position === 'top' || position === 'bottom') {
            style.width = '100%';
            style.height = drawerSize;
            style.maxHeight = drawerMaxSize;
            style.transform = position === 'top' ? 'translate(0%, -101%)' : 'translate(0%, 101%)';
        }

        return style;
    };

    return (
        <div
            style={ContanierStyle()}
            className={'drawer-contanier'}
            onClick={event => {
                if (event.target && event.target !== event.currentTarget) {
                    return;
                }
                drawerOnClickModel();
            } }
            >
            {
                <div
                    style={MenuStyle()}
                    className={`menu ${open ? 'menu-active' : ''}`}>
                    {children}
                </div>
            }
        </div>
    );

}

