import {useReducer, useCallback} from 'react';
import {apiFetch, ApiErrors} from '../utils/api';

function reducer(state, action) {
    console.log('USERS', action.type, action);
    switch(action.type) {
        case 'FETCHING_USERS':
            return {...state, loading: true};
        case 'SET_USERS':
            return {...state, users: action.payload, loading: false};
        case 'ERRORS_API'       :
            return {...state, errorsApi: action.errorsApi, loadingApi: false}
        default :
            return null;
    }
}

export function useCategories(){
    const [state, dispatch] = useReducer(reducer,{
        users: null,
        loading : false,
        errorsApi: []
    });

    return {
        users: state.users,
        errorsApi : state.ApiErrors,
        fetchUser: useCallback(async function(endpoint,options = []){
            if(state.loading || state.categories){
                return null;
            }
            dispatch({type: 'FETCHING_USER'});
            try{
                const users = await apiFetch(endpoint,options);
                dispatch({type: 'SET_USERS', payload: users});
            }catch(e){
                if(e instanceof ApiErrors){
                    dispatch({type: 'ERRORS_API', errorsApi});
                }
            }
        })
    }
}