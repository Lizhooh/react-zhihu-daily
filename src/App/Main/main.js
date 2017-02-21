import './../Common/css/reset.css';
import './css/style.css';
import React, { Component, PropTypes } from 'react';

import Toolbar from './../Toolbar/index';
import Slide from './../Slide/index';
import ListView from './../ListView/index';

export default class Main extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    static defaultProps = {
        dataSource: null,
        themeId: 0,
        title: '首页',
        onOpenMenu: () => { },
        onListItemClick: () => { },
        onListMore: () => { },
    };

    static propTypes = {
        dataSource: PropTypes.object,
        themeId: PropTypes.number,
        title: PropTypes.string,
        onOpenMenu: PropTypes.func,
        onListItemClick: PropTypes.func,
        onListMore: PropTypes.func,
    };

    renderListView = () => {

    };

    render() {
        return (
            <div className="main-contanier">
                <Toolbar
                    title={this.props.title}
                    iconName={'ion-navicon'}
                    iconSize={35}
                    onLeftButton={event => {
                        this.props.onOpenMenu(event);
                    } }
                    />

                <Slide
                    // 轮播图
                    slideTime={5000}
                    slideAnimatedTime={400}
                    slidePlay={this.props.themeId === 0}
                    dataSource={
                        this.props.themeId === 0 ?
                            // 首页
                            this.props.dataSource.top_stories
                            :
                            // 非首页
                            [{
                                title: this.props.dataSource.description,
                                image: this.props.dataSource.background,
                                id: this.props.dataSource.id,
                            }]
                    }
                    onListItemClick={(event, id) => {
                        if (id === undefined) return;
                        this.props.onListItemClick(event, id, null);
                    } }
                    />

                <div className="list-contanier">
                    <ListView
                        date={this.props.dataSource.date}
                        editors={this.props.dataSource.editors}
                        dataSource={this.props.dataSource.stories}
                        onListItemClick={(event, id, prefix) => {
                            this.props.onListItemClick(event, id);
                        } }
                        />
                </div>

                <div
                    className="more"
                    onClick={(event) => {
                        this.props.onListMore();
                    } }
                    >
                    <span>更多</span>
                </div>
            </div>
        );
    }
}