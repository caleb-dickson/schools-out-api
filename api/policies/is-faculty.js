module.exports = async function (req, res, proceed) {
  if (
    (req.me && req.me.role) && (req.me.role === "ADMIN" ||
    req.me.role === "TEACHER")
  ) {
    return proceed();
  }

  //--•
  // Otherwise, this request did not come from an ADMIN user.
  return res.unauthorized();
};
