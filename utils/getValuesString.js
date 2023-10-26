const bcrypt = require('bcryptjs');
/**
 *
 * @param {Object} reqBody The shallow copy req.body
 * @returns  A string of values to be used in the sql INSERT command
 */

module.exports = async (reqBody) => {
  let resultStr;
  //Below converts the fields values that are of type 'string' which are
  //supposed to be of type 'integer' to 'integer'
  const integerFields = [
    'indexNumber',
    'facultyId',
    'professorId',
    'courseId',
    'studentId',
    'ongoingAttendanceId',
    'QRcodeId',
  ];

  integerFields.forEach((Integerfield) => {
    if (Integerfield in reqBody) {
      reqBody[Integerfield] = +reqBody[Integerfield];
    }
  });

  if (reqBody.userPassword) {
    reqBody.userPassword = await bcrypt.hash(reqBody.userPassword, 12); //encryting the users password
    delete reqBody['passwordConfirm'];
  }
  //EDGE-CASE: if the body has a indexNumber Field (ie data is from a student)
  if (reqBody.secretAnswers) {
    reqBody.secretAnswers = JSON.stringify(reqBody.secretAnswers);
    reqBody.secretQuestions = JSON.stringify(reqBody.secretQuestions);
  }

  //The Below takes each of the values of the 'cloneObject' and puts them into single string
  Object.values(reqBody).forEach((currentValue, i) => {
    if (i === 0) {
      resultStr = `${
        typeof currentValue === 'string' ? `'${currentValue}'` : currentValue
      }`;
    } else {
      resultStr += `,${
        typeof currentValue === 'string' ? `'${currentValue}'` : currentValue
      }`;
    }
  });

  return resultStr;
};
