import React, { useState } from 'react';
import Swal from 'sweetalert2'


import { useNavigate } from 'react-router-dom'; // Importar useNavigate


export default function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
    stock: "",
    brand: "",
    category: ""
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Crear instancia de useNavigate

  const handleChange = (event) => {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const validateForm = () => {
    let newErrors = {};
    let isValid = true;

    if (!product.name) {
      newErrors.name = "El nombre es obligatorio.";
      isValid = false;
    }
    if (!product.description) {
      newErrors.description = "La descripción es obligatoria.";
      isValid = false;
    }
    if (!product.price) {
      newErrors.price = "El precio es obligatorio.";
      isValid = false;
    }
    if (product.price && isNaN(product.price)) {
      newErrors.price = "El precio debe ser un número.";
      isValid = false;
    }
    if (!product.image) {
      newErrors.image = "La imagen es obligatoria.";
      isValid = false;
    }
    if (!product.stock) {
      newErrors.stock = "El stock es obligatorio.";
      isValid = false;
    }
    if (product.stock && isNaN(product.stock)) {
      newErrors.stock = "El stock debe ser un número.";
      isValid = false;
    }
    if (!product.brand) {
      newErrors.brand = "La marca es obligatoria.";
      isValid = false;
    }
    if (!product.category) {
      newErrors.category = "La categoría es obligatoria.";
      isValid = false;
    }

    setErrors(newErrors);

    if (!isValid) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Todos los campos son obligatorios'
      });
    }

    return isValid;
  };

  const handleSave = async (event) => {
    event.preventDefault();
    if (validateForm()) {
      const parsedProduct = {
        ...product,
        price: parseFloat(product.price),
        stock: parseInt(product.stock, 10),
        image: product.image.split(',').map(img => img.trim()) // Cambiar esto
      };
  
      try {
        const response = await fetch('http://localhost:3001/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(parsedProduct),
        });
  
        if (response.ok) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Producto agregado al carrito",
            showConfirmButton: false,
            timer: 1500
          });
          setProduct({
            name: "",
            description: "",
            price: "",
            image: "", // Cambiar esto si no deseas mantener la lista de imágenes después de guardar
            stock: "",
            brand: "",
            category: ""
          });
          setErrors({});
          navigate('/'); // Redirigir al home
        } else {
          const errorData = await response.json();
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: errorData.message || "Something went wrong!",
            footer: '<a href="#">Why do I have this issue?</a>'
          });
        }
      } catch (error) {
        console.error('Error:', error);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Error al guardar el producto",
          footer: '<a href="#">Why do I have this issue?</a>'
        });
      }
    }
  };
  return (
    <div className="bg-gradient-to-r from-blue-400 to-purple-500 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-8">Añade un producto</h1>
        <form onSubmit={handleSave}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              id="name"
              name="name"
              value={product.name}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.name ? 'border-red-500' : ''}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
            <textarea
              id="description"
              name="description"
              value={product.description}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 h-32 resize-none overflow-y-auto focus:outline-none focus:ring ${errors.description ? 'border-red-500' : ''}`}
            ></textarea>
            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
            <input
              type="text"
              id="price"
              name="price"
              value={product.price}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.price ? 'border-red-500' : ''}`}
            />
            {errors.price && <p className="text-red-500 text-sm mt-1">{errors.price}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-sm font-medium text-gray-700">Imagen</label>
            <input
              type="text"
              id="image"
              name="image"
              value={product.image}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.image ? 'border-red-500' : ''}`}
              placeholder="URLs de las imágenes, separadas por comas"
            />
            {errors.image && <p className="text-red-500 text-sm mt-1">{errors.image}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={product.stock}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.stock ? 'border-red-500' : ''}`}
            />
            {errors.stock && <p className="text-red-500 text-sm mt-1">{errors.stock}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Marca</label>
            <input
              type="text"
              id="brand"
              name="brand"
              value={product.brand}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.brand ? 'border-red-500' : ''}`}
            />
            {errors.brand && <p className="text-red-500 text-sm mt-1">{errors.brand}</p>}
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
            <input
              type="text"
              id="category"
              name="category"
              value={product.category}
              onChange={handleChange}
              className={`mt-1 p-2 w-full border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 ${errors.category ? 'border-red-500' : ''}`}
            />
            {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Enviar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}