import { Link } from 'react-router-dom';
import { ReactNode } from 'react';
import { StatusCodes } from 'http-status-codes';

import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { ServerErrorType } from '../../enums/server-error-type.ts';

type ErrorPageProps =
  | {
      statusCode?: null;
      message?: null;
    }
  | {
      statusCode: StatusCodes;
      message: string;
    }

export function ErrorPage({ statusCode, message }: ErrorPageProps): ReactNode {
  const error = useAppSelector((state) => state.error) ?? {
    errorType: ServerErrorType.CommonError,
    status: statusCode ?? StatusCodes.INTERNAL_SERVER_ERROR,
    message: message ?? 'Internal Server Error',
  };

  return (
    <div className="page page--gray page--main">
      <main className="page__main">
        <div className="container error-container">
          <div className='error-info'>
            <h1 style={{margin: 0}}>{error.status}</h1>
            <span>{error.message}</span>
          </div>
          <Link to='/' className='main-page-button'>
            Go to main page
          </Link>
        </div>
      </main>
    </div>
  );
}
