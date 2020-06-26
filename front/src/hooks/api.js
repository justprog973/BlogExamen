import { useCallback, useReducer } from 'react';
import {apiFetch} from '../utils/api';


function reducer (state, action) {
    switch (action.type) {
        case 'START_LOADING':
            return {...state, loading: true};
        case 'STOP_LOADING' : 
            return {...state, loading: false};
        case 'ERRORS'       :
            return {...state, errors: action.errors, loading: false}
        case 'DATA'         :
            return {...state, data: action.data, loading: false}
    }
}

export const useApiFetch = function() {
    const {state, dispatch} = useReducer(reducer, {
        loading     : false,
        data        : null,
        errors      : [],
    });

    const doFetch = useCallback( async function (endpoint, options) {
        dispatch({type: 'START_LOADING'})
        try{
            const data = await apiFetch(endpoint, options);
            dispatch({type: 'DATA', data});
        }catch(errors){
            dispatch({type: 'ERRORS', errors});
        }
        
    }, [])
    return {
        errors   : state.errors,
        loading  : state.loading,
        data     : state.data,
        doFetch
    }
}