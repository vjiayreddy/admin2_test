import { gql } from "@apollo/client";

export const SAVE_CUSTOMER_INFO = gql`
  mutation saveCustomerInformationForm(
    $customerInfo: CustomerInformationFormInput!
    $customerInfoId: String
  ) {
    saveCustomerInformationForm(
      customerInfo: $customerInfo
      customerInfoId: $customerInfoId
    ) {
      _id
    }
  }
`;

export const GET_ALL_CIF_LIST = gql`
  query GetAllCustomerInformationList(
    $filter: CIFFilterInput
    $page: Int
    $limit: Int
  ) {
    getAllCustomerInformationList(filter: $filter, page: $page, limit: $limit) {
      customers {
        _id
        firstName
        lastName
        eventType
        phone
        createdDate {
          timestamp
        }
        eventDate {
          timestamp
        }
        studioId
        sourceCatId
        sourceSubCatId
        customerSerialNo
        countryCode
        customerInfoStatus
        lookingFor
        cifSerialNumber
        email
        note
        stylistId
        stylist {
          name
          _id
        }
        occasionDetails {
          occasion
          budget
          refImage
          outfitsNote
          priceQuote
        }
        source {
          name
          _id
          subCategory {
            _id
            name
          }
        }
      }
      totalCount
    }
  }
`;

export const GET_SINGLE_CUSTOMER_INFO = gql`
  query getSingleCustomerInformation($id: ID, $phone: String) {
    getSingleCustomerInformation(id: $id, phone: $phone) {
      _id
      firstName
      lastName
      eventType
      phone
      createdDate {
        timestamp
      }
      eventDate {
        timestamp
      }
      studioId

      sourceCatId
      sourceSubCatId
      lookingFor
      countryCode
      customerInfoStatus
      customerSerialNo
      cifSerialNumber
      email
      note
      stylistId
      stylist {
        name
        _id
      }
      occasionDetails {
        occasion
        budget
        refImage
        outfitsNote
        priceQuote
      }
      source {
        name
        _id
        subCategory {
          _id
          name
        }
      }
    }
  }
`;
