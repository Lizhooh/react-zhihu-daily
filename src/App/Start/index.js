import './css/style.css';
import React, { Component, PropTypes } from 'react';

export default class Slide extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    static defaultProps = {
        dataSource: { text: '', img: '' },
    };

    static propTypes = {
        dataSource: PropTypes.object
    };

    render() {
        return (
            !this.props.hide &&
            <div className="start-container">
                <img className="img" src={this.props.dataSource.img} alt="" />
                <div className="logo">知乎日报</div>
                <div className="text">{this.props.dataSource.text}</div>
            </div>
        );
    }
}