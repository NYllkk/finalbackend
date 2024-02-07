const sendingdata = (emailContent) => {
    const description = `
        <h1>Hello ${emailContent.name}</h1>
     
        <p>${emailContent.id} </p>
    `;

    const title = "EMPLOYEE DATA";

    return {
        title,
        description
    };
};

module.exports = sendingdata;
