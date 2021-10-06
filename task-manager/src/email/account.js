// const sgMail = require("sendgrid");

// const sendgridAPIKey =
//   "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";

// sgMail.setApiKey(sendgridAPIKey);
// sgMail.send({
//   to: "gunjan.it.engg@gmail.com",
//   from: "gunjan.it.engg@gmail.com",
//   subject: "This is from sendgrid",
//   text: "I hope this is actually get to you",
// });

// e3d3b181bc5fa569b1423bf49a63c135-443ec20e-e1134b8f
const nodemailMailgun = require("nodemailer-mailgun-transport");
const nodemailer = require("nodemailer");

//CURRENTLY USING
// const domain = "sandbox154d995df2af4b2884caa517f53999af.mailgun.org";
// const api_key = "e3d3b181bc5fa569b1423bf49a63c135-443ec20e-e1134b8f";

// const domain = "sandbox2c33e84cb265439084e7d1db2ab3a764.mailgun.org";
// const api_key = "3ebeb86c27242adafbee7b7c0b4f7bc5-90346a2d-060a6374";

const auth = {
  auth: {
    api_key: process.env.API_KEY,
    domain: process.env.DOMAIN,
  },
};

let transporter = nodemailer.createTransport(nodemailMailgun(auth));
const mailOption = {
  from: "gunjan.it.engg@gmail.com",
  to: "aswaniusha13@gmail.com",
  subject: "Sending a mail online",
  text: "another test",
};

transporter.sendMail(mailOption, (err, data) => {
  if (err) {
    console.log("You have an error ", err);
  } else {
    console.log(data);
  }
});

// module.exports = { transporter };
