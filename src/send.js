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
