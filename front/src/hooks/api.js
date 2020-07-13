import { useCallback, useReducer } from 'react';
import {apiFetch} from '../utils/api';


function reducer (state, action) {
    switch (action.type) {
        case 'START_LOADING_API':
            return {...state, loadingApi: true};
        case 'STOP_LOADING_API' : 
            return {...state, loadingApi: false};
        case 'ERRORS_API'       :
            return {...state, errorsApi: action.errorsApi, loadingApi: false}
        case 'DATA'         :
            return {...state, data: action.data, loadingApi: false}
    }
}

export const useApiFetch = function() {
    const {state, dispatch} = useReducer(reducer, {
        loadingApi     : false,
        data        : null,
        errorsApi      : [],
    });

    const doFetch = useCallback( async function (endpoint, options) {
        dispatch({type: 'START_LOADING_API'});
        try{
            const data = await apiFetch(endpoint, options);
            dispatch({type: 'DATA', data});
        }catch(errorsApi){
            dispatch({type: 'ERRORS_API', errorsApi});
        }
        
    }, []);
    
    return {
        errorsApi   : state.errorsApi,
        loadingApi  : state.loadingApi,
        data     : state.data,
        doFetch
    }
}