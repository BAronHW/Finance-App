import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'

// Initialize Plaid client
export const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': "674f55e0e0e97c001b192502",
      'PLAID-SECRET': "7efcea23c44308c0c51873f42e8df1",
    },
  },
});