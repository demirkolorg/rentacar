import { useState } from 'react';
import { toast as message } from 'react-toastify';

import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

import { useStatusSubeModalState, setStatusSubeModalState, useSube, fetchSubeler } from '@/store/kartlar/sube/hooks';
import { useUser } from '@/store/auth/hooks';
import { subeDurumDegistir } from '@/api/kartlar/sube';

const StatusForm = ({ getData }) => {
  const subeData = useSube();
  const user = useUser();
  const [btnLoading, setBtnLoading] = useState(false);

  const dataUpdate = async () => {
    setBtnLoading(true);
    try {
      const response = await subeDurumDegistir({
        _id: subeData._id,
        is_active: subeData.is_active === true ? false : true
      });
      if (response.data.success) {
        message.success(response.data.message);
        getData();
        setStatusSubeModalState(false);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    setBtnLoading(false);
  };

  return (
    <div>
      <Modal
        activeModal={useStatusSubeModalState()}
        title="Sube Durum Güncelleme İşlem Onayı"
        onClose={() => {
          setStatusSubeModalState(false);
        }}
        themeClass="bg-slate-900"
        footerContent={
          <>
            <Button
              text="Onayla"
              className="btn-success"
              isLoading={btnLoading}
              disabled={btnLoading}
              onClick={() => {
                dataUpdate();
              }}
            />
            <Button
              text="Vazgeç"
              className="btn-dark"
              disabled={btnLoading}
              onClick={() => {
                setStatusSubeModalState(false);
              }}
            />
          </>
        }
      >
        <p>
          Merhaba {user.ad} {user.soyad}, <strong>{subeData.ad}</strong> isimli şubenin
          {subeData.is_active ? (
            <Badge label="Aktif" className="bg-success-500 text-white mx-1" />
          ) : (
            <Badge label="Pasif" className="bg-danger-500 text-white mx-1" />
          )}{' '}
          olan durumunu
          {!subeData.is_active ? (
            <Badge label="Aktif" className="bg-success-500 text-white mx-1" />
          ) : (
            <Badge label="Pasif" className="bg-danger-500 text-white mx-1" />
          )}
          olarak değiştirmek istediğinize emin misiniz?
        </p>
      </Modal>
    </div>
  );
};
export default StatusForm;
