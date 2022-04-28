import React, { useState } from "react";
import { Card, Row, Col, message } from "antd";
import ForgotPassForm from "./fogotPassForm";

import { CognitoUser } from "amazon-cognito-identity-js";
import UsersPool from "../../../userPool";

const backgroundStyle = {
  backgroundImage: "url(/img/forgotpass-bg-image.jpg)",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
};

const ForgotPassword = (props) => {
  const [loading, setLoading] = useState(false);
  const [stage, setStage] = useState(1); // 1 -> email, 2 -> verific. code, 3 -> new pass
  const [email, setEmail] = useState();

  const getUser = (email) => {
    return new CognitoUser({
      Username: email,
      Pool: UsersPool,
    });
  };

  const handleResetPassword = ({ email }) => {
    setEmail(email);
    setLoading(true);

    getUser(email).forgotPassword({
      onSuccess: (data) => {
        setLoading(false);
      },
      onFailure: (err) => {
        setLoading(false);
      },
      inputVerificationCode: (data) => {
        message.success("verification code has send to your email!");
        setStage(2);
      },
    });
  };

  const handleChangePassword = ({ code, password, confirmPassword }) => {
    if (
      !code.length ||
      !password.length ||
      !confirmPassword.length ||
      password !== confirmPassword
    ) {
      return;
    }

    getUser(email).confirmPassword(code, password, {
      onSuccess: () => {
        setLoading(false);
        message.success("password successfully has been changed");
        setTimeout(() => {
          props.history.push("/login");
        }, 1500);
      },
      onFailure: (err) => {
        setLoading(false);
      },
    });
  };

  return (
    <div className="h-100" style={backgroundStyle}>
      <div className="container d-flex flex-column justify-content-center h-100">
        <Row justify="center">
          <Col xs={20} sm={20} md={20} lg={9}>
            <Card>
              <div className="my-2">
                <div className="text-center">
                  <h1>
                    <b>Logo</b>
                  </h1>
                  <h3 className="mt-3 font-weight-bold">Forgot Password?</h3>
                  <p className="mb-4">Enter your Email to reset password</p>
                </div>
                <Row justify="center">
                  <Col xs={24} sm={24} md={20} lg={20}>
                    <ForgotPassForm
                      handleResetPassword={handleResetPassword}
                      handleChangePassword={handleChangePassword}
                      stage={stage}
                      loading={loading}
                    />
                  </Col>
                </Row>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default ForgotPassword;
