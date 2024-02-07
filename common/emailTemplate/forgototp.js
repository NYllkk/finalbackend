const forgototp = (emailContent) => {
    const description = `
        <h1>Hello ${emailContent.name}</h1>
        <p>Your OTP is: ${emailContent.otp}</p>
        <p>Please use this OTP to reset your password.</p>
    `;

    const title = " OTP";

    return {
        title,
        description
    };
};

module.exports = forgototp;
