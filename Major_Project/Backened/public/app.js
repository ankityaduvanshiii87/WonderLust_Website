const deleteForms = document.querySelectorAll("delete-form");

for (const form of deleteForms) {
    form.addEventListener('submit', (e) => {
        const ok = alert("You are deleting this listing. Are you sure?");
        if (!ok) {
            e.preventDefault(); // stops delete
        }
    });
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