import nodemailer from 'nodemailer';

export const sendMailToUser = (recieverEmail, subject, text, htmlBody) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: "amitkumar8017392@gmail.com", // generated ethereal user
            pass: "nozzpwsmrzqnqnui", // generated ethereal password
        },
    });

    const info = {
        from: '"Pijja.com 🍕" <amitkumar8017392@gmail.com>', // sender address
        to: `${recieverEmail}`, // list of receivers
        subject: `${subject}`, // Subject line
        text: `${text}`, // plain text body
        html: `${htmlBody}`,
    };

    transporter.sendMail(info)
}

// const transporter = nodemailer.createTransport({
//     service: 'gmail',
//     port: 587,
//     secure: false, // true for 465, false for other ports
//     auth: {
//         user: "amitkumar8017392@gmail.com", // generated ethereal user
//         pass: "edxgatvevmhftqvq", // generated ethereal password
//     },
// });

// const info = {
//     from: '"Pijja.com 🍕" <amitkumar8017392@gmail.com>', // sender address
//     to: "maahiamit777@gmail.com", // list of receivers
//     subject: "Congratulation 😃😃", // Subject line
//     text: "🍕 Thanks for signing up to our website . We will ensure you to give a great experience", // plain text body
//     html: "<div><h2 style='text-align:center;'>Thanks for signing up to </h2> <br/> <h1 style='color:#fc8019;text-align:center;'>Pijja.com</h1> <br/> <h3 style='text-align:center;'>We will ensure you to give a great experience</h3></div>", // html body
// };

// transporter.sendMail(info);

