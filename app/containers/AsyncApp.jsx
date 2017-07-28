import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux'
import {selectId, fetchListsIfNeeded, invalidateId} from '@store/actions/index'
import Header from '@components/public/Header'
import List from '@components/public/List'
import CSS from '@assets/scss/public.scss'

class AsyncApp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }
    componentDidMount() {
        const {dispatch, selectedId} = this.props;
        dispatch(fetchListsIfNeeded(selectedId));
    }
    componentWillReceiveProps(nextProps) {
        if(nextProps.selectedId !== this.props.selectedId) {
            const {dispatch, selectedId} = nextProps;
            dispatch(fetchListsIfNeeded(selectedId));
        }
    }
    handleChange(nextId) {
        this.props.dispatch(selectId(nextId))
    }
    handleRefreshClick(e) {
        e.preventDefault();
        const {dispatch, selectedId} = this.props;
        dispatch(invalidateId(selectedId));
        dispatch(fetchListsIfNeeded(selectedId))
    }
    render() {
        const {selectedId, data, isFetching, lastUpdated} = this.props;
        const lists = data.lists || [];
        return (
            <div>
                <Header value={selectedId} onChange={this.handleChange} />
                {
                   isFetching && lists.length === 0 && (
                       <div className={CSS.loading}>
                           <h2 className={CSS.gif}>Loading...</h2>
                       </div>
                   )
                }
                {
                    !isFetching && lists.length === 0 && <h2>empty</h2>
                }
                {
                    lists.length > 0 && 
                    <div style={{opcity : isFetching ? 0.5 : 1}}>
                        <List data={data} />
                    </div>
                }
                <p className={CSS.refresh}>
                    {
                        lastUpdated && <span>最后更新时间: {new Date(lastUpdated).toLocaleTimeString()}</span>
                    }
                    {
                        !isFetching && <a href="##" onClick={this.handleRefreshClick}> 点击刷新 </a>
                    }
                </p>
            </div>
        );
    }
}

AsyncApp.propTypes = {
    selectedId : PropTypes.number.isRequired,
    data : PropTypes.object.isRequired,
    isFetching : PropTypes.bool.isRequired,
    lastUpdated : PropTypes.number,
    dispatch : PropTypes.func.isRequired
}

function mapStateToProps(state) {
    const {selectedId, listsById} = state;
    const {
        isFetching,
        lastUpdated,
        data
    } = listsById[selectedId] || {
        isFetching : true,
        data : {}
    }
    return {
        selectedId,
        data,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncApp)
