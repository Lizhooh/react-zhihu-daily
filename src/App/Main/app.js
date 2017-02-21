import './../Common/css/reset.css';
import './../Common/css/normalize.css';
import './css/style.css';
import React, { Component } from 'react';

import Article from './../Article/index';
import Start from './../Start/index';
import Menu from './../Menu/index';
import Main from './main';

export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTheme: 0,
            activeArticle: -1,

            themes: [{ id: 0, name: '首页' }],
            themeData: {},

            articleData: {},

            startImageHide: false,
            startData: { img: require('./img/bg.jpg'), text: 'Austin Neill' },

            viewHide: true,
        };

        // this.requestStartImg();
        this.requestThemes();
        this.requestTheme({ themeId: 0 });

        this.base = {};
    }

    requestThemes = () => {
        setTimeout(_ => {
            fetch('http://localhost:3333/api/themes/')
                .then(response => response.json())
                .then(result => {
                    let themes = [];

                    for (const {id, name} of result.others) {
                        themes.push({ id, name });
                    }

                    this.setState({
                        themes: themes,
                    });

                    return true;
                })
                .catch(err => {
                    console.error(err)
                    alert("网络错误");
                });
        }, 0);
    };

    requestTheme = (props, cb) => {
        const url = props.themeId === 0 ?
            'http://localhost:3333/api/latest/' :
            'http://localhost:3333/api/theme-type/' + props.themeId;

        setTimeout(_ => {
            fetch(url)
                .then(response => response.json())
                .then(result => {
                    this.setState({
                        activeTheme: props.themeId,
                        themeData: result,
                    }, () => {
                        if (typeof cb === 'function') {
                            cb.call(this);
                        }
                    });

                    return true;
                })
                .catch(err => {
                    console.error(err)
                    alert("网络错误");
                });
        }, 0);
    };

    requestArticle = (props, cb) => {
        setTimeout(_ => {
            fetch('http://localhost:3333/api/article/' + props.articleId)
                .then(response => response.json())
                .then(result => {
                    this.setState({
                        activeArticle: props.articleId,
                        articleData: result,
                    }, () => {
                        if (typeof cb === 'function') {
                            cb.call(this);
                        }
                    });

                    return true;
                })
                .catch(err => {
                    console.error(err)
                    alert("网络错误");
                });
        }, 0);
    };

    requestStartImg = () => {
        setTimeout(_ => {
            fetch('http://localhost:3333/api/start-image')
                .then(response => response.json())
                .then(result => {
                    this.setState({
                        startData: result,
                    });

                    return true;
                })
                .catch(err => {
                    console.error(err)
                    alert("网络错误");
                });
        }, 0);
    };

    get mainTitle() {
        if (this.state.activeTheme === 0) {
            return '首页';
        }
        else {
            for (const {id, name} of this.state.themes) {
                if (id === this.state.activeTheme) {
                    return name;
                }
            }
        }
    };

    get renderView() {
        if (!Object.keys(this.state.themeData).length || this.state.viewHide) {
            return null;
        }

        return (
            <div>
                <Menu
                    // 菜单
                    dataSource={this.state.themes}
                    ref={(menu) => this.base.menu = menu}
                    onMenuItemCilck={(event, themeId) => {
                        this.requestTheme({ themeId }, () => {
                            this.base.menu.drawer.closeDrawer(event, true);
                        });
                    } }
                    />

                <Main
                    // 主页面
                    title={this.mainTitle}
                    dataSource={this.state.themeData}
                    themeId={this.state.activeTheme}
                    ref={(main) => this.base.main = main}
                    onOpenMenu={(event) => this.base.menu.drawer.openDrawer()}
                    onListItemClick={(event, articleId) => {
                        this.requestArticle({ articleId }, () => {
                            this.base.article.openArticle(event);
                        });
                    } }
                    onListMore={(event) => {
                        // 浏览更多
                    } }
                    />

                <Article
                    // 文章
                    articleId={this.state.activeArticle}
                    dataSource={this.state.articleData}
                    ref={(article) => this.base.article = article}
                    />
            </div>
        );
    };

    get renderStart() {
        return (
            <Start
                hide={this.state.startImageHide}
                dataSource={this.state.startData}
                />
        );
    };

    componentWillMount() {
        setTimeout(_ => {
            this.setState({ startImageHide: true });
        }, 1000 * 6);

        setTimeout(_ => {
            this.setState({ viewHide: false });
        }, 1000 * 3);
    }

    render() {
        return (
            <div>
                {this.renderStart}
                {this.renderView}
            </div>
        );
    }
}
