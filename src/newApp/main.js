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

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll);
    }

    onScroll = (event) => {
        event.stopPropagation();

        if (Scroll.x() + Scroll.h() >= Scroll.H() - 300) {
            // 防止重复加载
            console.log("!!");
        }
    }

    get title() {
        const menu = this.props.state.menu;
        const main = this.props.state.main;

        if (main.active === 0) return '首页';
        if (menu.source.others) {
            const d = menu.source.others.filter(i => i.id === main.active).shift();
            return (d && d.name) || '';
        }
    }

    render() {
        const props = this.props;
        const menu = props.state.menu;
        const main = props.state.main;
        const article = props.state.article;

        return (
            <div>
                <div>
                    <Menu
                        open={menu.open}
                        show={menu.show}
                        active={main.active}
                        onClickModel={event => {
                            props.closeMenu();
                        } }
                        onMenuItemCilck={(event, id) => {
                            setTimeout(function () {
                                props.closeMenu();
                            }, 0);

                            setTimeout(function () {
                                props.loadTheme(id);
                            }, menu.animatedTime + 50);
                        } }
                        // 菜单
                        dataSource={menu.source}
                        />
                </div>

                <div className="main-contanier">
                    <Toolbar
                        title={this.title}
                        iconName={'ion-navicon'}
                        iconSize={35}
                        onLeftButton={event => {
                            props.openMenu();
                        } }
                        />

                    <div
                        style={{
                            // overflow: menu.open || article.open ? 'hidden' : null,
                            position: menu.open || article.open ? 'fixed' : null,
                        }}
                        className="main"
                        >
                        {
                            main.active === 0 ?
                                <ListView
                                    date={main.homeSource.date}
                                    dataSource={main.homeSource.stories}
                                    onListItemClick={(event, id) => {
                                        props.router.push(`/themes/${main.active}/article/${id}`);
                                    } }
                                    />
                                :
                                <ListView
                                    dataSource={main.otherSource.stories}
                                    editors={main.otherSource.editors}
                                    onListItemClick={(event, id) => {
                                        props.router.push(`/themes/${main.active}/article/${id}`);
                                    } }
                                    />

                        }
                    </div>

                    <div
                        className="more"
                        onClick={(event) => {
                            // this.props.onListMore();
                        } }
                        >
                        <span>更多</span>
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