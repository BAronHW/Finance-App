import { Type } from "@google/genai";
import { ai } from "./gemini";
import {} from "@google/generative-ai";

type CategorisedPair = {
  transactionId: number;
  categoryId: number;
};

export const categoriseTransactions = async (
  transactions: {
    id: number;
    merchantName: string;
    amount: number;
  }[],
  batchSize: number,
  categories: {
    id: number;
    name: string;
    description: string | null;
  }[]
): Promise<CategorisedPair[]> => {
  const prompt = `
    Please assign each of the transactions provided one of the following categories. 
    Make the best possible guess based on the information provided. 
    If there's no clue whatsoever, assign a null category.

    RETURN ONLY THE JSON, NO OTHER CHARACTERS.
    
    Give your response as a JSON in the following format:
    {
      transactionId: number;
      categoryId: number | null; 
    }[]

    ## Example:

    #### Input:
    
    Categories: [
      {
        id: 1,
        name: "Leisure",
        description: "Anything I did for fun, not including food. e.g. cinema, theme park, bowling etc",
      },
      {
        id: 2,
        name: "Travel",
        description: "Anything I spent on getting to places. e.g. buses, trains and flights",
      }
    ]

    Transaction: [
      {
        id: 12,
        merchantName: "Blue Planet Aquarium",
        amount: 42,
      },
      {
        id: 27,
        merchantName: "Trainline",
        amount: 55,
      }
    ]
    
    #### Correct Output:
    [
      {
        transactionId: 12,
        categoryId: 1,
      },
      {
        transactionId: 27,
        categoryId: 2,
      },
    ]
    
    #### Explanation: 
    Transaction with id 12 is for an aquarium, which counts as a leisure activity. (category id 1)
    Transaction with id 27 is spent on Trainline, an app used to purchase train tickets, hence is travel. (category id 2)

    ## Actual Inputs:

    #### Categories: 
    ${JSON.stringify(categories)}

    ## Transactions:
  `;
  const batchedTransactions = [];
  const batch = [];
  for (let i = 0; i < transactions.length; i++) {
    batch.push(transactions[i]);
    if ((i + 1) % batchSize === 0) {
      batchedTransactions.push([...batch]);
      batch.length = 0;
    }
  }
  batchedTransactions.push([...batch]);
  batch.length = 0;
  const result = await Promise.all(
    batchedTransactions.flatMap((batch) => {
      const response = ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt + JSON.stringify(batch),
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                transactionId: {
                  type: Type.INTEGER,
                  nullable: false,
                },
                categoryId: {
                  type: Type.INTEGER,
                  nullable: false,
                },
              },
              required: ["transactionId", "categoryId"],
            },
          },
        },
      });
      return response;
    })
  );
  const parsedResult = result
    .flatMap((object) => (object.text ? JSON.parse(object.text) : undefined))
    .filter((output) => output);
  return parsedResult;
};
