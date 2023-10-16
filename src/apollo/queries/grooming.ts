import { gql } from "@apollo/client";

export const GET_PRODUCT_ATTRIBUTES = gql`
  query getGroomingProductAttributeMaster(
    $filter: ProductAttributeMasterFilter
  ) {
    getProductAttributeMaster(filter: $filter) {
      _id
      name
      personalizeImage
      note
      image
    }
  }
`;

export const GET_GENERATE_GROOMING_RECO = gql`
  mutation generateGroomingRecommendedAttributes($userId: String!) {
    generateGroomingRecommendedAttributes(userId: $userId)
  }
`;

export const GET_GROOMING_RECOMMENDATIONS = gql`
  query getUserPersonalizeGroomingPageConfig($gcatId: String!) {
    getUserPersonalizeGroomingPageConfig(gcatId: $gcatId) {
      catId
      note
      user_attributes {
        master_name
        note
        label
      }
      attributes {
        master_name
        note
        label
      }
      grooming_partners {
        label
        description
      }
      curated_products {
        label
        description
      }
      grooming_tips {
        label
        tips {
          image
          title
          note
        }
      }
    }
  }
`;

export const GET_USER_SELECTIONS = gql`
  query getUserSelections($filter: UserSelectionFilter) {
    getUserSelections(filter: $filter) {
      master_name
      value
      image
      note
      name
    }
  }
`;

export const GET_CELEBRITIES_MATCHING_STYLES = gql`
  query getUserCelebrities($params: CelebrityFilters, $page: Int, $limit: Int) {
    getCelebrities(params: $params, page: $page, limit: $limit) {
      celebrities {
        images
      }
    }
  }
`;

export const GET_USER_GROOMING_RECOMMENDED_ATTRIBUTES = gql`
  query getUserGroomingRecommendedAttributes($filter: UserSelectionFilter) {
    getUserGroomingRecommendedAttributes(filter: $filter) {
      _id
      catId
      master_name
      value
      image
      personalizeImage
      name
      note
    }
  }
`;

export const GET_GROOMING_PARTNERS = gql`
  query {
    getAllGroomingPartners {
      name
      title
      images
      bannerImage
      url
      note
      phone
      address
    }
  }
`;

export const GET_USER_GROOMING_ATTRIBUTE_MASTER = gql`
  query getUserGroominAttributeMaster($filter: UserAttributeMasterFilter) {
    getUserAttributeMaster(filter: $filter) {
      name
      _id
      personalizeImage
    }
  }
`;

