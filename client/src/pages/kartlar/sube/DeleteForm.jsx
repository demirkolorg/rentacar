import { useState } from "react";
import { toast as message} from "react-toastify";

import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";

import {
  useDeleteSubeModalState,
  setDeleteSubeModalState,
  useSube,
  fetchSubeler
} from "@/store/kartlar/sube/hooks";
import { useUser } from "@/store/auth/hooks";
import { subeDelete } from "@/api/sube";

const DeleteForm = ({getData}) => {
  const subeData = useSube();
  const user = useUser();
  const [btnLoading, setBtnLoading] = useState(false);

  const deleteData = async () => {
    setBtnLoading(true);
    try {
      const response = await subeDelete({ _id: subeData._id });
      if (response.data.success) {
        message.success(response.data.message.desc);

        getData();
        setDeleteSubeModalState(false);
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
        activeModal={useDeleteSubeModalState()}
        title="Sube Silme İşlem Onayı"
        onClose={() => {
          setDeleteSubeModalState(false);
        }}
        themeClass="bg-red-500"
        footerContent={
          <>
            <Button
              text="EVET, Sube Silme İşlemini Onaylıyorum, SİL"
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
                setDeleteSubeModalState(false);
              }}
            />
          </>
        }
      >
        <p>
          Merhaba {user.ad} {user.soyad}, <strong>{subeData.ad}</strong> isimli{" "}
          <strong>
            {subeData.adres.acikAdres}
            {" - "}
            {subeData.adres.ilce}
            {"/"}
            {subeData.adres.il}{" "}
          </strong>
          adresli subeyı silmek istediğinize emin misiniz?
        </p>
      </Modal>
    </div>
  );
};
export default DeleteForm;
