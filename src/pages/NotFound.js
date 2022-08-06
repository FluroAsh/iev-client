import { Link } from "react-router-dom";

// Redirect page for when user enters an incorrect URL
export const NotFound = () => {
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <h3>404 error</h3>
        <p>Sorry, page not found</p>
        <Link to="/" style={{ marginTop: "1em" }}>
          Go back to home page
        </Link>
      </div>
    </>
  );
};
