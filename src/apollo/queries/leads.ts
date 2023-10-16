import { gql } from "@apollo/client";

export const GET_LATEST_LEAD_ID = gql`
  query getUserLatestLeadId {
    getLatestLeadId
  }
`;
export const GET_SALES_TEAMS = gql`
  query getAllSalesTeam {
    getAllSalesTeam {
      name
      _id
    }
  }
`;
export const GET_ALL_STUDIOS = gql`
  query getAllStudios {
    getAllStudios {
      name
      _id
    }
  }
`;
export const GET_ALL_SOURCE_CATEGORIES = gql`
  query getAllSourceCategories {
    getAllSourceCategories {
      name
      _id
      subCategory {
        name
        _id
      }
    }
  }
`;

export const SAVE_LEADS = gql`
  mutation saveLead($body: LeadInput!) {
    saveLead(body: $body) {
      _id
    }
  }
`;

export const GET_ALL_LEADS = gql`
  query getAllLeads($params: LeadFilterInput!, $page: Int, $limit: Int) {
    getAllLeads(params: $params, page: $page, limit: $limit) {
      leads {
        _id
        leadId
        studioId
        userId
        firstName
        lastName
        countryCode
        cityName
        phone
        email
        sourceCatId
        sourceSubCatId
        generatedBySalesTeamId
        creditToSalesTeamId
        creditedSalesTeam {
          name
        }
        generatedSalesTeam {
          name
        }
        estimatedValue
        remarks
        personaIds
        source {
          _id
          name
          subCategory {
            _id
            name
          }
        }
        studio {
          _id
          name
        }
        persona {
          _id
          name
        }
        status {
          _id
          name
          label
          note
          dateRecorded {
            timestamp
          }
          userId
        }
        followUpDate {
          timestamp
        }
        eventDate {
          timestamp
        }
        expClosureDate {
          timestamp
        }
        rating
        leadDate {
          timestamp
        }
      }
    }
  }
`;

export const UPDATE_LEAD_STATUS = gql`
  mutation updateLeadStatus(
    $leadId: String!
    $status: String!
    $reason: String
    $date: DateTimeSchemaInput
  ) {
    updateLeadStatus(
      leadId: $leadId
      status: $status
      reason: $reason
      date: $date
    )
  }
`;
export const GET_SINGLE_LEAD = gql`
  query getSingleLead($leadId: String!) {
    getSingleLead(leadId: $leadId) {
      _id
      leadId
      studioId
      userId
      firstName
      lastName
      countryCode
      cityName
      phone
      email
      sourceCatId
      sourceSubCatId
      generatedBySalesTeamId
      creditToSalesTeamId
      followUpDate {
        timestamp
      }
      generatedSalesTeam {
        _id
        name
      }
      creditedSalesTeam {
        _id
        name
      }
      estimatedValue
      remarks
      personaIds
      source {
        _id
        name
        subCategory {
          _id
          name
        }
      }
      studio {
        _id
        name
      }
      persona {
        _id
        name
      }
      status {
        _id
        name
        label
        note
        dateRecorded {
          timestamp
        }
        userId
      }
      followUpDate {
        timestamp
      }
      eventDate {
        timestamp
      }
      expClosureDate {
        timestamp
      }
      rating
      leadDate {
        timestamp
      }
    }
  }
`;

export const CREATE_LEAD_USER = gql`
  mutation createUserForLead($userData: createUserInput) {
    createUserForLead(userData: $userData) {
      userId
    }
  }
`;
export const GET_LEAD_USER = gql`
  query getUserSingleUserBasicDataForLead(
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
      firstName
      countryCode
      email
      height
      weight
      phone
      customerId
      stylist {
        name
        _id
      }
    }
  }
`;
