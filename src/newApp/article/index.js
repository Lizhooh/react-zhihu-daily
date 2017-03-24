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
                    <div
                        className="title-img"
                        style={{
                            background: `url(${article.source.image}) center center`
                        }}
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
        const comment = article.source.comment || {};
        const params = props.params;

        return (
            <div className='article-contanier'>
                <Drawer
                    open={article.open}
                    show={article.show}
                    drawerSize={'100%'}
                    drawerMaxSize={480}
                    drawerAnimatedTime={article.animatedTime}
                    drawerPosition={'right'}
                    drawerColor={'rgba(255, 255, 255, 1)'}
                    drawerShadeColor={'rgba(1, 1, 1, 0.45)'}
                    drawerOnClickModel={null}
                    >
                    <div className="article">

                        <Toolbar
                            style={{ opacity: 1 }}
                            iconLeftName={'arrow_back'}
                            // 图标组
                            iconRightName={[
                                { name: 'share' },
                                { name: 'star' },
                                { name: 'comment', text: comment.comments },
                                { name: 'thumb_up', text: comment.popularity },
                            ]}
                            iconSize={29}
                            onLeftButton={event => {
                                props.closeArticle();
                                setTimeout(() => {
                                    // 回去吧
                                    props.router.push(`/themes/${params.id}`);
                                }, article.animatedTime + 50);
                            } }
                            onRightButton={(event, index) => {
                                if (index === 2) {
                                    props.router.push(`/themes/${params.id}/article/${params.aid}/comment/${comment.comments}`);
                                }
                            } }
                            />
                        {
                            Object.keys(article.source).length > 0 ?
                                this.renderView(article) :
                                this.renderLoad()
                        }
                    </div>
                </Drawer>

                {props.children}
            </div>
        );
    }
}

export default connect(
    state => ({ article: state.article }),
    action,
)(Article)