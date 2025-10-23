const adminController = (req, res) => {
  res.status(200).json({ msg: 'Welcome Admin', user: req.user });
};

module.exports = adminController;