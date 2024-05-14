import { useRef, useState } from "react";
import Select from "react-select";
import * as yup from "yup";
import { toast as message } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

import Modal from "@/components/ui/Modal";
import Textinput from "@/components/ui/Textinput";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import { firmaAdd } from "@/api/firma";
import {
  useAddFirmaModalState,
  setAddFirmaModalState,
  fetchFirmalar,
} from "@/store/kartlar/firma/hooks";
import {
  ilSecenekleriData,
  ilceSecenekleriData,
} from "@/constant/ililcelistesi";
import Logo from "@/assets/images/logo/logo-c.svg";
import { optionStyle } from "@/helper/optionStyle";
import { imageUpload } from "@/store/upload/hooks";

const AddForm = ({getData}) => {
  const hiddenFileInput = useRef(null);
  const [logoFile, setLogoFile] = useState(null);
  const [logoSrc, setLogoSrc] = useState();
  const [secilenIl, setSecilenIl] = useState(null);
  const [secilenIlce, setSecilenIlce] = useState(null);
  const ilSecenekleri = ilSecenekleriData;
  const ilceSecenekleri = ilceSecenekleriData(secilenIl);

  const handleLogoClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleLogoRemoveClick = (event) => {
    setLogoFile(null);
  };
  const handleLogoChange = (event) => {
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
      ad: yup.string().required("Firma adı alanı boş geçilemez."),
      kurulusYili: yup
        .number()
        .positive("Firma kuruluş yılı alanı pozitif bir sayı olmalıdır.")
        .integer("Firma kuruluş yılı alanı tam sayı olmalıdır.")
        .typeError(
          "Firma kuruluş yılı alanına yalnızca sayısal değerler girilmelidir."
        )
        .required("Firma kuruluş yılı alanı boş geçilemez."),
      subeSayisi: yup
        .number()
        .positive("Firma çalışan sayısı alanı pozitif bir sayı olmalıdır.")
        .integer("Firma çalışan sayısı alanı tam sayı olmalıdır.")
        .typeError(
          "Firma çalışan sayısı alanına yalnızca sayısal değerler girilmelidir."
        )
        .required("Firma çalışan sayısı alanı boş geçilemez."),
      gsm: yup.string().required("Firma gsm alanı boş geçilemez."),
      telefon: yup.string().required("Firma telefon alanı boş geçilemez."),
      eposta: yup.string().required("Firma eposta alanı boş geçilemez."),
      // secilenIl: yup.string().required("İl alanı boş geçilemez."),
      // secilenIlce: yup.mixed().required("İlçe alanı boş geçilemez."),
      acikAdres: yup.mixed().required("Açık adres alanı boş geçilemez."),
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
      const newFirma = {
        ad: data.ad,
        logoUrl: "",
        adres: {
          il: secilenIl,
          ilce: secilenIlce,
          acikAdres: data.acikAdres,
        },
        iletisim: {
          gsm: data.gsm,
          gsmOps: data.gsmOps,
          telefon: data.telefon,
          eposta: data.eposta,
        },
        ekBilgiler: {
          kurulusYili: data.kurulusYili,
          subeSayisi: data.subeSayisi,
        },
      };
      const url = await imageUpload(logoFile);
      newFirma.logoUrl = url.payload;

      const response = await firmaAdd(newFirma);

      if (response.data.success) {
        message.success(response.data.message.desc);
        setAddFirmaModalState(false);
        getData();
        reset();
        setSecilenIl(null);
        setSecilenIlce(null);
      }
    } catch (error) {
      message.error("Hatalı bir durum var, girilen bilgileri kontrol ediniz.");
    }
  };

  return (
    <div>
      <Modal
        className="max-w-xl"
        title={"Yeni Firma Ekle"}
        labelclassName="btn-outline-dark"
        activeModal={useAddFirmaModalState()}
        onClose={() => {
          setAddFirmaModalState(false);
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 ">
          <div className=" grid grid-cols-2 gap-5 items-end">
            <div className="h-32 w-32 ml-auto mr-auto rounded-full ring-4 ring-black-800 relative">
              <img
                onClick={handleLogoClick}
                src={logoFile === null ? Logo : logoSrc}
                alt=""
                className="w-full h-full object-cover rounded-full"
              />

              <Button
                onClick={handleLogoClick}
                className="p-1.5 ring-2 ring-white absolute right-2 h-8 w-8 text-white   bg-black-900 rounded-full shadow-sm flex flex-col items-center justify-center top-0 left-0"
                icon="heroicons:pencil-square"
              />
              <Button
                onClick={handleLogoRemoveClick}
                className={`${
                  !logoFile && "hidden"
                } p-1.5 ring-2 ring-white absolute right-2 h-8 w-8 text-white   bg-red-600 rounded-full shadow-sm flex flex-col items-center justify-center top-24 left-0`}
                icon="heroicons:trash"
              />
              <input
                type="file"
                onChange={handleLogoChange}
                ref={hiddenFileInput}
                style={{ display: "none" }} // Make the file input element invisible
              />
            </div>

            <Textinput
              name="ad"
              label="Firma Adı"
              placeholder="Firma Adı"
              register={register}
              error={errors.ad}
            />

            <Textinput
              name="kurulusYili"
              label="Kuruluş Yılı"
              placeholder="Kuruluş Yılı"
              register={register}
              error={errors.kurulusYili}
              options={{ numeral: true, numeralThousandsGroupStyle: "none" }}
              maxLength="4"
            />
            <Textinput
              name="subeSayisi"
              label="Şube Sayısı"
              placeholder="Şube Sayısı"
              register={register}
              error={errors.subeSayisi}
              options={{ numeral: true, numeralThousandsGroupStyle: "none" }}
            />

            <Textinput
              name="gsm"
              label="gsm"
              placeholder="Gsm"
              register={register}
              error={errors.gsm}
              options={{ numeral: true, numeralThousandsGroupStyle: "none" }}
            />

            <Textinput
              name="gsmOps"
              label="Gsm 2 (Opsiyonel)"
              placeholder="Gsm"
              register={register}
              options={{ numeral: true, numeralThousandsGroupStyle: "none" }}
            />

            <Textinput
              name="telefon"
              label="Telefon"
              placeholder="Telefon"
              register={register}
              error={errors.telefon}
              options={{ numeral: true, numeralThousandsGroupStyle: "none" }}
            />
            <Textinput
              name="eposta"
              label="E-Posta"
              placeholder="E-Posta"
              register={register}
              error={errors.eposta}
            />

            <div className={errors.secilenIl ? "has-error" : ""}>
              <label htmlFor="secilenIl" className="form-label ">
                İl
              </label>
              <Select
                maxMenuHeight={200}
                control={control}
                className="react-select"
                classNamePrefix="select"
                styles={optionStyle}
                name="secilenIl"
                options={ilSecenekleri}
                isCleaable
                id="secilenIl"
                register={register}
                onChange={handleIlChange}
                error={errors.secilenIl}
                placeholder="İl"
              />
              {errors.secilenIl && (
                <div className=" mt-2  text-danger-500 block text-sm">
                  {errors.secilenIl?.message || errors.secilenIl?.label.message}
                </div>
              )}
            </div>

            <div className={errors.secilenIlce ? "has-error" : ""}>
              <label htmlFor="secilenIlce" className="form-label ">
                İlçe
              </label>
              <Select
                maxMenuHeight={200}
                control={control}
                className="react-select"
                classNamePrefix="select"
                styles={optionStyle}
                name="secilenIlce"
                options={ilceSecenekleri}
                id="secilenIlce"
                register={register}
                error={errors.secilenIlce}
                onChange={handleIlceChange}
                placeholder="İlçe"
              />
              {errors.secilenIlce && (
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
