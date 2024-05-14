import Icon from "@/components/ui/Icon";
import { Menu } from "@headlessui/react";
import { message } from "antd";

const SagMenu = ({ actions, menuAyar, setMenuAyar }) => {
  const copyToClipboard = async (dataToCopy) => {
    const copy = menuAyar?.secilenMetin
      ? menuAyar?.secilenMetin
      : String(dataToCopy);
    await navigator.clipboard.writeText(copy);
    setMenuAyar({ visible: false });
    message.success("Değer kopyalandı.");
  };

  const genelActions = [
    {
      id: 1,
      show: true,
      name: "Yenile",
      icon: "heroicons-outline:refresh",
      action: (data) => {
        menuAyar.getData();
        setMenuAyar({ visible: false });
      },
    },
    {
      id: 2,
      show: true,
      name: menuAyar?.secilenMetin ? "Seçili Kopyala" : "Kopyala",
      icon: "solar:copy-outline",
      action: (data) => {
        copyToClipboard(data.value);
      },
    },
    {
      id: 3,
      show: true,
      name: menuAyar?.secilenMetin ? "Seçili Ara" : "Ara",
      icon: "material-symbols:search",
      action: (data) => {
        menuAyar.setGlobalFilter(
          menuAyar?.secilenMetin ? menuAyar?.secilenMetin : data.value
        );
        setMenuAyar({ visible: false });
      },
    },
    {
      id: 4,
      show: menuAyar.globalFilter ? true : false,
      name: "Temizle",
      icon: "tdesign:clear",
      action: (data) => {
        menuAyar.setGlobalFilter(null);
        setMenuAyar({ visible: false });
      },
    },
  ];

  return (
    <div
      className="w-44 border-2  border-slate-900 bg-white dark:border-slate-400 dark:bg-slate-700 rounded-md "
      style={{
        position: "absolute",
        top: `${menuAyar.y}px`,
        left: `${menuAyar.x}px`,
      }}
    >
      <Menu>
        
        <Menu.Item key={`genel`}>
          <p className="flex justify-center bg-slate-900 text-white p-1">
            Genel İşlemler
          </p>
        </Menu.Item>

        {genelActions
          .filter((f) => f.show === true)
          .map((item, idx) => (
            <Menu.Item
              key={`genel-${item.id}-${idx}`}
              onClick={() => {
                item.action(menuAyar.cell);
              }}
            >
              <div
                className={`hover:bg-slate-300  dark:hover:bg-slate-600 dark:hover:bg-opacity-50w-full px-4 py-1 text-sm  last:mb-0 cursor-pointer flex  space-x-2 items-center rtl:space-x-reverse `}
              >
                <span className="text-base">
                  <Icon icon={item.icon} />
                </span>
                <span>{item.name}</span>
              </div>
            </Menu.Item>
          ))}

        <Menu.Item key={`veri`}>
          <p className="flex justify-center bg-slate-900 text-white p-1">
            Veri İşlemleri
          </p>
        </Menu.Item>

        {actions.map((item, idx) =>
          !item.hasSubMenu ? (
            <Menu.Item
              key={`actions-${item.id}-${idx}`}
              onClick={() => {
                item.action(menuAyar.data);
                {
                  close;
                }
              }}
            >
              <div
                className={`
              w-full px-4 py-1 text-sm  last:mb-0 cursor-pointer flex  space-x-2 items-center rtl:space-x-reverse 
            ${
              item.name === "Sil"
                ? "hover:bg-danger-500 hover:text-white dark:text-white bg-opacity-30 hover:last:rounded-b "
                : "hover:bg-slate-300  dark:hover:bg-slate-600 dark:hover:bg-opacity-50"
            }
             `}
              >
                <span className="text-base">
                  <Icon icon={item.icon} />
                </span>
                <span>{item.name}</span>
              </div>
            </Menu.Item>
          ) : (
            <Menu as="div" className="relative" key={`submenu-${item.id}`}>
              <Menu.Button
                className={`w-full px-4 py-1 text-sm  last:mb-0 cursor-pointer flex  space-x-2 items-center rtl:space-x-reverse hover:bg-slate-300  dark:hover:bg-slate-600 dark:hover:bg-opacity-50`}
              >
                <span className="text-base">
                  <Icon icon={item.icon} />
                </span>
                <span>{item.name}</span>
              </Menu.Button>
              <Menu.Items className="">
                {item.subMenu.map((subMenu, idx) => (
                  <Menu.Item
                    key={`subMenu-${subMenu.id}-${idx}`}
                    onClick={() => {
                      subMenu.action(menuAyar.data);
                      {
                        close;
                      }
                    }}
                  >
                    <div
                      className={`pl-7 w-full px-4 py-1 text-sm  last:mb-0 cursor-pointer flex  space-x-2 items-center rtl:space-x-reverse hover:bg-slate-100  dark:hover:bg-slate-800 dark:hover:bg-opacity-50`}
                    >
                      <span>
                        {"->"} {subMenu.name}
                      </span>
                    </div>
                  </Menu.Item>
                ))}
              </Menu.Items>
            </Menu>
          )
        )}

      </Menu>
    </div>
  );
};
export default SagMenu;
