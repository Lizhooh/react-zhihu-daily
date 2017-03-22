import './css/style.css';
import React from 'react';
import Drawer from '../drawer/index';

export default (props) => {
    return (
        <div>
            <Drawer
                open={props.open}
                show={props.show}
                drawerSize={'75%'}
                drawerAnimatedTime={360}
                drawerPosition={'left'}
                drawerColor={'rgba(255, 255, 255, 1)'}
                drawerShadeColor={'rgba(1, 1, 1, 0.45)'}
                drawerOnClickModel={props.onClickModel}
                >
                <div className="menu-container">

                    <header className="header">
                        <section className="header-body">
                            <span className="user-picture"></span>
                            <span>请登录</span>
                        </section>
                        <footer className="header-footer">
                            <span>我的收藏</span>
                            <span>离线下载</span>
                        </footer>
                    </header>

                    <section className="list">

                        <header
                            className="list-header"
                            onClick={(event) => {
                                props.onMenuItemCilck(event, 0);
                            } }
                            >
                            首页
                        </header>

                        <ul className="list-body">{
                            // 主题列表
                            props.dataSource.others &&
                            props.dataSource.others.map(({ name, id }, index) => (
                                <li
                                    className={props.active === id ? 'item-active' : ''}
                                    key={`theme-${index}`}
                                    onClick={(event) => {
                                        props.onMenuItemCilck(event, id);
                                    } }
                                    >
                                    <span className="text">{name}</span>
                                    <span className="icon">{'+'}</span>
                                </li>
                            ))
                        }</ul>

                    </section>
                </div>
            </Drawer>
        </div>
    );
};