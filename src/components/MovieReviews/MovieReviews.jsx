import { useParams, Link, NavLink, Outlet } from "react-router-dom";
import {requestsByID} from '../../requestsToTheServer';
import {useState, useEffect} from 'react';
import css from './MovieReviews.module.css';

export default function MovieReviews () {
    const params = useParams();
    const [info, setInfo] = useState (null);
    const [error, setError] = useState (false);
    const [loader, setLoader] =useState (false);
    
    useEffect (()=>{
        setError(false)
        setLoader(true);
        async function requestsOnServ () {
            try {
                const data = await requestsByID (params.movieId, "/reviews");
                if (!data || data.length === 0) {setError(true)}
                else {setInfo (data.results);}
            } 
            catch {setError(true)} 
            finally {setLoader(false);}
        }
        requestsOnServ();
    }, [params.movieId])
    
    return (<div>
        {loader && <p>Loading...</p>}
        {error && <p>Please, reload the page</p>}
        <ul>
            {info && info.length === 0 && <p>No reviews yet</p>}
            {info && info.length > 0 && info.map ((el)=>{
            return <li key={el.id}>
            <h5 className={css.h5}>Author: {el.author}</h5>
            <p className={css.p}>{el.content}</p>
            </li>
        })} 
        </ul>
     
    </div>)
}