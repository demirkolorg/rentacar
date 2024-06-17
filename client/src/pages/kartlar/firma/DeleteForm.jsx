import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';
import {
  setDeleteFirmaModalState,
  useDeleteFirmaModalState,
  useFirma,
  fetchFirmalar
} from '@/store/kartlar/firma/hooks';
import { useUser } from '@/store/auth/hooks';
import { firmaSoftDelete } from '@/api/kartlar/firma';
import { useState } from 'react';
import { toast as message } from 'react-toastify';

const DeleteForm = ({ getData }) => {
  const firmaData = useFirma();
  const user = useUser();
  const [btnLoading, setBtnLoading] = useState(false);

  const deleteData = async () => {
    setBtnLoading(true);
    try {
      const response = await firmaSoftDelete({ _id: firmaData._id });
      if (response.data.success) {
        message.success(response.data.message);

        getData();
        setDeleteFirmaModalState(false);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
    setBtnLoading(false);
  };

  return (
    <div>
      <Modal
        activeModal={useDeleteFirmaModalState()}
        title="Firma Silme İşlem Onayı"
        onClose={() => {
          setDeleteFirmaModalState(false);
        }}
        themeClass="bg-red-500"
        footerContent={
          <>
            <Button
              text="EVET, Firma Silme İşlemini Onaylıyorum, SİL"
              className="btn-danger"
              isLoading={btnLoading}
              disabled={btnLoading}
              onClick={() => {
                deleteData();
              }}
            />
            <Button
              text="Vazgeç"
              className="btn-dark"
              disabled={btnLoading}
              onClick={() => {
                setDeleteFirmaModalState(false);
              }}
            />
          </>
        }
      >
        <p>
          Merhaba {user.ad} {user.soyad}, <strong>{firmaData.ad}</strong> isimli{' '}
          <strong>
            {firmaData.adres.acikAdres}
            {' - '}
            {firmaData.adres.ilce}
            {'/'}
            {firmaData.adres.il}{' '}
          </strong>
          adresli firmayı silmek istediğinize emin misiniz?
        </p>
      </Modal>
    </div>
  );
};
export default DeleteForm;
