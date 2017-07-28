import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';
import CSS from '@assets/scss/person'

class Person extends Component {
    render() {
        return (
            <div className={CSS.container}>
                <input type="text" placeholder="请输入用户名" />
                <input type="text" placeholder="请输入密码" />
                <button type="button">登录</button>
                <div className={CSS.link}>
                    <a href="javascript:void(0)">注册账号</a>
                    <a href="javascript:void(0)">忘记密码</a>
                </div>
            </div>
        );
    }
}


export default withRouter(Person);
