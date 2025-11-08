import FavoritesPage from './pages/favorites-page/favorites-page';
import LoginPage from './pages/login-page/login-page';
import MainPage from './pages/main-page/main-page';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import OfferPage from './pages/offer-page/offer-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import PrivateRoute from './components/private-route';

type AppProps = {
  placesCount: number;
};

export default function App({ placesCount }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<MainPage placesCount={placesCount}/>}></Route>
        <Route path='/login' element={<LoginPage />}></Route>
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuthorized={false}>
              <FavoritesPage />
            </PrivateRoute>
          }
        />
        <Route path='/offer/:id' element={<OfferPage />}></Route>
        <Route path='/*' element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
