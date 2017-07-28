import React, {Component} from 'react';
import CSS from "@assets/scss/public";
import {Link, Route, Switch, withRouter} from 'react-router-dom'

class FooterNav extends Component {
    constructor(props) {
        super(props);
        this.footerNav = [
            { text : '首页', icon : 'index', path : '/' },
            { text : '专题', icon : 'topic', path : '/topic' },
            { text : '分类', icon : 'cate', path : '/cate' },
            { text : '购物车', icon : 'cart', path : '/cart' },
            { text : '个人', icon : 'person', path : '/person' },                        
        ]
    }
    render(){
        const {location} = this.props;
        return (
            <div className={CSS.nav}>
                {
                    this.footerNav.map((item, index) => {
                        let isActive = location.pathname === item.path ? `${item.icon}_active` : '';
                        return (
                            <Link to={`${item.path}`} key={index} className={CSS.link}>
                                <i className={`${CSS.icon} ${CSS[`icon-${item.icon}`]} ${CSS[isActive]}`}></i>
                                <span className={CSS.text}>{item.text}</span>
                            </Link>
                        );
                    })
                }
            </div>
        );
    }
}

export default withRouter(FooterNav);