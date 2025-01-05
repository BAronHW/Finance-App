import { PlaidApi, PlaidEnvironments } from "plaid";
import { configuration } from "../utils/PlaidConfiguration";

const plaidClient = new PlaidApi(configuration)