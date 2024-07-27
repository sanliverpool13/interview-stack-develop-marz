import React from 'react';
import { ProductCardProps } from '../interfaces';

const ProductCard: React.FC<ProductCardProps> = ({
  productId,
  productName,
  productImage,
}) => {
  return (
    <div className="border rounded-lg p-4 bg-white shadow-md">
      <img
        src={productImage}
        alt={productName}
        className="w-full h-48 object-cover mb-4 rounded-md"
      />
      <h2 className="text-lg font-bold mb-2">{productName}</h2>
      <p className="text-gray-600">ID: {productId}</p>
    </div>
  );
};

export default ProductCard;
