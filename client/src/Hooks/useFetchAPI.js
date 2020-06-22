import {useState, useEffect} from 'react';

function useAsyncEffect(cb, dependencies= []){
    useEffect(()=>{
        cb()
    },dependencies);
}

export function useFetch(url,params){
    const [loading,setLoading] = useState(true);
    const [results,setResults] = useState(null);
    useAsyncEffect(async () =>{
        const response = await fetch(url,{
            headers : {
                'Accept': 'aplication/json'
            },
            method : 'GET'
        });

        const responseData = await response.json();
        if(response.ok){
            setResults(responseData);
        }else{
            alert('Error',  JSON.stringify(responseData))
        }
        setLoading(false);
    });
    return [loading,results];
}