import { User } from './user.model';

// get all user==>
const getAllUser = async () => {
  const response = await User.find({});
  const updatedResponse = response?.map(({ password, ...rest }) => rest);
  return updatedResponse;
};

export const UserServices = {
  getAllUser,
};
