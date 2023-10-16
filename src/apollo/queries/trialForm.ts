import { gql } from "@apollo/client";
export const CREATE_ORDER_TRIAL = gql`
  mutation CreateOrderTrial($orderTrial: OrderTrialInput!) {
    createOrderTrial(orderTrial: $orderTrial) {
      _id
    }
  }
`;

export const GET_ORDER_TRIAL_IMAGE_PATH = gql`
  query GetUploadOrderTrialProductMediaPath(
    $storeOrderNo: String
    $itemNumber: String
    $catName: String
    $extension: String
  ) {
    getUploadOrderTrialProductMediaPath(
      storeOrderNo: $storeOrderNo
      itemNumber: $itemNumber
      catName: $catName
      extension: $extension
    ) {
      dirName
      imageName
    }
  }
`;

export const GET_ORDER_TRIAL_BY_ID = gql`
  query GetOrderTrialById($orderTrialId: ID!) {
    getOrderTrialById(orderTrialId: $orderTrialId) {
      _id
      orderId
      stylistId
      trialStatus
      measurementStatus
      trialDate {
        timestamp
      }
      deliveryDate {
        timestamp
      }
      products {
        itemNumber
        catId
        name
        trialNote
        trialImageLinks
        trialVideoLink
        fabricImageLink
      }
      storeProductOrder {
        stylist {
          _id
          name
        }
        userId
        orderNo
        trialDate {
          datestamp
          timestamp
        }
        orderDate {
          datestamp
          timestamp
        }
      }
      trialDecision
      trialRating
      note
      trialBy
      user {
        lastName
        firstName
        _id
      }
    }
  }
`;

export const UPDATE_ORDER_TRIAL_BY_ID = gql`
  mutation UpdateOrderTrial($orderTrialId: ID!, $orderTrial: OrderTrialInput!) {
    updateOrderTrial(orderTrialId: $orderTrialId, orderTrial: $orderTrial) {
      _id
    }
  }
`;

export const UPDATE_ORDER_TRIAL_STATUS = gql`
  mutation updateOrderTrialStatus(
    $orderTrialId: ID!
    $orderTrialStatus: trialStatusEnum!
  ) {
    updateOrderTrialStatus(
      orderTrialId: $orderTrialId
      orderTrialStatus: $orderTrialStatus
    ) {
      _id
    }
  }
`;
export const UPDATE_ORDER_TRIAL_RATING_STATUS = gql`
  mutation updateOrderTrialRatingStatus(
    $orderTrialId: ID!
    $orderTrialRatingStatus: trialRatingEnum!
  ) {
    updateOrderTrialRatingStatus(
      orderTrialId: $orderTrialId
      orderTrialRatingStatus: $orderTrialRatingStatus
    ) {
      _id
    }
  }
`;
export const UPDATE_ORDER_TRIAL_MEASUREMENTS_STATUS = gql`
  mutation updateOrderTrialMeasurementStatus(
    $orderTrialId: ID!
    $orderTrialMeasurementStatus: measurementStatusEnum!
  ) {
    updateOrderTrialMeasurementStatus(
      orderTrialId: $orderTrialId
      orderTrialMeasurementStatus: $orderTrialMeasurementStatus
    ) {
      _id
    }
  }
`;
export const UPDATE_ORDER_TRIAL_DECISION_STATUS = gql`
  mutation UpdateOrderTrialDecisionStatus(
    $orderTrialId: ID!
    $orderTrialDecisionStatus: trialDecisionEnum!
  ) {
    updateOrderTrialDecisionStatus(
      orderTrialId: $orderTrialId
      orderTrialDecisionStatus: $orderTrialDecisionStatus
    ) {
      _id
    }
  }
`;

export const GET_ALL_TRIALS = gql`
  query GetOrderTrialByFilter(
    $page: Int
    $limit: Int
    $params: OrderTrialFilterInput
  ) {
    getOrderTrialByFilter(page: $page, limit: $limit, params: $params) {
      _id
      orderId
      stylistId
      trialStatus
      measurementStatus
      stylist {
        name
        _id
      }
      trialDate {
        timestamp
        day
        month
        year
      }
      deliveryDate {
        timestamp
      }
      products {
        itemNumber
        catId
        name
        trialNote
        trialImageLinks
        trialVideoLink
        fabricImageLink
      }
      storeProductOrder {
        customerFirstName
        customerId
        customerPhone
        customerLastName
        customerCountryCode
        orderNo
        stylist {
          _id
          name
        }
        userId
        orderNo
        trialDate {
          datestamp
          timestamp
        }
        orderDate {
          datestamp
          timestamp
        }
      }
      trialDecision
      trialRating
      note
      trialBy
      user {
        lastName
        firstName
        _id
      }
    }
  }
`;
