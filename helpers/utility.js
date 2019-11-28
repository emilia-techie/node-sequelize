var crypto = require('crypto');

exports.sendJsonResponse = function (res, status, content) {
    res.status(status).json(content);
};
exports.sendErrorResponse = function (res, content, message) {
    let data = {
        success: false,
        message: message,
        data: content
    };
    res.json(data);
};


exports.sendSuccessResponse = function (res, content, message) {
    let data = {
        success: true,
        message: message,
        data: content
    };
    res.status(200).json(data);
};

exports.sendValidationResponse = function (res, message) {
    let data = {
        success: false,
        error: message,
    };
    res.status(200).json(data);
};

/*Manage validation error message- ARP */
exports.manageValidationMessages = function (reqData) {
    let err = reqData.errors;
    if (err.length > 0) {
        for (var i = 0; i < err.length; i++) {
            if (err[i]['msg'] != '') {
                let errObj = {};
                errObj.message = err[i]['msg'];
                errObj.param = err[i]['param'];
                return errObj;
            }
        }
    } else {
        return '';
    }
}

/*Generate randon number- ARP */
exports.generateRandomNo = function (n) {
    let low = 1000;
    let high = 9999;
    var finalNumber = Math.floor(Math.random() * (high - low + 1) + low);
    if (parseInt(finalNumber.length) < parseInt(n)) {
        var finalNumber = this.generateRandomNo(n);
    }
    return finalNumber;
}

/*Gnerate random string- ARP */
exports.generateRandomString = function (text) {
    var text = text;
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

/*Handle null value- ARP */
exports.nullChecker = function (value, defaultValue = "") {
    if (!value) {
        return defaultValue;
    } else {
        return value;
    }
}

/* Calculates the MD5 hash of a password- ARP */
exports.md5 = function (password) {
    return crypto.createHash('md5').update(password).digest('hex');
}


/*Change date format-ARP */
exports.changeDateFormat = function (datetime, format = 'dd-mm-yyyy') {
    if (datetime) {
        let dateFormat = require('dateformat');
        return dateFormat(datetime, format);
    } else {
        return '';
    }
}

/*validate file type (for single image)- ARP*/
exports.isImage = function (filename) {
    let extension = filename.split('.').pop();
    switch (extension) {
        case 'jpg':
            return 'jpg';
        case 'JPG':
            return 'JPG';
        case 'jpeg':
            return 'jpeg';
        case 'png':
            return 'png';
        default:
            return false;
    }
}