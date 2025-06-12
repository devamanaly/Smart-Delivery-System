import nodemailer, { Transporter, SentMessageInfo } from "nodemailer";

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

class EmailService {
  static sendEmailToDeliveryGuy(email: string, name: string) {
    throw new Error("Method not implemented.");
  }
  private transporter: Transporter<SentMessageInfo>;
  constructor(transporterOptions?: nodemailer.TransportOptions) {
    this.transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE || "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async sendEmail(options: EmailOptions): Promise<void> {
    try {
      await this.transporter.sendMail({
        from: `"Smart Delivery System" <${process.env.EMAIL_USER}>`,
        to: options.to,
        subject: options.subject,
        html: options.html,
      });
      console.log("Email sent successfully");
    } catch (error) {
      console.error("Error sending email:", error);
      throw error;
    }
  }

  async sendEmailToMerchant(
    email: string,
    merchantName: string
  ): Promise<void> {
    const subject = "Welcome to Our Platform - Merchant Registration";
    const html = `
      <div>
        <h2>Welcome, ${merchantName}!</h2>
        <p>Your merchant account has been successfully registered.</p>
        <p>You can now start adding your products and services to our platform.</p>
        <p>If you have any questions, please contact our support team.</p>
      </div>
    `;

    await this.sendEmail({ to: email, subject, html });
  }
  async sendEmailToDeliveryGuy(email: string, name: string): Promise<void> {
    const subject = 'Welcome to Our Delivery Team';
    const html = `
      <div>
        <h2>Welcome, ${name}!</h2>
        <p>Your delivery partner account has been successfully registered.</p>
        <p>You can now start accepting delivery requests.</p>
        <p>Please complete your profile and upload required documents to get started.</p>
      </div>
    `;

    await this.sendEmail({ to: email, subject, html });
  }
  async sendEmailOnOrderCreation( receiverEmail:string,name: string, trackingNumber: string): Promise<void> {
    const subject = `Your Order Has Been Created - Tracking #${trackingNumber}`;
    const html = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Order Confirmation</title>
        <style>
            body {
                font-family: 'Arial', sans-serif;
                line-height: 1.6;
                color: #333;
                max-width: 600px;
                margin: 0 auto;
                padding: 20px;
            }
            .header {
                background-color: #f8f8f8;
                padding: 20px;
                text-align: center;
                border-radius: 5px 5px 0 0;
            }
            .content {
                padding: 20px;
                background-color: #fff;
                border-left: 1px solid #eee;
                border-right: 1px solid #eee;
            }
            .footer {
                padding: 20px;
                text-align: center;
                background-color: #f8f8f8;
                border-radius: 0 0 5px 5px;
                font-size: 12px;
                color: #777;
            }
            .tracking-box {
                background-color: #f0f7ff;
                border: 1px solid #d0e3ff;
                padding: 15px;
                border-radius: 5px;
                margin: 20px 0;
                text-align: center;
            }
            .tracking-number {
                font-size: 18px;
                font-weight: bold;
                color: #0066cc;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #0066cc;
                color: white !important;
                text-decoration: none;
                border-radius: 5px;
                margin: 15px 0;
            }
        </style>
    </head>
    <body>
        <div class="header">
            <h2>Thank You For Your Order, ${name}!</h2>
        </div>
        
        <div class="content">
            <p>We're excited to let you know that your order has been successfully created and is being processed.</p>
            
            <div class="tracking-box">
                <p>Your tracking number is:</p>
                <p class="tracking-number">${trackingNumber}</p>
                <p>You can use this number to track your package.</p>
            </div>
            
            <p>Here's what happens next:</p>
            <ol>
                <li>Your order is being prepared for shipment</li>
                <li>You'll receive another email when your package ships</li>
                <li>Tracking information will be updated as your package moves</li>
            </ol>
            
            <p>If you have any questions about your order, please reply to this email or contact our support team.</p>
            
            <p style="text-align: center;">
                <a href="[YOUR_TRACKING_PAGE_URL]?tracking=${trackingNumber}" class="button">Track Your Order</a>
            </p>
        </div>
        
        <div class="footer">
            <p>© ${new Date().getFullYear()} [Your Company Name]. All rights reserved.</p>
            <p>[Your Company Address]</p>
            <p>
                <a href="[YOUR_WEBSITE_URL]">Website</a> | 
                <a href="[YOUR_CONTACT_URL]">Contact Us</a> | 
                <a href="[YOUR_PRIVACY_POLICY_URL]">Privacy Policy</a>
            </p>
        </div>
    </body>
    </html>
    `;
    await this.sendEmail({ to: receiverEmail, subject, html });

    // Add your email sending logic here
}

}




export default new EmailService();