exports.genericError = (code, message) => ({
  error: {
    code,
    message
  },
  success: false
});

exports.customError = error => ({
  error,
  success: false
});

exports.simpleSuccess = (code, message) => ({
  code,
  message,
  success: true
});

exports.genericSuccess = data => ({
  data,
  success: true
});
