import { ReactNode, useState } from 'react';

import { useAppDispatch } from '../../hooks/use-app-dispatch.ts';
import { login, resetError } from '../../store/action.ts';
import { useAppSelector } from '../../hooks/use-app-selector.ts';
import { AuthStatus } from '../../enums/auth-status.ts';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../enums/app-route.ts';

import style from './login-page.module.css';
import { ServerErrorType } from '../../enums/server-error-type.ts';

export function LoginPage(): ReactNode {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const dispatch = useAppDispatch();
  dispatch(resetError());

  const authState = useAppSelector((state) => state.user.authStatus);
  const error = useAppSelector((state) => state.error);
  if (error && error.errorType === ServerErrorType.ValidationError) {
    setErrors(error.details.map(
      (detail) => `${detail.property}: ${detail.messages.join(', ')}`)
    );
  }


  if (authState === AuthStatus.Authorized) {
    return <Navigate to={AppRoute.Main} />;
  }

  return (
    <div className="page page--gray page--login">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <div className="header__left">
              <a className="header__logo-link" href="main.html">
                <img
                  className="header__logo"
                  src="img/logo.svg"
                  alt="6 cities logo"
                  width={81}
                  height={41}
                />
              </a>
            </div>
          </div>
        </div>
      </header>
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
                dispatch(login({ email: email, password: password }));
              }}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors([]);
                  }}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setErrors([]);
                  }}
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
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <a className="locations__item-link" href="#">
                <span>Amsterdam</span>
              </a>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
