function displayModal() {
    const modal = document.getElementById("contact_modal");
	modal.style.display = "block";
	document.querySelector("body").style.overflow = "hidden";

    let firstFocusableElement = document.querySelector( '.modalClose' );
    let lastFocusableElement = document.querySelector( '#submit_button' );

    firstFocusableElement.focus();

    modal.addEventListener('keydown', function(event){

        if(event.key === 'Tab' || event.keycode === 9) {
            if (event.shiftKey) {
                if (document.activeElement === firstFocusableElement) {
                    event.preventDefault();
                    lastFocusableElement.focus();
                }
            } else {
                if (document.activeElement === lastFocusableElement) {
                    event.preventDefault();
                    firstFocusableElement.focus();
                }
            }
        }
    });
}

document.addEventListener("keydown", function(event){
    if (event.keyCode === 27) {
        closeModal();
}})

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
    document.querySelector("body").style.overflow = "scroll";
}

const form = document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();

    const firstName = document.querySelector("#firstName").value;
    console.log("prenom : " + firstName);

    const lastName = document.querySelector("#lastName").value;
    console.log("nom : " + lastName);

    const email = document.querySelector("#email").value;
    console.log("email : " + email);

    const message = document.querySelector("#message").value;
    console.log("message : " + message);

    closeModal();
  
  });

  
