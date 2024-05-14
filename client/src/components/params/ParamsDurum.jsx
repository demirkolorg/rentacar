import Select from "react-select";
import { optionStyle } from "@/helper/optionStyle";

const ParamsDurum = ({setPDurum}) => {

  const kartDurum = [
    { value: null, label: "Hepsi" },
    { value: true, label: "Aktif" },
    { value: false, label: "Pasif" },
  ];

  const handleKartDurumChange = (selectedOption) => {
    setPDurum(selectedOption.value);
  };
  return (
    <Select
      className="react-select"
      classNamePrefix="select"
      defaultValue={kartDurum[0]}
      options={kartDurum}
      styles={optionStyle}
      menuPortalTarget={document.body}
      onChange={handleKartDurumChange}
    />
  );
};
export default ParamsDurum;
