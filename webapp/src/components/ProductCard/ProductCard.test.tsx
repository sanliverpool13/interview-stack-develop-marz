import React from 'react';
import { create, act, ReactTestRenderer } from 'react-test-renderer';
import ProductCard from './ProductCard';

describe('ProductCard', () => {
  let tree: ReactTestRenderer;
  const productId = 1234;
  const productName = 'Sample Product';
  const productImage = 'https://via.placeholder.com/150';

  beforeEach(() => {
    const props = {
      productId,
      productName,
      productImage,
    };
    tree = create(<ProductCard {...props} />);
  });

  afterEach(() => {
    tree.unmount();
  });

  it('renders ProductCard with correct props', async () => {
    const testInstance = tree.root;

    // Check if the components with the correct data-testid are present
    const card = await testInstance.findByProps({
      'data-testid': `product-card-${productId}`,
    });
    const image = await testInstance.findByProps({
      'data-testid': `product-image-${productId}`,
    });
    const name = await testInstance.findByProps({
      'data-testid': `product-name-${productId}`,
    });
    const id = await testInstance.findByProps({
      'data-testid': `product-id-${productId}`,
    });

    // Check if the props match the rendered values
    expect(image.props.src).toBe(productImage);
    expect(name.children).toContain(productName);
    expect(id.children.join('')).toBe(`ID: ${productId}`);
  });

  it('updates dynamically when props change', async () => {
    const newProductName = 'Updated Product Name';
    const newProps = {
      productId,
      productName: newProductName,
      productImage,
    };

    await act(async () => {
      tree.update(<ProductCard {...newProps} />);
    });

    const name = await tree.root.findByProps({
      'data-testid': `product-name-${productId}`,
    });

    expect(name.children).toContain(newProductName);
  });
});
