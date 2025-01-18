import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5001;

app.use(cors());
app.use(express.json());

app.post('/submit-form', (req, res) => {
  const formData = req.body;

  const now = new Date();
  const formattedDate = now.toISOString().replace(/:/g, '-').split('.')[0];
  const fileName = `form${formattedDate}.json`;

  const filePath = path.join(__dirname, 'form-submissions', fileName);

  fs.writeFile(filePath, JSON.stringify(formData, null, 2), (err) => {
    if (err) {
      console.error('Ошибка при записи файла:', err);
      res.status(500).send('Ошибка при записи данных');
    } else {
      console.log(`Данные формы успешно записаны в файл: ${fileName}`);
      res.status(200).send('Данные успешно записаны');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});