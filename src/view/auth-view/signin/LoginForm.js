import React from "react";
import { Button, Form, Input, Divider, Alert } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";

import CustomIcon from "../../../Components/Icon";
import { GoogleSVG, FacebookSVG } from "../../../assets/svg/icon";

const initialCredential = {
  email: "rid123@gmail.com",
  password: "Erpw@123",
};

const LoginForm = (props) => {
  const onForgetPasswordClick = () => {};
  const onGoogleLogin = () => {};
  const onFacebookLogin = () => {};

  

  return (
    <>
      <motion.div
        initial={{ opacity: 0, marginBottom: 0 }}
        animate={{
          opacity: 0,
          marginBottom: 0,
        }}
      >
        <Alert type="error" showIcon message={"message"}></Alert>
      </motion.div>
      <Form
        layout="vertical"
        name="login-form"
        initialValues={initialCredential}
        onFinish={props.onLogin}
      >
        <Form.Item
          name="email"
          label="Email"
          rules={[
            {
              required: true,
              message: "Please input your email",
            },
            {
              type: "email",
              message: "Please enter a validate email!",
            },
          ]}
        >
          <Input prefix={<MailOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item
          name="password"
          label={
            <div
              className={
                "d-flex justify-content-between w-100 align-items-center"
              }
            >
              <span>Password</span>
              <span
                onClick={() => onForgetPasswordClick}
                className="cursor-pointer font-size-sm font-weight-normal text-muted"
              >
                <a href='/forgot-password'>Forget Password?</a>
              </span>
            </div>
          }
          rules={[
            {
              required: true,
              message: "Please input your password",
            },
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-primary" />} />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block loading={props.loading}>
            Sign In
          </Button>
        </Form.Item>
        {/* {renderOtherSignIn} */}
      </Form>
    </>
  );
};

export default LoginForm;
