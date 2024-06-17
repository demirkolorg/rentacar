const getKeys = (key, name, group, description) => {
  return {
    full: { key: `${key}_full`, name: `${name} Full`, group: `${group}`, description: `${description} ile ilgili tüm işlemlere yetkilidir` },
    get: { key: `${key}_get`, name: `${name} Getir`, group: `${group}`, description: `${description} ile ilgili tek bir kaydı getirme işlemlerine yetkilidir` },
    list: { key: `${key}_list`, name: `${name} Listele`, group: `${group}`, description: `${description} ile ilgili tüm kayıtları getirme işlemlerine yetkilidir` },
    add: { key: `${key}_add`, name: `${name} Ekle`, group: `${group}`, description: `${description} ile ilgili ekleme işlemlerine yetkilidir` },
    update: { key: `${key}_update`, name: `${name} Güncelle`, group: `${group}`, description: `${description} ile ilgili güncelleme işlemlerine yetkilidir` },
    active: { key: `${key}_active`, name: `${name} Aktif Et`, group: `${group}`, description: `${description} ile ilgili aktif etme işlemlerine yetkilidir` },
    passive: { key: `${key}_passive`, name: `${name} Pasif Et`, group: `${group}`, description: `${description} ile ilgili pasif etme işlemlerine yetkilidir` },
    archive: { key: `${key}_archive`, name: `${name} Arşivle`, group: `${group}`, description: `${description} ile ilgili verileri arşivleme işlemlerine yetkilidir` },
    unarchive: { key: `${key}_unarchive`, name: `${name} Arşivden Çıkar`, group: `${group}`, description: `${description} ile ilgili verilerin arşivden geri getirilmesi işlemlerine yetkilidir` },
    solftDelete: { key: `${key}_softDelete`, name: `${name} Geçici Sil`, group: `${group}`, description: `${description} ile ilgili geçici silme işlemlerine yetkilidir` },
    restore: { key: `${key}_restore`, name: `${name} Geri Yükle`, group: `${group}`, description: `${description} ile ilgili silinmiş verileri geri yükleme işlemlerine yetkilidir` },
    hardDelete: { key: `${key}_hardDelete`, name: `${name} Kalıcı Sil`, group: `${group}`, description: `${description} ile ilgili kalıcı silme işlemlerine yetkilidir` },
    report: { key: `${key}_report`, name: `${name} Raporlama`, group: `${group}`, description: `${description} ile ilgili raporlama işlemlerine yetkilidir` },
    statistic: { key: `${key}_statistic`, name: `${name} İstatistik`, group: `${group}`, description: `${description} ile ilgili istatistik işlemlerine yetkilidir` },
    print: { key: `${key}_print`, name: `${name} Yazdırma`, group: `${group}`, description: `${description} ile ilgili  yazdırma işlemlerine yetkilidir` },
    import: { key: `${key}_import`, name: `${name} İçe Aktarma`, group: `${group}`, description: `${description} ile ilgili içe aktarma işlemlerine yetkilidir` },
    export: { key: `${key}_export`, name: `${name} Dışa Aktarma`, group: `${group}`, description: `${description} ile ilgili dışa aktarma işlemlerine yetkilidir` },
    approve: { key: `${key}_approve`, name: `${name} Onayla`, group: `${group}`, description: `${description} ile ilgili onaylama işlemlerine yetkilidir` },
    reject: { key: `${key}_reject`, name: `${name} Reddet`, group: `${group}`, description: `${description} ile ilgili reddetme işlemlerine yetkilidir` },
    publish: { key: `${key}_publish`, name: `${name} Yayınla`, group: `${group}`, description: `${description} ile ilgili yayınlama işlemlerine yetkilidir` },
    draft: { key: `${key}_draft`, name: `${name} Taslak`, group: `${group}`, description: `${description} ile ilgili taslak işlemlerine yetkilidir` },
    clone: { key: `${key}_clone`, name: `${name} Klonla`, group: `${group}`, description: `${description} ile ilgili klonlama işlemlerine yetkilidir` },
    share: { key: `${key}_share`, name: `${name} Paylaş`, group: `${group}`, description: `${description} ile ilgili paylaşma işlemlerine yetkilidir` },
    transfer: { key: `${key}_transfer`, name: `${name} Transfer Et`, group: `${group}`, description: `${description} ile ilgili transfer işlemlerine yetkilidir` },
    audit: { key: `${key}_audit`, name: `${name} Denetle`, group: `${group}`, description: `${description} ile ilgili denetleme işlemlerine yetkilidir` },
    monitor: { key: `${key}_monitor`, name: `${name} İzle`, group: `${group}`, description: `${description} ile ilgili izleme işlemlerine yetkilidir` },
    validate: { key: `${key}_validate`, name: `${name} Doğrula`, group: `${group}`, description: `${description} ile ilgili doğrulama işlemlerine yetkilidir` },
    sync: { key: `${key}_sync`, name: `${name} Senkronize Et`, group: `${group}`, description: `${description} ile ilgili senkronizasyon işlemlerine yetkilidir` },
    schedule: { key: `${key}_schedule`, name: `${name} Zamanla`, group: `${group}`, description: `${description} ile ilgili zamanlama işlemlerine yetkilidir` },
    mail: { key: `${key}_mail`, name: `${name} Mail`, group: `${group}`, description: `${description} ile ilgili mail işlemlerine yetkilidir` },
    notification: { key: `${key}_notification`, name: `${name} Bildirim`, group: `${group}`, description: `${description} ile ilgili bildirim işlemlerine yetkilidir` },
    log: { key: `${key}_log`, name: `${name} Log`, group: `${group}`, description: `${description} ile ilgili loglama işlemlerine yetkilidir` }
  };
};

module.exports = getKeys;
