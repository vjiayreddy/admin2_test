import { gql } from "@apollo/client";

export const GET_LATEST_APPOINTMENT_ID = gql`
  query {
    getLatestAppointmentId
  }
`;

export const SAVE_LEAD_APPOINTMENT = gql`
  mutation saveLeadAppointment($body: LeadAppointmentInput!) {
    saveLeadAppointment(body: $body) {
      _id
    }
  }
`;

export const GET_ALL_APPOINTMENTS = gql`
  query getAllAppointments(
    $params: AppointmentFilterInput!
    $page: Int
    $limit: Int
  ) {
    getAllAppointments(params: $params, page: $page, limit: $limit) {
      appointments {
        _id
        appointmentId
        userId
        firstName
        lastName
        leadId
        email
        countryCode
        phone
        appointmentSelectedTimestamp
        currentStatus
        orderValue
       
        dateRecorded {
          timestamp
        }

        source {
          _id
          name
        }
        persona {
          _id
          name
        }
        generatedSalesTeam {
          _id
          name
        }

        lead {
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
        status {
          name
          note
          dateRecorded {
            timestamp
          }
        }
        stylist {
          _id
          name
        }
        appointmentType
        appointmentDate {
          timestamp
          datestamp
          hour
          minute
        }
        followUpDate {
          timestamp
        }
      }
    }
  }
`;

export const UPDATE_APPOINTMENT_STATUS = gql`
  mutation updateAppointmentStatus(
    $appointmentId: String!
    $status: String!
    $reason: String!
    $date: DateTimeSchemaInput
  ) {
    updateAppointmentStatus(
      appointmentId: $appointmentId
      status: $status
      reason: $reason
      date: $date
    ) {
      _id
    }
  }
`;
