export const otpTemplate = (otp:string) => `
  <div style="font-family: Arial, sans-serif">
    <h2>OTP Verification</h2>
    <p>Your OTP is:</p>
    <h1 style="letter-spacing: 4px">${otp}</h1>
    <p>This OTP expires in 5 minutes.</p>
  </div>
`;
