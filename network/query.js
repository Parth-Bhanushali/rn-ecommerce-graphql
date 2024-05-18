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
              title
              description
              images(first: 1) {
                edges {
                  node {
                    url
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
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