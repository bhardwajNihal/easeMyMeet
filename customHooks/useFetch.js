import { useState } from "react";


export default function useFetch(cb) {
    
    const [data,setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    async function fn(...args) {
        
        setLoading(true);
        setError(null);
        
        try {
            const response = await cb(...args);
            setData(response);
        } catch (error) {
            setError(error);
        }
        finally{
            setLoading(false);
        }
    }

    return {data, error, loading, fn};
}