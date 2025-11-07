document.addEventListener("DOMContentLoaded", event => {
    let form = document.forms["loginForm"];
    form.addEventListener("submit", event => {
        return true;
    });
});