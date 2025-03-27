import {NavLink} from 'react-router-dom';
import css from './Navigation.module.css';
import { clsx } from 'clsx';

const buildClass = ({ isActive }) => {return clsx(css.link, isActive && css.active);};
  
export default function Navigation () {
return <div className={css.div}>
<NavLink className={buildClass} to="/">Home</NavLink>
<NavLink className={buildClass} to="/movies">Movies</NavLink>
</div>}