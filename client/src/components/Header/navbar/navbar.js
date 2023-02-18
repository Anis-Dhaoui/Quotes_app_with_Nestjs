import 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js';

window.onscroll = function () { scrollFunction(); };

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {

        document.getElementById("navbar").style.background = "black";
    } else {

        document.getElementById("navbar").style.background = "none";
    }
}