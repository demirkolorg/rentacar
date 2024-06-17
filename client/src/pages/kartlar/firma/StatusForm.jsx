import { useState } from 'react';
import { toast as message } from 'react-toastify';

import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import Badge from '@/components/ui/Badge';

import { useStatusFirmaModalState, useFirma, setStatusFirmaModalState } from '@/store/kartlar/firma/hooks';
import { useUser } from '@/store/auth/hooks';
import { firmaActive,firmaPassive } from '@/api/kartlar/firma';

const StatusForm = ({ getData }) => {
  const firmaData = useFirma();
  const user = useUser();
  const [btnLoading, setBtnLoading] = useState(false);

  const dataUpdate = async () => {
    setBtnLoading(true);
    try {
      let response = '';
      if (firmaData.is_active) {
        response = await firmaPassive({ _id: firmaData._id, is_active: false });
      } else {
        response = await firmaActive({ _id: firmaData._id, is_active: true });
      }
      if (response.data.success) {
        message.success(response.data.message);
        getData();
        setStatusFirmaModalState(false);
      } else {
        throw new Error(response.data);
      }
    } catch (error) {
      message.error(error.message);
    }
    setBtnLoading(false);
  };

  return (
    <div>
      <Modal
        activeModal={useStatusFirmaModalState()}
        title="Firma Durum Güncelleme İşlem Onayı"
        onClose={() => {
          setStatusFirmaModalState(false);
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
                setStatusFirmaModalState(false);
              }}
            />
          </>
        }
      >
        <p>
          Merhaba {user.ad} {user.soyad}, <strong>{firmaData.ad}</strong> isimli firmanın
          {firmaData.is_active ? (
            <Badge label="Aktif" className="bg-success-500 text-white mx-1" />
          ) : (
            <Badge label="Pasif" className="bg-danger-500 text-white mx-1" />
          )}{' '}
          olan durumunu
          {!firmaData.is_active ? (
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
