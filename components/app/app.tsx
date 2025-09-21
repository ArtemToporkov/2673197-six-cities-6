import MainPage from '../../pages/main-page/main-page.tsx';

type AppProps = {
  placesCount: number;
}

function App({placesCount}: AppProps): JSX.Element {
  return <MainPage placesCount={placesCount} />;
}

export default App;
