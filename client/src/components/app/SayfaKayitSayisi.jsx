const SayfaKayitSayisi = ({ props }) => {
  const { pageIndex, gotoPage, pageOptions, filteredRows } = props;
  return (
    <div className=" flex items-center space-x-3 rtl:space-x-reverse">
      <span className=" flex space-x-2  rtl:space-x-reverse items-center">
        <span className=" text-sm font-medium text-slate-600 dark:text-slate-300">
          Sayfa
        </span>
        <span>
          <input
            type="number"
            className=" form-control py-2"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const pageNumber = e.target.value
                ? Number(e.target.value) - 1
                : 0;
              gotoPage(pageNumber);
            }}
            style={{ width: "70px" }}
          />
        </span>
      </span>

      <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
        {pageOptions.length} sayfada toplam {filteredRows} kayıt gösteriliyor.
      </span>
    </div>
  );
};
export default SayfaKayitSayisi;
