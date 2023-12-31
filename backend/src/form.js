let multiparty = require('multiparty');

class Form {
    constructor(request) {
        this.request = request;
    }

    // Method to send otp by email
    parse() {
        return new Promise(async (resolve, reject) => {
            try {
                let form = new multiparty.Form();
                // Parsing the form
                form.parse(this.request, (err, fields, files) => {
                    if(fields == undefined){
                        return reject("All Parameter missing.");
                    }

                    if (err) {
                        return reject({ message: err, status: 0 });
                    }
                    let formParseObject = {};
                    formParseObject.fields = fields;
                    formParseObject.files = files;
                    return resolve(formParseObject);
                });
            } catch (error) {
                return reject(error)
            }
        });
    }
}

module.exports = Form;