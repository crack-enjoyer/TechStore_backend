async function getProfile(req, res) {
  return res.json({ user: req.user.toPublic() });
}

module.exports = { getProfile };