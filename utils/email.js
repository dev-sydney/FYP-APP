const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');

const emailTemplate = require('./../utils/getEmailTemplate');

module.exports = class Email {
  constructor(user, url) {
    this.to = user.emailAddress;
    this.firstName = user.otherNames.split(' ')[0];
    this.url = url;
    this.from = `Syd from trn-up ${process.env.MAIL_FROM}`;
  }
  /**
   *
   * @returns an email transport object
   */
  newTransport() {
    if (process.env.NODE_ENV === 'production') {
      //production email service
    } else {
      return nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASS,
        },
      });
    }
  }

  async send(subject, action, ...emailContent) {
    //TODO: Get the HTML Template for email
    const html = emailTemplate(
      subject,
      this.firstName,
      this.url,
      action,
      emailContent[0],
      emailContent[1]
    );

    //TODO: Set the email options
    const emailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.htmlToText(html),
    };

    //TODO: Create a transport and send the mail
    await this.newTransport().sendMail(emailOptions);
  }

  async sendPasswordResetMail() {
    let firstParagraph = `Forgot your password? submit a PATCH request with your new password and passwordConfirm to: ${this.url}`;
    await this.send(
      'You have only 10 minutes !',
      'Reset your password',
      firstParagraph
    );
  }
};
