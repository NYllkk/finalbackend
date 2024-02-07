const forgotpass = (emailContent) => {
    const description = `
        <h1>Hello ${emailContent.name}</h1>
        <p> click here to reset your email: ${emailContent.url}</p>
    `;
    // name
    // url this url wiil lead to another page ... to create password 
    const title = " FORGOT PASSWORD";

    return {
        title,
        description
    };
    // }; <p>Please use this OTP to reset your password.</p>
}
module.exports = forgotpass;