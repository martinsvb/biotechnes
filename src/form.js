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
