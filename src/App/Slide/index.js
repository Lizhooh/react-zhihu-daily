import './css/style.css';
import React, { Component, PropTypes } from 'react';

export default class Slide extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: 0,
            play: this.props.slidePlay,
        };

        this.touchDate = {
            start: {
                pageX: null,
                pageY: null,
            },
            move: {
                pageX: null,
                pageY: null,
            },
        };
    }

    static defaultProps = {
        slideTime: 5000,
        slideAnimatedTime: 800,
        slidePlay: true,
        dataSource: [{ id: '', title: '', image: '' }],
        onListItemClick: () => { },
    };

    static propTypes = {
        slideTime: PropTypes.number,
        slideAnimatedTime: PropTypes.number,
        slidePlay: PropTypes.bool,
        dataSource: PropTypes.array,
        onListItemClick: PropTypes.func,
    };

    play = () => {
        this.timer && clearInterval(this.timer);
        this.setState({ play: true });

        this.timer = setInterval(() => {
            this.next();
        }, this.props.slideTime);

        return this;
    };

    stop = () => {
        this.setState({ play: false });

        if (this.timer) {
            clearInterval(this.timer);
        }

        return this;
    };

    next = (num = 1) => {
        const LEN = this.props.dataSource.length;
        this.setState({
            active: (this.state.active + num + LEN) % LEN
        });

        return this;
    };

    prev = (num = 1) => {
        const LEN = this.props.dataSource.length;
        this.setState({
            active: (this.state.active - num + LEN) % LEN
        });

        return this;
    };

    componentDidMount() {
        if (!this.state.play) return;
        this.play();
    }

    componentWillMount() {
        this.timer && clearInterval(this.timer);
    }

    componentUnmount() {
        this.timer && clearInterval(this.timer);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.slidePlay === true) {
            this.play();
        }
        else {
            this.stop();
            this.setState({ active: 0 });
        }
    }

    render() {
        const { active } = this.state;
        const { dataSource } = this.props;

        return (
            dataSource.length !== 0 &&
            <div className="slide-container">

                <ul
                    className="list"
                    style={{
                        width: `${dataSource.length * 100}%`,
                        transform: `translateX(${-1 * 100 * active / dataSource.length}%)`,
                        transition: `all ${this.props.slideAnimatedTime}ms ease-in-out`,
                    }}
                    >
                    {
                        dataSource.map(({ image, title, id }, index) => (
                            <li
                                className=""
                                key={`slide-${index}`}
                                >
                                <img src={image} alt="" />
                            </li>
                        ))
                    }
                </ul>

                <div
                    className="shade"
                    onClick={(event) => {
                        this.props.onListItemClick(event, dataSource[active].id);
                    } }
                    onTouchStart={(event) => {
                        const touch = event.targetTouches[0];

                        this.touchDate.start = {
                            pageX: touch.pageX,
                            pageY: touch.pageY,
                        };
                    } }
                    onTouchMove={(event) => {
                        const touch = event.targetTouches[0];

                        this.touchDate.move = {
                            pageX: touch.pageX,
                            pageY: touch.pageY,
                        };
                    } }
                    onTouchEnd={(event) => {
                        const d = this.touchDate.move.pageX - this.touchDate.start.pageX;

                        if (dataSource.length <= 1) return;

                        if (Math.abs(d) > 120) {
                            if (d > 0) {
                                this.prev().stop().play();
                            }
                            else {
                                this.next().stop().play();
                            }
                        }
                    } }
                    >

                    <span className="title">{dataSource[active].title || ''}</span>

                    <div className="bottomBar">{
                        dataSource.length > 1 &&
                        Array.apply(null, { length: 5 }).map((item, index) => (
                            <span
                                key={`dot-${index}`}
                                className={`dot ${active === index ? 'dot-active' : ''}`}
                                />
                        ))
                    }</div>

                </div>
            </div>
        );
    }
}