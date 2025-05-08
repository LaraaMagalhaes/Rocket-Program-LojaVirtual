const prisma = require('../models/PrismaService');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const SECRET_KEY = process.env.ACCESS_KEY;

class AuthController {
  static async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await prisma.user.findUnique({
        where: { username }
      });

      if (!user) {
        return res.status(401).json({ message: 'Usuário não encontrado' });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Senha incorreta' });
      }

      const token = jwt.sign(
        { userId: user.id, username: user.username },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      res.json({ token });
    } catch (error) {
      console.error('Erro ao fazer login:', error.message);
      res.status(500).json({ message: 'Erro interno no servidor' });
    }
  }
}

module.exports = AuthController;
