import projectConfig from '@/configs/projectConfig';
import { useUser } from '@/store/auth/hooks';
import { getSuperAdminMail } from '@/api/projeAyar';
import { useEffect, useState } from 'react';
import { leftMenu } from '@/routes/menu';

const useFilteredMenu = () => {
  const [filteredMenu, setFilteredMenu] = useState([]);
  const currentUser = useUser();

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSuperAdminMail();
        const superAdminMail = response.data.data;

        if (currentUser.email === superAdminMail) {
          setFilteredMenu(leftMenu);
        } else {
          const filtered = leftMenu.filter(item => {
            if (item.access && item.access !== projectConfig.menuAccess.All && item.access !== currentUser.tip) {
              return false;
            }

            return true;
          });
          setFilteredMenu(filtered);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [currentUser]);

  return filteredMenu;
};

export { useFilteredMenu };
