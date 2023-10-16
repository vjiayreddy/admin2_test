import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  query userLogin($source: String!, $password: String!) {
    login(source: $source, password: $password) {
      token
      expires
      user {
        firstName
        lastName
        _id
      }
    }
  }
`;

export const GET_SINGLE_USER = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      _id
      firstName
      lastName
      email
      countryCode
      phone
      countryName
      stateName
      cityName
      cityId
      userStatus
      customerType
      remarks
      aboutMe
      isStyleClubMember
      customerSegment
      ccDueDate {
        timestamp
      }
      customerSrNo
      lastUpdatedAt {
        timestamp
      }
      images {
        profile
      }
      dateOfBirth {
        timestamp
      }
      secondaryStylists {
        _id
        name
        phone
        email
        image
        note
      }
      stylist {
        _id
        name
        phone
        email
        image
        note
      }
    }
  }
`;
export const GET_SINGLE_STYLIST = gql`
  query getUser($id: ID!) {
    user(id: $id) {
      _id
      firstName
      lastName
      email
      countryCode
      phone
      aboutMe
      customerSrNo
      remarks

      doa
      images {
        profile
      }
      stylist {
        _id
        name
        phone
        email
        image
        note
      }
    }
  }
`;

export const STYLIST_LOGIN = gql`
  mutation userStylistLogin($source: String!, $password: String!) {
    stylistLoginUser(source: $source, password: $password) {
      token
    }
  }
`;
export const GET_AUTH_STYLIST = gql`
  query GetAuthStylist {
    authStylist @client
  }
`;

export const GET_ALL_USERS = gql`
  query {
    getAllUsers {
      _id
      firstName
      fullName
      lastName
      phone
      createdAt
      customerSrNo
      countryCode
      customerType
      isStyleClubMember
      customerSegment
      ccDueDate {
        timestamp
      }
      lastUpdatedAt {
        timestamp
      }
      email
      tags
      serviceOrder {
        razorPayId
      }
      secondaryStylists {
        _id
        name
        phone
        email
        image
        note
      }
      stylist {
        _id
        name
        phone
        email
        image
        note
      }
    }
  }
`;
export const GET_ALL_USERS_BY_FILTER = gql`
  query getUserByFilter($filter: UserFilter, $page: Int, $limit: Int) {
    getUsersByFilter(filter: $filter, page: $page, limit: $limit) {
      _id
      firstName
      fullName
      lastName
      phone
      createdAt
      customerSrNo
      countryCode
      email
      tags
      countryName
      stateName
      cityName
      cityId
      userStatus
      customerType
      isStyleClubMember
      remarks
      customerSegment
      ccDueDate {
        timestamp
      }
      lastUpdatedAt {
        timestamp
      }
      secondaryStylists {
        _id
        name
        phone
        email
        image
        note
      }
      addresses {
        _id
        city
        state
        country
      }
      serviceOrder {
        razorPayId
      }
      stylist {
        _id
        name
        phone
        email
        image
        note
      }
    }
  }
`;

export const GET_ALL_STYLISTS = gql`
  query {
    getAllStylists {
      _id
      name
    }
  }
`;

export const SEARCH_CITY_BY_NAME = gql`
  query GetCityBySearchTerm($searchTerm: String!) {
    getCityBySearchTerm(searchTerm: $searchTerm) {
      id
      name
      searchName
    }
  }
`;

export const ADD_USER_ADDRESS = gql`
  mutation saveAddress($address: UserAddressInput!) {
    saveAddress(address: $address) {
      _id
      firstName
      lastName
      phone
      address1
      address2
      landmark
      city
      state
      email
      country
      postalCode
    }
  }
`;

export const GET_USER_ADDRESSES = gql`
  query getUserAddreses($userId: String!) {
    getUserAddresses(userId: $userId) {
      phone
      country
      lastName
      landmark
      firstName
      email
      state
      address1
      address2
      postalCode
      countryCode
      city
      _id
    }
  }
`;

export const UPDATE_USER_PROFILE = gql`
  mutation updateUserProfileData(
    $userId: String!
    $updateData: UpdateUserProfileInput!
  ) {
    updateUserProfile(userId: $userId, updateData: $updateData)
  }
`;

