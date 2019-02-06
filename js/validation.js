var model = {
    name: '',
    company: '',
    mail: '',
    message: ''
}

var modelValidationKeys = ['name', 'mail', 'message']

function validate(name) {
    var valid = true;
    for (var item in model) {
        var el = document.getElementById('error-' + item);
        var errorHideAction = 'add';
        if (modelValidationKeys.indexOf(item) > -1 && !model[item]) {
            valid = false;
            errorHideAction = 'remove';
        }
        else if (item === 'mail' && !/(\w)+@[A-Za-z\-_.]+\.[A-Za-z]{2,}/.test(model[item])) {
            valid = false;
            errorHideAction = 'remove';
        }
        
        if (modelValidationKeys.indexOf(item) > -1 && name === item) {
            el.classList[errorHideAction]('hide');
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
