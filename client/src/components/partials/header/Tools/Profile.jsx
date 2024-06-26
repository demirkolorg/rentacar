import { useEffect, useState } from 'react';
import Dropdown from '@/components/ui/Dropdown';
import Icon from '@/components/ui/Icon';
import { Menu, Transition } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import UserAvatar from '@/assets/images/all-img/user.png';
import { setLogout } from '@/store/auth/actions';
import { useUser } from '@/store/auth/hooks';
import { logout } from '../../../../api/auth';
import { toast } from 'react-toastify';

// Boş bağımlılık dizisi

const profileLabel = name => {
  return (
    <div className="flex items-center">
       <div className="flex-1 ltr:mr-[10px] rtl:ml-[10px]">
        <div className="lg:h-8 lg:w-8 h-7 w-7 rounded-full">
          <img src={UserAvatar} alt="" className="block w-full h-full object-cover rounded-full" />
        </div>
      </div>
      
      <div className="flex-none text-slate-600 dark:text-white text-sm font-normal items-center lg:flex hidden overflow-hidden text-ellipsis whitespace-nowrap">
        <span className="overflow-hidden text-ellipsis whitespace-nowrap block mr-3">{name}</span>
      </div>

     
    </div>
  );
};

const Profile = () => {
  const navigate = useNavigate();
  const currentUser = useUser();

  const onLogout = async () => {
    try {
      const response = await logout();
      if (response.data.success) {
        setLogout();
        navigate('/login');
        setTimeout(() => {
          toast.success(response.data.message);
        }, 100);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const ProfileMenu = [
    {
      label: 'Profile',
      icon: 'heroicons-outline:user',

      action: () => {
        console.log('profile');
      }
    },
    {
      label: 'Chat',
      icon: 'heroicons-outline:chat',
      action: () => {
        console.log('chat');
      }
    },
    {
      label: 'Email',
      icon: 'heroicons-outline:mail',
      action: () => {
        console.log('email');
      }
    },
    {
      label: 'Todo',
      icon: 'heroicons-outline:clipboard-check',
      action: () => {
        console.log('todo');
      }
    },
    {
      label: 'Settings',
      icon: 'heroicons-outline:cog',
      action: () => {
        console.log('settings');
      }
    },
    {
      label: 'Price',
      icon: 'heroicons-outline:credit-card',
      action: () => {
        console.log('price');
      }
    },
    {
      label: 'Faq',
      icon: 'heroicons-outline:information-circle',
      action: () => {
        console.log('faq');
      }
    },
    {
      label: 'Logout',
      icon: 'heroicons-outline:login',
      action: () => {
        // setLogout();
        // navigate('/login');
        onLogout();
      }
    }
  ];

  return (
    <Dropdown label={profileLabel(currentUser.ad + ' ' + currentUser.soyad)} classMenuItems="w-[180px] top-[58px]">
      {ProfileMenu.map((item, index) => (
        <Menu.Item key={index}>
          {({ active }) => (
            <div onClick={() => item.action()} className={`${active ? 'bg-slate-100 text-slate-900 dark:bg-slate-600 dark:text-slate-300 dark:bg-opacity-50' : 'text-slate-600 dark:text-slate-300'} block     ${item.hasDivider ? 'border-t border-slate-100 dark:border-slate-700' : ''}`}>
              <div className={`block cursor-pointer px-4 py-2`}>
                <div className="flex items-center">
                  <span className="block text-xl ltr:mr-3 rtl:ml-3">
                    <Icon icon={item.icon} />
                  </span>
                  <span className="block text-sm">{item.label}</span>
                </div>
              </div>
            </div>
          )}
        </Menu.Item>
      ))}
    </Dropdown>
  );
};

export default Profile;
