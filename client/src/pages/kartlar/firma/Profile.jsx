import { useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import Icon from '@/components/ui/Icon';
import Card from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import Loading from '@/components/Loading';

import { firmaGet } from '@/api/kartlar/firma';
import { useFirma, setFirma } from '@/store/kartlar/firma/hooks';
import { setLoading, useLoader } from '@/store/loader/hooks';

const Profile = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const loading = useLoader();
  const firma = useFirma();

  const getData = async () => {
    setLoading(true);
    try {
      const response = await firmaGet({ _id: id });
      if (response.data.success) {
        setFirma(response.data.data);
      } else {
        throw new Error(response.data.message);
      }
    } catch (error) {
      message.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData();
  }, []);

  const goBack = () => {
    navigate(-1);
  };
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="space-y-5 profile-page">
            <div className="profiel-wrap px-[35px] pb-10 md:pt-[84px] pt-10 rounded-lg bg-white dark:bg-slate-800 lg:flex lg:space-y-0 space-y-6 justify-between items-end relative z-[1]">
              <div className=" bg-slate-900 dark:bg-slate-700 absolute left-0 top-0 md:h-1/2 h-[150px] w-full z-[-1] rounded-t-lg">
                <Button
                  icon="mdi:arrow-back"
                  text="Geri"
                  className="mt-2 text-primary-50 h-min font-normal"
                  iconClass={'text-lg'}
                  onClick={goBack}
                />
              </div>
              <div className="profile-box flex-none md:text-start text-center">
                <div className="md:flex items-end md:space-x-6 rtl:space-x-reverse">
                  <div className="flex-none">
                    <div className="md:h-[186px] md:w-[186px] h-[140px] w-[140px] md:ml-0 md:mr-0 ml-auto mr-auto md:mb-0 mb-4 rounded-full ring-4 ring-slate-100 relative">
                      <img
                        src={'http://localhost:5777/uploads/images/' + firma?.logoUrl}
                        alt=""
                        className="w-full h-full object-cover rounded-full"
                      />
                      <Link
                        to="#"
                        className="absolute right-2 h-8 w-8 bg-slate-50 text-slate-600 rounded-full shadow-sm flex flex-col items-center justify-center md:top-[140px] top-[100px]"
                      >
                        <Icon icon="heroicons:pencil-square" />
                      </Link>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="text-2xl font-medium text-slate-900 dark:text-slate-200 mb-[3px]">{firma?.ad}</div>
                    <div className="text-sm font-light text-slate-600 dark:text-slate-400">Front End Developer</div>
                  </div>
                </div>
              </div>

              <div className="profile-info-500 md:flex md:text-start text-center flex-1 max-w-[516px] md:space-y-0 space-y-4">
                <div className="flex-1">
                  <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">$32,400</div>
                  <div className="text-sm text-slate-600 font-light dark:text-slate-300">Total Balance</div>
                </div>

                <div className="flex-1">
                  <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">200</div>
                  <div className="text-sm text-slate-600 font-light dark:text-slate-300">Board Card</div>
                </div>

                <div className="flex-1">
                  <div className="text-base text-slate-900 dark:text-slate-300 font-medium mb-1">3200</div>
                  <div className="text-sm text-slate-600 font-light dark:text-slate-300">Calender Events</div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-12 gap-6">
              <div className="lg:col-span-4 col-span-12">
                <Card title="Bilgiler">
                  <ul className="list space-y-8">
                    <li className="grid grid-cols-2 gap-10 rtl:space-x-reverse">
                      <div className="flex  space-x-3">
                        <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                          <Icon icon="fluent-mdl2:date-time-2" />
                        </div>
                        <div className="flex-1">
                          <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                            Kuruluş Yılı{' '}
                          </div>
                          <a href="mailto:someone@example.com" className="text-base text-slate-600 dark:text-slate-50">
                            {firma?.ekBilgiler?.kurulusYili}
                          </a>
                        </div>
                      </div>

                      <div className="flex  space-x-3">
                        <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                          <Icon icon="radix-icons:person" />
                        </div>
                        <div className="flex-1">
                          <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                            Çalışan Sayısı{' '}
                          </div>
                          <a href="mailto:someone@example.com" className="text-base text-slate-600 dark:text-slate-50">
                            {firma?.ekBilgiler?.subeSayisi}
                          </a>
                        </div>
                      </div>

                      <div className="flex  space-x-3">
                        <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                          <Icon icon="heroicons:envelope" />
                        </div>
                        <div className="flex-1">
                          <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                            E-posta
                          </div>
                          <a href="mailto:someone@example.com" className="text-base text-slate-600 dark:text-slate-50">
                            {firma?.iletisim?.eposta}
                          </a>
                        </div>
                      </div>

                      <div className="flex space-x-3">
                        <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                          <Icon icon="heroicons:phone-arrow-up-right" />
                        </div>
                        <div className="flex-1">
                          <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                            Telefon
                          </div>
                          <a href="tel:0189749676767" className="text-base text-slate-600 dark:text-slate-50">
                            {firma?.iletisim?.telefon}
                          </a>
                        </div>
                      </div>

                      <div className="flex  space-x-3">
                        <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                          <Icon icon="heroicons:phone-arrow-up-right" />
                        </div>
                        <div className="flex-1">
                          <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                            Gsm
                          </div>
                          <a href="tel:0189749676767" className="text-base text-slate-600 dark:text-slate-50">
                            {firma?.iletisim?.gsm}
                          </a>
                        </div>
                      </div>

                      <div className="flex  space-x-3">
                        <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                          <Icon icon="heroicons:phone-arrow-up-right" />
                        </div>
                        <div className="flex-1">
                          <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                            gsm-2
                          </div>
                          <a href="tel:0189749676767" className="text-base text-slate-600 dark:text-slate-50">
                            {firma?.iletisim?.gsmOps}
                          </a>
                        </div>
                      </div>

                      <div className="col-span-2 flex  space-x-3">
                        <div className="flex-none text-2xl text-slate-600 dark:text-slate-300">
                          <Icon icon="heroicons:map" />
                        </div>
                        <div className="flex-1">
                          <div className="uppercase text-xs text-slate-500 dark:text-slate-300 mb-1 leading-[12px]">
                            Adres
                          </div>
                          <div className="text-base text-slate-600 dark:text-slate-50">
                            {firma?.adres?.acikAdres} - {firma?.adres?.ilce}/{firma?.adres?.il}
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </Card>
              </div>
              <div className="lg:col-span-8 col-span-12">
                <Card title="User Overview">Basic Area</Card>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
