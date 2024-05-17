const SayfaKayitSayisi = ({ props }) => {
  const { pageIndex, gotoPage, pageOptions, filteredRows } = props;
  return (
    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
      <span className=" flex space-x-2  rtl:space-x-reverse items-center">
        {/* <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
          Sayfa
        </span> */}
        <span>
          {/* <input
            type="number"
            className=" form-control py-2 "
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "70px" }}
          /> */}

          <select
            className="border dark:border-slate-900 p-2 w-max cursor-pointer dark:bg-slate-900 rounded-md"
            // value={pageSize}
            defaultValue={pageIndex + 1}
            onChange={e => {
              const pageNumber = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(pageNumber);
            }}
          >
            {pageOptions.map(pageSize => (
              <option key={pageSize + 1} value={pageSize + 1}>
                {pageSize + 1}.sayfa
              </option>
            ))}
          </select>
        </span>
      </span>

      <span className="text-slate-600 dark:text-slate-300">
        Toplam <strong>{pageOptions.length}</strong> sayfada <strong>{filteredRows}</strong> kayıt gösteriliyor.
      </span>
    </div>
  );
};
export default SayfaKayitSayisi;
