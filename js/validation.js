var modelValidation = {
    name: false,
    mail: false,
    message: false,
}

function validate() {
    var valid = true;
    for (var item in modelValidation) {
        if (!modelValidation[item]) {
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
