const hbs = require("nodemailer-express-handlebars");
const nodemailer = require("nodemailer");
const path = require("path");
require('dotenv').config()

// Create a reusable transporter with Gmail SMTP
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.email,
    pass: process.env.password,
  },
});

// Configure Handlebars for email templates
const handlebarOptions = {
  viewEngine: {
    partialsDir: path.resolve("./views/"),
    defaultLayout: false,
  },
  viewPath: path.resolve("./views/"),
};

transporter.use("compile", hbs(handlebarOptions));

// Define a function to send an email
function sendEmail(recipient, subject, template, context) {
  const mailOptions = {
    from: '"Udit" rajat@gmail.com',
    to: recipient,
    subject: subject,
    template: template,
    context: context,
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.error("Error sending email:", error);
    } else {
      console.log("Message sent:", info.response);
    }
  });
}

// Example usage:
const recipientEmail = "roshanshaji2002@gmail.com";
const emailSubject = "Welcome!";
const emailTemplate = "email";
const emailContext = {
  name: "Sam",
  company: "My Company",
};

sendEmail(recipientEmail, emailSubject, emailTemplate, emailContext);
