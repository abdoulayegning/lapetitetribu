import { Resend } from 'resend';

const resend = new Resend(import.meta.env.VITE_RESEND_API_KEY);

export async function SendMessage () {

  const { data, error } = await resend.emails.send({
    from: 'Acme <onboarding@resend.dev>',
    to: ['abdoulaye@lapetitetribu.co'],
    subject: 'Hello World',
    html: '<strong>It works!</strong>',
  })

  if (error) {
    return console.error({ error });
  }

  console.log({ data });

}
