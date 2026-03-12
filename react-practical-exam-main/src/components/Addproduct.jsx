import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createProduct, updateProduct } from "../features/productSlice";
import "./Addproduct.css";

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const editData = useSelector((state) => state.products.editData);
  const [product, setProduct] = useState({});

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    if (editData && editData.id) {
      setProduct(editData);
    }
  }, [editData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setProduct({ ...product, image: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (product.id) {
      dispatch(updateProduct(product));
    } else {
      dispatch(createProduct(product));
    }

    setProduct({});

    navigate("/view-product");
  };

  return (
    <div className="add-product-page">
      <div className="add-product-card">
        <h2 className="title fw-bold fs-3 mb-5">
          {product.id ? "Update Product" : "Add New Product"}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="fs-6">Product Title :</label>
            <input
              type="text"
              name="title"
              value={product.title || ""}
              onChange={handleChange}
              placeholder="Enter product title"
              required
            />
          </div>

          <div className="form-group">
            <label className="fs-6">Product Category :</label>
            <input
              type="text"
              name="category"
              value={product.category || ""}
              onChange={handleChange}
              placeholder="Enter category"
              required
            />
          </div>

          <div className="form-group">
            <label className="fs-6">Product Price :</label>
            <input
              type="number"
              name="price"
              value={product.price || ""}
              onChange={handleChange}
              placeholder="Enter price"
              required
            />
          </div>

          <div className="form-group">
            <label className="fs-6">Product Image :</label>
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          {product.image && (
            <div className="image-preview">
              <img src={product.image} alt="preview" />
            </div>
          )}

          <button type="submit" className="submit-btn">
            {product.id ? "Update Product" : "Add Product"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
