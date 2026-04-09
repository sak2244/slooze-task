import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(input: { email: $email, password: $password }) {
      accessToken
      user {
        id
        email
        role
        name
      }
    }
  }
`;

export const DASHBOARD_STATS_QUERY = gql`
  query DashboardStats {
    dashboardStats {
      totalProducts
      lowStockCount
      totalInventoryValue
    }
  }
`;

export const PRODUCTS_QUERY = gql`
  query Products {
    products {
      id
      name
      category
      unit
      price
      quantity
      updatedAt
    }
  }
`;

export const PRODUCT_BY_ID_QUERY = gql`
  query ProductById($id: ID!) {
    product(id: $id) {
      id
      name
      category
      unit
      price
      quantity
      updatedAt
    }
  }
`;

export const CREATE_PRODUCT_MUTATION = gql`
  mutation CreateProduct($input: CreateProductInput!) {
    createProduct(input: $input) {
      id
      name
      category
      unit
      price
      quantity
      updatedAt
    }
  }
`;

export const UPDATE_PRODUCT_MUTATION = gql`
  mutation UpdateProduct($id: ID!, $input: UpdateProductInput!) {
    updateProduct(id: $id, input: $input) {
      id
      name
      category
      unit
      price
      quantity
      updatedAt
    }
  }
`;
