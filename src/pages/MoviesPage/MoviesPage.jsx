import { useState, useEffect } from 'react';
import css from './MoviesPage.module.css';
import {filterByName} from '../../requestsToTheServer';
import MovieList from '../../components/MovieList/MovieList';
import toast, { Toaster } from 'react-hot-toast';
import {useSearchParams} from 'react-router';


export default function MoviesPage () {
  const [info, setInfo] = useState (null);
  const [error, setError] = useState (false);
  const [loader, setLoader] =useState (false);
  const [searchParams, setSearchParams] = useSearchParams(); 
  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) {setInfo([]); return;}

    async function fetchMovies() {
      setError(false);
      setLoader(true);
      try {
        const data = await filterByName(query);

        if (!data || data.length === 0) {toast("No movies found!"); setSearchParams({});}
        else {setInfo (data);}

      } catch {
        setError(true);
      } finally {
        setLoader(false);
      }
    }
    fetchMovies();
}, [query, setSearchParams]); 

  const handelSubmit = (event) => {
    event.preventDefault();
    const searchWord = event.target.elements.word.value.trim();
    if (!searchWord) {toast("Enter the movie title to search."); return;}

    const nextParams = new URLSearchParams (searchParams);
    nextParams.set('query', searchWord);
    setSearchParams (nextParams);

    event.target.reset(); 
  };

return <div>
        <form className={css.form} onSubmit={handelSubmit}>
          <input className={css.input} name="word" type='text' defaultValue={query} />
          <button className={css.btn} type="submit" disabled={loader}>Search</button>
        </form>
        {loader && <p>Loading...</p>}
        {error && <p>Error occurred. Please try again.</p>}
        {info && <MovieList info={info}/>}

        <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000, 
          style: {
            background: "rgba(0, 0, 0, 0.7)", 
            color: "#fff", 
            fontSize: "14px", 
            padding: "10px",
            borderRadius: "8px",
          },
        }}
      />
      </div>
}