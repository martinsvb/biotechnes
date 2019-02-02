var inputs = document.getElementsByClassName("textInput");
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', inputChanged);
}

var area = document.getElementById("message");
if (area.addEventListener) {
    area.addEventListener('input', inputChanged, false);
} else if (area.attachEvent) {
    area.attachEvent('onpropertychange', inputChanged);
}

function inputChanged(e) {
    var inpName = e.target.name;
    validate();
    if (modelValidation.hasOwnProperty(inpName)) {
        modelValidation[inpName] = !!e.target.value;
    }

    validate();
}
