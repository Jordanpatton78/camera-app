import Tesseract from 'tesseract.js';
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
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp").replace("image/webp","image/octet-stream");
    window.location.href=cameraOutput.src;
    cameraOutput.classList.add("taken");
    Tesseract.recognize("image/octet-stream","eng").then(({data : {text} })=> document.write(text))
}
                               
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
