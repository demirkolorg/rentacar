import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import {
  useOnayModalState,
  setOnayModalState,
  useOnayDurumu,
  setOnayDurumu,
  useOnayFonksiyonu,
  setOnayFonksiyonu,
} from "@/store/genel/hooks";
import { useUser } from "@/store/auth/hooks";
import { useState } from "react";
import { toast } from "react-toastify";

const OnayModal = ({fonksiyon}) => {
  const user = useUser();
  const onayModalDurum = useOnayModalState() !== false ? true : false;
  return (
    <div>
      <Modal
        activeModal={onayModalDurum}
        title="İşlem Onayı"
        onClose={() => {
          setOnayDurumu(false);
          setOnayModalState(false);
        }}
        themeClass="bg-slate-900"
        footerContent={
          <>
            <Button
              text="EVET, işlemi onaylıyorum."
              className="btn-success"
              onClick={() => {
                // setOnayDurumu(true);
                fonksiyon()
                setOnayModalState(false);
              }}
            />
            <Button
              text="Vazgeç"
              className="btn-dark"
              onClick={() => {
                setOnayDurumu(false);
                setOnayModalState(false);
              }}
            />
          </>
        }
      >
        <p>
          Merhaba,{" "}
          <strong className="bg-slate-200 m-1 p-1 rounded">
            {useOnayModalState()}
          </strong>{" "}
          işlemini onaylamak istiyor musunuz?
        </p>
      </Modal>
    </div>
  );
};
export default OnayModal;
