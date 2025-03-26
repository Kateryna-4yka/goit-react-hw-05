import { Routes, Route } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import MoviesPage from '../../pages/MoviesPage/MoviesPage';
import HomePage from '../../pages/HomePage/HomePage';
import MovieDetailsPage from '../../pages/MovieDetailsPage/MovieDetailsPage';
import MovieCast from '../MovieCast/MovieCast';
import MovieReviews from '../MovieReviews/MovieReviews';
import NotFoundPage from '../../pages/NotFoundPage/NotFoundPage';

export default function App() {
  return <>
  <Navigation />
  
  <Routes>
    <Route path='/' element={<HomePage />} />
    <Route path='/movies' element={<MoviesPage />} />

    <Route path='/movies/:movieId' element={<MovieDetailsPage />}>
      <Route path='/movies/:movieId/cast' element={<MovieCast />} />
      <Route path='/movies/:movieId/reviews' element={<MovieReviews />} />
    </Route>

    <Route path='*' element={<NotFoundPage />} />
  </Routes>


  </>
}

