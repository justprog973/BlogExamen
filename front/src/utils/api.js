import {API_URL} from '../config';

/**
 * Errors send bay
 */
export class ApiErrors{
    constructor(errors){
        this.errors = errors;
    }
}

/**
 * @param {string} endpoint
 * @param {Object} options
 * @param init
 * @param replace
 */
export async function apiFetch(endpoint, options=[], init={}, replace = false) {
        const response = await fetch(API_URL+endpoint,
            !replace ? {
                credentials: 'include',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                ...options
            }  : init,
        );

        const responseData = await response.json();
        if(response.ok){
            return responseData;
        }else{
            if(responseData.errors){
                throw new ApiErrors(responseData.errors);
            }
        }
}

export function formToJson(form){
    let object = {};
    const formData = new FormData(form);
    formData.forEach((value,key) => { object[key] = value; });
    return JSON.stringify(object);
}