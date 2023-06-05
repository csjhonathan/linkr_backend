export default function schemaValidator(schema) {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false });
    if (error) {
      const messages = { message: error.details.map((er) => er.message) };
      return res.status(422).send(messages);
    }

    res.locals.schema = value;

    return next();
  };
}
