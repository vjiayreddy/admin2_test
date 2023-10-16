import { useLazyQuery } from "@apollo/client";
import { GET_ALL_STORE_ORDERS } from "../queries/orders";


export const useLazyGetAllStoreOrders = (options) => useLazyQuery(GET_ALL_STORE_ORDERS,options)
