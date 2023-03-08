if (window.location.pathname === '/entry') {
    document.addEventListener("readystatechange", function () {
        const sign_in_btn = document.querySelector("#sign-in-btn");
        const sign_up_btn = document.querySelector("#sign-up-btn");
        const container = document.querySelector(".entry-container");

        sign_up_btn.addEventListener("click", () => {
            container.classList.add("sign-up-mode");
            setTimeout(() => {
                document.querySelectorAll('[role="tooltip"]').forEach(el => el.classList.add('show'));
            }, 2000);

        });

        sign_in_btn.addEventListener("click", () => {
            container.classList.remove("sign-up-mode");
            document.querySelectorAll('[role="tooltip"]').forEach(el => el.classList.remove('show'));
        });

        const togglePassword = document.querySelector("#togglePassword");
        const password = document.querySelector("#id_password");

        togglePassword.addEventListener("click", function (e) {
            const type =
                password.getAttribute("type") === "password" ? "text" : "password";
            password.setAttribute("type", type);
            this.classList.toggle("fa-eye-slash");
        });

        const toggleReg = document.querySelector("#toggleReg");
        const pass = document.querySelector("#id_reg");

        toggleReg.addEventListener("click", function (e) {
            const type = pass.getAttribute("type") === "password" ? "text" : "password";
            pass.setAttribute("type", type);
            this.classList.toggle("fa-eye-slash");
        });
    });
}