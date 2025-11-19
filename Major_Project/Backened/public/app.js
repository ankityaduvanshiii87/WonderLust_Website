deform=document.querySelectorAll('.delete_form');
for(def of deform){
    def.addEventListener('submit',()=>{
        alert("You are deleting it ")
    })
}

// ---------------------------------------------------------------------------------------------------------------------
// form-Validation
(() => {
  'use strict';
  const forms = document.querySelectorAll('.needs-validation');
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });
})();