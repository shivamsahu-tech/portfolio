import mailjet from 'node-mailjet';

export default async function sendEmail({ email, comment }) {
  try {
    const apiKey = process.env.MAILJET_API_KEY;
    const apiSecret = process.env.MAILJET_SECRET_KEY;
    const portfolio_url = process.env.PORTFOLIO_URL
    const client = mailjet.apiConnect(apiKey, apiSecret);

    const request = await client
      .post('send', { version: 'v3.1' })
      .request({
        Messages: [
          {
            From: {
              Email: 'shivamsahu2635@gmail.com',
              Name: 'Shivam Sahu Portfolio'
            },
            To: [
              {
                Email: email,
              }
            ],
            Subject: 'Thank you for your comment!',
            HTMLPart: `
              <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 4px 6px rgba(0,0,0,0.1); border-radius: 8px; padding: 32px; font-family: Arial, sans-serif;">
                <h2 style="font-size: 28px; font-weight: bold; text-align: center; color: #1f2937; margin-bottom: 16px;">Thank You for Your Comment!</h2>
                
                <p style="text-align: center; color: #6b7280; font-size: 16px; margin-bottom: 24px;">
                  I appreciate you taking the time to reach out. Here's a copy of your comment for your records:
                </p>
                
                <div style="margin: 24px 0; padding: 20px; background-color: #f9fafb; border-left: 4px solid #3b82f6; border-radius: 6px;">
                  <p style="color: #374151; font-size: 15px; line-height: 1.6; margin: 0; white-space: pre-wrap;">${comment}</p>
                </div>
                
                <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 24px 0;">
                  I'll get back to you as soon as possible!
                </p>
                
                <div style="margin-top: 32px; text-align: center;">
                  <a href="https://quickcapture.vercel.app" style="background-color: #3b82f6; color: white; padding: 12px 32px; border-radius: 6px; font-weight: 600; text-decoration: none; display: inline-block; font-size: 16px;">Visit Portfolio</a>
                </div>
                
                <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 32px 0;">
                
                <p style="color: #9ca3af; font-size: 12px; text-align: center; margin: 0;">
                  This is an automated confirmation email. Please do not reply to this email.
                </p>
                <p style="color: #9ca3af; font-size: 12px; text-align: center; margin-top: 8px;">
                  &copy; 2024 Shivam Sahu. All rights reserved.
                </p>
              </div>
            `,
          }
        ]
      });

    console.log('Email sent successfully');
    return { success: true };
  } catch (error) {
    console.error('Error sending email:', error.statusCode, error.message);
    return { success: false, error: error.message };
  }
}

// // Test
// sendEmail({ 
//   email: "shivamsahu2624@gmail.com", 
//   comment: "Hi Shivam! I really enjoyed your portfolio. Would love to connect!" 
// });