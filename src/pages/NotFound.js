import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <h3>404 error</h3>
        <p>Sorry, page not found</p>
        <Link to="/" style={{ marginTop: '1em' }}>
          Go back to home page
        </Link>
      </div>
    </>
  );
};
