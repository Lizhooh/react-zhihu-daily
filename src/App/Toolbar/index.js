import './css/style.css';
import React, { Component, PropTypes } from 'react';

export default class Toolbar extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    static defaultProps = {
        onLeftButton: null,
        onRightButton: null,
        title: '首页',
        iconName: '',
        iconSize: 35,
    };

    static propTypes = {
        onLeftButton: PropTypes.func,
        onRightButton: PropTypes.func,
        title: PropTypes.string,
        iconName: PropTypes.string,
        iconSize: PropTypes.number,
    };

    render() {

        // <i className="fa fa-plus"></i>
        // <i className="fa fa-thumbs-up"></i>

        return (
            <div className="toolbar-contanier" style={this.props.style}>
                <div className="left">
                    <div className="left-button" onClick={this.props.onLeftButton}>
                        <i
                            className={`icon ${this.props.iconName}`}
                            style={{ fontSize: this.props.iconSize }}
                            onClick={this.props.onLeftButton}
                            />
                    </div>
                    <span className="title">{this.props.title}</span>
                </div>
                <div className="right">
                    <div className="right-button" onClick={this.props.onRightButton}>

                    </div>
                </div>
            </div>
        );
    }
}
