import { MainPage } from '../../pages/main-page/main-page.tsx';

type AppProps = {
  placesCount: number;
}

// WebStorm помечает 'JSX' в 'JSX.Element' как deprecated, тогда что использовать?
export function App({placesCount}: AppProps): JSX.Element {
  return <MainPage placesCount={placesCount} />;
}