export const SAVE_PROFILE_IMAGE = gql`
  mutation saveUserProfilePicture($picture: Upload!, $userId: String!) {
    saveProfilePicture(picture: $picture, userId: $userId) {
      imageUrl
    }
  }
`;
export const SAVE_MISC_PICTURE_1 = gql`
  mutation saveUserMiscPicture1($picture: Upload!, $userId: String!) {
    saveMiscPicture1(picture: $picture, userId: $userId) {
      imageUrl
    }
  }
`;
export const SAVE_MISC_PICTURE_2 = gql`
  mutation saveUserMiscPicture2($picture: Upload!, $userId: String!) {
    saveMiscPicture2(picture: $picture, userId: $userId) {
      imageUrl
    }
  }
`;
export const SAVE_MISC_PICTURE_3 = gql`
  mutation saveUserMiscPicture3($picture: Upload!, $userId: String!) {
    saveMiscPicture3(picture: $picture, userId: $userId) {
      imageUrl
    }
  }
`;
export const USER_SIGN_UP = gql`
  mutation RregisterUser(
    $email: String!
    $phone: String!
    $password: String!
    $countryCode: String!
    $firstName: String!
    $lastName: String!
    $fullName: String!
    $googleVerificationCode: String!
  ) {
    registerUser(
      email: $email
      phone: $phone
      countryCode: $countryCode
      password: $password
      firstName: $firstName
      lastName: $lastName
      fullName: $fullName
      googleVerificationCode: $googleVerificationCode
    ) {
      _id
    }
  }
`;

export const GET_USER_BY_MOBILE = gql`
  query getSingleUserBasicDetails(
    $id: ID
    $phone: String
    $customerId: Int
    $emailId: String
  ) {
    getSingleUserBasicData(
      id: $id
      phone: $phone
      customerId: $customerId
      emailId: $emailId
    ) {
      _id
      phone
      lastName
      countryCode
      firstName
      email
      height
      weight
      phone
      dateOfBirth {
        timestamp
      }
      ccDueDate {
        timestamp
      }
      isStyleClubMember
      customerId
      stylist {
        name
        _id
      }
    }
  }
`;

export const GET_ACCESS_FILTER = gql`
  query getUserAccessFilter($roleName: [String], $resourceName: String) {
    getAccessFilter(roleName: $roleName, resourceName: $resourceName) {
      roleId
      resourceId
      role {
        _id
        name
        label
      }
      resource {
        name
        label
        availableControls {
          name
          label
        }
      }
    }
  }
`;

export const GET_ALL_RESOURCES = gql`
  query {
    getAllResources {
      name
      label
    }
  }
`;

export const GET_DASHBOARD_DATA = gql`
  query getDashboardData(
    $startDate: DateTimeSchemaInput!
    $endDate: DateTimeSchemaInput!
  ) {
    getDashboardData(startDate: $startDate, endDate: $endDate) {
      analytics {
        label
        value
      }
    }
  }
`;

export const CREATE_USER_FOR_CIF = gql`
  mutation createUserForCIF($userData: createUserInput) {
    createUserForCIF(userData: $userData) {
      userId
    }
  }
`;

export const GET_APPOINTMENTS_DASHBOARD_DATA = gql`
  query getAppointmentDashboardData(
    $startDate: DateTimeSchemaInput!
    $endDate: DateTimeSchemaInput!
  ) {
    getAppointmentDashboardData(startDate: $startDate, endDate: $endDate) {
      analytics {
        label
        value
      }
    }
  }
`;

export const GET_ORDER_DASHBOARD_DATA = gql`
  query getStoreOrderDashboardData(
    $startDate: DateTimeSchemaInput!
    $endDate: DateTimeSchemaInput!
  ) {
    getStoreOrderDashboardData(startDate: $startDate, endDate: $endDate) {
      analytics {
        label
        value
      }
    }
  }
`;

export const GET_LEADS_DASHBOARD_DATA = gql`
  query getLeadsDashboardData(
    $startDate: DateTimeSchemaInput!
    $endDate: DateTimeSchemaInput!
  ) {
    getLeadsDashboardData(startDate: $startDate, endDate: $endDate) {
      analytics {
        label
        value
      }
    }
  }
`;

export const GET_USER_WITH_OUT_CNO = gql`
  query getSingleUserBasicDataForLeadDetails(
    $id: ID
    $phone: String
    $customerId: Int
    $emailId: String
  ) {
    getSingleUserBasicDataForLead(
      id: $id
      phone: $phone
      customerId: $customerId
      emailId: $emailId
    ) {
      _id
      phone
      lastName
      countryCode
      firstName
      email
      height
      weight
      phone
      dateOfBirth {
        timestamp
      }
      ccDueDate {
        timestamp
      }
      isStyleClubMember
      customerId
      stylist {
        name
        _id
      }
    }
  }
`;
