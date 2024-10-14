import nodemailer from "nodemailer";

// HTML email template
const emailTemplate = ({ fullName, domain, verificationLink }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RBC MIDaP Email Verification</title>
  </head>
  <body style="font-family: 'Poppins', Arial, sans-serif">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding: 20px">
          <table
            class="content"
            width="600"
            border="0"
            cellspacing="0"
            cellpadding="0"
            style="
              border-collapse: collapse;
              border: 1px solid #cccccc;
              overflow: hidden;
            "
          >
            <!-- Header -->
               <tr>
              <td
                class="header"
                style="
              background-color:#005A9C;
                  padding: 20px;
                  text-align: center;
                  color: white;
                  font-size: 24px;
                  display: flex;
                  flex-direction: column;
                "
              >
            
                <table>
                  <tr>
                    <td style="color: white; font-size: 19px; padding-top: 5px">
                    RBC MIDaP
                    </td>
                  </tr>
                </table>
                <!--  Responsive Email Template -->
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td
                class="body"
                style="
                  padding: 40px 40px 40px 40px;
                  text-align: left;
                  font-size: 17px;
                  font-weight: 300 !important;
                  line-height: 1.6;
                  color: #666666;
                "
              >
                <span style="font-weight: bold; font-size: 24px; margin-bottom:50px; color: #1a1a1a"
                  >Dear, ${fullName}! </span
                ><br />

        We have received your request to reset your password. To finish resetting your password, go to the following link.
 </td>
            </tr>
            <!-- Call to action Button -->
            <tr>
              <td style="padding: 20px 40px 20px 40px; text-align: center">
                <!-- CTA Button -->
                <!-- style="margin: auto" -->
                <table cellspacing="0" cellpadding="0">
                  <tr>
                    <td
                      align="center"
                      style="
                        background-color:##005A9C ;
                        padding: 10px 20px;
                        border-radius: 5px;
                      "
                    >
                      <a
                        href="${verificationLink}"
                        target="_blank"
                          style="
                  display: inline-block;
                  padding: 10px 20px;
                  background-color:##005A9C ;
                  color: white;
                  text-decoration: none;
                  font-weight: bold;
                  border-radius: 5px;
                  text-align: center;
                  border: none;
                "
                        >Reset Password</a
                      >

              

                    </td>
                  </tr>
                    <tr>
                <td style="text-align: left; font-size: 14px; color: #777; padding: 10px;">
                     <p style="margin-bottom:5px;margin-top:5px;">Sincerely,</p>
                    <p style="margin: 0;">Support Team<br>RBC MidAp</p>
                </td>
            </tr>
                </table>
              </td>
            </tr>
         
          
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
// HTML email template
// const regMailTemplate = ({ fullName, email, defaultPassword }) => `
// <!DOCTYPE html>
// <html lang="en">
//   <head>
//     <meta charset="UTF-8" />
//     <meta name="viewport" content="width=device-width, initial-scale=1.0" />
//     <title>CMU-Africa IMS REGISTRATION</title>
//   </head>
//   <body style="font-family: 'Poppins', Arial, sans-serif">
//     <table width="100%" border="0" cellspacing="0" cellpadding="0">
//       <tr>
//         <td align="center" style="padding: 20px">
//           <table
//             class="content"
//             width="600"
//             border="0"
//             cellspacing="0"
//             cellpadding="0"
//             style="
//               border-collapse: collapse;
//               border: 1px solid #cccccc;
//               overflow: hidden;
//             "
//           >
//             <!-- Header -->
//             <tr>
//               <td
//                 class="header"
//                 style="
//               background-color:rgba(153, 0, 0);
//                   padding: 20px;
//                   text-align: center;
//                   color: white;
//                   font-size: 24px;
//                   display: flex;
//                   flex-direction: column;
//                 "
//               >

//                 <table>
//                   <tr>
//                     <td style="color: white; font-size: 19px; padding-top: 5px">
//                        CMU-Africa
//                     </td>
//                   </tr>
//                 </table>
//                 <!--  Responsive Email Template -->
//               </td>
//             </tr>

//             <!-- Body -->
//             <tr>
//               <td
//                 class="body"
//                 style="
//                   padding: 40px 40px 40px 40px;
//                   text-align: left;
//                   font-size: 17px;
//                   font-weight: 300 !important;
//                   line-height: 1.6;
//                   color: #666666;
//                 "
//               >
//                 <span style="font-weight: bold; font-size: 24px; margin-bottom:50px; color: #1a1a1a"
//                   >Dear, ${fullName} ! </span
//                 ><br />
//               Welcome to CMU-Africa Inventory System.
//               <br />
//               You have been signed up to the inventory system. Below are the credentials for you to login:

//               Username/Email:
//               <span style=" font-size: 20px; color: #1a1a1a"
//                   >${email}</span
//                 ><br /><br />
//               Default password:
//               <span style=" font-size: 20px; color: #1a1a1a"
//                   >${defaultPassword}</span
//                 ><br /><br />
//                 Use the link below to log in to your account:<br /><br />
//                 <!-- Login Page Link -->
//                         <a
//                 href="http://inventory.africa.local.cmu.edu/"
//                 target="_blank"
//                 style="
//                   display: inline-block;
//                   padding: 10px 20px;
//                   background-color: rgba(153, 0, 0);
//                   color: white;
//                   text-decoration: none;
//                   font-weight: bold;
//                   border-radius: 5px;
//                   text-align: center;
//                   border: none;
//                 "
//               >
//                 Login to Your Account
//               </a>

//               </td>
//             </tr>
//           <tr>
//                 <td style="text-align: left; font-size: 14px; color: #777; padding: 10px;">
//                     <p style="margin-bottom:5px;margin-top:5px;">Sincerely,</p>
//                     <p style="margin: 0;">Support Team<br>Inventory System</p>
//                 </td>
//             </tr>
//           </table>
//         </td>
//       </tr>
//     </table>
//   </body>
// </html>
// `;

const regEmailTemplate = ({ fullName, domain, verificationLink }) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>RBC MIDaP Email Verification</title>
  </head>
  <body style="font-family: 'Poppins', Arial, sans-serif">
    <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
        <td align="center" style="padding: 20px">
          <table
            class="content"
            width="600"
            border="0"
            cellspacing="0"
            cellpadding="0"
            style="
              border-collapse: collapse;
              border: 1px solid #cccccc;
              overflow: hidden;
            "
          >
            <!-- Header -->
               <tr>
              <td
                class="header"
                style="
              background-color:#005A9C;
                  padding: 20px;
                  text-align: center;
                  color: white;
                  font-size: 24px;
                  display: flex;
                  flex-direction: column;
                "
              >
            
                <table>
                  <tr>
                    <td style="color: white; font-size: 19px; padding-top: 5px">
                      RBC MIDaP
                    </td>
                  </tr>
                </table>
                <!--  Responsive Email Template -->
              </td>
            </tr>
            <!-- Body -->
            <tr>
              <td
                class="body"
                style="
                  padding: 40px 40px 40px 40px;
                  text-align: left;
                  font-size: 17px;
                  font-weight: 300 !important;
                  line-height: 1.6;
                  color: #666666;
                "
              >
                <span style="font-weight: bold; font-size: 24px; margin-bottom:50px; color: #1a1a1a"
                  >Dear, ${fullName}! </span
                ><br />

      Thank you for registering. To complete your account setup, please click continue
Once your account is active, you'll be able to enjoy all the features of RBC MIDaP.
If you did not sign up for this account, please disregard this message.
 </td>
            </tr>
            <!-- Call to action Button -->
            <tr>
              <td style="padding: 20px 40px 20px 40px; text-align: center">
                <!-- CTA Button -->
                <!-- style="margin: auto" -->
                <table cellspacing="0" cellpadding="0">
                  <tr>
                    <td
                      align="center"
                      style="
                        background-color:##005A9C ;
                        padding: 10px 20px;
                        border-radius: 5px;
                      "
                    >
                      <a
                        href="${verificationLink}"
                        target="_blank"
                          style="
                  display: inline-block;
                  padding: 10px 20px;
                  background-color:##005A9C ;
                  color: white;
                  text-decoration: none;
                  font-weight: bold;
                  border-radius: 5px;
                  text-align: center;
                  border: none;
                "
                        >Continue</a
                      >

              

                    </td>
                  </tr>
                    <tr>
                <td style="text-align: left; font-size: 14px; color: #777; padding: 10px;">
                     <p style="margin-bottom:5px;margin-top:5px;">Sincerely,</p>
                    <p style="margin: 0;">Support Team<br>RBC MidAp</p>
                </td>
            </tr>
                </table>
              </td>
            </tr>
         
          
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
`;
export const sendMail = async (
  receiverFullName,
  receiverEmail,
  message,
  isReg
) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: "giovannixon@gmail.com",
      to: receiverEmail,
      subject: message.subject,
      html: isReg
        ? regEmailTemplate({
            fullName: receiverFullName,
            domain: "",
            verificationLink: message.verificationLink,
          })
        : emailTemplate({
            fullName: receiverFullName,
            domain: "",
            verificationLink: message.verificationLink,
          }),
    };

    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.log("An error has occurred:", error);
  }
};
