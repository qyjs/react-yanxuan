import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import CSS from '@assets/scss/public.scss'
import PropTypes from 'prop-types';
import {remote} from '@config/index'

class List extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const {data} = this.props;
        const lists = data.lists || [];
        return (
            <div className={CSS.list}>
                <Link to="/detail/1" >
                    <img src={data.picUrl} className={CSS.banner} alt=""/>
                </Link>
                <ul> 
                    {
                        lists.map((item, index) => {
                            return (
                                <li key={index}>
                                    <Link to={`/detail/${item.id}`}>
                                        <img className={CSS.img} src={ item.imgUrl } alt=""/>
                                        <div className={CSS.intro}>{item.intro}</div>
                                        <div className={CSS.name}>{item.name}</div>
                                        <div className={CSS.price}>￥{item.price}</div>
                                    </Link>
                                </li>                 
                            );
                        })
                    }
                </ul>
            </div>
        )
    }
}

List.propTypes = {
    data : PropTypes.shape({
        picUrl : PropTypes.string.isRequired,
        lists : PropTypes.arrayOf(
            PropTypes.shape({
                imgUrl : PropTypes.string.isRequired,
                intro : PropTypes.string.isRequired,
                name : PropTypes.string.isRequired,
                price : PropTypes.string.isRequired,
            }).isRequired
        ).isRequired
    })
}

export default List;