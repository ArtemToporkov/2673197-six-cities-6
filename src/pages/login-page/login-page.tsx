import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { Link, Navigate } from 'react-router-dom';
import { useEffect, useState, type ReactNode } from 'react';

import { login } from '../../store/api-actions.ts';
import { resetError } from '../../store/error/error-slice.ts';
import { AuthStatus } from '../../enums/auth-status.ts';
import { AppRoute } from '../../enums/app-route.ts';
import { ServerErrorType } from '../../enums/server-error-type.ts';
import { Header } from '../../components/header/header.tsx';
import type { ServerError } from '../../types/server-error.ts';

import style from './login-page.module.css';

function CurrentLocation({ cityName }: { cityName: string }): ReactNode {
  return (
    <section className="locations locations--login locations--current">
      <div className="locations__item">
        <Link
          className="locations__item-link"
          to={AppRoute.Main}
        >
          <span>{cityName}</span>
        </Link>
      </div>
    </section>
  );
}

export function LoginPage(): ReactNode {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useAppDispatch();

  const authState = useAppSelector((state) => state.user.authStatus);
  const error = useAppSelector((state) => state.error) as ServerError | null;
  const currentCity = useAppSelector((state) => state.cities.city);

  useEffect(() => {
    dispatch(resetError());
  }, [dispatch]);

  useEffect(() => {
    if (error && error.errorType === ServerErrorType.ValidationError) {
      setErrors(error.details.map(
        (detail) => `${detail.property}: ${detail.messages.join(', ')}`)
      );
    }
  }, [error]);

  if (authState === AuthStatus.Authorized) {
    return <Navigate to={AppRoute.Main} />;
  }

  const validatePassword = (value: string) => {
    let hasLatinLetter = false;
    let hasDigit = false;

    for (const char of value) {
      if ((char >= 'a' && char <= 'z') || (char >= 'A' && char <= 'Z')) {
        hasLatinLetter = true;
      } else if (char >= '0' && char <= '9') {
        hasDigit = true;
      }
    }

    return hasLatinLetter && hasDigit;
  };

  return (
    <div className="page page--gray page--login">
      <Header withNav={false} />
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action="#"
              method="post"
              onSubmit={(e) => {
                e.preventDefault();
                if (!validatePassword(password)) {
                  setErrors(['Password must contain at least one Latin letter and one digit']);
                  return;
                }
                dispatch(login({ email: email, password: password }));
              }}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor="email" className="visually-hidden">E-mail</label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors([]);
                  }}
                  id="email"
                  className="login__input form__input"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label htmlFor="password" className="visually-hidden">Password</label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors([]);
                  }}
                  id="password"
                  className="login__input form__input"
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  required
                />
              </div>
              <button
                className="login__submit form__submit button"
                type="submit"
              >
                Sign in
              </button>
            </form>
            <div className={style['auth-errors']}>
              <ul>
                {errors.map((e) => <li key={e}>{e}</li>)}
              </ul>
            </div>
          </section>
          {currentCity && <CurrentLocation cityName={currentCity.name} />}
        </div>
      </main>
    </div>
  );
}
