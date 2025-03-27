import { useParams, Link, NavLink, Outlet, useLocation } from "react-router-dom";
import {requestsByID} from '../../requestsToTheServer';
import {useState, useEffect, useRef, Suspense} from 'react';
import css from './MovieDetailsPage.module.css';
import { clsx } from 'clsx';
const buildClass = ({ isActive }) => {return clsx(css.link, isActive && css.active);};

export default function MovieDetailsPage () {
    const params = useParams();
    const location = useLocation();
    const back = useRef(location.state);
    const [info, setInfo] = useState (null);
    const [error, setError] = useState (false);
    const [loader, setLoader] =useState (false);

    useEffect (()=>{
        setError(false)
        setLoader(true);
        async function requestsOnServ () {
            try {
                const data = await requestsByID (params.movieId);

                if (!data || data.length === 0) {setError(true)}
                else {setInfo (data);}
            } 
            catch {setError(true)} 
            finally {setLoader(false);}
        }
        requestsOnServ();
    }, [params.movieId])

    return <div >
        <Link className={css.link} to={back.current}>Go back</Link>

        {loader && <p>Loading...</p>}
        {error && <p>Error occurred. Please try again.</p>}
        {info && <div className={css.divBox}>
        <img 
            src={`https://image.tmdb.org/t/p/w300${info.poster_path}`} alt={info.title}
            className={css.img}/>

        <div>

        <h3 className={css.h3}>{info.title} ({info.release_date?.substring(0, 4)})</h3>
        <p className={css.p}>User Score: {Math.round(info.vote_average * 10)}%</p>
        <h5>Overview</h5>
        <p className={css.p}>{info.overview}</p>  

        <h5>Genres</h5>
        <ul className={css.ul}>
        {info.genres.map(el=>{
            return <li className={css.p} key={el.id}> {el.name}</li>})} 
        </ul>

        <h5>Original language: {info.original_language}</h5>
        <h5>Country: {info.origin_country}</h5>
        <h5>Production companies: </h5>
        <ul className={css.ul}>{info.production_companies.map(el=>{
            return <li className={css.pL}  key={el.id}>
                        {el.name}
                    </li>})}
        </ul>
        </div>
        </div>}

        <h5>Additional information</h5>
        <div className={css.div}>
        <NavLink  className={buildClass} to="cast">Cast</NavLink>
        <NavLink  className={buildClass} to="reviews">Rewiews</NavLink>
        </div>
        <Suspense fallback={`Loadinp page...`}>
            <Outlet />
        </Suspense>
</div>
}