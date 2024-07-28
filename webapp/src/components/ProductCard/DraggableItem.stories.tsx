import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import ProductCard from './ProductCard';

export default {
  title: 'ProductCard',
  component: ProductCard,
} as ComponentMeta<typeof ProductCard>;

const Template: ComponentStory<typeof ProductCard> = (args) => (
  <ProductCard {...args} />
);

export const DefaultProduct = Template.bind({});
DefaultProduct.args = {
  productId: 1234,
  productName: 'Sample Product',
  productImage: 'https://via.placeholder.com/150',
};

export const AnotherProduct = Template.bind({});
AnotherProduct.args = {
  productId: 5678,
  productName: 'Another Product',
  productImage: 'https://via.placeholder.com/150',
};
