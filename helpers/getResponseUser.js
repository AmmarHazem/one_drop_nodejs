const getResponseUser = ({ user }) => {
  return {
    id: user.id,
    email: user.email,
    didRegister: user.didRegister,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    city: user.city,
    name: user.name,
    phone: user.phone,
    addresses: user.addresses,
  };
};

export default getResponseUser;
