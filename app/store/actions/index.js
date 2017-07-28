import fetch from 'isomorphic-fetch';

export const SELECT_ID = 'SELECT_ID';
export const INVALIDATE_ID = 'INVALIDATE_ID';
export const REQUEST_PRO_LISTS ='REQUEST_PRO_LISTS';
export const RECEIVE_PRO_LISTS = 'RECEIVE_PRO_LISTS';

// 选择id
export function selectId(id) {
    return {
        type : SELECT_ID,
        id
    }
}

// 失效内容的id
export function invalidateId(id) {
    return {
        type : INVALIDATE_ID,
        id
    }
}

// 请求商品列表
export function requestProLists(id){
    return {
        type : 'REQUEST_PRO_LISTS',
        id
    }
}

// 接受商品列表
export function receiveProLists(id, json) {
    return {
        type : RECEIVE_PRO_LISTS,
        id,
        data : json.data,
        receiveAt : Date.now()
    }
}

/**
 * thunk action
 */
// 获取列表
 export function fetchLists(id) {
    return function(dispatch, getState) {
        // 通知要发起请求了
        dispatch(requestProLists(id));
        return fetch(`/json/${id}.json`).then(data => {
            return data.json()
        }).then(json => {
            // 触发接受数据的action
            return dispatch(receiveProLists(id, json))
        }).catch(e => {
            return console.log(e)
        })
    } 
 }

 // 是否应该获取最新列表的函数
 function shouldFetchLists(state, id) {
     const lists = state.listsById[id];
     if(!lists) {
         return true;
     } else if(lists.isFetching) {
         return false;
     } else {
         return lists.didInvalidate;
     }
 }
    
 // 需要才获取列表
 export function fetchListsIfNeeded(id) {
     return (dispatch, getState) => {
        if(shouldFetchLists(getState(), id)) {
            return dispatch(fetchLists(id))
        } else {
            return Promise.resolve();
        }
     }
 }