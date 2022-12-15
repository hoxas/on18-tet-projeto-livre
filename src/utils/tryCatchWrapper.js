const tryCatchWrapper = (fn) => {
  return async function wrappedFn(req, res) {
    try {
      await fn(req, res);
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  };
};

module.exports = tryCatchWrapper;
