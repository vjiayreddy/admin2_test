import { gql } from "@apollo/client";

export const CREATE_QUALITY_CHECK = gql`
  mutation CreateOrderQualityCheck(
    $orderQualityCheck: OrderQualityCheckInput!
  ) {
    createOrderQualityCheck(orderQualityCheck: $orderQualityCheck) {
      _id
    }
  }
`;
export const GET_QUALITY_CHECK_ITEM = gql`
  query GetOrderQualityCheckById($orderQualityCheckId: ID!) {
    getOrderQualityCheckById(orderQualityCheckId: $orderQualityCheckId) {
      _id
      orderId
      userId
      stylistId
      itemNumber
      name
      catId
      qualityCheckNote
      qualityCheckStatus
      productImage
      fabricAndColor {
        check 
        note
        rating
      }
      design {
        check
        note
        rating
      }
      measurements {
        check
        note
        rating
      }
      finishing {
        check
        note
        rating
      }
      cleanliness {
        check
        note
        rating
      }
      ironAndPackaging {
        check
        note
        rating
      }
      actualMeasurement {
        name
        value
      }
      storeProductOrder {
        orderNo
        customerFirstName
        customerLastName
        orderItems {
          fabricImage
          styleDesignImage
          itemColor
          itemName
          itemNumber
          styleDesign{
            note
            monogramLetter
            handDesign
            styleAttributes{
              master_name
              value
              catId
              image
              name
            }
          }
        }
        orderDate {
          timestamp
        }
        trialDate {
          timestamp
        }
      }
      stylist {
        name
      }
      qualityCheckStatus
    }
  }
`;

export const UPDATE_QUALITY_CHECK_ITEM = gql`
  mutation UpdateOrderQualityCheck(
    $orderQualityCheckId: ID!
    $orderQualityCheck: OrderQualityCheckInput!
  ) {
    updateOrderQualityCheck(
      orderQualityCheckId: $orderQualityCheckId
      orderQualityCheck: $orderQualityCheck
    ) {
      _id
    }
  }
`;
