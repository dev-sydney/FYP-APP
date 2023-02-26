import React, { useEffect, useContext } from 'react';
import authContext from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
const NotFound = () => {
  const authContxt = useContext(authContext);
  useEffect(() => {
    authContxt.setNavBarVisibilty(null);
  }, []);
  return (
    <div
      style={{
        minHeight: 'inherit',
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <div style={{ textAlign: 'center' }}>
        <img
          src="/img/not-found-illustration.png"
          style={{
            minHeight: '20em',
            maxHeight: '20em',
          }}
        />
        <h1 style={{ textAlign: 'center' }}>Page not found!</h1>
        <p
          style={{ textAlign: 'center', padding: '0 1.2em', marginTop: '.5em' }}
        >
          Sorry, we couldn't find the page you are looking for.
        </p>
        <Link
          to="/"
          style={{
            color: 'white',
            backgroundColor: '#284b63',
            textAlign: 'center',
            fontSize: '1rem',
            padding: '0.7rem 3rem',
            borderRadius: '5px',
            textTransform: 'uppercase',
            display: 'inline-block',
            textDecoration: 'none',
            fontWeight: 400,
            border: 'none',
            cursor: 'pointer',
            marginTop: '.5em',
          }}
        >
          Go home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
