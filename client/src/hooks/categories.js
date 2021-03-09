import {useCallback, useReducer} from 'react';
import {ApiErrors, apiFetch} from '../utils/api';
import notify from "../utils/notify";

/**
 *
 * @param state
 * @param action
 * @returns {{categories: *}|{loading: boolean}|{categories: *[], loading: boolean}|{categories: *, loading: boolean}}
 */
function reducer(state, action) {
    //console.log('CATEGORIES', action.type, action);
    switch (action.type) {
        case 'START_CATEGORIES':
            return {...state, loading: true};
        case 'SET_CATEGORIES':
            return {...state, categories: action.payload, loading: false};
        case 'ADD_CATEGORY':
            return {...state, categories: [...state.categories, action.payload], loading: false};
        case 'UPDATE_CATEGORY':
            return {
                ...state,
                categories: state.categories.map(p => p === action.target ? action.payload : p),
                loading: false
            };
        case 'DELETE_CATEGORY':
            return {...state, categories: state.categories.filter(p => p !== action.payload), loading: false};
        default :
            throw new Error('Action inconnue ' + action.type);
    }
}

/**
 *
 * @returns {{fetchCategories: fetchCategories, updateCategories, categories: *}}
 */
export function useCategories() {
    const [state, dispatch] = useReducer(reducer, {
        categories: null,
        loading: false,
    });

    return {
        categories: state.categories,
        loading: state.loading,
        fetchCategories: useCallback(async function () {
            if (state.loading || state.categories) {
                return null;
            }
            dispatch({type: 'START_CATEGORIES'});
            const categories = await apiFetch('allcategories');
            dispatch({type: 'SET_CATEGORIES', payload: categories});
        },[state.categories, state.loading]),
        createCategory: async function (data) {
            dispatch({type: 'START_CATEGORIES'});
            try {
                const newCategory = await apiFetch('admin/category/add', {
                    method: 'post',
                    body: JSON.stringify(data)
                });
                dispatch({type: 'ADD_CATEGORY', payload: newCategory});
                notify('success','La catégorie a bien été ajouté !');
            } catch (e) {
                if (e instanceof ApiErrors) {
                    dispatch({type: 'START_CATEGORIES'});
                    const categories = await apiFetch('allcategories');
                    dispatch({type: 'SET_CATEGORIES', payload: categories});
                    notify('error',`La catégorie existe ${data.name} déjà !`, 5000);
                } else {
                    throw e;
                }
            }
        },
        updateCategory: async function (category, data) {
            dispatch({type: 'START_CATEGORIES'});
            const newPost = await apiFetch(`admin/category/update/${category._id}`, {
                method: 'PUT',
                body: JSON.stringify(data)
            });
            dispatch({type: 'UPDATE_CATEGORY', payload: newPost, target: category});
        },
        deleteCategory: async function (category) {
            dispatch({type: 'START_CATEGORIES'});
            try {
                await apiFetch(`admin/category/delete/${category._id}`, {
                    method: 'DELETE'
                });
                notify('success', 'La catégorie a bien été supprimé !');
            } catch (e) {
                if (e instanceof ApiErrors) {
                    dispatch({type: 'START_CATEGORIES'});
                    const categories = await apiFetch('allcategories');
                    dispatch({type: 'SET_CATEGORIES', payload: categories});
                    notify('error', e.errors.message, 5000);
                } else {
                    throw e;
                }
            }
            dispatch({type: 'DELETE_CATEGORY', payload: category});
        }
    }
}