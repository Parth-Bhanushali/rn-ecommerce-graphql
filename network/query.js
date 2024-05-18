import { gql } from '@apollo/client';

export const COLLECTIONS_QUERY = gql`
{
  collections(first: 2) {
    edges {
      node {
        title
        description
        handle
        products(first: 2) {
          edges {
            node {
              id
              title
              description
              images(first: 3) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 5) {
                edges {
                  cursor
                  node {
                    id
                    title
                    image {
                      url
                    }
                    price {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
`;