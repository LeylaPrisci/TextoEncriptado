document.addEventListener('DOMContentLoaded', () => {
    const inputTextarea = document.getElementById("introducirtexto");
    const outputTextarea = document.getElementById("texto2");
    const encryptButton = document.getElementById("encriptar");
    const decryptButton = document.getElementById("desencriptar");
    const copyButton = document.getElementById("copiar");
    const noMessageFoundDiv = document.getElementById("no-message-found");

    const encryptionMap = {
        'e': 'enter',
        'i': 'imes',
        'a': 'ai',
        'o': 'ober',
        'u': 'ufat'
    };

    // Para la desencriptación, es CRÍTICO el orden. Se reemplazan las cadenas más largas primero.
    // Creamos un array de objetos { search: 'string', replace: 'char' } y lo ordenamos.
    const decryptionMap = Object.entries(encryptionMap)
                                .map(([char, string]) => ({ search: string, replace: char }))
                                .sort((a, b) => b.search.length - a.search.length);

    function validateInput(text) {
        // Expresión regular para permitir solo letras minúsculas y espacios.
        // `\s` incluye espacios, tabulaciones, saltos de línea.
        if (!/^[a-z\s]*$/.test(text)) {
            alert('Por favor, ingrese solo letras minúsculas y sin acentos ni caracteres especiales.');
            return false;
        }
        return true;
    }

    function encrypt() {
        const originalText = inputTextarea.value.toLowerCase().trim();

        if (originalText === '') {
            alert('Por favor, ingrese un texto para encriptar.');
            return;
        }

        if (!validateInput(originalText)) {
            return;
        }

        let encryptedText = originalText;
        for (const char in encryptionMap) {
            // Usamos RegExp para reemplazar todas las ocurrencias globalmente
            const regex = new RegExp(char, 'g'); 
            encryptedText = encryptedText.replace(regex, encryptionMap[char]);
        }

        displayResult(encryptedText);
    }

    function decrypt() {
        const originalText = inputTextarea.value.toLowerCase().trim();

        if (originalText === '') {
            alert('Por favor, ingrese un texto para desencriptar.');
            return;
        }

        if (!validateInput(originalText)) {
            return;
        }

        let decryptedText = originalText;
        for (const rule of decryptionMap) {
            // Reemplazamos la cadena encriptada por su carácter original
            const regex = new RegExp(rule.search, 'g');
            decryptedText = decryptedText.replace(regex, rule.replace);
        }
        
        displayResult(decryptedText);
    }

    function displayResult(text) {
        if (text) {
            noMessageFoundDiv.style.display = 'none'; // Oculta el placeholder
            outputTextarea.style.display = 'block'; // Muestra el textarea de salida
            copyButton.style.display = 'block'; // Muestra el botón de copiar
            outputTextarea.value = text; // Asigna el texto al textarea de salida
        } else {
            // Si el texto es vacío (o se limpia), restaura el estado inicial
            noMessageFoundDiv.style.display = 'flex'; // Usar 'flex' para que los elementos se centren correctamente
            outputTextarea.style.display = 'none';
            copyButton.style.display = 'none';
            outputTextarea.value = ''; // Limpia el textarea de salida
        }
    }

    function copyText() {
        if (outputTextarea.value.trim() === '') {
            alert('No hay texto para copiar.');
            return;
        }
        outputTextarea.select();
        outputTextarea.setSelectionRange(0, 99999); // Para dispositivos móviles
        try {
            document.execCommand('copy');
            alert('Texto copiado al portapapeles.');
        } catch (err) {
            console.error('Error al copiar texto: ', err);
            alert('No se pudo copiar el texto. Inténtelo manualmente.');
        }
    }

    // Asignar Event Listeners a los botones
    encryptButton.addEventListener('click', encrypt);
    decryptButton.addEventListener('click', decrypt);
    copyButton.addEventListener('click', copyText);

    // Inicialmente, oculta el textarea de resultado y el botón de copiar
    displayResult(''); // Llama para establecer el estado inicial
});