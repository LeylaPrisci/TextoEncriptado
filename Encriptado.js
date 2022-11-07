function encriptar() {
    var textarea = document.getElementById("introducirtexto").value.toLowerCase();
 
    var texto = textarea.replace(/e/igm, "enter");
    var texto = texto.replace(/i/igm, "imes");
    var texto = texto.replace(/a/igm, "ai");
    var texto = texto.replace(/o/igm, "ober");
    var texto = texto.replace(/u/igm, "ufat");

    document.getElementById("imagen").style.display="none";
    document.getElementById("texto").style.display= "none";
    document.getElementById("texto2").innerHTML = texto;
    document.getElementById("copiar").style.display = "show";
    document.getElementById("copiar").style.display = "inherit";
}

function desencriptar() {
    var textarea = document.getElementById("introducirtexto").value.toLowerCase();
    var texto = textarea.replace(/enter/igm, "e");
    var texto = texto.replace(/imes/igm, "i");
    var texto = texto.replace(/ai/igm, "a");
    var texto = texto.replace(/ober/igm, "o");
    var texto = texto.replace(/ufat/igm, "u");

    document.getElementById("imagen").style.display= "none";
    document.getElementById("texto").style.display= "none";
    document.getElementById("texto2").innerHTML = texto;
    document.getElementById("copiar").style.display = "show";
    document.getElementById("copiar").style.display = "inherit";
}

function copiar(){
    var textoIngresado = document.querySelector("#texto2");
    textoIngresado.select();
    document.execCommand("copy");
}