const validator = require('validator');

function validatePassword(pass) {
    let isLowerCaseChar = false;
    let isUpperCaseChar = false;
    let isNumberChar = false;

    for (let i = 0; i < pass.length; i++) {
        if (pass[i] >= 'a' && pass[i] <= 'z') isLowerCaseChar = true;
        if (pass[i] >= 'A' && pass[i] <= 'Z') isUpperCaseChar = true;
        if (pass[i] >= '0' && pass[i] <= '9') isNumberChar = true;
    }

    return (isLowerCaseChar && isUpperCaseChar && isNumberChar && pass.length >= 8);
}

function validateEmail(email) {
    return validator.isEmail(email);
}

function validateStatus(status) {
    if(!status) status = 'Execute';
    return (status === 'Execute' || status === 'Completed' || status === 'Canceled');
}
module.exports = {
    validatePassword,
    validateEmail,
    validateStatus
};