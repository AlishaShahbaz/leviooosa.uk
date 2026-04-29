import { NextResponse } from "next/server";
import dbConnect from "../../../lib/dbConnect";
import Order from "../../../models/Order";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    await dbConnect();
    const body = await req.json();

    // 1. Order save karein DB mein (Ye sabse pehle hona chahiye)
    const newOrder = await Order.create(body);

    // 2. Nodemailer Transporter Setup
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "ascot.coinfo@gmail.com", 
        pass: "ygcprfpxxvggsuvg", // App Password perfectly placed
      },
    });

    // 3. Email Content
    const mailOptions = {
      // "from" hamesha auth user wala email hona chahiye
      from: '"Levioosa Orders" <ascot.coinfo@gmail.com>', 
      to: "ascot.coinfo@gmail.com", 
      subject: `🚀 New Order Received - ID: ${newOrder._id.toString().slice(-6)}`,
      html: `
        <div style="font-family: 'Helvetica', sans-serif; background: #0a0a0a; color: white; padding: 30px; border-radius: 15px; border: 1px solid #333; max-width: 600px; margin: auto;">
          <h1 style="color: #ff4d00; text-align: center; letter-spacing: 2px; text-transform: uppercase;">Levioosa.uk</h1>
          <h2 style="border-bottom: 1px solid #333; padding-bottom: 10px; font-style: italic;">New Order Alert!</h2>
          
          <div style="margin: 20px 0; font-size: 14px; line-height: 1.6;">
            <p><strong>Customer:</strong> ${body.customerInfo.name}</p>
            <p><strong>Email:</strong> ${body.customerInfo.email}</p>
            <p><strong>Total Amount:</strong> <span style="color: #ff4d00; font-weight: bold;">Rs.${body.totalAmount}</span></p>
            <p><strong>Payment Method:</strong> ${body.paymentMethod}</p>
          </div>

          <hr style="border: 0; border-top: 1px solid #333;" />
          
          <h3 style="color: #ff4d00; text-transform: uppercase; font-size: 12px; letter-spacing: 1px;">Order Details:</h3>
          <ul style="padding: 0; list-style: none;">
            ${body.items.map(item => `
              <li style="padding: 12px 0; border-bottom: 1px solid #1a1a1a; display: flex; justify-content: space-between;">
                <div>
                  <span style="font-weight: bold; text-transform: uppercase; font-size: 13px;">${item.title}</span><br/>
                  <span style="color: #888; font-size: 11px;">Size: ${item.size} | Qty: ${item.quantity}</span>
                </div>
                <div style="color: #ff4d00; font-weight: bold; margin-left: auto;">Rs.${item.price}</div>
              </li>
            `).join('')}
          </ul>
          
          <p style="text-align: center; color: #444; font-size: 10px; margin-top: 30px;">Digital Fluidity Meets High-End Luxury.</p>
        </div>
      `,
    };

    // 4. Email bhejein (Isay alag try-catch mein rakha hai taake order fail na ho)
    try {
      await transporter.sendMail(mailOptions);
    } catch (emailError) {
      console.error("Nodemailer Error (Order still saved):", emailError);
    }

    return NextResponse.json({ success: true, orderId: newOrder._id }, { status: 201 });

  } catch (error) {
    console.error("Database/Server Error:", error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}