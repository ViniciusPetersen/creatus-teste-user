const jwt = require('jsonwebtoken');
const User = require('../models/user');

module.exports = (levelRequired) => async (req, res, next) => {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'Sem token, autorização negada' });
  }

  try {
    const decoded = jwt.verify(token, 'secreta');
    req.user = decoded.user;

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(401).json({ msg: 'Usuário não encontrado' });
    }

    if (user.level < levelRequired) {
      return res.status(403).json({ msg: 'Permissão negada' });
    }

    next();
  } catch (err) {
    console.error(err.message);
    res.status(401).json({ msg: 'Token inválido' });
  }
};
