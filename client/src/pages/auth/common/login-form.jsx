import { Form, Input, Button, Radio, message } from "antd";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { getAntdInputValidation } from "../../utils/helpers";
import { setLoading } from "@/store/loader/hooks";
import { setCurrentUser, setLogin } from "../../../store/auth/actions";
import { login } from "../../../api/auth";

export default function LoginForm() {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await login({ ...values });
      setLoading(false);
      if (response.data.success) {
        message.success(response.data.message.desc);
        setLogin(response.data.data.token);
        // setCurrentUser(response.data.data.user);
        navigate("/");
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  }, []);

  return (
    <Form layout="vertical" className="dark:bg-dark dark:text-slate-200" onFinish={onFinish}>
      <Form.Item
      className="font-white text-white "
        label="Email"
        name="email"
        initialValue={"SUPER_ADMIN@EMAIL.COM.TR"}
      >
        <Input className="text-base h-12 rounded-sm" />
      </Form.Item>

      <Form.Item
        label="Parola"
        name="password"
        initialValue={"SUPER_ADMIN_PASSWORD_172729"}
      >
        <Input className="text-base h-12 rounded-sm" type="password" />
      </Form.Item>

      <Button block className="h-12 my-10 btn-dark text-base" htmlType="submit">
        Giriş yap
      </Button>
    </Form>
  );
}
