import './css/style.css';
import React, { Component, PropTypes } from 'react';

import Drawer from './../Drawer/index';
import Toolbar from './../Toolbar/index';

export default class Article extends Component {

    constructor(props) {
        super(props);

        this.state = {
            drawerShow: false,
            toolbarOpacity: 1,
        };

        this.scrollTopCache = 0;
    }

    static defaultProps = {
        artilceId: -1,
        dataSource: {},
    };

    static propTypes = {
        artilceId: PropTypes.number,
        dataSource: PropTypes.object,
    };

    openArticle = (event) => {
        this.drawer.openDrawer(event);
    };

    closeArticle = (event) => {
        this.drawer.closeDrawer(event);
    };

    componentWillReceiveProps() {
        this.setState({ toolbarOpacity: 1 });
        // this.state.toolbarOpacity = 1;
    }

    render() {

        return (
            <div className="article-contanier"
                onScroll={(event) => {
                    const { scrollTop } = event.target;

                    if (scrollTop <= 300) {
                        this.setState({ toolbarOpacity: 1 - scrollTop / 300 });
                        this.scrollTopCache = scrollTop;
                        return;
                    }
                    else if(scrollTop - this.scrollTopCache < 0){
                        this.setState({ toolbarOpacity: 0.9 });
                        this.scrollTopCache = scrollTop;
                        return;
                    }
                    else if(this.state.toolbarOpacity !== 0) {
                        this.setState({ toolbarOpacity: 0 });
                        this.scrollTopCache = scrollTop;
                        return;
                    }

                    this.scrollTopCache = scrollTop;
                } }
                >

                <Drawer
                    drawerShow={this.state.drawerShow}
                    drawerSize={'100%'}
                    drawerMaxSize={'100%'}
                    drawerAnimatedTime={400}
                    drawerPosition={'right'}
                    drawerColor={'rgba(255, 255, 255, 1)'}
                    drawerShadeColor={'rgba(1, 1, 1, 0.45)'}
                    ref={(drawer) => this.drawer = drawer}
                    >
                    <div className="article">
                        <Toolbar
                            style={{ opacity: this.state.toolbarOpacity }}
                            title=""
                            iconName={'ion-ios-arrow-back'}
                            iconSize={35}
                            onLeftButton={(event) => {
                                this.closeArticle(event);
                            } }
                            />

                        {
                            !~this.props.artilceId &&
                            <div>
                                {
                                    // 有些没有标题图片
                                    this.props.dataSource.image &&
                                    <div className="title-box">
                                        <img className="title-img" src={this.props.dataSource.image} alt="" />
                                        <div className="title-shade">
                                            <div className="title-text">{this.props.dataSource.title}</div>
                                        </div>
                                    </div>
                                }

                                <div
                                    className="body"
                                    dangerouslySetInnerHTML={{ __html: this.props.dataSource.body }}
                                    />
                            </div>
                        }
                    </div>
                </Drawer>

            </div>
        );
    }
}