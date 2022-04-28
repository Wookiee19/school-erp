import React, { createContext } from "react";
import { CognitoUser, AuthenticationDetails } from "amazon-cognito-identity-js";
import Pool from "../userPool";

const AuthContext = createContext();

const AuthProvider = (props) => {
  const getSession = async () => {
    return await new Promise((resolve, reject) => {
      const user = Pool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) reject();
          else resolve(session);
        });
      } else {
        reject();
      }
    });
  };

  const authenticate = async (Username, Password) => {
    return await new Promise((resolve, reject) => {
      const user = new CognitoUser({ Username, Pool });

      const authDetails = new AuthenticationDetails({ Username, Password });

      user.authenticateUser(authDetails, {
        onSuccess: (data) => {
          resolve(data);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (data) => {
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = Pool.getCurrentUser();
    if (user) user.signOut();
  };

  return (
    <AuthContext.Provider value={{ authenticate, getSession, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export { AuthProvider, AuthContext };
