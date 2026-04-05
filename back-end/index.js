const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, 
  },
});


app.post("/contato", async (req, res) => {
  const { nome, email, telefone, mensagem } = req.body;


  if (!nome || !email || !telefone || !mensagem) {
    return res.status(400).json({ mensagem: "Todos os campos são obrigatórios." });
  }

  const mailOptions = {
    from: `"Site Afonso Melo Advocacia" <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_DESTINO, 
    replyTo: email,                 
    subject: `Novo contato pelo site: ${nome}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px;">
        <h2 style="color: #333; border-bottom: 2px solid #c8a96e; padding-bottom: 10px;">
          Novo contato recebido pelo site
        </h2>
        
        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; font-weight: bold; width: 30%; border: 1px solid #eee;">Nome</td>
            <td style="padding: 12px; border: 1px solid #eee;">${nome}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #eee;">E-mail</td>
            <td style="padding: 12px; border: 1px solid #eee;">
              <a href="mailto:${email}">${email}</a>
            </td>
          </tr>
          <tr style="background-color: #f9f9f9;">
            <td style="padding: 12px; font-weight: bold; border: 1px solid #eee;">Telefone</td>
            <td style="padding: 12px; border: 1px solid #eee;">${telefone}</td>
          </tr>
          <tr>
            <td style="padding: 12px; font-weight: bold; border: 1px solid #eee; vertical-align: top;">Mensagem</td>
            <td style="padding: 12px; border: 1px solid #eee; white-space: pre-wrap;">${mensagem}</td>
          </tr>
        </table>

        <p style="margin-top: 20px; color: #888; font-size: 12px;">
          Esta mensagem foi enviada pelo formulário de contato do site Afonso Melo Advocacia.
        </p>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ mensagem: "Mensagem enviada com sucesso! Entraremos em contato em breve." });
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
    return res.status(500).json({ mensagem: "Erro ao enviar mensagem. Tente novamente mais tarde." });
  }
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});