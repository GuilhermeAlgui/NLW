const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
import path from 'path';


const {host,post,user,pass} = require('../config/mailer.json');

const transport = nodemailer.createTransport({
    host: host,
    port: post,
    auth: {
      user: user,
      pass: pass
    }
  });

  transport.use('compile',hbs({
      viewEngine: 'handlebars',
      viewPath:path.resolve('./src/resources/mail'),
      extName: '.html'
  }))


  module.exports= transport;