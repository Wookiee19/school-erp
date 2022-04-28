import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "ap-south-1_IT7rYXJk0",
    ClientId: "6es0qsp0nou071oqbple6cjhlc"
};

export default new CognitoUserPool(poolData);
