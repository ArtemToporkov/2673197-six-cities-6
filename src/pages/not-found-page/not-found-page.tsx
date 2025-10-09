import { Link } from 'react-router-dom';

const errorContainerStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: '100px',
  gap: '20px'
};

const errorInfoStyle: React.CSSProperties = {
  ...errorContainerStyle,
  gap: '0'
};

const goToMainPageStyle: React.CSSProperties = {
  backgroundColor: '#4481c3',
  color: '#fff',
  transform: 'skew(-15deg)',
  padding: '9px 14px 6px 15px',
  textAlign: 'center',
  letterSpacing: '.9',
  fontWeight: '300',
  borderRadius: '3px'
};

export function NotFoundPage(): JSX.Element {
  return (
    <div className="page page--gray page--main">
      <main className="page__main">
        <div className="container" style={errorContainerStyle}>
          <div style={errorInfoStyle}>
            <h1 style={{margin: 0}}>404</h1>
            <span>Not found</span>
          </div>
          <Link to='/' style={goToMainPageStyle}>
            Go to main page
          </Link>
        </div>
      </main>
    </div>
  );
}
