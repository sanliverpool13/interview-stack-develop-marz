import React, { useEffect, useState } from 'react';
import PageWrapper from '../PageWrapper';
import ProductCard from '../../components/ProductCard/ProductCard';
import Spinner from '../../components/Spinner/Spinner';
import { getActiveProducts } from '../ApiHelper';
import { Product } from '../../components/interfaces';

const DATA_STATES = {
  waiting: 'WAITING',
  loaded: 'LOADED',
  error: 'ERROR',
};

const ProductsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingState, setLoadingState] = useState(DATA_STATES.waiting);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoadingState(DATA_STATES.waiting);
      const { productData, errorOccured } = await getActiveProducts();
      console.log(productData);
      setProducts(productData);
      setLoadingState(errorOccured ? DATA_STATES.error : DATA_STATES.loaded);
    };

    fetchProducts();
  }, []);

  let content;
  console.log(loadingState);
  if (loadingState === DATA_STATES.waiting) {
    content = (
      <div
        className="flex justify-center items-center w-full h-full"
        data-testid="loading-spinner-container"
      >
        <Spinner />
      </div>
    );
  } else if (loadingState === DATA_STATES.loaded) {
    content = (
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        data-testid="products-container"
      >
        {products.map((product) => (
          <ProductCard
            key={product.ProductID}
            productId={product.ProductID}
            productName={product.ProductName}
            productImage={product.ProductPhotoURL}
          />
        ))}
      </div>
    );
  } else {
    content = (
      <div
        className="flex justify-center items-center w-full h-full bg-black"
        data-testid="error-container"
      >
        <p className="text-white text-xl">
          An error occurred while fetching products.
        </p>
      </div>
    );
  }

  return <PageWrapper>{content}</PageWrapper>;
};

export default ProductsPage;
