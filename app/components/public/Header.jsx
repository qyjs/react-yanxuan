import React, {Component} from 'react';
import {Link, withRouter} from 'react-router-dom';
import CSS from '@assets/scss/public.scss';
import PropTypes from 'prop-types';

// 搜索栏组件
class SearchBar extends Component {
    render() {
        return (
            <div className={CSS.searchBar}>
                <a href="/" className={CSS.logo}></a>
                <div className={CSS.search}>
                    <i className={CSS.icon_search}></i>
                    <span className={CSS.placeholder}>搜索功能暂未开通</span>
                </div>
            </div>
        );
    }
}

// 频道列表组件
const ChannelList = withRouter(
    class extends Component {
        constructor(props) {
            super(props);
            this.channelList = [
                { text : '推荐', path : '/' },
                { text : '居家', path : '/channel/2' },
                { text : '餐厨', path : '/channel/3' },
                { text : '配件', path : '/channel/4' },
                { text : '服装', path : '/channel/5' },
                { text : '洗护', path : '/channel/6' },
                { text : '婴童', path : '/channel/7' },
                { text : '杂货', path : '/channel/8' },
            ];
        }
        componentDidMount() {
            const {onChange} = this.props;
            onChange(parseInt(this.props.match.params.id || 1))
        }
        render() {
            const {location, value, onChange} = this.props;
            return (
                <div className={CSS.channelList}>
                    <ul>
                        {
                            this.channelList.map((item, index) => {
                                let isActive = location.pathname === item.path ? `active` : '';
                                return (
                                    <li key={index} onClick={e => {
                                        return onChange(index + 1)    
                                    }}><Link className={CSS[isActive]} to={item.path}>{item.text}</Link></li>
                                );
                            })
                        }
                    </ul>
                </div>
            );
        }
    }
)

// 主组件: Header
class Header extends Component {
    render() {
        const {value, onChange} = this.props;
        return (
            <div className={`${CSS['header']}`}>
                <div className={`${CSS['container']}`}>
                    <SearchBar />
                    <ChannelList value={value} onChange={onChange}/>
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    value : PropTypes.number.isRequired,
    onChange : PropTypes.func.isRequired
}

export default Header;
