import { useState } from 'react';
import { toast as message } from 'react-toastify';

import Modal from '@/components/ui/Modal';
import Button from '@/components/ui/Button';

import {
  useDeletePozisyonModalState,
  setDeletePozisyonModalState,
  usePozisyon,
  fetchPozisyonlar
} from '@/store/kartlar/pozisyon/hooks';
import { useUser } from '@/store/auth/hooks';
import { pozisyonDelete } from '@/api/kartlar/pozisyon';

const DeleteForm = ({ getData }) => {
  const pozisyonData = usePozisyon();
  const user = useUser();
  const [btnLoading, setBtnLoading] = useState(false);

  const deleteData = async () => {
    setBtnLoading(true);
    try {
      const response = await pozisyonDelete({ _id: pozisyonData._id });
      if (response.data.success) {
        message.success(response.data.message.desc);

        getData();
        setDeletePozisyonModalState(false);
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
        activeModal={useDeletePozisyonModalState()}
        title="Pozisyon Silme İşlem Onayı"
        onClose={() => {
          setDeletePozisyonModalState(false);
        }}
        themeClass="bg-red-500"
        footerContent={
          <>
            <Button
              text="EVET, Pozisyon Silme İşlemini Onaylıyorum, SİL"
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
                setDeletePozisyonModalState(false);
              }}
            />
          </>
        }
      >
        <p>
          Merhaba {user.ad} {user.soyad}, <strong>{pozisyonData.ad}</strong> isimli pozisyonu silmek istediğinize emin
          misiniz?
        </p>
      </Modal>
    </div>
  );
};
export default DeleteForm;
