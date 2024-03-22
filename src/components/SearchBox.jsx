import "./searchBoxStyles.css"; // Import the external CSS file

const SearchBox = ({ handleSearchInput, searchInput, disabled }) => {
  const handleChange = (e) => {
    handleSearchInput(e.target.value);
  };
  return (
    <input
      className="search-box"
      type="text"
      value={searchInput}
      onChange={handleChange}
      disabled={disabled}
    />
  );
};

export default SearchBox;
