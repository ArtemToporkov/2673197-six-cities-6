import { Link } from 'react-router-dom';

export function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <main className="page__main">
        <div className="container error-container">
          <div className='error-info'>
            <h1 style={{margin: 0}}>404</h1>
            <span>Not found</span>
          </div>
          <Link to='/' className='main-page-button'>
            Go to main page
          </Link>
        </div>
      </main>
    </div>
  );
}
