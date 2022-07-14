const validate = (schema, property, errors) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property])
    const valid = error == null
    if (valid) { next() } else {
      const { details } = error
      let message = details.map(i => i.message).join(',')
      if (errors) {
        message = errors
      }
      res.status(422).json({ success: false, error: message })
    }
  }
}
module.exports = validate
