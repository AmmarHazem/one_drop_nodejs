import CustomErrors from "../errors";

const hasPermissionMiddleware = (...roles) => {
  return (request, response, next) => {
    if (request.user && roles.includes(request.user.role)) {
      next();
    } else {
      throw new CustomErrors.UnauthorizedError("unauthorized");
    }
  };
};

export default hasPermissionMiddleware;
