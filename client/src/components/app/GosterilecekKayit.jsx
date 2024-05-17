const GosterilecekKayit = ({ props }) => {
  const { pageSize, setPageSize } = props;
  return (
    <div className="">
      Sayfa başına kayıt sayısı:
      <select
        className="border dark:border-slate-900 ml-2 p-2 w-max cursor-pointer dark:bg-slate-900 rounded-md"
        value={pageSize}
        onChange={e => setPageSize(Number(e.target.value))}
      >
        {[10, 15, 25, 50, 100].map(pageSize => (
          <option key={pageSize} value={pageSize}>
            {pageSize} kayıt
          </option>
        ))}
      </select>
    </div>
  );
};
export default GosterilecekKayit;
