import './css/style.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Scroll } from '../common';
import Drawer from '../drawer/index';
import Toolbar from '../toolbar/index';
import * as action from './action';

class Article extends Component {

    componentWillMount() {
        setTimeout(() => {
            this.props.initArticle(this.props.params.aid);
        }, this.props.article.animatedTime + 10);
    }

    componentDidMount() {
        this.props.openArticle();
    }

    onScroll = (event) => {
        event.stopPropagation();
        event.preventDefault();
        const self = event.target;

        if (Scroll.x(self) + Scroll.h(self) >= Scroll.H(self) - 300) {
            // 防止重复加载
            console.log(">>");
        }
    }

    renderView = (article) => (
        <div className="article-body">

            {
                article.source.image &&
                <div className="title-box">
                    <img
                        className="title-img"
                        src={article.source.image}
                        alt=''
                        />
                    <div className="title-shade">
                        <div className="title-text">{article.source.title}</div>
                        <div className="title-img-source">{article.source.image_source}</div>
                    </div>
                </div>
            }

            <div
                className="body"
                dangerouslySetInnerHTML={{ __html: article.source.body }}
                />
        </div>
    );

    renderLoad = () => (
        <div className="ball-clip-rotate-multiple">
            <div></div>
            <div></div>
        </div>
    );

    render() {
        const props = this.props;
        const article = props.article;

        return (
            <div className='article-contanier'
                onScroll={this.onScroll}
                >
                <Drawer
                    open={article.open}
                    show={article.show}
                    drawerSize={'100%'}
                    drawerMaxSize={'100%'}
                    drawerAnimatedTime={article.animatedTime}
                    drawerPosition={'right'}
                    drawerColor={'rgba(255, 255, 255, 1)'}
                    drawerShadeColor={'rgba(1, 1, 1, 0.45)'}
                    drawerOnClickModel={props.onClickModel}
                    >
                    <div className="article">

                        <Toolbar
                            style={{ opacity: 1 }}
                            title=""
                            iconLeftName={'arrow_back'}
                            iconRightName={'favorite_border'}
                            iconSize={33}
                            onLeftButton={(event) => {
                                props.closeArticle();

                                setTimeout(() => {
                                    props.router.push(`/themes/${props.params.id}`);
                                }, article.animatedTime + 50);
                            } }
                            />
                        {
                            Object.keys(article.source).length > 0 ?
                                this.renderView(article) :
                                this.renderLoad()
                        }
                    </div>
                </Drawer>
            </div>
        );
    }
}

export default connect(
    state => ({ article: state.article }),
    action,
)(Article)