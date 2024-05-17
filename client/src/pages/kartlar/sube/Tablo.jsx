import { useMemo, useEffect, useState } from 'react';
import { useTable, useRowSelect, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Select from 'react-select';

import GlobalFilter from '@/components/app/GlobalFilter';
import Card from '@/components/ui/Card';
import Icon from '@/components/ui/Icon';
import Button from '@/components/ui/Button';
import Loading from '@/components/Loading';
import { highlightText } from '@/helper/text';
import SagMenu from '@/components/app/SagMenu';
import { useLoader, setLoading } from '@/store/loader/hooks';
import ParamsDurum from '@/components/params/ParamsDurum';
import Yenile from '@/components/app/Yenile';
import GosterilecekKayit from '@/components/app/GosterilecekKayit';
import Sayfalama from '@/components/app/Sayfalama';
import SayfaKayitSayisi from '@/components/app/SayfaKayitSayisi';

import {
  setAddSubeModalState,
  setEditSubeModalState,
  setDeleteSubeModalState,
  setStatusSubeModalState,
  setSubeler,
  setSube,
  useAddSubeModalState,
  useEditSubeModalState,
  useDeleteSubeModalState,
  useStatusSubeModalState,
  useSubeler,
  useSube,
  fetchSubeler
} from '@/store/kartlar/sube/hooks';

import AddForm from './AddForm';
import EditForm from './EditForm';
import DeleteForm from './DeleteForm';
import StatusForm from './StatusForm';

const Tablo = () => {
  const navigate = useNavigate();
  const loading = useLoader();
  const data = useSubeler();
  const [menuAyar, setMenuAyar] = useState();
  const [pDurum, setPDurum] = useState(null);

  const handleContextMenu = (event, cell) => {
    event.preventDefault();
    setMenuAyar({
      cell,
      visible: true,
      data: cell.row.original,
      rowIndex: cell.row.index,
      x: event.pageX,
      y: event.pageY,
      globalFilter,
      setGlobalFilter,
      secilenMetin: window?.getSelection()?.toString(),
      getData
    });
  };

  const getData = async () => {
    setLoading(true);
    await fetchSubeler({ is_active: pDurum });
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, [pDurum]);

  const COLUMNS = [
    {
      Header: 'Firma',
      accessor: 'firmaId.ad',
      Cell: row => {
        return (
          <span
            className="cursor-pointer hover:text-primary-400 "
            onClick={() => {
              navigate(`/firma/${row.data[row.row.id].firmaId._id}`);
            }}
          >
            {row?.cell?.value}
          </span>
        );
      }
    },
    {
      Header: 'ad',
      accessor: 'ad',
      Cell: row => {
        return (
          <span
            className="cursor-pointer hover:text-primary-400 "
            onClick={() => {
              navigate(`/sube/${row.data[row.row.id]._id}`);
            }}
          >
            {row?.cell?.value}
          </span>
        );
      }
    },
    {
      Header: 'İl',
      accessor: 'adres.il',
      Cell: row => {
        return <span>{row?.cell?.value}</span>;
      }
    },
    {
      Header: 'İlçe',
      accessor: 'adres.ilce',
      Cell: row => {
        return <span>{row?.cell?.value}</span>;
      }
    },
    {
      Header: 'Açık Adres',
      accessor: 'adres.acikAdres',
      Cell: row => {
        return <span>{row?.cell?.value}</span>;
      }
    },
    {
      Header: 'gsm',
      accessor: 'iletisim.gsm',
      Cell: row => {
        return <span>{row?.cell?.value}</span>;
      }
    },
    {
      Header: 'gsm ops',
      accessor: 'iletisim.gsmOps',
      Cell: row => {
        return <span>{row?.cell?.value}</span>;
      }
    },
    {
      Header: 'telefon',
      accessor: 'iletisim.telefon',
      Cell: row => {
        return <span>{row?.cell?.value}</span>;
      }
    },
    {
      Header: 'eposta',
      accessor: 'iletisim.eposta',
      Cell: row => {
        return <span>{row?.cell?.value}</span>;
      }
    },
    {
      Header: 'Açılış Tarihi',
      accessor: 'ekBilgiler.acilisTarihi',
      Cell: row => {
        return <span>{row?.cell?.value}</span>;
      }
    },
    {
      Header: 'Çalışan Sayısı',
      accessor: 'ekBilgiler.calisanSayisi',
      Cell: row => {
        return <span>{row?.cell?.value}</span>;
      }
    },
    {
      Header: 'Durum',
      accessor: 'is_active',
      Cell: row => {
        return (
          <span className="block w-full">
            <span
              className={` inline-block px-3 min-w-[90px] text-center mx-auto py-1 rounded-[999px] bg-opacity-25 ${
                row?.cell?.value === true ? 'text-success-500 bg-success-500' : ''
              }
              ${row?.cell?.value === false ? 'text-danger-500 bg-danger-500' : ''}
  
               `}
            >
              {row?.cell?.value ? 'Aktif' : 'Pasif'}
            </span>
          </span>
        );
      }
    }
  ];
  const columns = useMemo(() => COLUMNS, []);

  const actions = [
    {
      show: true,
      name: 'Görüntüle',
      icon: 'heroicons-outline:eye',
      action: data => {
        navigate(`/sube/${data._id}`);
      }
    },
    {
      show: true,
      name: 'Yeni Ekle',
      icon: 'heroicons-outline:plus',
      action: data => {
        setSube(null);
        setAddSubeModalState(true);
        setMenuAyar({
          visible: false
        });
      }
    },
    {
      show: true,
      name: 'Düzenle',
      icon: 'heroicons:pencil-square',
      action: data => {
        setSube(null);
        setSube(data);
        setEditSubeModalState(true);
        setMenuAyar({
          visible: false
        });
      }
    },
    {
      show: true,
      name: 'Durum Değiştir',
      icon: 'fluent:status-12-filled',
      action: data => {
        setSube(null);
        setSube(data);
        setStatusSubeModalState(true);
        setMenuAyar({
          visible: false
        });
      }
    },
    {
      show: true,
      name: 'Sil',
      icon: 'heroicons-outline:trash',
      action: data => {
        setSube(null);
        setSube(data);
        setDeleteSubeModalState(true);
        setMenuAyar({
          visible: false
        });
      }
    }
  ];

  const tableInstance = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 15 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    useRowSelect
  );
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    footerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    state: { globalFilter, pageIndex, pageSize },
    gotoPage,
    pageCount,
    setPageSize,
    setGlobalFilter,
    prepareRow,
    rows,
    filteredRows = rows.length
  } = tableInstance;

  return (
    <>
      <Card>
        <div className="md:flex justify-between items-center">
          <h6>Şube İşlemleri</h6>
          <div className="flex justify-between items-center gap gap-3">
            <GlobalFilter filter={globalFilter} setFilter={setGlobalFilter} />
            <ParamsDurum setPDurum={setPDurum} />

            <Yenile loading={loading} getData={getData} />
          </div>
        </div>
      </Card>

      <Card bodyClass className="flex-1 overflow-auto my-5">
        {loading ? (
          <Loading />
        ) : (
          <>
            <table
              className="min-w-full divide-y divide-slate-100 table-fixed dark:divide-slate-700"
              {...getTableProps}
            >
              <thead className="sticky top-0 bg-white dark:bg-slate-800 z-10">
                {headerGroups.map(headerGroup => (
                  <tr {...headerGroup.getHeaderGroupProps()}>
                    {headerGroup.headers.map(column => (
                      <th
                        {...column.getHeaderProps(column.getSortByToggleProps())}
                        scope="col"
                        className=" text-sm table-th  "
                      >
                        {column.render('Header')}
                        <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span>
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody
                className="overflow-y-scroll bg-white divide-y divide-slate-100 dark:bg-slate-800 dark:divide-slate-700"
                {...getTableBodyProps}
              >
                {page.map(row => {
                  prepareRow(row);
                  return (
                    <tr
                      {...row.getRowProps()}
                      onClick={() => {
                        setMenuAyar({ visible: false });
                      }}
                      className={`${
                        menuAyar?.rowIndex === row.index ? 'bg-slate-100 dark:bg-slate-900' : ''
                      } hover:bg-slate-100 dark:hover:bg-slate-900`}
                    >
                      {row.cells.map(cell => {
                        return (
                          <td
                            {...cell.getCellProps()}
                            // onDoubleClick={() => {
                            //   const actionToExecute = actions.find(
                            //     (action) => action.name === "Görüntüle"
                            //   );
                            //   if (actionToExecute) {
                            //     actionToExecute.action(cell.row.original);
                            //   }
                            // }}
                            onContextMenu={e => handleContextMenu(e, cell)}
                            className={`${menuAyar?.cell?.value === cell.value ? 'bg-slate-200 dark:bg-slate-900' : ''}
                        
                          h-12 px-6 `}
                          >
                            <p
                              className={`m-0 p-0 inline  ${
                                String(cell.value).includes(globalFilter) ? 'bg-yellow-300 text-lg' : ''
                              }`}
                            >
                              {cell.render('Cell')}
                            </p>

                            {/* <p className="m-0 p-0 inline">                             
                            {highlightText(String(cell.value), globalFilter)}
                          </p> */}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
            {menuAyar?.visible && <SagMenu actions={actions} menuAyar={menuAyar} setMenuAyar={setMenuAyar} />}
          </>
        )}
      </Card>

      <Card>
        <div className="md:flex md:space-y-0 space-y-5 justify-between items-center">
          <SayfaKayitSayisi props={{ pageIndex, gotoPage, pageOptions, filteredRows }} />

          <Sayfalama
            props={{
              gotoPage,
              previousPage,
              nextPage,
              canPreviousPage,
              pageOptions,
              pageIndex,
              canNextPage,
              pageCount
            }}
          />

          <GosterilecekKayit props={{ pageSize, setPageSize }} />
        </div>
      </Card>

      {useAddSubeModalState() && <AddForm getData={getData} />}
      {useEditSubeModalState() && <EditForm getData={getData} />}
      {useDeleteSubeModalState() && <DeleteForm getData={getData} />}
      {useStatusSubeModalState() && <StatusForm getData={getData} />}
    </>
  );
};

export default Tablo;
