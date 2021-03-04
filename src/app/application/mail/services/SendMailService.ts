import fs from 'fs'
import handlebars from 'handlebars'
import nodemailer, { Transporter } from 'nodemailer'

class SendMailService {
  private client: Transporter

  constructor() {
    nodemailer.createTestAccount().then((account) => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      })

      this.client = transporter
    })
  }

  public async execute(
    to: string,
    subject: string,
    // eslint-disable-next-line @typescript-eslint/ban-types
    variables: object,
    path: string
  ) {
    const templateFileContet = fs.readFileSync(path).toString('utf8')

    const mailTemplateParse = handlebars.compile(templateFileContet)

    const html = mailTemplateParse(variables)

    const message = await this.client.sendMail({
      to,
      subject,
      html,
      from: 'NPS <noreplay@nps.com.br>',
    })

    console.log('Message sent: %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}

export default new SendMailService()
