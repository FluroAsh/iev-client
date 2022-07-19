import { Link } from 'react-router-dom';

export const NotFound = () => {
  return (
    <>
      <p>404 error</p>
      <p>Sorry, page not found</p>
      <Link to="/">Go back to home page</Link>
    </>
  );
};
