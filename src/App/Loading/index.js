import './css/style.css';
import React, { Component } from 'react';

export default class Loading extends Component {

    constructor(props) {
        super(props);

        this.state = {
            rate: 0,
        };
    }

    componentDidMount() {
        this.timer = setTimeout(_ => {
            this.setState({ rate: this.state.rate + 1 });

        }, 3 * (this.state.rate + 1));
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
    }

    componentDidUpdate() {
        if (this.state.rate >= 99) {
            this.timer && clearTimeout(this.timer);
            return;
        }

        this.timer = setTimeout(_ => {
            this.setState({ rate: this.state.rate + 1 });
        }, 3 * (this.state.rate + 1));
    }

    render() {
        return (
            <div className="loading-contanier">
                <div className="box">
                    <div className="dot"></div>
                </div>
                <span className="text">{this.state.rate}%</span>
            </div>
        );
    }
}