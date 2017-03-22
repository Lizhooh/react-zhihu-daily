import './css/style.css';
import React, { Component, PropTypes } from 'react';

export default ({date = '', dataSource = [], editors = '', onListItemClick}) => {

    const getTitle = (dates) => {
        // 20170125
        let D = new Date();
        let
            _date = dates,
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

    return (
        dataSource.length !== 0 &&
        <div className="listview-contanier">
            <div className="list-title">{getTitle(date)}</div>
            {
                !!editors &&
                <div className="list-editors">
                    <span>主编</span>
                    <ul className="editors">{
                        editors.map(({ url, avatar, name }, index) => (
                            <li key={`editors-${index}`}>
                                <img src={avatar} alt="" />
                            </li>
                        ))
                    }</ul>
                </div>
            }
            <ul className="list">{
                dataSource.map(({ title, id, images }, index, list) => (
                    <li
                        className="item"
                        key={`article-${id}`}
                        onClick={(event) => {
                            onListItemClick(event, id);
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