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
// -----------------------------------------------------------------------------------------------------------------------------------------------
// Toggle Button on the home page.
let toggle = document.querySelector("#switchCheckDefault");
    toggle.addEventListener("click", () => {
        let gstPrices = document.querySelectorAll(".gstPrice");
        gstPrices.forEach(gst => {
            if(gst.style.display !="inline"){
                gst.style.display="inline"
            }
            else{
                gst.style.display="none"
            }
        });
    });
// ------------------------------------------------------------------------------------------------------------------------------------------------------------------
