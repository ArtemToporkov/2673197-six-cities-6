import { MainPage } from '../../pages/main-page/main-page.tsx';

type AppProps = {
  placesCount: number;
}

export function App({placesCount}: AppProps): JSX.Element {
  return <MainPage placesCount={placesCount} />;
}
