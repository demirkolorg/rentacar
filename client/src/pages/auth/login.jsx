import React from 'react';
import { Link } from 'react-router-dom';
import LoginForm from './common/login-form';
import { ToastContainer } from 'react-toastify';
import useDarkMode from '@/hooks/useDarkMode';
// image import
import bgImage from '@/assets/images/all-img/page-bg.png';
import LogoWhite from '@/assets/images/logo/logo-c-white.svg';
import Logo from '@/assets/images/logo/logo-c.svg';
import projectConfig from '../../configs/projectConfig';
const login3 = () => {
  const [isDark] = useDarkMode();
  return (
    <>
      <ToastContainer />
      <div className="loginwrapper bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${bgImage})` }}>
        <div className="lg-inner-column">
          <div className="left-columns lg:w-1/2 lg:block hidden">
            <div className="logo-box-3">
              <Link to="/" className="flex items-center gap-7 ">
                <img className="h-28 w-28" src={LogoWhite} alt="" />
                <p className="text-white text-7xl">{projectConfig.app.name}</p>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 w-full flex flex-col items-center justify-center ">
            <div className="auth-box-3 ">
              <div className="text-center 2xl:mb-10 mb-5">
                <h4 className="font-medium ">Giriş Yap</h4>
                <div className="text-slate-500 dark:text-slate-500 text-base">Sistemi kullanmaya başlamak için hesabınızda oturum açın</div>
              </div>
              <LoginForm />
            </div>
          </div>
          <div className="auth-footer3 text-white py-5 px-5 text-xl w-full">{projectConfig.app.slogan}</div>
        </div>
      </div>
    </>
  );
};

export default login3;
