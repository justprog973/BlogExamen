import {useState} from 'react';

export function useLocalStorage(key, initialValue){
    const [storedValue, setStoredValue] = useState(function (){
        try{
            const item  = window.localStorage.getItem(key);
            return item ? JSON.parse(item) : initialValue;
        }catch(error){
            return initialValue;
        }
    });

    const setValue = function (value) {
        try {
            setStoredValue(value)
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error){
            console.error(error);
        }
    }

    return [storedValue, setValue];
}