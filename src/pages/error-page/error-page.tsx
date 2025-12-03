import { Link } from 'react-router-dom';
import { ReactNode } from 'react';

type ErrorPageProps = {
  statusCode: number;
  message: string;
}

export function ErrorPage({ message, statusCode }: ErrorPageProps): ReactNode {
  return (
    <div className="page page--gray page--main">
      <main className="page__main">
        <div className="container error-container">
          <div className='error-info'>
            <h1 style={{margin: 0}}>{statusCode}</h1>
            <span>{message ?? 'Not found'}</span>
          </div>
          <Link to='/' className='main-page-button'>
            Go to main page
          </Link>
        </div>
      </main>
    </div>
  );
}
