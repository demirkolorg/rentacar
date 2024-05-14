import { useRef, useState } from "react";
import Select from "react-select";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { toast as message } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import Logo from "@/assets/images/logo/logo-c.svg";
import { optionStyle } from "@/helper/optionStyle";

import { subeUpdate } from "@/api/sube";

import {
  setEditSubeModalState,
  useEditSubeModalState,
  useSube,
  fetchSubeler
} from "@/store/kartlar/sube/hooks";

import {
  ilveilceler,
  ilSecenekleriData,
  ilceSecenekleriData,
} from "@/constant/ililcelistesi";

import { imageUpload } from "@/store/upload/hooks";

const EditForm = ({getData}) => {
  const subeData = useSube();
  const hiddenFileInput = useRef(null);
  const [btnLoading, setBtnLoading] = useState(false);
  const [logoFile, setLogoFile] = useState(null);
  const [logoSrc, setLogoSrc] = useState(null);

  const editSubeModalState = useEditSubeModalState();
  const [secilenIl, setSecilenIl] = useState(null);
  const [secilenIlce, setSecilenIlce] = useState(null);
  const ilSecenekleri = ilSecenekleriData;
  const ilceSecenekleri = ilceSecenekleriData(secilenIl);
  const secilenIlData = ilSecenekleri.filter(
    (il) => il.label === subeData?.adres?.il
  );

  const secilenIlceData = () => {
    const il = ilveilceler.find(
      (province) => province.text === secilenIlData[0]?.label
    );
    const ilDistricts = il
      ? il.districts.map((district) => ({
          value: district.value,
          label: district.text,
        }))
      : [];

    const ilceDistrict = ilDistricts.find(
      (district) => district.label === subeData?.adres?.ilce
    );

    const ilceResult = ilceDistrict
      ? [{ value: ilceDistrict.value, label: ilceDistrict.label }]
      : [];
    return ilceResult;
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleLogoRemoveClick = (event) => {
    setLogoFile(null);
    setLogoSrc(Logo);
  };
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setLogoFile(fileUploaded);
    setLogoSrc(URL.createObjectURL(fileUploaded));
  };
  const handleIlChange = (selectedOption) => {
    setSecilenIl(selectedOption.label);
    setSecilenIlce(null);
  };
  const handleIlceChange = (selectedOption) => {
    setSecilenIlce(selectedOption.label);
  };

  const FormValidationSchema = yup
    .object({
      ad: yup.string().required("Şube adı alanı boş geçilemez."),
      acilisTarihi: yup
        .number()
        .positive("Şube kuruluş yılı alanı pozitif bir sayı olmalıdır.")
        .integer("Şube kuruluş yılı alanı tam sayı olmalıdır.")
        .typeError(
          "Şube kuruluş yılı alanına yalnızca sayısal değerler girilmelidir."
        )
        .required("Şube kuruluş yılı alanı boş geçilemez."),
      calisanSayisi: yup
        .number()
        .positive("Şube çalışan sayısı alanı pozitif bir sayı olmalıdır.")
        .integer("Şube çalışan sayısı alanı tam sayı olmalıdır.")
        .typeError(
          "Şube çalışan sayısı alanına yalnızca sayısal değerler girilmelidir."
        )
        .required("Şube çalışan sayısı alanı boş geçilemez."),
      gsm: yup.string().required("Şube gsm alanı boş geçilemez."),
      telefon: yup.string().required("Şube telefon alanı boş geçilemez."),
      eposta: yup.string().required("Şube eposta alanı boş geçilemez."),
      // secilenIl: yup.string().required("İl alanı boş geçilemez."),
      // secilenIlce: yup.string().required("İlçe alanı boş geçilemez."),
      acikAdres: yup.string().required("Açık adres alanı boş geçilemez."),
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
    setBtnLoading(true);
    try {
      const updateSube = {
        _id: subeData?._id,
        ad: data.ad,
        adres: {
          il: secilenIl ? secilenIl : secilenIlData[0].label,
          ilce: secilenIlce ? secilenIlce : secilenIlceData()[0].label,
          acikAdres: data.acikAdres,
        },
        iletisim: {
          gsm: data.gsm,
          gsmOps: data.gsmOps,
          telefon: data.telefon,
          eposta: data.eposta,
        },
        ekBilgiler: {
          acilisTarihi: data.acilisTarihi,
          calisanSayisi: data.calisanSayisi,
        },
      };
      if (logoFile) {
        const url = await imageUpload(logoFile);
        updateSube.logoUrl = url.payload;
      }

      const response = await subeUpdate(updateSube);
      if (response.data.success) {
        message.success(response.data.message.desc);
        setEditSubeModalState(false);
        getData();
        reset();
        setSecilenIl(null);
        setSecilenIlce(null);
      }
    } catch (error) {
      message.error("Hatalı bir durum var, girilen bilgileri kontrol ediniz.");
    }
    setBtnLoading(false);
  };

  return (
    <div>
      <Modal
        className="max-w-xl"
        title="Şubeyi Düzenle"
        labelclassName="btn-outline-dark"
        activeModal={editSubeModalState}
        onClose={() => {
          setEditSubeModalState(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div className=" grid grid-cols-2 gap-5 items-end">
            <div className="h-32 w-32 ml-auto mr-auto rounded-full ring-4 ring-black-800 relative">
              <img
                onClick={handleClick}
                src={
                  !logoSrc
                    ? "http://localhost:5777/uploads/images/" +
                      subeData?.logoUrl
                    : logoSrc
                }
                className="w-full h-full object-cover rounded-full"
              />

              <Button
                onClick={handleClick}
                className="p-1.5 ring-2 ring-white absolute right-2 h-8 w-8 text-white   bg-black-900 rounded-full shadow-sm flex flex-col items-center justify-center top-0 left-0"
                icon="heroicons:pencil-square"
              />
              <Button
                onClick={handleLogoRemoveClick}
                className={`${
                  logoFile === null && "hidden"
                } p-1.5 ring-2 ring-white absolute right-2 h-8 w-8 text-white   bg-red-600 rounded-full shadow-sm flex flex-col items-center justify-center top-24 left-0`}
                icon="heroicons:trash"
              />
              <input
                type="file"
                onChange={handleChange}
                ref={hiddenFileInput}
                style={{ display: "none" }} // Make the file input element invisible
              />
            </div>

            <Textinput
              name="ad"
              label="Şube Adı"
              placeholder="Şube Adı"
              register={register}
              error={errors.ad}
              defaultValue={subeData?.ad}
            />

            <Textinput
             name="acilisTarihi"
             label="Açılış Tarihi"
             placeholder="Açılış Tarihi"
             register={register}
             error={errors.acilisTarihi}
             options={{ numeral: true, numeralThousandsGroupStyle: "none" }}
             maxLength="4"
              defaultValue={subeData?.ekBilgiler?.acilisTarihi}
            />
             <Textinput
              name="calisanSayisi"
              label="Çalışan Sayısı"
              placeholder="Çalışan Sayısı"
              register={register}
              error={errors.calisanSayisi}
              options={{ numeral: true, numeralThousandsGroupStyle: "none" }}
              defaultValue={subeData?.ekBilgiler?.calisanSayisi}
            />

            <Textinput
              name="gsm"
              label="gsm"
              placeholder="Gsm"
              register={register}
              error={errors.gsm}
              options={{ numeral: true, numeralThousandsGroupStyle: "none" }}
              defaultValue={subeData?.iletisim?.gsm}
            />

            <Textinput
              name="gsmOps"
              label="Gsm 2 (Opsiyonel)"
              placeholder="Gsm"
              register={register}
              options={{ numeral: true, numeralThousandsGroupStyle: "none" }}
              defaultValue={subeData?.iletisim?.gsmOps}
            />

            <Textinput
              name="telefon"
              label="Telefon"
              placeholder="Telefon"
              register={register}
              error={errors.telefon}
              options={{ numeral: true, numeralThousandsGroupStyle: "none" }}
              defaultValue={subeData?.iletisim?.telefon}
            />
            <Textinput
              name="eposta"
              label="E-Posta"
              placeholder="E-Posta"
              register={register}
              error={errors.eposta}
              defaultValue={subeData?.iletisim?.eposta}
            />

            <div className={errors.secilenIl ? "has-error" : ""}>
              <label htmlFor="il" className="form-label ">
                İl
              </label>
              <Select
                maxMenuHeight={200}
                control={control}
                className="react-select"
                classNamePrefix="select"
                styles={optionStyle}
                name="il"
                options={ilSecenekleri}
                isCleaable
                id="il"
                register={register}
                onChange={handleIlChange}
                error={errors.secilenIl}
                placeholder="İl"
                defaultValue={secilenIlData}
              />
              {errors.il && (
                <div className=" mt-2  text-danger-500 block text-sm">
                  {errors.secilenIl?.message || errors.secilenIl?.label.message}
                </div>
              )}
            </div>

            <div className={errors.secilenIlce ? "has-error" : ""}>
              <label htmlFor="ilce" className="form-label ">
                İlçe
              </label>
              <Select
                maxMenuHeight={200}
                control={control}
                className="react-select"
                classNamePrefix="select"
                styles={optionStyle}
                name="ilce"
                options={ilceSecenekleri}
                id="ilce"
                register={register}
                error={errors.secilenIlce}
                onChange={handleIlceChange}
                placeholder="İlçe"
                defaultValue={secilenIlceData()}
              />
              {errors.ilce && (
                <div className=" mt-2  text-danger-500 block text-sm">
                  {errors.secilenIlce?.message ||
                    errors.secilenIlce?.label.message}
                </div>
              )}
            </div>
          </div>

          <Textarea
            name="acikAdres"
            label="Açık Adres"
            placeholder="Açık Adres"
            register={register}
            error={errors.acikAdres}
            defaultValue={subeData?.adres?.acikAdres}
          />

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
