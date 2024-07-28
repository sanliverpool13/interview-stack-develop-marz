import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from './ProductsPage';
import { PRODUCTS_URL } from '../ApiHelper';

export default {
  title: 'Products Page',
  component: ProductsPage,
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
} as ComponentMeta<typeof ProductsPage>;

const Template: ComponentStory<typeof ProductsPage> = () => <ProductsPage />;

export const GetProductsSuccess = Template.bind({});
GetProductsSuccess.parameters = {
  mockData: [
    {
      url: PRODUCTS_URL,
      method: 'GET',
      status: 200,
      response: {
        data: [
          {
            ProductID: 1,
            ProductName: 'Hat',
            ProductPhotoURL: 'https://dummyimage.com/600x400/000/fff',
            ProductStatus: 'Active',
          },
          {
            ProductID: 2,
            ProductName: 'Shoes',
            ProductPhotoURL: 'https://dummyimage.com/600x400/000/fff',
            ProductStatus: 'Active',
          },
          {
            ProductID: 3,
            ProductName: 'Pants',
            ProductPhotoURL: 'https://dummyimage.com/600x400/000/fff',
            ProductStatus: 'Active',
          },
        ],
        message: '',
      },
    },
  ],
};

export const GetProductsSuccessEmpty = Template.bind({});
GetProductsSuccessEmpty.parameters = {
  mockData: [
    {
      url: PRODUCTS_URL,
      method: 'GET',
      status: 200,
      response: {
        data: [],
        message: '',
      },
    },
  ],
};

export const GetProductsError = Template.bind({});
GetProductsError.parameters = {
  mockData: [
    {
      url: PRODUCTS_URL,
      method: 'GET',
      status: 500,
      response: {
        data: [],
        message: 'Error',
      },
    },
  ],
};
