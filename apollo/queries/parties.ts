import gql from 'graphql-tag'

export const FETCH_PARTIES = gql`
query Parties ($slug: String!, $pin: Int!) {
  parties(where: { slug:$slug, pin:$pin }) {
    id
    slug
    pin
    startDate
    partyHost {
      id
      name
      restaurants {
        id
        name
        image {
          url
          alternativeText
        }
      }
    }
    members {
      id
      name
      restaurants {
        id
        name
        image {
          url
          alternativeText
        }
      }
    }
  }
}
`