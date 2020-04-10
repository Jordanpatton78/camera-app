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
    var ctx =cameraSensor.getContext("2d");
    var image = ctx.drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp").replace("image/webp","image/octet-stream");
    window.location.href=cameraOutput.src;
    cameraOutput.classList.add("taken");
    const { createWorker } = require('tesseract.js');
    const worker = createWorker();
    (async () => {
      await worker.load();
      await worker.loadLanguage('eng');
      await worker.initialize('eng');
      const { data: { text}} = await worker.recognize(image);
      document.write(text);
      await worker.terminate();
    })();
    });
                               
};
// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);
