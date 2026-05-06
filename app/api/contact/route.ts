// import { Resend } from "resend";
// import { NextResponse } from "next/server";

// const resend = new Resend(process.env.RESEND_API_KEY);

// export async function POST(req: Request) {
//   try {
//     const { name, email, phone, message, to } = await req.json();

//     if (!name || !email || !message) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     await resend.emails.send({
//       from: "Portfolio Contact <onboarding@resend.dev>",
//       to,
//       replyTo: email,
//       subject: `New message from ${name}`,
//       html: `
//         <div style="font-family: monospace; max-width: 560px; padding: 32px; background: #f5f0e8; color: #1a1209;">
//           <h2 style="margin: 0 0 24px; font-size: 1.4rem; letter-spacing: -0.02em;">
//             New contact form submission
//           </h2>

//           <table style="width: 100%; border-collapse: collapse;">
//             <tr>
//               <td style="padding: 10px 0; border-bottom: 1px solid #c9bfad; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: #7a6e5f; width: 100px;">
//                 Name
//               </td>
//               <td style="padding: 10px 0; border-bottom: 1px solid #c9bfad; font-size: 0.9rem;">
//                 ${name}
//               </td>
//             </tr>
//             <tr>
//               <td style="padding: 10px 0; border-bottom: 1px solid #c9bfad; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: #7a6e5f;">
//                 Email
//               </td>
//               <td style="padding: 10px 0; border-bottom: 1px solid #c9bfad; font-size: 0.9rem;">
//                 <a href="mailto:${email}" style="color: #c8502a;">${email}</a>
//               </td>
//             </tr>
//             ${phone ? `
//             <tr>
//               <td style="padding: 10px 0; border-bottom: 1px solid #c9bfad; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: #7a6e5f;">
//                 Phone
//               </td>
//               <td style="padding: 10px 0; border-bottom: 1px solid #c9bfad; font-size: 0.9rem;">
//                 ${phone}
//               </td>
//             </tr>
//             ` : ""}
//             <tr>
//               <td style="padding: 10px 0; font-size: 0.75rem; letter-spacing: 0.1em; text-transform: uppercase; color: #7a6e5f; vertical-align: top;">
//                 Message
//               </td>
//               <td style="padding: 10px 0; font-size: 0.9rem; line-height: 1.7;">
//                 ${message.replace(/\n/g, "<br/>")}
//               </td>
//             </tr>
//           </table>

//           <p style="margin-top: 32px; font-size: 0.7rem; letter-spacing: 0.08em; text-transform: uppercase; color: #7a6e5f;">
//             Sent via martinmanjoro.vercel.app
//           </p>
//         </div>
//       `,
//     });

//     return NextResponse.json({ success: true });
//   } catch (err) {
//     console.error("Contact form error:", err);
//     return NextResponse.json(
//       { error: "Failed to send email" },
//       { status: 500 }
//     );
//   }
// }
