import { gql } from "@apollo/client";

export const GET_ALL_DPFORMS = gql`
  query {
    getAllPersonalizeForms {
      _id
      name
      label
      screens {
        questions {
          input
          _id
        }
      }
    }
  }
`;

export const GET_FORM_SUMMARY = gql`
  query {
    getAllPersonalizeForms {
      _id
      name
      label
      screens {
        questions {
          questionId
          question {
            optionTypeId
            isMultipleChoice
            master_name
            input
            value
            description
            optionsData {
              name
              _id
              image
            }
            categoryId
            _id
          }
        }
      }
    }
  }
`;

export const GET_USER_PERSONALIZEFORM = gql`
  query getUserPersonalizeForm(
    $Id: String!
    $isEdit: Boolean
    $userId: String
    $name: String
    $personaIds: [String]
    $questionId: String
  ) {
    getPersonalizeForm(
      Id: $Id
      isEdit: $isEdit
      userId: $userId
      name: $name
      personaIds: $personaIds
      questionId: $questionId
    ) {
      _id
      dependencyFormIds
      screens {
        questions {
          questionId
          question {
            optionTypeId
            isMultipleChoice
            master_name
            input
            value
            description
            optionsData {
              name
              _id
              image
            }
            categoryId
            _id
          }
        }
      }
    }
  }
`;

export const SAVE_PERSONALIZE_FORM_DATA = gql`
  mutation saveUserPersonalizeFormData($formData: PersonalizeFormDataInput) {
    savePersonalizeFormData(formData: $formData) {
      user_selections {
        master_name
        value
        image
      }
    }
  }
`;

export const GENERATE_RECO_ATTRIBUTS = gql`
  mutation generateUserAttributes($userId: String!) {
    generateRecommendedAttributes(userId: $userId)
  }
`;

export const GET_USER_PERSONALIZE_CONFIG = gql`
  query getUserPersonaizeConfig($catId: String!) {
    getUserPersonalizePageConfig(catId: $catId) {
      catId
      note
      attributes {
        master_name
        note
        label
      }
      looks {
        label
        description
      }
      curated_products {
        label
        description
      }
    }
  }
`;

export const GET_CURATED_PRODUCTS = gql`
  query getCuratedPersonalizedProducts(
    $params: ProductRecFilterInput!
    $page: Int
    $limit: Int
  ) {
    getPersonalizedProducts(params: $params, page: $page, limit: $limit) {
      products {
        images
        _id
        name
        title
        description
        price
        discPrice
        pId
        pidSerial
      }
    }
  }
`;

export const GET_USER_LOOKS_RECO = gql`
  query getUserPersonalizedLooksByProducts(
    $params: LookRecFilterInput!
    $page: Int
    $limit: Int
  ) {
    getPersonalizedLooksByProducts(
      params: $params
      page: $page
      limit: $limit
    ) {
      looks {
        title
        images
        name
        lId
        price
        _id
      }
    }
  }
`;

export const GET_USER_BLOG_RECO = gql`
  query getBlogRecommendation(
    $filters: UserBlogRecommendationFilter
    $page: Int
    $limit: Int
  ) {
    getUserBlogRecommendation(filters: $filters, page: $page, limit: $limit) {
      blogs {
        name
        _id
        url
        name
        title
        bannerImage
        note
      }
      totalBlogCount
    }
  }
`;

export const GET_USER_PRODUCT_RECO = gql`
  query getUserProductReco($filter: UserSelectionFilter) {
    getUserProductRecommendedAttributes(filter: $filter) {
      _id
      catId
      master_name
      personalizeImage
      value
      image
      name
      colors {
        name
        hashCode
      }
    }
  }
`;

export const DELETE_USER_PRODUCT_RECO = gql`
  mutation deleteUserRecommendedProduct(
    $productId: String!
    $userId: String!
    $stylistId: String!
  ) {
    deleteRecommendedProduct(
      productId: $productId
      userId: $userId
      stylistId: $stylistId
    )
  }
`;

export const PRODUCT_FILTERS = gql`
  query productFilter($params: ProductFilter!, $page: Int, $limit: Int) {
    productsFilter(params: $params, page: $page, limit: $limit) {
      products {
        images
        _id
        name
        title
        description
        price
        discPrice
        pId
        pidSerial
      }
    }
  }
`;

export const ADD_PRODUCT_TO_RECO = gql`
  mutation addUserProductToRecommendation(
    $productId: String!
    $userId: String!
    $stylistId: String!
  ) {
    addProductToRecommendation(
      productId: $productId
      userId: $userId
      stylistId: $stylistId
    ) {
      productId
    }
  }
`;
export const GET_USER_PERSONALIZEPAGE_CONFIG = gql`
  query getUserPersonalizePageConfig($catId: String!) {
    getUserPersonalizePageConfig(catId: $catId) {
      catId
      attributes {
        master_name
        label
      }
    }
  }
`;

export const GET_USER_PRODUCT_RECO_ATTR = gql`
  query getUserProductRecommendedAttributes($filter: UserSelectionFilter) {
    getUserProductRecommendedAttributes(filter: $filter) {
      catId
      master_name
      value
      image
      name
      isDeletedByStylist
    }
  }
`;

export const GET_PRODUCT_ATTRIBUTE_MASTER = gql`
  query getUserProductAttributeMaster($filter: ProductAttributeMasterFilter) {
    getProductAttributeMaster(filter: $filter) {
      _id
      name
      catId
      personalizeImage
    }
  }
`;
export const MANAGE_RECOMMENDED_ATTRIBUTES = gql`
  mutation manageRecommendedAttributes(
    $recAttrs: [manageRecommendedAttributesInput]
    $userId: String!
    $stylistId: String!
    $isTypeGrooming: Boolean
  ) {
    manageRecommendedAttributes(
      recAttrs: $recAttrs
      userId: $userId
      stylistId: $stylistId
      isTypeGrooming: $isTypeGrooming
    )
  }
`;

export const DELETE_RECOMMENED_LOOKS = gql`
  mutation userDeleteRecommendedLook(
    $lookId: String!
    $userId: String!
    $stylistId: String!
  ) {
    deleteRecommendedLook(
      lookId: $lookId
      userId: $userId
      stylistId: $stylistId
    )
  }
`;

export const NOTIFY_GROOMING_EMAIL = gql`
  mutation userInitiateGroomingRecommendationEmail($phone: String!) {
    initiateRecommendationUpdateEmail(phone: $phone)
  }
`;

export const GET_LOOKS_FILTER = gql`
  query getUserLooksFilter($params: lookFilterInput!, $page: Int, $limit: Int) {
    looksFilter(params: $params, page: $page, limit: $limit) {
      title
      images
      name
      lId
      price
      _id
    }
  }
`;

export const GET_ADD_LOOKS_RECOMMENDATION = gql`
  mutation getAddUserLookRecommendation(
    $lookId: String!
    $userId: String!
    $stylistId: String!
  ) {
    addLookToRecommendation(
      lookId: $lookId
      userId: $userId
      stylistId: $stylistId
    ) {
      lookId
    }
  }
`;

export const GET_PERSONALIZE_SUMMARY = gql`
  query getUserPersonalizeFormFilledSummary($userId: String!) {
    getUserPersonalizeFormFilledSummary(userId: $userId) {
      _id
      master_name
      value
      input
    }
  }
`;
