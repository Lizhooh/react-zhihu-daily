import './css/style.css';
import React, { Component, PropTypes } from 'react';

export default class Drawer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            show: this.props.drawerShow,
            open: this.props.drawerShow,
            menuActive: 'menu-active',
        };
    };

    static defaultProps = {
        drawerSize: '70%',
        drawerMaxSize: 320,
        drawerShow: false,
        drawerAnimatedTime: 450,
        drawerPosition: 'left',
        drawerColor: '#fff',
        drawerShadeColor: 'rgba(1, 1, 1, 0.35)',
        drawerZindex: 10000,
    };

    static propTypes = {
        drawerSize: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        drawerMaxSize: PropTypes.oneOfType([
            PropTypes.number,
            PropTypes.string,
        ]),
        drawerShow: PropTypes.bool,
        drawerAnimatedTime: PropTypes.number,
        drawerPosition: PropTypes.string,
        drawerColor: PropTypes.string,
        drawerShadeColor: PropTypes.string,
        drawerZindex: PropTypes.number,
    };

    openDrawer = (event) => {
        if (this.state.show) return;
        this.setState({
            show: true,
        });
    };

    closeDrawer = (event, force = false) => {
        if (force !== true && event.target && event.target !== event.currentTarget) {
            return;
        }

        this.setState({
            open: false,
        });
    };

    componentDidUpdate(prevProps, prevState) {
        if (this.state.show === true && prevState.open === false) {
            setTimeout(_ => {
                this.setState({
                    open: true,
                });
            }, 50);
            return;
        }

        if (this.state.show === true && this.state.open === false) {
            setTimeout(_ => {
                this.setState({
                    show: false,
                });
            }, this.props.drawerAnimatedTime * 1 + 20);
            return;
        }
    }

    get ContanierStyle() {
        let style = {
            display: this.state.show ? 'flex' : 'none',
            zIndex: this.props.drawerZindex,
            transition: `all ${this.props.drawerAnimatedTime}ms ease-in-out`,
            backgroundColor: this.state.open ? this.props.drawerShadeColor : '',
        };

        const position = this.props.drawerPosition;

        if (position === 'right') {
            style.alignItems = 'flex-end';
        }
        if (position === 'bottom') {
            style.justifyContent = 'flex-end';
        }

        return style;
    };

    get MenuStyle() {
        let style = {
            backgroundColor: this.props.drawerColor || null,
            transition: `all ${this.props.drawerAnimatedTime}ms ease-in-out`,
        };

        const position = this.props.drawerPosition;

        if (position === 'left' || position === 'right') {
            style.width = this.props.drawerSize;
            style.maxWidth = this.props.drawerMaxSize;
            style.height = '100%';
            style.transform = position === 'left' ? 'translate(-101%, 0%)' : 'translate(101%, 0%)';
        }
        if (position === 'top' || position === 'bottom') {
            style.width = '100%';
            style.height = this.props.drawerSize;
            style.maxHeight = this.props.drawerMaxSize;
            style.transform = position === 'top' ? 'translate(0%, -101%)' : 'translate(0%, 101%)';
        }

        return style;
    };

    render() {
        return (
            <div
                style={this.ContanierStyle}
                className={'drawer-contanier'}
                onClick={this.closeDrawer}
                >
                {
                    this.state.show &&
                    <div
                        style={this.MenuStyle}
                        className={`menu ${this.state.open ? this.state.menuActive : ''}`}>
                        {this.props.children}
                    </div>
                }
            </div>
        );
    }
}

