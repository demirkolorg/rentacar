import Select from 'react-select';
import SimpleBar from 'simplebar-react';
import { useEffect, useRef, useState } from 'react';
import { optionStyle } from '@/helper/optionStyle';
import { useUser } from '@/store/auth/hooks';
import { getSuperAdminMail } from '@/api/projeAyar';
import { subeList,subeListWithPopulate, subeGetIds } from '@/api/kartlar/sube';
import { setAktifSube } from '@/store/genel/hooks';

const Sube = () => {
  const scrollableNodeRef = useRef();
  const [scroll, setScroll] = useState(false);
  const currentUser = useUser();
  const [subeler, setSubeler] = useState([]);
  const [selectedSube, setSelectedSube] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      if (scrollableNodeRef.current && scrollableNodeRef.current.scrollTop > 0) {
        setScroll(true);
      } else {
        setScroll(false);
      }
    };

    if (scrollableNodeRef.current) {
      scrollableNodeRef.current.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollableNodeRef.current) {
        scrollableNodeRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await getSuperAdminMail();
        if (response.data.success && response.data.data === currentUser.email) {
          const responseSubeler = await subeListWithPopulate();
          if (responseSubeler.data.success) {
            const data = responseSubeler.data.data;
            const options = data.map(sube => ({
              value: sube._id,
              label: sube.ad
            }));
            setSubeler(options);
            setSelectedSube(options[0]);
            setAktifSube(options[0]);
          }
        } else {
          const responseSubelerIds = await subeGetIds(currentUser.subeler);
          if (responseSubelerIds.data.success) {
            const data = responseSubelerIds.data.data;
            const options = data.map(sube => ({
              value: sube._id,
              label: sube.ad
            }));
            setSubeler(options);
            setSelectedSube(options[0]);
            setAktifSube(options[0]);
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    getData();
  }, [currentUser]);

  const subeChange = selectedOption => {
    setSelectedSube(selectedOption);
    setAktifSube(selectedOption);
  };

  const MenuList = props => {
    return (
      <SimpleBar scrollableNodeProps={{ ref: scrollableNodeRef }} style={{ maxHeight: 200 }}>
        <div {...props.innerProps} className="react-select__menu-list">
          {props.children}
        </div>
      </SimpleBar>
    );
  };

  return (
    <Select
      maxMenuHeight={200}
      className="w-44 font-medium "
      classNamePrefix="select"
      placeholder="Şube Seçiniz ..."
      value={selectedSube}
      options={subeler}
      styles={optionStyle}
      onChange={subeChange}
      components={{ MenuList }}
      // menuPlacement="top"
    />
  );
};
export default Sube;
