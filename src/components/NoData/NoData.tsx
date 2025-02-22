import "./NoData.scss";

const NoData = () => {
  return (
    <div className="no-data">
      <div className="no-data-icon">
        <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 6H16V4C16 2.89 15.11 2 14 2H10C8.89 2 8 2.89 8 4V6H4C2.89 6 2 6.89 2 8V19C2 20.11 2.89 21 4 21H20C21.11 21 22 20.11 22 19V8C22 6.89 21.11 6 20 6ZM10 4H14V6H10V4ZM20 19H4V8H20V19Z" fill="#ccc"/>
        </svg>
      </div>
      <div className="no-data-text">
        <h3>No Comments</h3>
        <p>There are no comments to display</p>
      </div>
    </div>
  );
};

export default NoData; 