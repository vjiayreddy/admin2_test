import { gql } from "@apollo/client";

export const GET_PRODUCT_MEASURMENT_CONFIG = gql`
  query getProductMeasurements(
    $catId: String!
    $role: String!
    $subCat: String
    $optionName: String
  ) {
    getProductMeasurementConfig(
      catId: $catId
      role: $role
      subCat: $subCat
      optionName: $optionName
    ) {
      catId
      subCat
      options {
        label
        name
        attributeImageUrl
        hightlightImageUrl
        role
        videoUrl
        isRequired
        isUpdateManually
      }
      defaultHighlightImage
    }
  }
`;

export const GET_USER_MEASURMENTS = gql`
  query getSavedUserMeasurments(
    $userId: String!
    $catId: String
    $optionName: String
    $subCat: String
    $page: Int
    $limit: Int
  ) {
    getUserMeasurements(
      userId: $userId
      catId: $catId
      optionName: $optionName
      subCat: $subCat
      page: $page
      limit: $limit
    ) {
      catId
      type
      measuredBy
      pdf
      approvedBy
      approvedDate {
        timestamp
      }
      note
      pannaSize
      isDyable
      noOfMeters
      remarks
      category {
        name
      }
      dateRecorded {
        day
        month
        year
        hour
        minute
      }

      options {
        label
        name
        attributeImageUrl
        attributeImageUrl
        value
        isUpdateManually
      }
    }
  }
`;
export const GET_CATEGORY_MEASURMENTS = gql`
  query getCategoryMeasurments(
    $userId: String!
    $catId: String
    $optionName: String
    $subCat: String
    $page: Int
    $limit: Int
  ) {
    getUserMeasurements(
      userId: $userId
      catId: $catId
      optionName: $optionName
      subCat: $subCat
      page: $page
      limit: $limit
    ) {
      catId
      type
      measuredBy
      pdf
      note
      measuredBy
      pannaSize
      isDyable
      noOfMeters
      remarks
      category {
        name
      }
      dateRecorded {
        day
        month
        year
        hour
        minute
      }

      options {
        label
        name
        attributeImageUrl
        attributeImageUrl
        value
        isUpdateManually
      }
    }
  }
`;

export const GET_SHIRT_CATEGORY_MEASURMENTS = gql`
  query getUserShirtMeasurments(
    $userId: String!
    $catId: String
    $optionName: String
    $subCat: String
    $page: Int
    $limit: Int
  ) {
    getUserMeasurements(
      userId: $userId
      catId: $catId
      optionName: $optionName
      subCat: $subCat
      page: $page
      limit: $limit
    ) {
      catId
      type
      measuredBy
      pdf
      note
      measuredBy
      pannaSize
      isDyable
      noOfMeters
      remarks
      category {
        name
      }
      dateRecorded {
        day
        month
        year
        hour
        minute
      }

      options {
        label
        name
        attributeImageUrl
        attributeImageUrl
        value
        isUpdateManually
      }
    }
  }
`;

export const GET_TROUSER_CATEGORY_MEASURMENTS = gql`
  query getUserTrouserMeasurments(
    $userId: String!
    $catId: String
    $optionName: String
    $subCat: String
    $page: Int
    $limit: Int
  ) {
    getUserMeasurements(
      userId: $userId
      catId: $catId
      optionName: $optionName
      subCat: $subCat
      page: $page
      limit: $limit
    ) {
      catId
      type
      measuredBy
      pdf
      note
      measuredBy
      pannaSize
      isDyable
      noOfMeters
      remarks
      category {
        name
      }
      dateRecorded {
        day
        month
        year
        hour
        minute
      }

      options {
        label
        name
        attributeImageUrl
        attributeImageUrl
        value
        isUpdateManually
      }
    }
  }
`;

export const GET_USER_MEASURMENTS_HISTORY = gql`
  query getSavedUserMeasurments(
    $userId: String!
    $catId: String
    $optionName: String
    $subCat: String
    $page: Int
    $limit: Int
  ) {
    getUserMeasurements(
      userId: $userId
      catId: $catId
      optionName: $optionName
      subCat: $subCat
      page: $page
      limit: $limit
    ) {
      _id
      catId
      type
      measuredBy
      pdf
      note
      measuredBy
      standardSizingId
      standardSizing{
        size
        label
      }
      pannaSize
      isDyable
      noOfMeters
      remarks
      category {
        name
      }
      dateRecorded {
        day
        month
        year
        hour
        minute
      }

      options {
        label
        name
        attributeImageUrl
        attributeImageUrl
        value
        isUpdateManually
      }
    }
  }
`;

export const SAVE_USER_MEASURMENTS = gql`
  mutation saveUserMeasurmentsInfo($userMeasurements: UserMeasurementsInput) {
    saveUserMeasurement(userMeasurements: $userMeasurements) {
      subCat
    }
  }
`;

