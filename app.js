// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false};
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger")
// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices
        .getUserMedia(constraints)
        .then(function(stream) {
        track = stream.getTracks()[0];
        cameraView.srcObject = stream;
    })
    .catch(function(error) {
        console.error("Oops. Something is broken.", error);
    });
}
// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    var ctx = cameraSensor.getContext("2d");
    ctx.drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp").replace("image/webp","image/octet-stream");
    window.location.href=cameraOutput.src;
    cameraOutput.classList.add("taken");
    Tesseract.recognize(ctx).then(function(result){
        var resultText = result.text ? result.text.trim : '';
        window.print(resultText);
    })
}
                               
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
