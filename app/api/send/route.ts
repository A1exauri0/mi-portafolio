import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { nombre, email, asunto, mensaje } = await req.json();

    // Validar datos mínimos
    if (!nombre || !email || !mensaje) {
        return NextResponse.json({ error: 'Faltan campos obligatorios' }, { status: 400 });
    }

    const { data, error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: [process.env.CONTACT_EMAIL || 'tucorreo@ejemplo.com'],
      subject: `Nuevo mensaje de ${nombre}: ${asunto}`,
      replyTo: email,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #ffffff; color: #333; border: 1px solid #eaeaea; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">
          <div style="background-color: #a855f7; padding: 30px 20px; text-align: center;">
            <h1 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -1px; text-transform: uppercase;">Nuevo Mensaje</h1>
          </div>
          <div style="padding: 30px;">
            <p style="margin-bottom: 25px; font-size: 16px; line-height: 1.6;">Has recibido un nuevo contacto desde tu portafolio web. Aquí están los detalles:</p>
            
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; width: 120px; font-weight: bold; color: #666;">Nombre:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${nombre}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #666;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;"><a href="mailto:${email}" style="color: #a855f7; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: bold; color: #666;">Asunto:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0;">${asunto}</td>
              </tr>
            </table>

            <div style="margin-top: 30px; padding: 20px; background-color: #f9f9f9; border-radius: 8px; border-left: 4px solid #a855f7;">
              <p style="margin: 0 0 10px 0; font-weight: bold; color: #333;">Mensaje:</p>
              <p style="margin: 0; line-height: 1.6; color: #555; white-space: pre-wrap;">${mensaje}</p>
            </div>

            <div style="margin-top: 40px; text-align: center;">
              <a href="mailto:${email}" style="display: inline-block; padding: 14px 28px; background-color: #a855f7; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 14px; transition: background-color 0.3s ease;">Responder</a>
            </div>
          </div>
          <div style="padding: 20px; background-color: #f7f7f7; text-align: center; font-size: 12px; color: #999; border-top: 1px solid #eaeaea;">
            <p style="margin: 0;">Este correo fue generado automáticamente por tu sistema de contacto.</p>
          </div>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message || "Error en Resend" }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