export const GET_SHOULDER_TYPES = gql`
  query getShoulderTypes($filter: UserAttributeMasterFilter) {
    getUserAttributeMaster(filter: $filter) {
      name
      _id
      image
    }
  }
`;

export const GET_BODYPOSTURE_TYPES = gql`
  query getBodyPostureTypes($filter: UserAttributeMasterFilter) {
    getUserAttributeMaster(filter: $filter) {
      name
      _id
      image
    }
  }
`;

export const GET_BODYSHAPE_TYPES = gql`
  query getBodyShapeTypes($filter: UserAttributeMasterFilter) {
    getUserAttributeMaster(filter: $filter) {
      name
      _id
      image
    }
  }
`;
export const GET_FITPREFRENCE_TYPES = gql`
  query getFitPreferenceTypes($filter: UserAttributeMasterFilter) {
    getUserAttributeMaster(filter: $filter) {
      name
      _id
      image
    }
  }
`;

export const GET_SAVEBODY_PROFILE = gql`
  mutation getSaveBodyProfile($basicInfo: UserBodyProfileInput) {
    saveBodyProfile(basicInfo: $basicInfo) {
      _id
    }
  }
`;

export const GET_BODYPROFILE = gql`
  query getGetUserBodyProfile($userId: String!) {
    getBodyProfile(userId: $userId) {
      firstName
      lastName
      email
      phone
      countryCode
      height
      weight
      age
      shoulderTypeId
      bodyPostureId
      bodyShapeId
      fitPreferenceId
      frontPicture
      sidePicture
      backPicture
    }
  }
`;

export const SAVE_FRONT_PICTURE = gql`
  mutation saveFrontPicture($picture: Upload!, $userId: String!) {
    saveBodyProfileFrontPicture(picture: $picture, userId: $userId) {
      imageUrl
    }
  }
`;

export const SAVE_BACK_PICTURE = gql`
  mutation saveBackPicture($picture: Upload!, $userId: String!) {
    saveBodyProfileBackPicture(picture: $picture, userId: $userId) {
      imageUrl
    }
  }
`;

export const SAVE_SIDE_PICTURE = gql`
  mutation saveSidePicture($picture: Upload!, $userId: String!) {
    saveBodyProfileSidePicture(picture: $picture, userId: $userId) {
      imageUrl
    }
  }
`;

export const UPLOAD_PDF = gql`
  mutation uploadUserMeasurementPdf(
    $pdf: Upload!
    $userId: String!
    $catId: String!
    $subCat: String
    $type: String
    $measuredBy: String
    $note: String
  ) {
    saveUserMeasurementPdf(
      pdf: $pdf
      userId: $userId
      catId: $catId

      subCat: $subCat
      type: $type
      measuredBy: $measuredBy
      note: $note
    ) {
      catId
    }
  }
`;

export const DELETE_USER_MEASURMENTS = gql`
  mutation deleteUserMeasurement($measurementId: String!) {
    deleteUserMeasurement(measurementId: $measurementId)
  }
`;

export const GET_MEASURMENTS_CONFIG = gql`
  query getUserMeasurementFormulaConfig {
    getMeasurementFormulaConfig {
      config {
        measurement_sort_order_config {
          catId
          subCat
          options {
            name
            sortOrderRow
            sortOrderCol
          }
        }
        internal_measurement {
          catId
          measurement_formulas {
            output_attribute
            canBeEdited
            operations {
              sortOrder
              operation
              attributeA
              attributeB
              hasConstant
              considerPerviousValue
            }
          }
        }
        categories {
          catId
          inputs {
            name
            outputs {
              name
              operation
              value
            }
          }
        }
      }
      catIdMap {
        inputCatId
        outputCatIds
      }
    }
  }
`;

export const GET_ALL_TAILORS = gql`
  query {
    getAllTailors {
      _id
      name
      phone
      email
      image
      note
    }
  }
`;

export const GET_STANDARD_SIZE_CHART = gql`
  query GetStandardSizeChart($catIds: [String], $size: String) {
    getStandardSizeChart(catIds: $catIds, size: $size) {
      catId
      size
      label
      sortOrder
      options {
        name
        value
      }
    }
  }
`;

export const SAVE_SIZING_CHART = gql`
  mutation SaveUserStandardSizing($body: [StandardSizingInput]!) {
    saveUserStandardSizing(body: $body)
  }
`;

export const GET_ALL_OCCASIONS = gql`
  query {
    getAllOccasions {
      _id
      name
      categories {
        _id
        name
        label
      }
    }
  }
`;
export const GET_USER_STANDARD_SIZING = gql`
  query GetUserStandardSizing(
    $userId: String!
    $catIds: [String]
    $page: Int
    $limit: Int
  ) {
    getUserStandardSizing(
      userId: $userId
      catIds: $catIds
      page: $page
      limit: $limit
    ) {
      _id
      size
      label
      catId
      note
      bodyProfileId
      modifiedOptions {
        name
        value
      }
    }
  }
`;
