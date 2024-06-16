const response = require('@helper/response');
const transactions = require('@lib/transactions');

exports.add = async (data, props) => {
  let { Model, req, res, messages, pointname } = props;
  try {
    let createdDocument = await Model.create(data);
    return response.success(res, createdDocument, req.user?.id, pointname, transactions.add, messages.add.ok);
  } catch (err) {
    if (err.code === 11000) {
      return response.error(res, messages.name_already, messages.data_error, 409);
    }
    return response.error(res, messages.add.error);
  }
};
exports.update = async (data, props) => {
  let { Model, req, res, messages, pointname } = props;
  try {
    let document = await Model.findOneAndUpdate({ _id: req.body._id }, data, { new: true });
    if (!document) {
      return response.error(res, messages.update.not_found);
    }

    return response.success(res, document, req.user?.id, pointname, transactions.update, messages.update.ok);
  } catch (err) {
    if (err.code === 11000) {
      return response.error(res, messages.name_already, messages.data_error, 409);
    }
    return response.error(res, messages.update.error);
  }
};
exports.get = async props => {
  let body = req.body;
  let { Model, req, res, messages, pointname } = props;
  try {
    let document = await Model.findOne({ _id: body._id });
    if (!document) {
      return response.error(res, messages.get.not_found);
    }

    return response.success(res, document, req.user?.id, pointname, transactions.get, messages.get.ok);
  } catch (err) {
    return response.error(res, messages.get.error);
  }
};
exports.getAll = async (filter, props) => {
  let { Model, req, res, messages, pointname } = props;
  let body = req.body;
  let query = req.query;
  try {
    let documents = await Model.find(filter).find(query);
    return response.success(res, documents, req.user?.id, pointname, transactions.list, messages.list.ok);
  } catch (err) {
    return response.error(res, messages.list.error);
  }
};
exports.active = async props => {
  let { Model, req, res, messages, pointname } = props;
  try {
    let updates = {};
    updates.updated_by = req.user?.id;
    updates.is_active = true;

    let document = await Model.findOneAndUpdate({ _id: req.body._id }, updates, { new: true });

    if (!document) {
      return response.error(res, messages.active.not_found);
    }

    return response.success(res, document, req.user?.id, pointname, transactions.active, messages.active.ok);
  } catch (err) {
    return response.error(res, messages.active.error);
  }
};
exports.passive = async props => {
  let { Model, req, res, messages, pointname } = props;
  try {
    let updates = {};
    updates.updated_by = req.user?.id;
    updates.is_active = false;

    let document = await Model.findOneAndUpdate({ _id: req.body._id }, updates, { new: true });

    if (!document) {
      return response.error(res, messages.passive.not_found);
    }

    return response.success(res, document, req.user?.id, pointname, transactions.passive, messages.passive.ok);
  } catch (err) {
    return response.error(res, messages.passive.error);
  }
};
exports.archive = async props => {
  let { Model, req, res, messages, pointname } = props;
  try {
    let updates = {};
    updates.updated_by = req.user?.id;
    updates.is_archive = true;

    let document = await Model.findOneAndUpdate({ _id: req.body._id }, updates, { new: true });

    if (!document) {
      return response.error(res, messages.archive.not_found);
    }

    return response.success(res, document, req.user?.id, pointname, transactions.archive, messages.archive.ok);
  } catch (err) {
    return response.error(res, messages.archive.error);
  }
};
exports.unarchive = async props => {
  let { Model, req, res, messages, pointname } = props;
  try {
    let updates = {};
    updates.updated_by = req.user?.id;
    updates.is_archive = false;

    let document = await Model.findOneAndUpdate({ _id: req.body._id }, updates, { new: true });

    if (!document) {
      return response.error(res, messages.unarchive.not_found);
    }

    return response.success(res, document, req.user?.id, pointname, transactions.unarchive, messages.unarchive.ok);
  } catch (err) {
    return response.error(res, messages.unarchive.error);
  }
};
exports.softDelete = async props => {
  let { Model, req, res, messages, pointname } = props;
  try {
    let updates = {};
    updates.updated_by = req.user?.id;
    updates.is_delete = true;

    let document = await Model.findOneAndUpdate({ _id: req.body._id }, updates, { new: true });

    if (!document) {
      return response.error(res, messages.softDelete.not_found);
    }

    return response.success(res, document, req.user?.id, pointname, transactions.softFelete, messages.softdelete.ok);
  } catch (err) {
    return response.error(res, messages.softDelete.error);
  }
};
exports.restore = async props => {
  let { Model, req, res, messages, pointname } = props;
  try {
    let updates = {};
    updates.updated_by = req.user?.id;
    updates.is_delete = false;

    let document = await Model.findOneAndUpdate({ _id: req.body._id }, updates, { new: true });

    if (!document) {
      return response.error(res, messages.restore.not_found);
    }

    return response.success(res, document, req.user?.id, pointname, transactions.restore, messages.restore.ok);
  } catch (err) {
    return response.error(res, messages.restore.error);
  }
};
exports.hardDelete = async props => {
  let { Model, req, res, messages, pointname } = props;
  try {
    let document = await Model.findOneAndDelete({ _id: req.body._id });

    if (!document) {
      return response.error(res, messages.hardDelete.not_found);
    }

    return response.success(res, document, req.user?.id, pointname, transactions.hardDelete, messages.harddelete.ok);
  } catch (err) {
    return response.error(res, messages.hardDelete.error);
  }
};
