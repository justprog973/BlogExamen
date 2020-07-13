import {useReducer} from 'react';
import {ApiErrors, apiFetch, fromToJson} from '../utils/api';
import {API_URL} from "../config";

function reducer(state, action) {
    console.log('POSTS', action.type, action);
    switch (action.type) {
        case 'FETCHING_POSTS':
            return {...state, loading: true};
        case 'SET_POSTS':
            return {...state, posts: action.payload, loading: false};
        case 'ADD_POST':
            return {...state, posts: [action.payload, ...state.posts]};
        case 'ERRORS' :
            return {...state, errors: action.payload};
        case 'POSTS_IN_PROGRESS':
            return {...state, posts: action.payload, loading: false};
        default :
            throw new Error('Action inconnue ' + action.type)
    }
}

export function usePosts() {
    const [state, dispatch] = useReducer(reducer, {
        posts   : null,
        loading : false,
        errors  :null
    });

    return {
        posts   : state.posts,
        loading : state.loading,
        fetchPosts: async function () {
            if (state.loading || state.posts) {
                return;
            }
            dispatch({type: 'FETCHING_POSTS'});
            const posts = await apiFetch('allposts', []);
            dispatch({type: 'SET_POSTS', payload: posts});
        },
        createPost: async function (data) {
            dispatch({type: 'FETCHING_POSTS'});
            const response = await fetch(API_URL+'post/create', {
                credentials : 'include',
                method      : 'post',
                body        : data
            });
            const responseData = await response.json();
            if(response.ok){
                dispatch({type: 'ADD_POST', payload: responseData});
            }else{
                if(responseData.errors){
                    dispatch({type:'ERRORS', payload: responseData});
                }
            }
        }
    }
}