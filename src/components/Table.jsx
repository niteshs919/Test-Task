import "./table.css";
const Table = ({ data, loading ,error}) => {
  
  return (
    <div className="table-container">
      {loading && (
        <div className="spinner-overlay">
          <div className="spinner"></div>
        </div>
      )}
      {error && (
        <div className="error-message">
         { error?.response?.data?.message}
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Place Name</th>
            <th>Country</th>
          </tr>
        </thead>
        <tbody>
          {data?.length === 0 && (
            <tr>
              <td colSpan="3">Start Searching</td>
            </tr>
          )}
          {data?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item?.name.common}</td>
              <td>
                <img src={item.flags.svg} alt="flag" width={30} height={20} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
