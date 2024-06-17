import React, { useEffect, useState } from 'react';
import Textinput from '@/components/ui/Textinput';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import Checkbox from '@/components/ui/Checkbox';
import Button from '@/components/ui/Button';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useLoader, setLoading } from '@/store/loader/hooks';
import { setCurrentUser, setLogin } from '@/store/auth/actions';
import { login } from '@/api/auth';

const LoginForm = () => {
  const navigate = useNavigate();
  const isLoading = useLoader();
  const [checked, setChecked] = useState(false);

  const schema = yup
    .object({
      email: yup.string().email('Geçersiz email').required('Email gerekli'),
      password: yup.string().required('Parola gerekli')
    })
    .required();

  const {
    register,
    formState: { errors },
    handleSubmit
  } = useForm({
    resolver: yupResolver(schema),
    //
    mode: 'all'
  });

  const onSubmit = async data => {
    setLoading(true);
    try {
      const response = await login(data);
      setLoading(false);
      if (response.data.success) {
        setTimeout(() => {
          toast.success(response.data.message);
        }, 100);
        setLogin(response.data.data.token);
        // setCurrentUser(response.data.data.user);
        navigate('/');
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/');
    }
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
      <Textinput name="email" label="email" defaultValue="SUPER_ADMIN@EMAIL.COM.TR" type="email" register={register} error={errors.email} className="h-[48px]" />
      <Textinput name="password" label="passwrod" type="password" defaultValue="SUPER_ADMIN_PASSWORD_172729" register={register} error={errors.password} className="h-[48px]" />
      <div className="flex justify-between">
        <Checkbox value={checked} onChange={() => setChecked(!checked)} label="Oturumumu açık tut" />
        <Link to="/forgot-password" className="text-sm text-slate-800 dark:text-slate-400 leading-6 font-medium">
          Parolamı unuttum
        </Link>
      </div>
      <Button type="submit" text="Giriş Yap" className="btn btn-dark block w-full text-center " isLoading={isLoading} />
    </form>
  );
};

export default LoginForm;
