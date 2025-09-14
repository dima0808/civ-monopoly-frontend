export const displayLoading = () => {
  return (
    <div className="loading">
      <p className="loading--message">Loading...</p>
    </div>
  ); // TODO: make translation
};

export const displayError = (error) => {
  return (
    <div className="loading">
      <p className="loading--message">{error}</p>
    </div>
  );
};
