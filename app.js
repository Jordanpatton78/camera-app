// Set constraints for the video stream
var constraints = { video: { facingMode: "environment" }, audio: false};
// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    Tesseract=require('tesseract.js'),
    worker=Tesseract.createWorker()
    
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
    var image =cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp").replace("image/webp","image/octet-stream");
    //window.location.href=cameraOutput.src;
    cameraOutput.classList.add("taken");
    window.open("index2.html");
    work();
}

async function work() {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');

  let result = await worker.detect(exampleImage);

  result = await worker.recognize(exampleImage);

  await worker.terminate();
    return result.data;
}

                               
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
