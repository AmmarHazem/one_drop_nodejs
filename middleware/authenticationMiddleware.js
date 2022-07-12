import CustomErrors from "../errors";

const authenticationMiddleware = (request, response, next) => {
  if (request.session.user && request.session.user.id) {
    next();
  } else {
    throw new CustomErrors.UnauthenticatedError("Unauthenticated");
  }
};

export default authenticationMiddleware;
