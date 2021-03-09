import {useCallback, useReducer} from 'react';
import {apiFetch} from '../utils/api';
import notify from "../utils/notify";

/**
 *
 * @param state
 * @param action
 * @returns {{loading: boolean, posts: *}|{loading: boolean}|{posts: T[]}|{loading: boolean, posts: *[]}}
 */
function reducer(state, action) {
    //console.log('POSTS', action.type, action);
    switch (action.type) {
        case 'START_POSTS':
            return {...state, loading: true};
        case 'SET_POSTS':
            return {...state, posts: action.payload.posts, oldPosts: action.payload.oldPosts, loading: false};
        case 'SET_POSTS_USER':
            return {...state, posts: action.payload, loading: false};
        case 'SET_SINGLE_POST':
            return {...state, posts: action.payload, loading: false};
        case 'ADD_POST':
            return {...state, posts: [action.payload, ...state.posts], loading: false};
        case 'UPDATE_POST':
            return {...state, posts: state.posts.map(p => p === action.target ? action.payload : p), loading: false};
        case 'DELETE_POST':
            return {...state, posts: state.posts.filter(p => p !== action.payload)};
        case 'STOP_POSTS':
            return {...state, loading: false};
        default :
            throw new Error('Action inconnue ' + action.type);
    }
}

export function usePosts() {
    const [state, dispatch] = useReducer(reducer, {
        posts: null,
        oldPosts: null,
        loading: false,
    });

    return {
        posts: state.posts,
        oldPosts: state.oldPosts,
        loading: state.loading,
        fetchPosts: async function (idCateg) {
            dispatch({type: 'START_POSTS'});
            const posts = idCateg ? await apiFetch(`allposts/${idCateg}`) : await apiFetch(`allposts`);
            const oldPosts = await apiFetch(`allposts`);
            dispatch({type: 'SET_POSTS', payload: {posts: posts, oldPosts: oldPosts.slice(oldPosts.length - 3)}});
        },
        fetchPostsUser: useCallback(async function (id) {
            if (state.loading || state.posts) {
                return;
            }
            dispatch({type: 'START_POSTS'});
            const posts = await apiFetch(`post/author${id ? '/' + id : ''}`);
            dispatch({type: 'SET_POSTS_USER', payload: posts});
        }, [state]),
        fetchSinglePost: useCallback(async function (id) {
            if (state.loading || state.posts) {
                return;
            }
            dispatch({type: 'START_POSTS'});
            const post = await apiFetch(`singlepost/${id}`);
            dispatch({type: 'SET_SINGLE_POST', payload: post});
        }, [state]),
        createPost: async function (data) {
            dispatch({type: 'START_POSTS'});
            try {
                const newPost = await apiFetch('post/create', [], {
                    credentials: 'include',
                    method: 'post',
                    body: data
                }, true);
                dispatch({type: 'ADD_POST', payload: newPost});
                notify('success', 'Le post a été créé avec success.');
                return newPost;
            } catch (e) {
                dispatch({type: 'STOP_POSTS'});
                notify('error', 'Ce poste est déjà existant veuillez modifier le contenu !');
                return e;
            }

        },
        updatePost: async function (post, data) {
            dispatch({type: 'START_POSTS'});
            const newPost = await apiFetch(`post/update/${post._id}`, {
                method: 'PUT',
                body: JSON.stringify(data)
            });
            dispatch({type: 'UPDATE_POST', payload: newPost, target: post});
        },
        deletePost: async function (post) {
            await apiFetch(`post/delete/${post._id}`, {
                method: 'DELETE'
            });
            dispatch({type: 'DELETE_POST', payload: post});
        }
    }
}