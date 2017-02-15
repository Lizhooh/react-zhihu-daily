import './css/style.css';
import React, { Component, PropTypes } from 'react';

import Drawer from '../Drawer/index';

export default class Menu extends Component {

    constructor(props) {
        super(props);

        this.state = {
            active: 0,
        };
    }

    static defaultProps = {
        onMenuItemCilck: () => { },
        dataSource: null,
    };

    static propTypes = {
        onMenuItemCilck: PropTypes.func,
        dataSource: PropTypes.array,
    };

    shouldComponentUpdate(nextProp, nextState) {
        const data = this.props.dataSource;

        for (const key in nextProp.dataSource) {
            if (nextProp.dataSource[key].id !== data[key].id ||
                nextProp.dataSource[key].name !== data[key].name) {
                return true;
            }
        }

        return false;
    }

    render() {

        // <i className="fa fa-home"></i>
        // <i className="fa fa-star"></i>
        // <i className="fa fa-download"></i>

        return (
            <div>
                <Drawer
                    drawerShow={false}
                    drawerSize={'75%'}
                    drawerAnimatedTime={360}
                    drawerPosition={'left'}
                    drawerColor={'rgba(255, 255, 255, 1)'}
                    drawerShadeColor={'rgba(1, 1, 1, 0.45)'}
                    ref={(drawer) => this.drawer = drawer}
                    >
                    <div className="menu-container">

                        <header className="header">
                            <section className="header-body">
                                <span className="user-picture">
                                    {
                                        // <img src="" role="presentation" />
                                    }
                                </span>
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
                                    this.setState({
                                        active: 0,
                                    });

                                    this.props.onMenuItemCilck(event, 0);
                                } }
                                >
                                首页
                            </header>

                            <ul className="list-body">{
                                // 主题列表
                                this.props.dataSource.map(({ name, id }, index) => (
                                    <li
                                        className={this.state.active === id ? 'item-active' : ''}
                                        key={`theme-${index}`}
                                        onClick={(event) => {
                                            this.setState({
                                                active: id
                                            });

                                            this.props.onMenuItemCilck(event, id);
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
    }
}

