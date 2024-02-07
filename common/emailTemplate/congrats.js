const congrats = (emailContent) => {
    const description = `
        <h1>Hello ${emailContent.name}</h1>
     
        <p> Congrats! Your Password is Reset Succesfully</p>
    `;

    const title = "OTP";

    return {
        title,
        description
    };
};

module.exports = congrats;
