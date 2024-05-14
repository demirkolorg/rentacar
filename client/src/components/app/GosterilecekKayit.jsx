const GosterilecekKayit = ({ props }) => {
  const { pageSize, setPageSize } = props;
  return (
    <select
      className="form-control p-2 w-max"
      value={pageSize}
      onChange={(e) => setPageSize(Number(e.target.value))}
    >
      {[10, 15, 25, 50, 100].map((pageSize) => (
        <option key={pageSize} value={pageSize}>
          {pageSize} kayıt
        </option>
      ))}
    </select>
  );
};
export default GosterilecekKayit;
