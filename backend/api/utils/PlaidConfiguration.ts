import { Configuration, PlaidApi, PlaidEnvironments } from 'plaid'
import dotenv from 'dotenv'
dotenv.config()

export const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': process.env.PLAIDCLIENTID,
      'PLAID-SECRET': process.env.PLAIDSECRET,
    },
  },
});