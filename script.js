var body, num, array, width, context, logo, myElements, analyzer, src, height;

body = document.querySelector("body");
document.getElementsByClassName("data").innerHTML = "height";
num = 32;
array = new Uint8Array(num * 2);
width = 10;

window.onclick = function () {
    if (context) {
        return;
    }

    body.querySelector("h1").remove();

    for (var i = 0; i < num + 1; i++) {
        logo = document.createElement("div");
        logo.className = "logo";
        logo.style.background = "whitesmoke";
        logo.style.background = "linear-gradient(to bottom, cornflowerblue,  #660066)";
        logo.style.minWidth = width + "px";
        body.appendChild(logo);
    }

    myElements = document.getElementsByClassName("logo");
    context = new AudioContext();
    analyzer = context.createAnalyser();

    navigator.mediaDevices.getUserMedia({
        audio: true
    }).then(stream => {
        src = context.createMediaStreamSource(stream);
        src.connect(analyzer);
        loop();
    }).catch(error => {
        alert(error + "\r\n Not allowed. Page will be reloaded.");
        location.reload();
    });
}

function loop() {
    window.requestAnimationFrame(loop);
    analyzer.getByteFrequencyData(array);
    for (var i = 0; i < num; i++) {
        height = array[i + num]
        myElements[i].style.minHeight = height + "px";
        myElements[i].style.opacity = 1 * height;
    }
}