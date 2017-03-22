import './css/style.css';
import React, { Component, PropTypes } from 'react';


export default class ListView extends Component {

    constructor(props) {
        super(props);

        this.state = {
            listTitle: this.getTitle(),
        };
    }

    static defaultProps = {
        date: '',
        dataSource: [],
        editors: '',
        onOpenArticle: () => { },
        onListItemClick: () => { },
    };

    static PropTypes = {
        date: PropTypes.string,
        dataSource: PropTypes.array,
        onOpenArticle: PropTypes.func,
        editors: PropTypes.array,
        onListItemClick: PropTypes.func,
    };

    getTitle = () => {
        // 20170125
        let D = new Date();

        let
            _date = this.props.date,
            _y = _date.slice(0, 4) * 1,
            _m = _date.slice(4, 6) * 1 - 1,
            _d = _date.slice(6) * 1,
            _week = '日一二三四五六'.charAt(new Date(_y, _m, _d).getDay()),

            y = D.getFullYear(),
            m = D.getMonth() + 1 < 10 ? '0' + (D.getMonth() + 1) : D.getMonth() + 1,
            d = D.getDate() < 10 ? '0' + D.getDate() : D.getDate();

        let date = `${y}${m}${d}`;

        if (_date === date) {
            return '今日热闻';
        }
        else {
            if (_m === -1) return '';

            return `${_m}月${_d}日 星期${_week}`;
        }
    };

    render() {
        return (
            this.props.dataSource.length !== 0 &&
            <div className="listview-contanier">
                <div className="list-title">{this.getTitle()}</div>
                {
                    !!this.props.editors &&
                    <div className="list-editors">
                        <span>主编</span>
                        <ul className="editors">{
                            this.props.editors.map(({ url, avatar, name }, index) => (
                                <li key={`editors-${index}`}>
                                    <img src={avatar} alt="" />
                                </li>
                            ))
                        }</ul>
                    </div>
                }
                <ul className="list">{
                    this.props.dataSource.map(({ title, id, images }, index, list) => (
                        <li
                            className="item"
                            key={`article-${id}`}
                            onClick={(event) => {
                                this.props.onListItemClick(event, id);
                            } }
                            >
                            <div className="title">{title}</div>
                            {
                                // images 会有 undefined
                                !!images &&
                                <div className="min-image">
                                    <img src={images[0] || null} alt="" />
                                </div>
                            }
                        </li>
                    ))
                }</ul>
            </div>
        );
    }
}