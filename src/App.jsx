import { useEffect, useState } from "react";
import "./App.css";
import SearchBox from "./components/SearchBox";
import Table from "./components/Table";
import axios from "axios";
import Pagination from "./components/Pagination";
function App() {
  const [searchInput, setSearchInput] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [error, setError] = useState(null)
  const handleSearchInput = (input) => {
    setSearchInput(input);
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (!searchInput || searchInput.trim() === '') {
        setData([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null)
      axios.get(`${import.meta.env.VITE_COUNTRY_URL}/${searchInput}`)
        .then((response) => {
          setData(response.data || []);
          setLoading(false);
        })
        .catch((errors) => {
          console.error('Error fetching data:', errors);
          setData([]);
          setLoading(false);
          setError(errors)
        });
    }, 1000); 

    return () => clearTimeout(delay);
  }, [searchInput]);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const currentItems = data?.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="app">
      <div className="search-box-container">
        <SearchBox
          handleSearchInput={handleSearchInput}
          searchInput={searchInput}
          disabled={loading}
        />
      </div>
      <div className="city-table-container">
        <Table data={currentItems} loading={loading} error={error} />
      </div>
      <div className="pagination-container">
        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={data?.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      </div>
    </div>
  );
}

export default App;
