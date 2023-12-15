const requestMiddleware = (req, res, next) => {
  console.log(`
        PATH::${req.path} 
        BODY::${JSON.stringify(req.body)}`);
  next();
};

module.exports = requestMiddleware;
