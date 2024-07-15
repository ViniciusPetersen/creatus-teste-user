const User = require('../models/user');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  const { name, email, password, level } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'Usuário já existe' });
    }
    if(level>5){
        level = 1;
    }

    user = new User({ name, email, password, level });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    res.send('Usuário criado');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

exports.getUser = async (req, res) => {
    try {
      let user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ msg: 'Usuário não encontrado' });
      }
  
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Erro no servidor');
    }
  };

exports.updateUser = async (req, res) => {
  const { name, email, password, level } = req.body;
  try {
    let user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'Usuário não encontrado' });
    }
    if(level>5){
        level = 1;
    }


    user.name = name || user.name;
    user.email = email || user.email;
    user.level = level || user.level;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.send('Usuário deletado');
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};
