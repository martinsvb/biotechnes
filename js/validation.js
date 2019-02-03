var model = {
    name: '',
    company: '',
    mail: '',
    message: ''
}

var modelValidationKeys = ['name', 'mail', 'message']

function validate() {
    var valid = true;
    for (var item in model) {
        if (modelValidationKeys.indexOf(item) > -1 && !model[item]) {
            valid = false;
            break;
        }
    }

    setSubmitBtn(valid);
}

function setSubmitBtn(valid) {
    var submitBtn = document.getElementById("submit");
    if (valid) {
        submitBtn.removeAttribute('disabled');
    }
    else {
        submitBtn.setAttribute("disabled", true);
    }
}
