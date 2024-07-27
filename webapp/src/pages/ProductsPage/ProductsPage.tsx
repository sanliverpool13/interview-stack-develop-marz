import React, { useEffect, useState } from 'react';
import PageWrapper from '../PageWrapper';
import ProductCard from '../../components/ProductCard/ProductCard';
import { getActiveProducts } from '../ApiHelper';
import { Product } from '../../components/interfaces';

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const activeProducts = await getActiveProducts();
        console.log(activeProducts);
        setProducts(activeProducts);
        setLoading(false);
      } catch (err) {
        setError(true);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-white text-xl">Loading...</p>
        </div>
      </PageWrapper>
    );
  }

  if (error) {
    return (
      <PageWrapper>
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-white text-xl">
            An error occurred while fetching products.
          </p>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <h1 className="text-3xl font-bold text-white mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.ProductID}
            productId={product.ProductID}
            productName={product.ProductName}
            productImage={product.ProductPhotoURL}
          />
        ))}
      </div>
    </PageWrapper>
  );
};

export default ProductsPage;
