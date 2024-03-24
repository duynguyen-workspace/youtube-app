const generateRandomCode = (size) => {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var code = '';
    var charactersLength = characters.length;
    for (var i = 0; i < size; i++) {
        code += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return code;
}

export {generateRandomCode}