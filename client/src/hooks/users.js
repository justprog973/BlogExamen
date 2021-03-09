import {useReducer} from 'react';
import {ApiErrors, apiFetch} from '../utils/api';
import notify from "../utils/notify";

function reducer(state, action) {
    console.log('USERS', action.type, action);
    switch (action.type) {
        case 'START_USERS':
            return {...state, loading: true};
        case 'SET_USERS':
            return {...state, users: action.payload, loading: false};
        case 'UPDATE_ADMIN':
            return {...state, users: state.users.map(u => u === action.target ? action.payload : u), loading: false};
        case 'TOKEN_USER':
            return {...state, users: action.payload, loading: false};
        case 'STOP_USERS':
            return {...state, loading: false};
        default :
            throw new Error('Action inconnue ' + action.type);
    }
}

export function useUsers() {
    const [state, dispatch] = useReducer(reducer, {
        users: null,
        loading: false,
    });

    return {
        users: state.users,
        loading: state.loading,
        fetchUser: async function () {
            if (state.loading || state.users) {
                return null;
            }
            dispatch({type: 'START_USERS'});
            const users = await apiFetch('admin/allusers');
            dispatch({type: 'SET_USERS', payload: users});
        },
        updateUser: async function (user, data, action) {
            dispatch({type: 'START_USERS'});
            try {
                const user = await apiFetch(`user/profile/update`, {
                    method: 'PUT',
                    body: data
                });
                action.onConnect(user);
                notify('success', 'Votre profile a bien été modifié.');
                dispatch({type: 'STOP_USERS'});
            } catch (e) {
                if (e instanceof ApiErrors) {
                    const oldUser = JSON.parse(data);
                    console.log(e);
                    notify('error', `L'username ${oldUser.username} est déjà utilisé.`);
                    dispatch({type: 'STOP_USERS'});
                } else {
                    throw e;
                }
            }
        },
        updateAdmin: async function (user, data) {
            dispatch({type: 'START_USERS'});
            const newUser = await apiFetch(`user/profile/update/${user._id}`, {
                method: 'PUT',
                body: data
            });
            dispatch({type: 'UPDATE_ADMIN', payload: newUser, target: user});
        },
        forgetUser: async function (id, data) {
            dispatch({type: 'START_USERS'});
            try {
                await apiFetch(`reset/${id}`, {
                    method: 'POST',
                    body: data
                });
                notify('success', 'Votre mot de passe a bien été modifier.');
                dispatch({type: 'STOP_USERS'});
            } catch (e) {
                if (e instanceof ApiErrors) {
                    notify('error', e.errors.message);
                    dispatch({type: 'STOP_USERS'});
                } else {
                    throw e;
                }
            }
        },
        resetPasswordUser: async function (data) {
            dispatch({type: 'START_USERS'});
            try {
                const user = await apiFetch(`reset`, {
                    method: 'POST',
                    body: data
                });
                notify('success', 'Un email vous a été envoyé.');
                dispatch({type: 'STOP_USERS'});
                return user;
            } catch (e) {
                if (e instanceof ApiErrors) {
                    dispatch({type: 'STOP_USERS'});
                    return e.errors.message;
                } else {
                    throw e;
                }
            }
        },
        checkToken: async function (id) {
            dispatch({type: 'START_USERS'});
            if (state.loading) {
                return null;
            }
            try {
                const user = await apiFetch(`token/${id}`);
                dispatch({type: 'TOKEN_USER', payload: user});
            } catch (e) {
                if (e instanceof ApiErrors) {
                    notify('error', e.errors.message);
                    dispatch({type: 'STOP_USERS'});
                } else {
                    throw e;
                }
            }
        },
        deleteUser: async function (id, onConnect) {
            await apiFetch(`user/delete/${id}`, {
                method: 'DELETE'
            });
            onConnect(null);
        }
    }
}