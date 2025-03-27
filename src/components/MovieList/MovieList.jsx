import {Link} from 'react-router-dom';
import { useLocation } from "react-router";
import css from './MovieList.module.css';

export default function MovieList ({info}) {
const location = useLocation();

return (
    <ul className={css.ul}>
      {info.map((el) => (
        <li key={el.id} className={css.li}>
          <Link to={`/movies/${el.id}`} state={location}>
            {el.poster_path && (
              <img
                src={`https://image.tmdb.org/t/p/w300${el.poster_path}`}
                alt={el.title}
                className={css.img}
              />
            )}
            <h4 className={css.h4}>{el.title}</h4>
          </Link>
        </li>
      ))}
    </ul>
  );}