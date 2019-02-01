/* event listener */
document.getElementById("name").addEventListener('change', nameChanged);

/* function */
function nameChanged(){
   console.log('Horray! Someone wrote "' + this.value + '"!');
}
