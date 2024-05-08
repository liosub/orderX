const formData = require('form-data');
const nodemailer = require('nodemailer');

export async function sendMail(recepient:string,text:string){
	const transporter = nodemailer.createTransport({
		host: 'smtp-mail.outlook.com',
		port: 587,
		secure: false, // use SSL
		auth: {
		  user: 'mlio6070@outlook.com',
		  pass: 'vzaggvwLrsZwC4s',
		}
	  });
	
	const mailOptions = {
	  from: 'mlio6070@outlook.com',
	  to: recepient,
	  subject: 'Payment Mail',
	  text: text+"LOL",
	};
	
	// Send the email
	transporter.sendMail(mailOptions, (error:any, info:any) => {
	  if (error) {
		console.error('Error sending email:', error);
	  } else {
		console.log('Email sent:', info.response);
	  }
	});
}
