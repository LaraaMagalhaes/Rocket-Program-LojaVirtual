function errorHandler(err, req, res, next) {
    console.error(`🔥 Erro detectado: ${err.message}`);
    if (err.name === 'ValidationError') {
      return res.status(400).json({ message: err.message });
    }
    res.status(500).json({ message: 'Erro interno no servidor' });
  }
  
  module.exports = errorHandler;
  