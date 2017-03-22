import './common/css/reset.css';
import './common/css/normalize.css';
import './common/css/main.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './action';
import Toolbar from './toolbar';
import Menu from './menu';
import ListView from './listView';
import { Scroll } from './common';

class Main extends Component {

    componentWillMount() {
        Promise.all([
            this.props.initMenu(),
            this.props.loadTheme(0),
        ]);

        // 监听滚动条, 加载更多，回到顶部
        window.addEventListener('scroll', this.onScroll);
    }

    onScroll = (event) => {
        event.stopPropagation();

        // if (Scroll.x() + Scroll.h() >= Scroll.H() - 300) {
        //     // 防止重复加载
        // }
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    render() {
        const props = this.props;
        const menu = props.state.menu;
        const main = props.state.main;

        return (
            <div>
                <div>
                    <Menu
                        open={menu.open}
                        show={menu.show}
                        active={menu.active}
                        onClickModel={event => {
                            props.closeMenu();
                        } }
                        onMenuItemCilck={(event, id) => {
                            console.log(id);
                        } }
                        // 菜单
                        dataSource={menu.source}
                        />
                </div>

                <div>
                    <Toolbar
                        title={'首页'}
                        iconName={'ion-navicon'}
                        iconSize={35}
                        onLeftButton={event => {
                            props.openMenu();
                        } }
                        />

                    <div
                        style={{
                            // overflow: menu.open === true ? 'hidden' : null,
                            position: menu.open === true ? 'fixed' : null,
                        }}
                        className="main-contanier"
                        >
                        {
                            main.active === 0 ?
                                <ListView
                                    date={main.homeSource.date}
                                    dataSource={main.homeSource.stories}
                                    onListItemClick={(event, id) => {
                                        // this.props.onListItemClick(event, id);
                                    } }
                                    />
                                :
                                <ListView
                                    date={main.otherSource.date}
                                    dataSource={main.otherSource.stories}
                                    editors={main.otherSource.editors}
                                    onListItemClick={(event, id) => {
                                        // this.props.onListItemClick(event, id);
                                    } }
                                    />

                        }
                    </div>
                </div>

                {props.children}
            </div>
        );
    }
}

export default connect(
    state => ({ state }),
    action
)(Main)