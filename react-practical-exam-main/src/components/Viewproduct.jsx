import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllProducts, deleteProduct, editProduct } from "../features/productSlice";
import "./Viewproduct.css";

const Viewproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const products = useSelector((state) => state.products.products);

  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);

  const handleEdit = (id) => {
    dispatch(editProduct(id));
    navigate("/");
  };

  const filteredProducts = products
    .filter((p) => p.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sort === "price-asc") return a.price - b.price;
      if (sort === "price-desc") return b.price - a.price;
      if (sort === "title-asc") return a.title.localeCompare(b.title);
      if (sort === "title-desc") return b.title.localeCompare(a.title);
      return 0;
    });

  return (
    <div className="view-product-page">
      <div className="view-header">
        <h2 className="fw-bold fs-3">Products List</h2>

        <div className="controls">
          <input
            type="text"
            placeholder="Search product..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="">Sort By</option>
            <option value="price-asc">Price: Low → High</option>
            <option value="price-desc">Price: High → Low</option>
            <option value="title-asc">Title: A → Z</option>
            <option value="title-desc">Title: Z → A</option>
          </select>
        </div>
      </div>

      <div className="product-table-wrapper">
        <table className="product-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Category</th>
              <th>Price</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length ? (
              filteredProducts.map((p, i) => (
                <tr key={p.id}>
                  <td>{i + 1}</td>
                  <td>
                    {p.image ? (
                      <img src={p.image} alt={p.title} />
                    ) : (
                      <span className="no-img">No Image</span>
                    )}
                  </td>
                  <td>{p.title}</td>
                  <td>{p.category}</td>
                  <td className="price">₹ {p.price}</td>
                  <td>
                    <button
                      className="btn delete"
                      onClick={() => dispatch(deleteProduct(p.id))}
                    >
                      Delete
                    </button>
                    <button
                      className="btn edit"
                      onClick={() => handleEdit(p.id)}
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="empty text-center">
                  No products found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Viewproduct;
