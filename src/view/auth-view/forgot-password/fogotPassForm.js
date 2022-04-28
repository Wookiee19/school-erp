import React from "react";
import { Form, Input, Button } from "antd";
import { MailOutlined } from "@ant-design/icons";

const ForgotPasswordForm = (props) => {
  const [form] = Form.useForm();

  return (
    <>
      {props.stage === 1 && (
        <Form
          form={form}
          layout="vertical"
          name="forget-password"
          onFinish={props.handleResetPassword}
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email address",
              },
              {
                type: "email",
                message: "Please enter a validate email!",
              },
            ]}
          >
            <Input
              placeholder="Email Address"
              prefix={<MailOutlined className="text-primary" />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              loading={props.loading}
              type="primary"
              htmlType="submit"
              block
            >
              {props.loading ? "Sending" : "Send"}
            </Button>
          </Form.Item>
        </Form>
      )}

      {props.stage === 2 && (
        <Form
          form={form}
          layout="vertical"
          name="code-verification"
          onFinish={props.handleChangePassword}
        >
          <Form.Item
            name="code"
            rules={[
              {
                required: true,
                message: "Please input your verification code",
              },
              {
                type: "string",
                message: "Please enter a valid verification code!",
              },
            ]}
          >
            <Input
              placeholder="verification code"
              prefix={<MailOutlined className="text-primary" />}
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input new password",
              },
              {
                type: "string",
                message: "Please enter a valid password",
              },
            ]}
          >
            <Input
              placeholder="New Password"
              prefix={<MailOutlined className="text-primary" />}
            />
          </Form.Item>
          <Form.Item
            name="confirmPassword"
            rules={[
              {
                required: true,
                message: "Please confirm your password!",
              },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject("Passwords do not match!");
                },
              }),
            ]}
          >
            <Input
              placeholder="Repeat New Password"
              prefix={<MailOutlined className="text-primary" />}
            />
          </Form.Item>
          <Form.Item>
            <Button
              // loading={props.loading}
              type="primary"
              htmlType="submit"
              block
            >
              {props.loading ? "Sending" : "Change Password"}
            </Button>
          </Form.Item>
        </Form>
      )}
    </>
  );
};

export default ForgotPasswordForm;
