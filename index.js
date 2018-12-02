window.onload = () => {
    var html =
        `<!DOCTYPE html>
<html lang="en">
    <head>
    <meta charset="UTF-8"><meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Code Pen</title>
    <style>
        // Your CSS goes here
    </style>
    </head>
    <body>
        <!-- Your HTML goes here -->
    </body>
</html>`;

    var codeArea = document.getElementById("code-text-area");
    var container = document.querySelector(".code-container");
    var autoSaveCheckBox = document.querySelector("#code-utility-check-box");

    var interval = "";
    codeArea.innerText = html;
    var map = {};
    codeArea.onkeydown = codeArea.onkeyup = (event) => {
        if (event.keyCode === 9 && event.type === "keydown") {
            event.preventDefault();
            var s = codeArea.selectionStart;
            codeArea.value = codeArea.value.substring(0, codeArea.selectionStart) + "\t" + codeArea.value.substring(codeArea.selectionEnd);
            codeArea.selectionEnd = s + 1;
        }
        else {
            map[event.keyCode] = event.type == "keydown";
            if (map[17] && map[83]) { // Ctrl + s -> Save operation
                event.preventDefault();
                updateContainer(container);
            }
        }
    }

    autoSaveCheckBox.addEventListener("click", autoRefresh);

    function autoRefresh() {
        if (autoSaveCheckBox.checked === true) {
            interval = setInterval(() => {
                updateContainer(container);
            }, 500);
        }
        else {
            clearInterval(interval);
        }
    }

    function updateContainer(container) {
        container.innerHTML = '';
        container.innerHTML = codeArea.value;
    }
}
