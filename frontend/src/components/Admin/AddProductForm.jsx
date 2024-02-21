import React, { useEffect, useState } from "react";
import axios from "axios";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    category: "",
    brand: "",
    gender: "",
    size: "",
    color: "",
    material: "",
    imageUrl: "",
    tags: "",
    discount: 0,
    isOnSale: false,
    weight: 0,
    dimensions: {
      length: 0,
      width: 0,
      height: 0,
    },
    relatedProducts: [],
    isAvailable: true,
    lowStockAlert: 0,
    variants: [],
  });

  const [categories, setCategories] = useState([]);
  const [sizes, setSizes] = useState(["S", "M", "L", "XL", "XXL"]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4500/category/getAllCategories"
        );
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      console.log(token);
      const response = await axios.post(
        "http://localhost:4500/product/addProduct",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      console.log("Product added successfully:", response.data.product);
      // Reset form data after successful submission
      setFormData({
        name: "",
        description: "",
        price: "",
        quantity: "",
        category: "",
        brand: "",
        gender: "",
        size: "",
        color: "",
        material: "",
        imageUrl: "",
        tags: "",
        discount: 0,
        isOnSale: false,
        weight: 0,
        dimensions: {
          length: 0,
          width: 0,
          height: 0,
        },
        relatedProducts: [],
        isAvailable: true,
        lowStockAlert: 0,
        variants: [],
      });
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block">
              <span className="text-gray-700">Name:</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Description:</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Price:</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Quantity:</span>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
                required
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Category:</span>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category._id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Brand:</span>
              <input
                type="text"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Gender:</span>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="unisex">Unisex</option>
              </select>
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-gray-700">Size:</span>
              <select
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              >
                <option value="">Select Size</option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Color:</span>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Material:</span>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Image URL:</span>
              <input
                type="text"
                name="imageUrl"
                value={formData.imageUrl}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Tags (comma-separated):</span>
              <input
                type="text"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Discount (%):</span>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">On Sale:</span>
              <input
                type="checkbox"
                name="isOnSale"
                checked={formData.isOnSale}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    isOnSale: e.target.checked,
                  }))
                }
                className="mt-1 border rounded"
              />
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-gray-700">Weight:</span>
              <input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Length:</span>
              <input
                type="number"
                name="dimensions.length"
                value={formData.dimensions.length}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Width:</span>
              <input
                type="number"
                name="dimensions.width"
                value={formData.dimensions.width}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Height:</span>
              <input
                type="number"
                name="dimensions.height"
                value={formData.dimensions.height}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
          <div>
            <label className="block">
              <span className="text-gray-700">Is Available:</span>
              <input
                type="checkbox"
                name="isAvailable"
                checked={formData.isAvailable}
                onChange={(e) =>
                  setFormData((prevState) => ({
                    ...prevState,
                    isAvailable: e.target.checked,
                  }))
                }
                className="mt-1 border rounded"
              />
            </label>
          </div>

          <div>
            <label className="block">
              <span className="text-gray-700">Low Stock Alert:</span>
              <input
                type="number"
                name="lowStockAlert"
                value={formData.lowStockAlert}
                onChange={handleChange}
                className="mt-1 p-2 border rounded w-full"
              />
            </label>
          </div>
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
