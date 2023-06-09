function queryStringValidator(req, res, next) {
  let { offset } = req.query;

  if (!offset) {
    offset = '0';
  }
  if (/^[0-9]\d*$/.test(offset)) {
    res.offset = offset;
    return next();
  }

  return res.status(400).send({ message: 'Invalid query string.' });
}

export default queryStringValidator;
