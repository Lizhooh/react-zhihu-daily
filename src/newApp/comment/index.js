import './css/style.css';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as action from './action';
import Drawer from '../drawer';
import Toolbar from '../toolbar';

class Comment extends Component {

    componentWillMount() {
        setTimeout(() => {
            this.props.initComment(this.props.params.aid);
        }, this.props.article.animatedTime + 10);
    }

    componentDidMount() {
        this.props.openComment();
    }

    getTime = (date) => {
        const D = new Date(date * 1000);
        const fm = v => v < 10 ? '0' + v : v;

        const _M = fm(D.getMonth() + 1);
        const _d = fm(D.getDate());
        const _h = fm(D.getHours());
        const _m = fm(D.getMinutes());

        return `${_M}-${_d} ${_h} : ${_m}`;
    }

    renderCommentItem = (data) => (
        <div className="comment-item">
            <div className="left">
                <img src={data.avatar} alt="" />
            </div>
            <div className="right">
                <div className="header">
                    <span className="author">{data.author}</span>
                    <span className="other">
                        <i className="material-icons">thumb_up</i>
                        <span>{data.likes}</span>
                    </span>
                </div>
                <div className="content">
                    {data.content}
                    {
                        data.reply_to &&
                        <div className="reply-to">
                            <div className="author">
                                @ {data.reply_to.author}
                            </div>
                            <div className="content">{
                                data.reply_to.content ||
                                data.reply_to.error_msg
                            }</div>
                        </div>
                    }
                </div>
                <div className="time">
                    {this.getTime(data.time)}
                </div>
            </div>
        </div>
    );

    renderLong = (long) => {
        return long.map((i, index) => (
            <div key={`comment-long-${index}`}>
                {this.renderCommentItem(i)}
            </div>
        ));
    };

    renderShort = (short) => {
        return short.map((i, index) => (
            <div key={`comment-short-${index}`}>
                {this.renderCommentItem(i)}
            </div>
        ));
    };

    renderLoad = () => (
        <div className="ball-clip-rotate-multiple">
            <div></div>
            <div></div>
        </div>
    );

    renderView = () => {
        const source = this.props.article.comment.source;
        return (
            <div className="comment">
                <div className="comment-num">
                    {source.long.length} 条长评
                </div>
                {this.renderLong(source.long)}
                <div className="comment-num">
                    {source.short.length} 条短评
                </div>
                {this.renderShort(source.short)}
            </div>
        );
    };

    render() {
        const props = this.props;
        const article = props.article;
        const params = props.params;
        const comment = article.comment;

        return (
            <div className="comment-contanier">
                <Drawer
                    open={comment.open}
                    show={comment.show}
                    drawerSize={'100%'}
                    drawerMaxSize={'100%'}
                    drawerAnimatedTime={article.animatedTime}
                    drawerPosition={'bottom'}
                    drawerColor={'rgba(255, 255, 255, 1)'}
                    drawerShadeColor={'rgba(1, 1, 1, 0.45)'}
                    drawerOnClickModel={props.onClickModel}
                    >
                    <Toolbar
                        title={`${params.n} 条评论`}
                        iconLeftName={'arrow_back'}
                        iconRightName={'mode_edit'}
                        iconSize={29}
                        onLeftButton={event => {
                            props.closeComment();
                            setTimeout(() => {
                                // 回去吧
                                props.router.push(`/themes/${params.id}/article/${params.aid}`);
                            }, article.animatedTime + 50);
                        } }
                        />
                    {
                        Object.keys(comment.source).length > 0 ?
                            this.renderView() :
                            this.renderLoad()
                    }
                </Drawer>
            </div>
        );
    }
}

export default connect(
    state => ({ article: state.article }),
    action,
)(Comment);
