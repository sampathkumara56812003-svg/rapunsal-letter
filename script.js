
document.addEventListener("DOMContentLoaded", function () {

    const passwordForm = document.getElementById("password-form");
    const passwordInput = document.getElementById("password-input");
    const passwordError = document.getElementById("password-error");

    const passwordScreen = document.getElementById("password-screen");
    const mainContent = document.getElementById("main-content");

    // Password validation
    passwordForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const enteredPassword = passwordInput.value.trim();

        if (enteredPassword === "RAPUNSAL") {

            passwordError.textContent = "";

            passwordScreen.style.display = "none";
            mainContent.hidden = false;

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        } else {

            passwordError.textContent =
                "That password doesn't seem right. Please try again.";

            passwordInput.value = "";
            passwordInput.focus();
        }
    });

});
