var inputs = document.getElementsByClassName('inputText');
for (var i = 0; i < inputs.length; i++) {
    inputs[i].addEventListener('keyup', inputChanged);
}

var area = document.getElementById('message');
if (area.addEventListener) {
    area.addEventListener('input', inputChanged, false);
} else if (area.attachEvent) {
    area.attachEvent('onpropertychange', inputChanged);
}

function inputChanged(e) {
    validate();
    var value = e.target.value;
    model[e.target.name] = value;
    if (e.target.classList.value.indexOf('inputTextRequired') < 0 && value) {
        e.target.classList.add('inputTextOptional');
    }

    validate();
}
