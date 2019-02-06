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
    var name = e.target.name;
    validate(name);
    var value = e.target.value;
    model[name] = value;
    if (e.target.classList.value.indexOf('inputTextRequired') < 0 && value) {
        value ? e.target.classList.add('inputTextOptional') : e.target.classList.remove('inputTextOptional');
    }

    validate(name);
}

function scrollToContactForm() {
    var contentEl = document.getElementById('content');
    var htmlEl = document.getElementsByTagName('html')[0];
    htmlEl.scrollTop = contentEl.offsetTop - 10;
}

function submitForm() {
    try {
        let response = await fetch('http://biotechnes.cz/php/index.php', {
            method: 'POST',
            body: model,
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            }
        });
        let data = await response.json();
        console.log(model, data);
    }
    catch (e) {
        console.log('req error', e);
    }
}
