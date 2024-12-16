const Verification = require("../../models/verfication");
const User = require("../../models/user");
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

exports.verfiy = async (req, res, next) => {
  const phoneNumber = req.body.phoneNumber;
  const verificationCode = req.body.verificationCode;
  if (!phoneNumber) {
    return res.status(400).json({ message: "Phone number is required." });
  }

  try {
    const user = await User.findOne({ phoneNumber });
    if (!user) {
      return res.status(400).json({
        action: "verify-code",
        success: false,
        message: "Verification code not found or expired.",
      });
    }
    if (!verificationCode) {
      const generatedCode = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      const verification = new Verification({
        phoneNumber: phoneNumber,
        verificationCode: generatedCode,
        createdAt: new Date(),
      });
      await verification.save();
      numberTosend = "+967" + phoneNumber;

      await client.messages.create({
        body: `Your verification code is ${generatedCode}`,
        from: process.env.TWILIO_NUMBER,
        to: numberTosend,
      });

      return res.status(200).json({
        action: "send-code",
        success: true,
        message: "Verification code sent.",
      });
    } else {
      const record = await Verification.findOne({ phoneNumber });

      if (!record) {
        return res
          .status(400)
          .json({ message: "Verification code not found or expired." });
      }

      if (record.verificationCode === verificationCode) {
        await Verification.deleteOne({ phoneNumber });
        return res.status(200).json({
          action: "verify-code",
          success: true,
          message: "Verification successful.",
        });
      } else {
        return res.status(400).json({
          action: "verify-code",
          success: false,
          message: "Verification code not found or expired.",
        });
      }
    }
  } catch (error) {
    console.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
