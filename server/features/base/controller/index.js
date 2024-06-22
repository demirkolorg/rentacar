const response = require('@helper/response');
const transactions = require('@lib/transactions');

exports.get = async props => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  let body = req.body;
  try {
    let document = await model.findOne({ _id: body._id });
    if (!document) {
      return response.error(res, err, userId, pointname, transactions.get, messages.get.not_found);
    }

    return response.success(res, document, userId, pointname, transactions.get, messages.get.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.add, messages.get.error);
  }
};
exports.getWithPopulate = async props => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  let body = req.body;
  try {
    let document = await model.findOne({ _id: body._id }).populate();
    if (!document) {
      return response.error(res, err, userId, pointname, transactions.get, messages.get.not_found);
    }

    return response.success(res, document, userId, pointname, transactions.get, messages.get.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.add, messages.get.error);
  }
};
exports.getIds = async props => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  let body = req.body;
  let ids = body.ids;
  let query = req.query;
  try {
    let document = await model.find({ _id: { $in: ids, sube: body.sube } }).find(query);
    if (!document || document.length === 0) {
      return response.error(res, err, userId, pointname, transactions.list, messages.list.not_found);
    }
    return response.success(res, document, userId, pointname, transactions.get, messages.list.ok);
  } catch (err) {
    console.log('====================================');
    console.log('getIds', err);
    console.log('====================================');
    return response.error(res, err, userId, pointname, transactions.list, messages.list.error);
  }
};
exports.getIdsWithPopulate = async props => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  let body = req.body;
  let ids = body.ids;
  let query = req.query;
  try {
    let document = await model
      .find({ _id: { $in: ids, sube: body.sube } })
      .find(query)
      .populate();
    if (!document || document.length === 0) {
      return response.error(res, err, userId, pointname, transactions.list, messages.list.not_found);
    }
    return response.success(res, document, userId, pointname, transactions.get, messages.list.ok);
  } catch (err) {
    console.log('====================================');
    console.log('getIdsWithPopulate', err);
    console.log('====================================');
    return response.error(res, err, userId, pointname, transactions.list, messages.list.error);
  }
};
exports.list = async (filter, props) => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  let body = req.body;
  let query = req.query;
  try {
    let documents = await model.find(filter).find(query);
    return response.success(res, documents, userId, pointname, transactions.list, messages.list.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.add, messages.list.error);
  }
};
exports.listWithPopulate = async (filter, populate, props) => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  let body = req.body;
  let query = req.query;
  //ÖRNEK populate içeriği tekil ve çoğul
  // populate: [{ path: 'firmaId' }, { path: 'subeId' }, { path: 'userId' }];

  try {
    let documents = await model.find(filter).find(query).populate(populate);
    return response.success(res, documents, userId, pointname, transactions.list, messages.list.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.add, messages.list.error);
  }
};
exports.add = async (data, props) => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  let body = req.body;
  try {
    // Şemada sube alanının olup olmadığını kontrol et
    const hasSubeField = model.schema.paths.hasOwnProperty('documentinfo.sube');

    let documentinfo = {
      created_by: userId,
      is_active: true,
      is_delete: false,
      is_archive: false
    };
    documentinfo.sube = hasSubeField ? body.sube : null;
    data.documentinfo = documentinfo;

    let createdDocument = await model.create(data);
    return response.success(res, createdDocument, userId, pointname, transactions.add, messages.add.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.add, messages.add.error);
  }
};
exports.update = async (data, props) => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  try {
    let document = await model.findOneAndUpdate({ _id: req.body._id }, { $set: data }, { new: true, context: { userId } });
    if (!document) {
      return response.error(res, err, userId, pointname, transactions.update, messages.update.not_found);
    }

    return response.success(res, document, userId, pointname, transactions.update, messages.update.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.update, messages.update.error);
  }
};
exports.active = async props => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  try {
    let updates = {};
    updates.updated_by = userId;
    updates.is_active = true;

    let document = await model.findOneAndUpdate({ _id: req.body._id }, updates, { new: true });

    if (!document) {
      return response.error(res, err, userId, pointname, transactions.active, messages.active.not_found);
    }

    return response.success(res, document, userId, pointname, transactions.active, messages.active.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.add, messages.active.error);
  }
};
exports.passive = async props => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  try {
    let updates = {};
    updates.updated_by = userId;
    updates.is_active = false;

    let document = await model.findOneAndUpdate({ _id: req.body._id }, updates, { new: true });

    if (!document) {
      return response.error(res, err, userId, pointname, transactions.passive, messages.passive.not_found);
    }

    return response.success(res, document, userId, pointname, transactions.passive, messages.passive.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.add, messages.passive.error);
  }
};
exports.archive = async props => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  try {
    let updates = {};
    updates.updated_by = userId;
    updates.is_archive = true;

    let document = await model.findOneAndUpdate({ _id: req.body._id }, updates, { new: true });

    if (!document) {
      return response.error(res, err, userId, pointname, transactions.archive, messages.archive.not_found);
    }

    return response.success(res, document, userId, pointname, transactions.archive, messages.archive.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.add, messages.archive.error);
  }
};
exports.unarchive = async props => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  try {
    let updates = {};
    updates.updated_by = userId;
    updates.is_archive = false;

    let document = await model.findOneAndUpdate({ _id: req.body._id }, updates, { new: true });

    if (!document) {
      return response.error(res, err, userId, pointname, transactions.unarchive, messages.unarchive.not_found);
    }

    return response.success(res, document, userId, pointname, transactions.unarchive, messages.unarchive.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.add, messages.unarchive.error);
  }
};
exports.softDelete = async props => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  try {
    let updates = {};
    updates.updated_by = userId;
    updates.is_delete = true;

    let document = await model.findOneAndUpdate({ _id: req.body._id }, updates, { new: true });

    if (!document) {
      return response.error(res, err, userId, pointname, transactions.softdelete, messages.softdelete.not_found);
    }

    return response.success(res, document, userId, pointname, transactions.softFelete, messages.softdelete.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.add, messages.softdelete.error);
  }
};
exports.restore = async props => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  try {
    let updates = {};
    updates.updated_by = userId;
    updates.is_delete = false;
    let document = await model.findOneAndUpdate({ _id: req.body._id }, updates, { new: true });
    if (!document) {
      return response.error(res, err, userId, pointname, transactions.restore, messages.restore.not_found);
    }
    return response.success(res, document, userId, pointname, transactions.restore, messages.restore.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.add, messages.restore.error);
  }
};
exports.hardDelete = async props => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  try {
    let document = await model.findOneAndDelete({ _id: req.body._id });
    if (!document) {
      return response.error(res, err, userId, pointname, transactions.hardDelete, messages.hardDelete.not_found);
    }
    return response.success(res, document, userId, pointname, transactions.hardDelete, messages.harddelete.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.add, messages.harddelete.error);
  }
};
exports.imageUpload = async props => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  let body = req.body;
  try {
    if (!req.file) {
      return response.error(res, err, userId, pointname, transactions.upload, messages.imageUpload.not_found);
    }

    return response.success(res, req.file.filename, userId, pointname, transactions.upload, messages.imageUpload.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.upload, messages.imageUpload.error);
  }
};
exports.documentUpload = async props => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  let body = req.body;
  try {
    if (!req.file) {
      return response.error(res, err, userId, pointname, transactions.upload, messages.documentUpload.not_found);
    }

    return response.success(res, req.file.filename, userId, pointname, transactions.upload, messages.documentUpload.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.upload, messages.documentUpload.error);
  }
};
exports.otherUpload = async props => {
  let { model, req, res, messages, pointname } = props;
  let userId = req.user?.id;
  let body = req.body;
  try {
    if (!req.file) {
      return response.error(res, err, userId, pointname, transactions.upload, messages.otherUpload.not_found);
    }

    return response.success(res, req.file.filename, userId, pointname, transactions.upload, messages.otherUpload.ok);
  } catch (err) {
    return response.error(res, err, userId, pointname, transactions.upload, messages.otherUpload.error);
  }
};
