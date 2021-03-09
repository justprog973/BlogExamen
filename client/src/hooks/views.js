import {useReducer} from "react";
import {apiFetch} from "../utils/api";


function reducer(state, action) {
    //console.log('VIEWS', action.type, action);
    switch (action.type) {
        case 'START_VIEWS':
            return {...state, loading: true};
        case 'SET_VIEWS_POSTS':
            return {...state, views: action.payload, loading: false};
        default:
            throw new Error('Action inconnue ' + action.type);
    }
}

export function useViews(){
    const [state, dispatch] = useReducer(reducer, {
        views    : null,
        loading  : false,
    });

    return {
        views       : state.views,
        loading     : state.loading,
        viewsPost   : async function () {
            if (state.loading || state.views) {
                return;
            }
                dispatch({type:'START_VIEWS'});
                const views = await apiFetch('view');
                dispatch({type:'SET_VIEWS_POSTS', payload:views});
        }
    }
}