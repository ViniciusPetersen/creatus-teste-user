const User = require('../models/user');
const PDFDocument = require('pdfkit');
const { createObjectCsvWriter } = require('csv-writer');
const fs = require('fs');
const path = require('path');

exports.generateReport = async (req, res) => {
  const { format } = req.query;

  try {
    const users = await User.find().select('-password');

    // Garantir que o diretório 'reports' exista
    const reportsDir = path.join(__dirname, '..', 'reports');
    if (!fs.existsSync(reportsDir)) {
      fs.mkdirSync(reportsDir);
    }

      let filename = `relatorio-${Date.now()}.csv`;
      let filePath = path.join(reportsDir, filename);

      const csvWriter = createObjectCsvWriter({
        path: filePath,
        header: [
          { id: 'name', title: 'Nome' },
          { id: 'email', title: 'Email' },
          { id: 'role', title: 'Nível' }
        ]
      });

      await csvWriter.writeRecords(users);
      res.download(filePath, filename, (err) => {
        if (err) {
          console.error(err);
          res.status(500).send('Erro ao baixar o arquivo');
        }
        fs.unlinkSync(filePath);
      });

    
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erro no servidor');
  }
};
