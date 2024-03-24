import nodemailer from 'nodemailer'

//? app name: youtube-app
//? app password: hejsngjenhdnladj
const sendMail = (to, subject, text) => {
    // nodemailer
    let configMail = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: "duynguyen.workspace@gmail.com",
            pass: "hejsngjenhdnladj"
        }
    })

    configMail.sendMail({
        from: "duynguyen.workspace@gmail.com",
        to,
        subject,
        text
    }, (err, info) => {
        console.log("error: ", err)
        console.log("info: ", info)
    })
}

export default sendMail