import {useReducer} from 'react';
import {apiFetch} from '../utils/api';

function reducer(state, action) {
    console.log('CATEGORIES', action.type, action);
    switch(action.type) {
        case 'FETCHING_CATEGORIES':
            return {...state, loading: true};
        case 'SET_CATEGORIES':
            return {...state, categories: action.payload, loading: false};
        default :
            throw new Error('Action inconnue ' + action.type);
    }
}

export function useCategories(){
    const [state, dispatch] = useReducer(reducer,{
        categories: null,
        loading : false
    });

    return {
        categories: state.categories,
        fetchCategories: async function (){
            if(state.loading || state.categories){
                return null;
            }
            dispatch({type: 'FETCHING_CATEGORIES'});
            const categories = await apiFetch('allcategories');
            dispatch({type: 'SET_CATEGORIES', payload: categories});
        }
    }
}