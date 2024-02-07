const Welcome = (emailContent) => {
    const description = `
        <h1>Hello ${emailContent.name}</h1>
     IO
        <p>HELOO  YOU ARE LOGED IN OUR WEBSITE </p>
    `;

    const title = "Welcome";

    return {
        title,
        description
    };
};

module.exports = Welcome;
