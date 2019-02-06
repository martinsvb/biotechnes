var model={name:"",company:"",mail:"",message:"",phone:""},modelValidationKeys=["name","mail","message"];function validate(e){var t=!0;for(var n in model){var a=document.getElementById("error-"+n),i="add";modelValidationKeys.indexOf(n)>-1&&!model[n]?(t=!1,i="remove"):"mail"!==n||/(\w)+@[A-Za-z\-_.]+\.[A-Za-z]{2,}/.test(model[n])||(t=!1,i="remove"),modelValidationKeys.indexOf(n)>-1&&e===n&&a.classList[i]("hide")}setSubmitBtn(t)}function setSubmitBtn(e){var t=document.getElementById("submit");e?t.removeAttribute("disabled"):t.setAttribute("disabled",!0)}for(var inputs=document.getElementsByClassName("inputText"),i=0;i<inputs.length;i++)inputs[i].addEventListener("keyup",inputChanged);var area=document.getElementById("message");function inputChanged(e){var t=e.target.name;validate(t);var n=e.target.value;model[t]=n,e.target.classList.value.indexOf("inputTextRequired")<0&&n&&(n?e.target.classList.add("inputTextOptional"):e.target.classList.remove("inputTextOptional")),validate(t)}function scrollToContactForm(){var e=document.getElementById("content");document.getElementsByTagName("html")[0].scrollTop=e.offsetTop-10}async function submitForm(){var e=document.getElementById("submit");e.innerText="Odesílám",e.setAttribute("disabled",!0);try{let t=await fetch("http://biotechnes.cz/php/index.php",{method:"POST",body:JSON.stringify(model),mode:"cors",headers:{"Content-Type":"text/plain"}});sendingFinished(e,(await t.json()).data)}catch(t){sendingFinished(e)}}function sendingFinished(e,t){e.innerText="Odeslat zprávu",e.removeAttribute("disabled");var n=document.getElementById("sendResult");n.classList.remove("hide");var a=document.getElementById("sendResultText");t?(a.innerText="E-mail byl úspěšně odeslán.",n.classList.remove("danger"),n.classList.add("success"),clearForm()):(a.innerText="Při odesílání E-mailu nastala chyba. Opakujte prosím akci později.",n.classList.remove("success"),n.classList.add("danger"))}function closeSendResultInfo(){document.getElementById("sendResult").classList.add("hide")}function clearForm(){for(var e in model){document.getElementById(e).value=""}model={name:"",company:"",mail:"",message:"",phone:""}}area.addEventListener?area.addEventListener("input",inputChanged,!1):area.attachEvent&&area.attachEvent("onpropertychange",inputChanged);