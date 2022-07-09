const notFound = (request, response) => {
  response.status(404).send("Route not found");
};

export default notFound;
