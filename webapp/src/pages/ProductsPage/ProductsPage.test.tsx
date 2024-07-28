import React from 'react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { PRODUCTS_URL } from '../ApiHelper';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ProductsPage from './ProductsPage';

const server = setupServer(
  rest.get(PRODUCTS_URL, (req, res, ctx) => {
    const response = {
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
    };
    return res(ctx.status(200), ctx.json(response));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('ProductsPage', () => {
  it('should display loading spinner', () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );
    expect(screen.getByTestId(`loading-spinner-container`)).toBeInTheDocument();
  });

  it('should display products container', async () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId(`products-container`)).toBeInTheDocument();
    });
  });

  it('should display error message', async () => {
    server.use(
      rest.get(PRODUCTS_URL, (req, res, ctx) => {
        return res(ctx.status(500), ctx.json({ data: [], message: 'Error' }));
      })
    );
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId(`error-container`)).toBeInTheDocument();
    });
  });

  it('should display no products if response is empty', async () => {
    server.use(
      rest.get(PRODUCTS_URL, (req, res, ctx) => {
        return res(ctx.status(200), ctx.json({ data: [], message: '' }));
      })
    );
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId(`products-container`)).toBeInTheDocument();
    });

    const productCards = screen.queryAllByTestId(/product-card-/);
    expect(productCards.length).toBe(0);
  });

  it('should display correct number of product cards', async () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId(`products-container`)).toBeInTheDocument();
    });

    const productCards = screen.queryAllByTestId(/product-card-/);
    expect(productCards.length).toBe(3);
  });

  it('should display correct product card data', async () => {
    render(
      <MemoryRouter>
        <ProductsPage />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByTestId(`products-container`)).toBeInTheDocument();
    });

    const productCards = screen.queryAllByTestId(/product-card-/);
    expect(productCards[0].textContent).toContain('Hat');
    expect(productCards[1].textContent).toContain('Shoes');
    expect(productCards[2].textContent).toContain('Pants');
  });
});
