// import 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js';

window.onscroll = function () { scrollFunction(); };

function scrollFunction() {
    if (document.querySelector("nav") != null) {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {

            document.querySelector("nav").style.background = "black";
            document.getElementById('toggler-id').classList.add('custom-toggler');
            document.getElementById('toggler-icon-id').classList.add('custom-toggler-icon');
        } else {
            document.querySelector("nav").style.background = "none";
            document.getElementById('toggler-id').classList.remove('custom-toggler');
            document.getElementById('toggler-icon-id').classList.remove('custom-toggler-icon');
        }
    }
}