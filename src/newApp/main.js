import './common/css/reset.css';
import './common/css/normalize.css';
import './common/css/main.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './action';
import Toolbar from './toolbar';
import Menu from './menu';
import ListView from './listView';
import Slide from './Slide';
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
    };

    get title() {
        const menu = this.props.state.menu;
        const main = this.props.state.main;

        if (main.active === 0) return '首页';
        if (menu.source.others) {
            const d = menu.source.others.filter(i => i.id === main.active).shift();
            return (d && d.name) || '';
        }
    };

    get slideData() {
        const main = this.props.state.main;
        return main.active === 0 ?
            // 首页
            main.homeSource.top_stories :
            // 非首页
            [{
                title: main.otherSource.description,
                image: main.otherSource.background,
                id: main.otherSource.id,
            }]
    };

    openArticle = (event, id) => {
        const main = this.props.state.main;
        this.props.router.push(`/themes/${main.active}/article/${id}`);
    };

    renderList = () => {
        const main = this.props.state.main;

        return main.active === 0 ?
            <ListView
                id={main.active}
                date={main.homeSource.date}
                dataSource={main.homeSource.list}
                onListItemClick={this.openArticle}
                />
            :
            <ListView
                id={main.active}
                dataSource={main.otherSource.stories}
                editors={main.otherSource.editors}
                onListItemClick={this.openArticle}
                />
    };

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
                        iconLeftName={'menu'}
                        iconRightName={'more_vert'}
                        iconSize={33}
                        onLeftButton={event => {
                            props.openMenu();
                        } }
                        onRightButton={event => {
                            this.props.router.push(`/themes/${main.active}/popup`);
                        } }
                        />

                    <div
                        style={{
                            // overflow: menu.open || article.open ? 'hidden' : null,
                            position: menu.open || article.open ? 'fixed' : null,
                        }}
                        className="main"
                        >

                        <Slide
                            // 轮播图
                            slideTime={5000}
                            slideAnimatedTime={400}
                            slidePlay={main.active === 0}
                            dataSource={this.slideData}
                            onListItemClick={this.openArticle}
                            />
                        {this.renderList()}
                    </div>

                    <div
                        className="more"
                        onClick={(event) => {
                            if (main.active === 0) {
                                const list = main.homeSource.list;
                                const last = list[list.length - 1].date;
                                console.log(last);
                                props.loadThemeMore(main.active, last);
                            }
                            else {
                                const stories = main.otherSource.stories;
                                const last = stories[stories.length - 1].id;
                                console.log(last);
                                props.loadThemeMore(main.active, last);
                            }
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