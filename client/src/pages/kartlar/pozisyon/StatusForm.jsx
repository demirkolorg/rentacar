import { useState } from "react";
import { toast as message} from "react-toastify";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";

import {
  useStatusPozisyonModalState,
  setStatusPozisyonModalState,
  usePozisyon,
  fetchPozisyonlar,
} from "@/store/kartlar/pozisyon/hooks";
import { useUser } from "@/store/auth/hooks";
import { pozisyonDurumDegistir } from "@/api/pozisyon";

const StatusForm = ({ getData }) => {
  const pozisyonData = usePozisyon();
  const user = useUser();
  const [btnLoading, setBtnLoading] = useState(false);

  const dataUpdate = async () => {
    setBtnLoading(true);
    try {
      const response = await pozisyonDurumDegistir({
        _id: pozisyonData._id,
        is_active: pozisyonData.is_active === true ? false : true,
      });
      if (response.data.success) {
        message.success(response.data.message.desc);
        getData();
        setStatusPozisyonModalState(false);
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
        activeModal={useStatusPozisyonModalState()}
        title="Pozisyon Durum Güncelleme İşlem Onayı"
        onClose={() => {
          setStatusPozisyonModalState(false);
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
                setStatusPozisyonModalState(false);
              }}
            />
          </>
        }
      >
        <p>
          Merhaba {user.ad} {user.soyad}, <strong>{pozisyonData.ad}</strong> isimli{" "}
          pozisyonun
          {pozisyonData.is_active ? (
            <Badge label="Aktif" className="bg-success-500 text-white mx-1" />
          ) : (
            <Badge label="Pasif" className="bg-danger-500 text-white mx-1" />
          )}{" "}
          olan durumunu
          {!pozisyonData.is_active ? (
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
