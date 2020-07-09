import {useReducer} from 'react';
import {apiFetch} from '../utils/api';

function reducer(state, action) {
    console.log('POSTS', action.type, action);
    switch(action.type) {
        case 'FETCHING_POSTS':
            return {...state, loading: true};
        case 'SET_POSTS':
            return {...state, posts: action.payload, loading: false};
        default :
            return null;
    }
}

export function usePosts(){
    const [state, dispatch] = useReducer(reducer,{
        posts: null,
        loading : false
    });

    return {
        posts: state.posts,
        fetchPosts: async function (){
            if(state.loading || state.posts){
                return;
            }
            dispatch({type: 'FETCHING_POSTS'});
            const posts = await apiFetch('allposts');
            dispatch({type: 'SET_POSTS', payload: posts});
        }
    }
}