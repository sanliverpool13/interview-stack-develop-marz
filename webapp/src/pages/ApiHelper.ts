import axios from 'axios';
import { Order, OrderData } from '../components/interfaces';

const INPIPELINE_URL = '/api/orders/inpipeline';
const PRODUCTS_URL = '/api/products/';

const getInPipelineData = async () => {
  const orderData: OrderData = {
    Queued: [],
    InProgress: [],
    QA: [],
  };
  let errorOccured = false;
  try {
    const response = await axios.get(INPIPELINE_URL);
    console.log('orders response', response);
    if (response?.status === 200) {
      const { data } = response.data;
      data.forEach((order: Order) => {
        orderData[order.OrderStatus as keyof OrderData].push(order);
      });
    } else {
      const { message } = response.data;
      throw message;
    }
  } catch (err) {
    console.error(err);
    errorOccured = true;
  }
  return { orderData, errorOccured };
};

const UPDATE_STATUS_URL = '/api/orders/update_status';

const updateOrderStatus = async (order: Order, newOrderStatus: string) => {
  const updatedOrder = { ...order, OrderStatus: newOrderStatus };
  let orderStatusUpdated = false;
  try {
    const response = await axios.post(UPDATE_STATUS_URL, updatedOrder);
    if (response?.status === 200) orderStatusUpdated = true;
    else {
      const { message } = response.data;
      throw message;
    }
  } catch (err) {
    console.error(err);
  }
  return orderStatusUpdated;
};

const getActiveProducts = async () => {
  try {
    const response = await axios.get(PRODUCTS_URL);
    console.log('respomse');
    console.log(response.data);
    if (response?.status === 200) {
      return response.data;
    } else {
      throw new Error('Failed to fetch products');
    }
  } catch (err) {
    console.error(err);
    return [];
  }
};

export {
  getInPipelineData,
  INPIPELINE_URL,
  updateOrderStatus,
  UPDATE_STATUS_URL,
  getActiveProducts,
};
