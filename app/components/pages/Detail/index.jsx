import React, {Component} from 'react';
import {withRouter} from 'react-router-dom';

class Detail extends Component {
    render() {
        return (
            <div style={{
                    margin : '50px 0',
                    textAlign : 'center'
            }}>
                <h3>商品ID是{this.props.match.params.id}</h3>
                <a href="javascript:void(0)" onClick={() => {
                    window.history.back();
                }}>返回</a>
            </div>
        );
    }
}


export default withRouter(Detail);
