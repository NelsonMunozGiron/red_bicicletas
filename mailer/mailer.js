const nodemailer=require('nodemailer');

const mailConfig={
    host: 'smtp.ethereal.email',
    port: 587,
    auth:{
        user:'tod.kovacek19@ethereal.email',
        pass:'MUtnqp1kURBzWsjChQ'
    }
};

module.exports=nodemailer.createTransport(mailConfig);