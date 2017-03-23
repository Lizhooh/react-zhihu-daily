import './css/style.css';
import React from 'react';

export default ({
    date = '',
    dataSource = [],
    editors = '',
    id = 0,
    onListItemClick = _ => { }
}) => {

    const getTitle = (dates) => {
        // 20170125
        let D = new Date();
        let
            _date = dates,
            _y = _date.slice(0, 4) * 1,
            _m = _date.slice(4, 6) * 1,
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

    const renderHome = () => {
        return dataSource.map((list, i) => (
            <div key={`list-${i}`}>
                <div className="list-title">{getTitle(list.date)}</div>
                <ul className="list">{
                    list.stories.map(({title, id, images}, index) => (
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
        ));
    };

    const renderHOther = () => (
        <div>
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
                dataSource.map(({title, id, images}, index) => (
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

    return (
        dataSource.length !== 0 &&
        <div className="listview-contanier">
            {id === 0 ? renderHome() : renderHOther()}
        </div>
    );
}