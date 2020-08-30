const nodemailer = require('nodemailer');
const config = require('../../config/keys_dev');

module.exports = sendResetPasswordEmail = ({ toUser, hash }, callback) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: config.google_user,
      pass: config.google_password,
    },
  });

  const message = {
    from: config.google_user,
    to: toUser.email,
    subject: 'F1blog.ru - reset password',
    html: `
    <h3>Привет, ${toUser.name}</h3>
    <p>Вы получили это письмо, так как кто-то запросил смену пароля на F1blog.ru</p>
    <p>Для смены пароля пройдите по ссылке: <a target="_" href="${config.domain}/users/${hash}/reset-password">${config.domain}/reset-password </a></p>
    <p>Если вы не запрашивали смену пароля, можете проигнорировать это письмо.</p>
    `,
  };

  transporter.sendMail(message, (error, info) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, info);
    }
  });
};
