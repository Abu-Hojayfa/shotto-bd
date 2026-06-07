import nodemailer from 'nodemailer';

// ── Transporter ────────────────────────────────────────────────────────────────
// Uses Gmail SMTP with an App Password (not your real Gmail password).
// To generate an App Password:
//   myaccount.google.com → Security → 2-Step Verification → App Passwords
const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST  || 'smtp.gmail.com',
  port:   parseInt(process.env.EMAIL_PORT || '587', 10),
  secure: false, // true for port 465, false for 587 (STARTTLS)
  auth: {
    user: process.env.EMAIL_USER || '',
    pass: process.env.EMAIL_PASS || '',
  },
});

// ── Password Reset Email ────────────────────────────────────────────────────────
export const sendPasswordResetEmail = async (
  toEmail: string,
  resetUrl: string
): Promise<void> => {
  const from = process.env.EMAIL_FROM || `"Shotto BD" <${process.env.EMAIL_USER}>`;

  await transporter.sendMail({
    from,
    to: toEmail,
    subject: 'Shotto BD — Password Reset Request',
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Reset Your Password</title>
</head>
<body style="margin:0;padding:0;background:#0f172a;font-family:'Segoe UI',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0f172a;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" style="max-width:520px;background:#1e293b;border-radius:16px;overflow:hidden;border:1px solid #334155;">
          <!-- Header -->
          <tr>
            <td align="center" style="padding:36px 40px 24px;background:linear-gradient(135deg,#1e293b,#0f172a);">
              <div style="font-size:32px;margin-bottom:8px;">🛡️</div>
              <div style="font-size:24px;font-weight:700;color:#f1f5f9;letter-spacing:-0.5px;">Shotto BD</div>
              <div style="font-size:12px;color:#64748b;margin-top:4px;">সত্য প্রকাশ করুন</div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              <h2 style="color:#f1f5f9;font-size:20px;font-weight:700;margin:0 0 12px;">Reset Your Password</h2>
              <p style="color:#94a3b8;font-size:14px;line-height:1.7;margin:0 0 24px;">
                We received a request to reset the password for your Shotto BD account
                associated with <strong style="color:#f1f5f9;">${toEmail}</strong>.
              </p>
              <p style="color:#94a3b8;font-size:14px;line-height:1.7;margin:0 0 28px;">
                Click the button below to set a new password. This link is valid for
                <strong style="color:#f1f5f9;">10 minutes</strong>.
              </p>
              <!-- CTA Button -->
              <div style="text-align:center;margin-bottom:28px;">
                <a href="${resetUrl}"
                   style="display:inline-block;background:#6366f1;color:#ffffff;font-size:15px;font-weight:700;
                          padding:14px 36px;border-radius:10px;text-decoration:none;letter-spacing:0.3px;">
                  Reset Password
                </a>
              </div>
              <!-- Security note -->
              <div style="background:#0f172a;border:1px solid #334155;border-radius:10px;padding:16px 20px;">
                <p style="color:#64748b;font-size:12px;margin:0;line-height:1.6;">
                  🔒 If you did not request a password reset, you can safely ignore this email.
                  Your password will remain unchanged.<br/><br/>
                  If the button above doesn't work, copy and paste this URL into your browser:<br/>
                  <span style="color:#6366f1;word-break:break-all;">${resetUrl}</span>
                </p>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding:20px 40px 32px;border-top:1px solid #1e293b;">
              <p style="color:#334155;font-size:11px;margin:0;">
                © ${new Date().getFullYear()} Shotto BD · Bangladesh Government Transparency Platform
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    text: `Reset your Shotto BD password\n\nClick this link to reset your password (valid 10 minutes):\n${resetUrl}\n\nIf you did not request this, ignore this email.\n`,
  });
};
