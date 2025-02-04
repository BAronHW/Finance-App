import { useMutation } from "@apollo/client";
import { CREATE_LINKTOKEN, EXCHANGE_PUB_TOKEN } from "../graphql/Plaid";
import { PlaidLinkOnSuccessMetadata, usePlaidLink } from "react-plaid-link";


type Props = {
  userId: number;
  setAccessToken: (accessToken: string) => void;
}

export const useAccessToken = async ({userId, setAccessToken }: Props) => {
  const [createLinkToken] = useMutation(CREATE_LINKTOKEN);
    const [exchangeToken] = useMutation(EXCHANGE_PUB_TOKEN);
    
    console.log("Fetching link token");
    const { data: { createLinkToken: linkTokenData } } = await createLinkToken();
    
    if (!linkTokenData?.link_token) {
      throw new Error("Error while creating link token.")
    }

    const { open: openPlaidLink, ready: plaidLinkReady } = usePlaidLink({
      token: linkTokenData.link_token,
      onSuccess: async (public_token: string, metadata: PlaidLinkOnSuccessMetadata) => {
        const { data: { accessTokenData }} = await exchangeToken({
          variables: {
            userId: userId,
            public_token,
          }
        });
        if (accessTokenData.exchangePublicToken.accessToken) {
          setAccessToken(accessTokenData.exchangePublicToken.accessToken)
        }
      },
    });

    return openPlaidLink;
}
