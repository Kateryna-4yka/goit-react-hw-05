import { useParams, Link, NavLink, Outlet } from "react-router-dom";
import {requestsByID} from '../../requestsToTheServer';
import {useState, useEffect} from 'react';
import css from './MovieCast.module.css';

export default function MovieCast () {

const params = useParams();

const [info, setInfo] = useState (null);
const [error, setError] = useState (false);
const [loader, setLoader] =useState (false);

useEffect (()=>{

    setError(false)
    setLoader(true);
async function requestsOnServ () {
    try {
const data = await requestsByID (params.movieId, "/credits");
setInfo (data);
} 
catch {setError(true)} 
finally {setLoader(false);}
}

requestsOnServ();
}, [params.movieId])

return (<div>
        {loader && <p>Loading...</p>}
        {error && <p>Please, reload the page</p>}
        {info?.cast?.length === 0 && <p>The list of actors is missing</p>}
        <ul className={css.ul}>
        {info && info.cast.map ((el)=>{
        return <li  className={css.li} key={el.id}>
          {el.profile_path && (
                <img
                  className={css.img}
                  src={`https://image.tmdb.org/t/p/w300${el.profile_path}`}
                  alt={el.name}
                />
              )}
            <h5 className={css.h5}>{el.name}</h5>
            <p className={css.p}>Character: {el.character}</p>
            </li>
        })} 

        </ul>

        
        
</div>)

                }