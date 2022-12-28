const AppError = require('./../utils/AppError');
/**
 * Function responsible for handling situations where the user inputs more characters than required
 * @param {*} errClone
 * @returns AppError instance (which is an operational error)
 */
const handleExcessInputLength = (errClone) => {
  //TODO: Grab the field name from errClone.message property which requires the limited number of values
  let startIndex = errClone.message.indexOf("'");
  let endIndex = errClone.message.lastIndexOf("'");
  const fieldName = errClone.message.slice(startIndex + 1, endIndex);

  return new AppError(
    `Sorry '${fieldName}' only takes a limited amount of characters, please reduce the number of characters you use.`,
    400
  );
};

/**
 * Function responsible for handling situations where an integer value is required but instead,
 * got something else like a string,boolean etc.
 * @param {*} errClone
 * @returns AppError instance (which is an operational error)
 */
const handleIncorrectIntegerValue = (errClone) => {
  const startIndex = errClone.message.lastIndexOf(" '");
  const endIndex = errClone.message.lastIndexOf("'");

  const fieldName = errClone.message
    .slice(startIndex, endIndex)
    .replace("'", '');

  return new AppError(
    `Sorry, ${fieldName} field requires only Integer values`,
    400
  );
};
const sendErrorsInDevMode = (err, req, res) => {
  //ERRORS FROM THE API
  // console.log(req.originalUrl);
  if (req.originalUrl.startsWith('/api')) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
      stack: err.stack,
      error: err,
    });
  }
};
const sendErrorsInProdMode = (err, req, res) => {
  //ERRORS FROM THE API

  if (req.originalUrl.startsWith('/api')) {
    //CHECK IF THE ERROR IS AN OPERATIONAL ERROR
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: err.status,
        message: err.errorMsg,
      });
    }

    //IF NOT AN OPERATIONAL ERROR THEN...
    console.error('ERROR❗❗❗', err);

    return res.status(500).json({
      status: 'error',
      message: 'Something Went Very Wrong!',
    });
  }
};

module.exports = (err, req, res, next) => {
  err.status = err.status || 'error';
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === 'development') {
    sendErrorsInDevMode(err, req, res);
  }

  if (process.env.NODE_ENV === 'production') {
    let errClone = { ...err };
    if (errClone.errno === 1406) errClone = handleExcessInputLength(errClone);
    if (errClone.errno === 1366)
      errClone = handleIncorrectIntegerValue(errClone);

    //TODO: HANDLE ERRORS FOR 1054 NOTE: VERY IMPORTANT CHECK THE SCREENSHOTS FOR THE ERR MESSAGE
    sendErrorsInProdMode(errClone, req, res);
  }
};
