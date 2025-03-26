import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import { useNavigate } from "react-router-dom";

import css from './NotFoundPage.module.css';

export default function NotFoundPage () {
    const nav = useNavigate();

    useEffect (()=>{
        const timer =setTimeout (()=>{
            nav("/", {replace: true});
        }, 8000)

        return () => clearInterval(timer);
    }, [nav])
           
    return <p className={css.p}>Sorry, no such page exists! Go back to <Link className={css.link} to="/">Home</Link>!</p>
}