// server/services/emailService.js
// Live Email Notification Service for DivyaBharat
const nodemailer = require('nodemailer');

// Create reusable transporter object using SMTP transport
const getTransporter = () => {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT, 10) || 587;
  const secure = process.env.SMTP_SECURE === 'true' || port === 465;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    return null; // SMTP credentials not configured
  }

  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    tls: {
      rejectUnauthorized: false
    }
  });
};

/**
 * Send an email safely with fallback logging
 */
const sendMailSafe = async ({ to, subject, html, text }) => {
  const from = process.env.EMAIL_FROM || '"DivyaBharat Heritage" <noreply@divyabharat.in>';

  try {
    const transporter = getTransporter();

    if (!transporter) {
      console.log(`\n📧 [EMAIL SERVICE - DEV/FALLBACK LOG]`);
      console.log(`To: ${to}`);
      console.log(`Subject: ${subject}`);
      console.log(`Content:\n${text || 'HTML Email Body'}`);
      console.log(`------------------------------------\n`);
      return { success: true, delivered: false, simulated: true };
    }

    const info = await transporter.sendMail({
      from,
      to,
      subject,
      text: text || '',
      html: html || ''
    });

    console.log(`✅ [EMAIL SENT] MessageId: ${info.messageId} to ${to}`);
    return { success: true, delivered: true, messageId: info.messageId };
  } catch (error) {
    console.error(`⚠️ [EMAIL SERVICE WARNING] Failed to deliver email to ${to}:`, error.message);
    // Graceful return, never throw
    return { success: false, delivered: false, error: error.message };
  }
};

/**
 * 1. Send Welcome Email upon Registration
 */
exports.sendWelcomeEmail = async (user) => {
  const subject = 'Welcome to DivyaBharat — India Temple Heritage & Knowledge Application 🪷';
  const text = `Namaste ${user.name},\n\nWelcome to DivyaBharat! Your sacred account has been successfully created.\n\nYou can now explore India's timeless temples, sacred monuments, cultural heritage, and spiritual wisdom.\n\nWebsite: ${process.env.CLIENT_URL || 'http://localhost:3000'}\n\nRooted in Culture, United in Spirit.\n- DivyaBharat Team`;

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FFFDF9; border: 1px solid #EAD8C7; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 15px rgba(180, 83, 9, 0.08);">
      <div style="background: linear-gradient(135deg, #B45309 0%, #D97706 100%); padding: 30px 20px; text-align: center; color: #FFFFFF;">
        <div style="font-size: 38px; line-height: 1; margin-bottom: 8px;">ॐ</div>
        <h1 style="margin: 0; font-size: 26px; font-weight: 700; letter-spacing: 1px;">DivyaBharat</h1>
        <p style="margin: 6px 0 0 0; font-size: 14px; opacity: 0.9;">India Temple Heritage & Knowledge Portal</p>
      </div>
      <div style="padding: 30px 25px; color: #4B2E1E; line-height: 1.6;">
        <h2 style="color: #92400E; margin-top: 0; font-size: 20px;">Namaste ${user.name},</h2>
        <p>Welcome to <strong>DivyaBharat</strong>! Your sacred journey into India's majestic temple architecture, historical monuments, traditional art forms, and spiritual traditions begins now.</p>
        <div style="background-color: #FDF3ED; border-left: 4px solid #D97706; padding: 14px 18px; margin: 20px 0; border-radius: 0 8px 8px 0;">
          <p style="margin: 0; font-size: 14px; color: #78350F;">
            <strong>Registered Email:</strong> ${user.email}<br/>
            <strong>Platform:</strong> Web Browser (PWA) & Android Mobile Application
          </p>
        </div>
        <p>Explore thousands of years of sacred Indian history, take heritage quizzes, and bookmark revered shrines across Bharat.</p>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}/home" style="display: inline-block; background: linear-gradient(135deg, #B45309, #D97706); color: #FFFFFF; text-decoration: none; padding: 12px 28px; border-radius: 30px; font-weight: 600; font-size: 15px; box-shadow: 0 4px 10px rgba(180,83,9,0.25);">Explore Heritage Now →</a>
        </div>
        <hr style="border: none; border-top: 1px solid #EAD8C7; margin: 25px 0;" />
        <p style="font-size: 12px; color: #8C6D58; text-align: center; margin: 0;">
          Rooted in Culture, United in Spirit • DivyaBharat<br/>
          If you did not create this account, please disregard this email.
        </p>
      </div>
    </div>
  `;

  return sendMailSafe({ to: user.email, subject, text, html });
};

/**
 * 2. Send Login Alert Notification
 */
exports.sendLoginAlert = async (user, meta = {}) => {
  const ip = meta.ip || 'Unknown';
  const time = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const subject = 'Security Alert: New Login to your DivyaBharat Account 🔔';
  const text = `Namaste ${user.name},\n\nA new login was detected on your DivyaBharat account.\nDate & Time: ${time} IST\nIP Address: ${ip}\n\nIf this was you, no action is needed.\nIf you did not log in, please reset your password immediately at ${process.env.CLIENT_URL || 'http://localhost:3000'}.\n\n- DivyaBharat Security Team`;

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FFFDF9; border: 1px solid #EAD8C7; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #92400E 0%, #B45309 100%); padding: 22px 20px; text-align: center; color: #FFFFFF;">
        <div style="font-size: 32px; line-height: 1; margin-bottom: 6px;">ॐ</div>
        <h2 style="margin: 0; font-size: 22px;">DivyaBharat Security Notification</h2>
      </div>
      <div style="padding: 25px; color: #4B2E1E; line-height: 1.6;">
        <p style="font-size: 16px; margin-top: 0;">Namaste <strong>${user.name}</strong>,</p>
        <p>A new login to your DivyaBharat account was recorded:</p>
        <div style="background-color: #FDF3ED; border: 1px solid #EAD8C7; padding: 15px; border-radius: 8px; margin: 18px 0; font-size: 14px;">
          <div><strong>Account:</strong> ${user.email}</div>
          <div style="margin-top: 4px;"><strong>Date & Time:</strong> ${time} (IST)</div>
          <div style="margin-top: 4px;"><strong>IP Address:</strong> ${ip}</div>
        </div>
        <p style="font-size: 13px; color: #78350F;">
          If this was you, no further action is required. If you did not recognize this login activity, please reset your password immediately.
        </p>
        <hr style="border: none; border-top: 1px solid #EAD8C7; margin: 20px 0;" />
        <p style="font-size: 12px; color: #8C6D58; text-align: center; margin: 0;">
          DivyaBharat Heritage & Knowledge Portal • Security Notifications
        </p>
      </div>
    </div>
  `;

  return sendMailSafe({ to: user.email, subject, text, html });
};

