import { useRef, useState } from "react";
import Select from "react-select";
import * as yup from "yup";
import { toast as message } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Logo from "@/assets/images/logo/logo-c.svg";
import { optionStyle } from "@/helper/optionStyle";

import { pozisyonAdd } from "@/api/pozisyon";
import {
  useAddPozisyonModalState,
  setAddPozisyonModalState,
  fetchPozisyonlar,
} from "@/store/kartlar/pozisyon/hooks";

import { useFirma } from "@/store/kartlar/firma/hooks";

import {
  ilSecenekleriData,
  ilceSecenekleriData,
} from "@/constant/ililcelistesi";
import { imageUpload } from "@/store/upload/hooks";

const AddForm = ({ getData }) => {
  const navigate = useNavigate();
  const firmaData = useFirma();

  const FormValidationSchema = yup
    .object({
      ad: yup.string().required("Pozisyon adı alanı boş geçilemez."),
    })
    .required();

  const {
    register,
    control,
    reset,
    formState: { errors, isValid },
    handleSubmit,
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: "all",
  });

  const onSubmit = async (data) => {
    try {
      const newPozisyon = {
        ad: data.ad,
      };

      const response = await pozisyonAdd(newPozisyon);
      if (response.data.success) {
        message.success(response.data.message.desc);
        setAddPozisyonModalState(false);
        getData();
        reset();
        navigate(`/pozisyon`);
      }
    } catch (error) {
      message.error("Hatalı bir durum var, girilen bilgileri kontrol ediniz.");
    }
  };

  return (
    <div>
      <Modal
        className="max-w-xl"
        title={"Yeni Pozisyon Ekle"}
        labelclassName="btn-outline-dark"
        activeModal={useAddPozisyonModalState()}
        onClose={() => {
          setAddPozisyonModalState(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          
            <Textinput
              name="ad"
              label="Pozisyon Adı"
              placeholder="Pozisyon Adı"
              register={register}
              error={errors.ad}
            />

         
          

         

          <div className="ltr:text-right rtl:text-left">
            <Button
              type="submit"
              text="Kaydet"
              className=" btn-dark"
              disabled={!isValid}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddForm;
