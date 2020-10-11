module.exports.setUser = async (req, _, next) => {
  req.user = await getUserFromReq(req)
  return next()
}

// module.exports.requireUser = async (req, res, next) => {
//   const user = req.user || (await getUserFromReq(req))
//   if (!user) {
//   }
// }
