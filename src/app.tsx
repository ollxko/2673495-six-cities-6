import FavoritesPage from './pages/favorites-page/favorites-page';
import LoginPage from './pages/login-page/login-page';
import MainPage from './pages/main-page/main-page';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import OfferPage from './pages/offer-page/offer-page';
import NotFoundPage from './pages/not-found-page/not-found-page';
import PrivateRoute from './components/private-route';
import { OffersType } from './mocks/offers';

type AppProps = {

  offers: OffersType[];
};

export default function App({ offers }: AppProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<MainPage offers={offers} />}
        >
        </Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route
          path="/favorites"
          element={
            <PrivateRoute isAuthorized>
              <FavoritesPage offers={offers} />
            </PrivateRoute>
          }
        />
        <Route path="/offer/:id" element={<OfferPage />}></Route>
        <Route path="/*" element={<NotFoundPage />}></Route>
      </Routes>
    </BrowserRouter>
  );
}