/**
 * 3. Send Password Reset OTP Email
 */
exports.sendPasswordResetOtp = async (user, otp) => {
  const subject = 'DivyaBharat Password Reset Verification Code: ' + otp;
  const text = `Namaste ${user.name},\n\nYour 6-digit DivyaBharat password reset OTP is:\n\n${otp}\n\nThis code will expire in 15 minutes.\nDo not share this code with anyone.\n\n- DivyaBharat Team`;

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FFFDF9; border: 1px solid #EAD8C7; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #B45309 0%, #D97706 100%); padding: 25px 20px; text-align: center; color: #FFFFFF;">
        <div style="font-size: 36px; line-height: 1; margin-bottom: 8px;">ॐ</div>
        <h2 style="margin: 0; font-size: 24px; font-weight: 700;">Password Recovery</h2>
        <p style="margin: 4px 0 0 0; font-size: 13px; opacity: 0.9;">DivyaBharat Heritage Application</p>
      </div>
      <div style="padding: 30px 25px; color: #4B2E1E; line-height: 1.6; text-align: center;">
        <p style="font-size: 16px; margin-top: 0;">Namaste <strong>${user.name}</strong>,</p>
        <p>You requested to reset your DivyaBharat application password. Use the following One-Time Password (OTP) to complete the reset:</p>
        <div style="display: inline-block; background-color: #FDF3ED; border: 2px dashed #D97706; padding: 14px 32px; border-radius: 12px; margin: 20px auto;">
          <span style="font-size: 32px; font-weight: 800; letter-spacing: 8px; color: #92400E; font-family: monospace;">${otp}</span>
        </div>
        <p style="font-size: 13px; color: #78350F; margin-top: 15px;">
          ⏱️ This OTP code is valid for <strong>15 minutes</strong>.
        </p>
        <div style="background-color: #FFF3CD; border: 1px solid #FFEBAA; border-radius: 8px; padding: 12px; font-size: 13px; color: #856404; text-align: left; margin: 20px 0;">
          <strong>Security Note:</strong> Never share this verification code with anyone. DivyaBharat administrators will never ask for your password or OTP.
        </div>
        <hr style="border: none; border-top: 1px solid #EAD8C7; margin: 25px 0;" />
        <p style="font-size: 12px; color: #8C6D58; margin: 0;">
          If you did not request a password reset, you can safely ignore this email. Your password will remain unchanged.
        </p>
      </div>
    </div>
  `;

  return sendMailSafe({ to: user.email, subject, text, html });
};

/**
 * 4. Send Password Reset Success Notification
 */
exports.sendPasswordResetSuccess = async (user) => {
  const subject = 'Your DivyaBharat Password Was Successfully Changed ✅';
  const text = `Namaste ${user.name},\n\nYour DivyaBharat application password was successfully changed.\n\nIf you performed this action, no further steps are needed.\nIf you did not authorize this change, please contact support immediately.\n\n- DivyaBharat Team`;

  const html = `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background-color: #FFFDF9; border: 1px solid #EAD8C7; border-radius: 12px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #15803D 0%, #16A34A 100%); padding: 22px 20px; text-align: center; color: #FFFFFF;">
        <div style="font-size: 32px; line-height: 1; margin-bottom: 6px;">ॐ</div>
        <h2 style="margin: 0; font-size: 22px;">Password Changed Successfully</h2>
      </div>
      <div style="padding: 25px; color: #4B2E1E; line-height: 1.6;">
        <p style="font-size: 16px; margin-top: 0;">Namaste <strong>${user.name}</strong>,</p>
        <p>This email confirms that your password for <strong>${user.email}</strong> has been successfully updated.</p>
        <p>You can now log in to the DivyaBharat web portal or Android mobile application using your new password.</p>
        <hr style="border: none; border-top: 1px solid #EAD8C7; margin: 20px 0;" />
        <p style="font-size: 12px; color: #8C6D58; text-align: center; margin: 0;">
          DivyaBharat Heritage Application • Account Security
        </p>
      </div>
    </div>
  `;

  return sendMailSafe({ to: user.email, subject, text, html });
};
