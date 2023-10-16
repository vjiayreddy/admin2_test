import { gql } from "@apollo/client";
export const INITIATE_STORE_ORDERS = gql`
  mutation _initiateStoreOrder($userId: String) {
    initiateStoreOrder(userId: $userId) {
      orderId
      orderNo
      orderStatus
    }
  }
`;

export const GET_COLORS = gql`
  query {
    getAllSecondaryColors {
      _id
      color
      colorname
      label
      primary_color_id
      primaryColor {
        _id
        color
        colorname
        label
      }
    }
  }
`;

export const UPLOAD_FABRIC_IMAGE = gql`
  mutation uploadOrderFabricImage(
    $picture: Upload!
    $orderId: String!
    $itemNumber: String!
  ) {
    updateStoreProductFabricImage(
      picture: $picture
      orderId: $orderId
      itemNumber: $itemNumber
    ) {
      imageUrl
    }
  }
`;
export const UPLOAD_STYLE_DESIGN_IMAGE = gql`
  mutation uploadOrderStyleImage(
    $picture: Upload!
    $orderId: String!
    $itemNumber: String!
  ) {
    updateStoreProductStyleDesignImage(
      picture: $picture
      orderId: $orderId
      itemNumber: $itemNumber
    ) {
      imageUrl
    }
  }
`;

export const GET_MASTER_PERSONA = gql`
  query getMasterPersona($filter: UserAttributeMasterFilter) {
    getUserAttributeMaster(filter: $filter) {
      _id
      name
    }
  }
`;
export const GET_STORE_PRODUCTS = gql`
  query getStoreProductAttributeMaster($filter: ProductAttributeMasterFilter) {
    getProductAttributeMaster(filter: $filter) {
      _id
      name
      catId
    }
  }
`;

export const UPLOAD_STORE_REFIMAGE = gql`
  mutation uploadOrderRefImage(
    $picture: Upload!
    $orderId: String!
    $itemNumber: String!
  ) {
    updateStoreProductReferenceImage(
      picture: $picture
      orderId: $orderId
      itemNumber: $itemNumber
    ) {
      imageUrl
    }
  }
`;

export const SAVE_STORE_ORDER = gql`
  mutation saveStoreOrder($params: StoreProductOrderInput) {
    saveStoreOrder(params: $params) {
      _id
    }
  }
`;

export const CREATE_USER_STORE_ORDER = gql`
  mutation createUserForOrder($userData: createUserInput) {
    createUserForOrder(userData: $userData) {
      userId
    }
  }
`;

export const GET_ALL_STORE_ORDERS = gql`
  query getAllStoreOrders(
    $params: StoreProductOrderFilterInputParams!
    $page: Int
    $limit: Int
  ) {
    getAllStoreOrders(params: $params, page: $page, limit: $limit) {
      _id
      userId
      studioId
      customerId
      customerPhone
      customerEmail
      customerCountryCode
      customerHeight
      customerWeight
      customerLastName
      customerFirstName
      orderStatus
      customerCity
      customerPersonaIds
      personalStylistId
      orderQualityChecks {
        _id
        qualityCheckStatus
        itemNumber
      }
      orderTrial {
        _id
        trialStatus
        trialRating
        measurementStatus
        note
        trialDecision
        trialBy
        trialDate {
          timestamp
        }
        deliveryDate {
          timestamp
        }
        products {
          catId
          name
          itemNumber
          trialImageLinks
          trialNote
          fabricImageLink
        }
      }
      otherChargesBreakdown {
        amount
        name
        note
      }
      sourceChannel
      sourceSubChannel
      stylist {
        name
        _id
      }
      persona {
        _id
        name
      }
      orderTotal
      afterChargesTotal
      afterDeductionsTotal
      otherCharges
      deductions
      deductionsBreakdown {
        amount
        name
        note
      }
      payment
      paymentBreakdown {
        note
        amount
        date {
          timestamp
        }
        isAdvance
        modeOfPayment
      }
      balanceAmount
      orderNo
      orderDate {
        timestamp
      }
      orderItems {
        _id
        itemName
        itemPrice
        itemNumber
        itemColor
        fabricCode
        trialDate {
          timestamp
        }
        fabricImage
        fabricImageNote
        styleDesignImage
        styleDesignImageNote
        referenceImage
        referenceImageNote
        itemCatId
        outfitStatus
      }
      eventDate {
        timestamp
      }
      readyDate {
        timestamp
      }
      deliveryDate {
        timestamp
      }
      trialDate {
        timestamp
      }
    }
  }
`;
export const UPADATE_ORDER_ITEM_STATUS = gql`
  mutation updateStoreOrderItemStatus(
    $orderId: String!
    $orderItemId: String!
    $status: String!
  ) {
    updateStoreOrderItemStatus(
      orderId: $orderId
      orderItemId: $orderItemId
      status: $status
    )
  }
`;

export const GET_SINGLE_STORE_ORDERBY_ID = gql`
  query getUserStoreOrderById($orderId: ID!) {
    getStoreOrderById(orderId: $orderId) {
      _id
      userId
      studioId
      customerId
      customerPhone
      customerEmail
      customerHeight
      customerWeight
      customerLastName
      customerSegment
      customerFirstName
      customerDateOfBirth {
        timestamp
      }
      customerIsStyleClubMember
      customerSegment
      customerCountryCode
      orderStatus
      customerCity
      customerPersonaIds
      personalStylistId

      otherChargesBreakdown {
        amount
        name
        note
      }
      sourceChannel
      sourceSubChannel
      secondaryStylists {
        _id
        name
      }
      stylist {
        name
        _id
      }
      persona {
        _id
        name
      }
      orderTotal
      afterChargesTotal
      afterDeductionsTotal
      otherCharges
      deductions
      deductionsBreakdown {
        amount
        name
        note
      }
      payment
      paymentBreakdown {
        note
        amount
        date {
          timestamp
        }
        isAdvance
        modeOfPayment
      }
      balanceAmount
      orderNo
      orderDate {
        timestamp
      }
      orderItems {
        _id
        itemName
        itemPrice
        itemNumber
        itemColor
        fabricCode
        trialDate {
          timestamp
        }
        fabricImage
        fabricImageNote
        styleDesignImage
        styleDesignImageNote
        referenceImage
        referenceImageNote
        itemCatId
        outfitStatus
        styleDesign {
          note
          handDesign
          styleAttributes {
            master_name
            value
            catId
            image
            name
          }
        }
      }
      eventDate {
        timestamp
      }
      readyDate {
        timestamp
      }
      deliveryDate {
        timestamp
      }
      trialDate {
        timestamp
      }
    }
  }
`;
export const GET_STYLING_CONFIG = gql`
  query getOrderStylingConfig($catId: String!) {
    getStylingConfig(catId: $catId) {
      catId
      image
      attributes {
        masterName
        label
        sortOrder
        options {
          _id
          name
          catId
          image
          personalizeImage
          note
          sortOrder
        }
      }
    }
  }
`;
