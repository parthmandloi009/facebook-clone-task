export const save = async (model: any, data: Object) => {
  return await model.create(data);
};

export const findOne = async (model: any, email: string) => {
  return await model.findOne({ email });
};

export const updateOne = async (model: any, id: string, data: object) => {
  return await model.findOneAndUpdate(id, {
    $set: data,
  });
};

export const deleteOne = async (model: any, id: string) => {
  return await model.deleteOne({ _id: id });
};

export const getOne = async (model: any, id: string) => {
  return await model.findOne({ _id: id });
};

export const getManyUser = async (model: any) => {
  return await model.find({});
};
