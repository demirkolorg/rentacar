import { useRef, useState } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { toast as message } from 'react-toastify';
import { yupResolver } from '@hookform/resolvers/yup';

import Modal from '@/components/ui/Modal';
import Textinput from '@/components/ui/Textinput';
import Textarea from '@/components/ui/Textarea';
import Button from '@/components/ui/Button';
import { optionStyle } from '@/helper/optionStyle';

import { pozisyonUpdate } from '@/api/kartlar/pozisyon';

import {
  setEditPozisyonModalState,
  useEditPozisyonModalState,
  usePozisyon,
  fetchPozisyonlar
} from '@/store/kartlar/pozisyon/hooks';

const EditForm = ({ getData }) => {
  const pozisyonData = usePozisyon();

  const FormValidationSchema = yup
    .object({
      ad: yup.string().required('Pozisyon adı alanı boş geçilemez.')
    })
    .required();

  const {
    register,
    control,
    reset,
    formState: { errors, isValid },
    handleSubmit
  } = useForm({
    resolver: yupResolver(FormValidationSchema),
    mode: 'all'
  });

  const onSubmit = async data => {
    setBtnLoading(true);
    try {
      const updatePozisyon = {
        _id: pozisyonData?._id,
        ad: data.ad
      };

      const response = await pozisyonUpdate(updatePozisyon);
      if (response.data.success) {
        message.success(response.data.message.desc);
        setEditPozisyonModalState(false);
        getData();
        reset();
      }
    } catch (error) {
      message.error('Hatalı bir durum var, girilen bilgileri kontrol ediniz.');
    }
    setBtnLoading(false);
  };

  return (
    <div>
      <Modal
        className="max-w-xl"
        title="Şubeyi Düzenle"
        labelclassName="btn-outline-dark"
        activeModal={editPozisyonModalState}
        onClose={() => {
          setEditPozisyonModalState(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div className=" grid grid-cols-2 gap-5 items-end">
            <Textinput
              name="ad"
              label="Şube Adı"
              placeholder="Şube Adı"
              register={register}
              error={errors.ad}
              defaultValue={pozisyonData?.ad}
            />
          </div>

          <div className="ltr:text-right rtl:text-left">
            <Button
              type="submit"
              text="Kaydet"
              className=" btn-dark"
              disabled={!isValid || btnLoading}
              isLoading={btnLoading}
            />
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default EditForm;
