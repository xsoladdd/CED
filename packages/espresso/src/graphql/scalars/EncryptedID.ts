import { ApolloError } from "apollo-server-express";
import { GraphQLScalarType } from "graphql";
import { decrypt, encrypt } from "../../utils/CryptoJS";

export const EncryptedID = new GraphQLScalarType({
  name: "EncryptedID",
  description: "Crypto protocol for IDS",
  serialize(value: string | number): string {
    // check the type of received value
    if (typeof value !== "string") {
      return encrypt(value.toString());
    }
    return encrypt(value); // value sent to the client
  },
  parseValue(value: string): string | number {
    // check the type of received value
    const decryptedString = decrypt(value);
    if (!decryptedString) {
      throw new ApolloError("Invalid ID", "INVALID_ENCRYPTED_ID_FORMAT");
    }
    return decryptedString; // value from the client input variables
  },
  parseLiteral(ast): string {
    // check the type of received value
    const { value } = ast as { value: string };
    const decryptedString = decrypt(value);
    if (!decryptedString) {
      throw new ApolloError("Invalid ID", "INVALID_ENCRYPTED_ID_FORMAT");
    }
    return decryptedString; // value from the client query
  },
});
