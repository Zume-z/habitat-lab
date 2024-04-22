import { z } from 'zod'
import nodemailer from 'nodemailer'
import { Formidable } from 'formidable'
import type { Fields } from 'formidable'
import { firstValues } from '@/utils/getfirstValues'
import type { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    bodyParser: false,
  },
}

const formSchema = z.object({
  firstName: z.string().nonempty(),
  lastName: z.string().optional(),
  email: z.string().email(),
  phone: z.string().optional(),
  timeFrame: z.string(),
  message: z.string(),
  budget: z.string().optional(),
})

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const form = new Formidable()

  try {
    const fields: Fields = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields) => {
        if (err) reject(err)
        resolve(fields)
      })
    })

    const parse = formSchema.safeParse(firstValues(fields))
    if (!parse.success) {
      return res.status(400).json({ error: parse.error.errors })
    }

    await sendContactEmail({
      username: process.env.NEXT_PUBLIC_EMAIL_USERNAME as string,
      password: process.env.NEXT_PUBLIC_EMAIL_APP_PASSWORD as string,
      myEmail: process.env.NEXT_PUBLIC_PERSONAL_EMAIL as string,
      formData: parse.data,
    })

    res.status(200).json({ message: 'Email sent successfully.' })
  } catch (error) {
    res.status(500).json({ error: error || 'An error occurred.' })
  }
}

interface SendEmailProps {
  username: string
  password: string
  myEmail: string
  formData: z.infer<typeof formSchema>
}

async function sendContactEmail({ username, password, myEmail, formData }: SendEmailProps) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: { user: username, pass: password },
  })

  const { firstName, lastName, email, phone, timeFrame, message, budget } = formData

  try {
    const mailOptions = {
      from: username,
      to: myEmail,
      subject: `Contact Form Enquiry ${email}`,
      text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nPhone: ${phone}\nTime Frame: ${timeFrame}\nBudget: ${budget}\nMessage: ${message}`,
    }

    await transporter.sendMail(mailOptions)
  } catch (error) {
    throw new Error('Failed to send email.')
  }
}
