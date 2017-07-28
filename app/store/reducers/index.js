import {combineReducers} from 'redux';
import {
    SELECT_ID,
    INVALIDATE_ID,
    REQUEST_PRO_LISTS,
    RECEIVE_PRO_LISTS
} from '@store/actions/index.js';

// 选择id的reducer
function selectedId(state = 1, action) {
    switch(action.type) {
        case SELECT_ID:
            return action.id
        default:
            return state;
    }
}

// 列表相关的列表
function lists(state = {
    isFetching : false,
    didInvalidate : false,
    data : {}
}, action) {
    switch(action.type) {
        case INVALIDATE_ID:
            return Object.assign({}, state, {
                didInvalidate : true
            })
        case REQUEST_PRO_LISTS:
            return Object.assign({}, state, {
                isFetching : true,
                didInvalidate : false
            })
        case RECEIVE_PRO_LISTS:
            return Object.assign({}, state, {
                isFetching : false,
                didInvalidate : false,
                data : action.data,
                lastUpdated : action.receiveAt
            })
        default:
            return state;
    }
}

//文章相关的reducer
function listsById(state = {}, action) {
    switch(action.type) {
        case INVALIDATE_ID:
        case RECEIVE_PRO_LISTS:
        case REQUEST_PRO_LISTS:
            return Object.assign({}, state, {
                [action.id] : lists(state[action.id], action)
            })
        default:
            return state;
    }
}

// 根reducer
const rootReducer = combineReducers({
    listsById,
    selectedId
})

export default rootReducer;