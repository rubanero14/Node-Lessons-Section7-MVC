exports.notFoundPage = (req, res, next) => {
  res.status(404).render("404", {
    docTitle: "404: Page Not Found",
    path: undefined,
  });
};
