import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1); // Number of products per page
  const [sortCriteria, setSortCriteria] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4500/product/filter', {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            searchTerm: searchTerm,
            sortBy: sortCriteria,
            sortOrder: sortDirection
          }
        });
        setProducts(response.data);
        // Update total pages based on the total number of products and items per page
        setTotalPages(Math.ceil(response.data.length / itemsPerPage));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [currentPage, itemsPerPage, searchTerm, sortCriteria, sortDirection]);

  // Pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Sorting handler
  const handleSortChange = (e) => {
    const { value } = e.target;
    const [criteria, direction] = value.split('-');
    setSortCriteria(criteria);
    setSortDirection(direction);
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search products..."
          className="border border-gray-300 p-2 rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <div>
          <select
            value={`${sortCriteria}-${sortDirection}`}
            onChange={handleSortChange}
            className="border border-gray-300 p-2 rounded"
          >
            <option value="name-asc">Name (A-Z)</option>
            <option value="name-desc">Name (Z-A)</option>
            {/* Add more sorting options as needed */}
          </select>
        </div>
      </div>
      <table className="table-auto min-w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">Name</th>
            <th className="px-4 py-2">Description</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Category</th>
            <th className="px-4 py-2">Brand</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id} className="border-b border-gray-200">
              <td className="px-4 py-2">{product.name}</td>
              <td className="px-4 py-2">{product.description}</td>
              <td className="px-4 py-2">${product.price}</td>
              <td className="px-4 py-2">{product.category}</td>
              <td className="px-4 py-2">{product.brand}</td>
              {/* Add more table data cells as needed */}
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4">
        {/* Pagination */}
        {totalPages > 1 && (
          <ul className="flex">
            {Array.from({ length: totalPages }).map((_, index) => (
              <li
                key={index}
                className={`px-3 py-1 mr-2 cursor-pointer rounded ${
                  currentPage === index + 1 ? 'bg-gray-400' : 'bg-gray-200'
                }`}
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProductList;
