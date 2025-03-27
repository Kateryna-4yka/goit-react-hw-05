import css from './HomePage.module.css';
import {useEffect, useState} from 'react';
import {requests} from '../../requestsToTheServer';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage () {

const [info, setInfo] = useState ([]);
const [error, setError] = useState (false);
const [loader, setLoader] =useState (false);

useEffect (()=>{
    setError(false)
    setLoader(true);

    async function requestsOnServ () {
        try {
            const data = await requests ();
            if (!data || data.length === 0) {setError(true)}
            else {setInfo (data);}
        }
        catch {setError(true)} 
        finally {setLoader(false);}
    }
    requestsOnServ();
}, [])

return <div>
        <h3 className={css.h3}>Trending today</h3>
        {loader && <p>Loading...</p>}
        {error && <p>Please, reload the page</p>}
        <MovieList info={info}/>
    </div>
}