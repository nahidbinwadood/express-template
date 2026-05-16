import { User } from './user.model';

// get all user==>
const getAllUser = async () => {
  const response = await User.find({}).select('-password');
  return response;
};

export const UserServices = {
  getAllUser,
};
