var model = {
    name: '',
    company: '',
    mail: '',
    message: '',
    phone: ''
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
    var submitBtn = document.getElementById('submit');
    if (valid) {
        submitBtn.removeAttribute('disabled');
    }
    else {
        submitBtn.setAttribute('disabled', true);
    }
}

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
    var formArrow = document.querySelector('.contactFormArrow');
    if (formArrow.classList.contains('contactFormArrowUp')) {
        formArrow.classList.replace('contactFormArrowUp', 'contactFormArrowDown');
    }
    var form = document.querySelector('.contactForm');
    form.classList.remove('contactFormHide');
    setTimeout(function(){
        form.style.opacity = 1;
    }, 0);
    var contentEl = document.getElementById('content');
    var htmlEl = document.getElementsByTagName('html')[0];
    htmlEl.scrollTop = contentEl.offsetTop - 10;
}

function contactFormClicked() {
    var arrow = 'contactFormArrow';
    var formArrow = document.querySelector('.' + arrow);
    var isArrowUp = formArrow.classList.contains('contactFormArrowUp');
    var oldClass = isArrowUp ? arrow + 'Up' : arrow + 'Down';
    var newClass = isArrowUp ? arrow + 'Down' : arrow + 'Up';
    formArrow.classList.replace(oldClass, newClass);
    var form = document.querySelector('.contactForm');
    if (form.classList.contains('contactFormHide')) {
        scrollToContactForm();
    }
    else {
        form.style.opacity = 0;
        setTimeout(function(){
            form.classList.add('contactFormHide');
        }, 500);
    }
}

if (!fetch) {
    require('es6-promise').polyfill();
    require('isomorphic-fetch');
}

async function submitForm() {
    var submitBtn = document.getElementById('submit');
    submitBtn.innerText = 'Odesílám'
    submitBtn.setAttribute('disabled', true);
    try {
        let response = await fetch('http://biotechnes.cz/php/index.php', {
            method: 'POST',
            body: JSON.stringify(model),
            mode: 'cors',
            headers: {
                'Content-Type': 'text/plain',
            }
        });
        let resp = await response.json();
        sendingFinished(submitBtn, resp.data);
    }
    catch (e) {
        sendingFinished(submitBtn);
    }
}

function sendingFinished(submitBtn, success) {
    submitBtn.innerText = 'Odeslat zprávu'
    submitBtn.removeAttribute('disabled');
    var sendResultEl = document.getElementById('sendResult');
    sendResultEl.classList.remove('hide');
    var sendResultTextEl = document.getElementById('sendResultText');
    if (success) {
        sendResultTextEl.innerText = 'E-mail byl úspěšně odeslán.';
        sendResultEl.classList.remove('danger');
        sendResultEl.classList.add('success');
        clearForm();
    }
    else {
        sendResultTextEl.innerText = 'Při odesílání E-mailu nastala chyba. Opakujte prosím akci později.';
        sendResultEl.classList.remove('success');
        sendResultEl.classList.add('danger');
    }
}

function closeSendResultInfo() {
    var sendResultEl = document.getElementById('sendResult');
    sendResultEl.classList.add('hide');
}

function clearForm() {
    for (var item in model) {
        var el = document.getElementById(item);
        el.value = '';
    }
    model = {
        name: '',
        company: '',
        mail: '',
        message: '',
        phone: ''
    };
}
