const getMessages = name => {
  const createMessages = (name, actionName) => {
    const messages = {};
    states.forEach(state => {
      switch (state) {
        case 'ok':
          messages[state] = `${name ? name + ' ' : ''}${actionName} işlemi başarılı.`;
          break;
        case 'error':
          messages[state] = `${name ? name + ' ' : ''}${actionName} işlemi hatalı.`;
          break;
        case 'failed':
          messages[state] = `${name ? name + ' ' : ''}${actionName} işlemi başarısız.`;
          break;
        case 'pending':
          messages[state] = `${name ? name + ' ' : ''}${actionName} işlemi beklemede.`;
          break;
        case 'in_progress':
          messages[state] = `${name ? name + ' ' : ''}${actionName} işlemi devam ediyor.`;
          break;
        case 'completed':
          messages[state] = `${name ? name + ' ' : ''}${actionName} işlemi tamamlandı.`;
          break;
        case 'cancelled':
          messages[state] = `${name ? name + ' ' : ''}${actionName} işlemi iptal edildi.`;
          break;
        case 'not_found':
          messages[state] = `${name ? name + ' ' : ''}${actionName} işlemi bulunamadı.`;
          break;
        case 'unauthorized':
          messages[state] = `${name ? name + ' ' : ''}${actionName} işlemi yetkisiz.`;
          break;
        case 'forbidden':
          messages[state] = `${name ? name + ' ' : ''}${actionName} işlemi yasak.`;
          break;
        case 'timeout':
          messages[state] = `${name ? name + ' ' : ''}${actionName} işlemi zaman aşımına uğradı.`;
          break;
        default:
          messages[state] = `${name ? name + ' ' : ''}${actionName} işlemi bilinmeyen bir durumda.`;
      }
    });
    return messages;
  };

  const states = ['ok', 'error', 'pending', 'in_progress', 'completed', 'failed', 'cancelled', 'not_found', 'unauthorized', 'forbidden', 'timeout'];

  return {
    general: {
      ok: `İşlem başarılı.`,
      error: `İşlem başarısız.`,
      pending: `İşlem beklemede.`,
      in_progress: `İşlem devam ediyor.`,
      completed: `İşlem tamamlandı.`,
      failed: `İşlem başarısız.`,
      cancelled: `İşlem iptal edildi.`,
      not_found: `İşlem bulunamadı.`,
      file_notfound: `Dosya bulunamadı.`,
      unauthorized: `işlem yetkisiz.`,
      forbidden: `İşlem yasak.`,
      timeout: `İşlem zaman aşımına uğradı.`
    },
    error: {
      unexpected: 'Beklenmedik bir hata meydana geldi, lütfen daha sonra tekrar deneyiniz.',
      data: 'Veri Hatası'
    },
    warning: {
      not_found: `${name} bulunamadı.`,
      name_already: `${name} adı zaten kullanılmaktadır.`
    },

    //!İSİMSİZ
    imageUpload: createMessages(null, 'Resim yükleme'),
    documentUpload: createMessages(null, 'Döküman yükleme'),
    otherUpload: createMessages(null, 'Dosya yükleme'),
    validation: createMessages(null, 'Doğrulama'),
    login: createMessages(null, 'Giriş'),
    logout: createMessages(null, 'Çıkış'),
    register: createMessages(null, 'Kayıt'),
 
    //*İSİMLİ
    get: createMessages(name, 'getirme'),
    list: createMessages(name, 'listeleme'),
    add: createMessages(name, 'ekleme'),
    update: createMessages(name, 'güncelleme'),
    softdelete: createMessages(name, 'silme'),
    harddelete: createMessages(name, 'kalıcı silme'),
    restore: createMessages(name, 'geri yükleme'),
    active: createMessages(name, 'durumu aktif etme'),
    passive: createMessages(name, 'durumu pasif etme'),
    archive: createMessages(name, 'arşivleme'),
    unarchive: createMessages(name, 'arşivden çıkarma'),
    report: createMessages(name, 'raporlama'),
    statistic: createMessages(name, 'istatistik'),
    print: createMessages(name, 'yazdırma'),
    import: createMessages(name, 'içe aktarma'),
    export: createMessages(name, 'dışa aktarma'),
    approve: createMessages(name, 'onaylama'),
    reject: createMessages(name, 'reddetme'),
    publish: createMessages(name, 'yayınlama'),
    draft: createMessages(name, 'taslak'),
    clone: createMessages(name, 'klonlama'),
    share: createMessages(name, 'paylaşma'),
    transfer: createMessages(name, 'transfer'),
    mail: createMessages(name, 'mail'),
    audit: createMessages(name, 'denetleme'),
    monitor: createMessages(name, 'izleme'),
    validate: createMessages(name, 'doğrulama'),
    sync: createMessages(name, 'senkronizasyon'),
    schedule: createMessages(name, 'zamanlama')
  };
};

module.exports = getMessages;
