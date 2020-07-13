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
 * Errors send bay
 */
export class DataBaseErrors{
    constructor(errors){
        this.errors = errors;
    }
}

/**
 * @param {string} endpoint 
 * @param {Object} options 
 */
export async function apiFetch(endpoint, options=[]) {
        const response = await fetch(API_URL+endpoint,{
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            ...options
        });

        const responseData = await response.json();
        if(response.ok){
            return responseData;
        }else{
            if(responseData.errors){
                throw new ApiErrors(responseData.errors);
            }
        }
}

export function fromToJson(form){
    let object = {};
    const formData = new FormData(form);
    formData.forEach((value,key) => { object[key] = value; });
    console.log(object);
    return JSON.stringify(object);
}