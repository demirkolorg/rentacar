import { useEffect, useState, useRef } from "react";
import Icon from "@/components/ui/Icon";
import InputGroup from "@/components/ui/InputGroup";

const GlobalFilter = ({ filter, setFilter }) => {
  const inputRef = useRef();
  const [value, setValue] = useState(filter);

  useEffect(() => {
    const inputElement = inputRef.current;
    const event = new Event("input", { bubbles: true });
    inputElement.value = filter || "";
    inputElement.dispatchEvent(event);
  }, [filter]);

  const onChange = (e) => {
    setValue(e.target.value);
    setFilter(e.target.value || "");
  };

  return (
    <div className="flex justify-center items-center gap-2">
      <InputGroup
        ref={inputRef}
        className="w-52 h-9"
        value={value}
        onChange={onChange}
        placeholder="Tabloda ara ..."
        type="text"
        append={
          filter && (
            <Icon
              className={"text-slate-900 h-5 w-5 cursor-pointer"}
              onClick={() => {
                setFilter(null);
              }}
              icon="heroicons-outline:x"
            />
          )
        }
      />
    </div>
  );
};

export default GlobalFilter;
