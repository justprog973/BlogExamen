import {useReducer} from 'react';
import {apiFetch} from '../utils/api';

function reducer(state, action) {
    console.log('POSTS', action.type, action);
    switch (action.type) {
        case 'START_POSTS':
            return {...state, loading: true};
        case 'SET_POSTS':
            return {...state, posts: action.payload, loading: false};
        case 'SET_POSTS_USER':
            return {...state, posts: action.payload, loading: false};
        case 'SET_SINGLE_POST':
            return {...state, posts: action.payload, loading: false};
        case 'ADD_POST':
            return {...state, posts: [...state.posts, action.payload], loading: false};
        case 'UPDATE_POST':
            return { ...state, posts: state.posts.map(p => p === action.target ? action.payload : p), loading: false };
        case 'DELETE_POST':
            return { ...state, posts: state.posts.filter(p => p !== action.payload) };
        default :
            throw new Error('Action inconnue ' + action.type)
    }
}

export function usePosts() {
    const [state, dispatch] = useReducer(reducer, {
        posts: null,
        loading: false,
        errors: null
    });

    return {
        posts   : state.posts,
        loading : state.loading,
        errors  : state.errors,
        fetchPosts: async function (id) {
            if (state.loading || state.posts) {
                return;
            }
            dispatch({type: 'START_POSTS'});
            const posts = id ? await apiFetch(`allposts/${id}`) : await apiFetch(`allposts`);
            dispatch({type: 'SET_POSTS', payload: posts});
        },
        createPost: async function (data) {
            dispatch({type: 'START_POSTS'});
            const newPost = await apiFetch('post/create', [],{
                credentials: 'include',
                method: 'post',
                body: data
            },true);
            dispatch({ type: 'ADD_POST', payload: newPost });
        },
        fetchPostsUser: async function (id) {
            if (state.loading || state.posts) {
                return;
            }
            dispatch({type: 'START_POSTS'});
            const posts = await apiFetch(`post/author/${id}`);
            dispatch({type: 'SET_POSTS_USER', payload: posts});
        },
        fetchSinglePost: async function (id) {
            if (state.loading || state.posts) {
                return;
            }
            dispatch({type: 'START_POSTS'});
            const post = await apiFetch(`singlepost/${id}`);
            dispatch({type: 'SET_SINGLE_POST', payload: post});
        },
        updatePost: async function (post, data) {
            dispatch({type: 'START_POSTS'});
            const newPost = await apiFetch(`post/update/${post._id}`, {
                    method: 'PUT',
                    body: JSON.stringify(data)
                });
            dispatch({ type: 'UPDATE_POST',payload: newPost, target: post });
        },
        deletePost: async function (post) {
            await apiFetch(`post/delete/${post._id}`, {
                method: 'DELETE'
            });
            dispatch({ type: 'DELETE_POST', payload: post });
        }
    }
}