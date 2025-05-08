const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.ACCESS_KEY;

function verificarToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Token não enviado' });

  const token = authHeader.split(' ')[1];
  
  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded; // userId, username
    next();
  } catch (err) {
    console.error("Erro na validação do token:", err.message);
    res.status(401).json({ message: 'Token inválido ou expirado' });
  }
}

module.exports = verificarToken;
