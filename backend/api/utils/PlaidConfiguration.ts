import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID, // need to fix this so its actually importing the right stuff from dotenv
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});