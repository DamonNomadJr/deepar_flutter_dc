/**
 * **DeepARChannel Class**.
 *
 * DeepAr JavaScript channel class to handle all your calls from
 * flutter side.
*/
class DeepARChannel {
    /**
     * Constructor
     * @param {[String]} webLicenseKey [Provide your web License key to use DeepAR]
     * @param {[String]} canvasId [Uses on screen canvas for rendering deepAR]
     */
    constructor(webLicenseKey, canvasId) {
        this.deepARInstance = new DeepAR({
            licenseKey: webLicenseKey,
            canvas: document.getElementById(canvasId),
            segmentationConfig: {
                modelPath: "./lib/models/segmentation/segmentation-160x160-opt.bin"
            },
            footTrackingConfig: {
                poseEstimationWasmPath: 'lib/wasm/libxzimgPoseEstimation.wasm',
                detectorPath: 'lib/models/foot/foot-detector-android.bin', // or ...-ios.bin
                trackerPath: 'lib/models/foot/foot-tracker-android.bin',  // or ...-ios.bin
                objPath: 'lib/models/foot/foot-model.obj',
            },
            deeparWasmPath: 'lib/wasm/deepar.wasm',
            callbacks: {
                onInitialize: () => {
                    //NOTE: to be implemented
                }
            }
        });
    }

    changeParameterBool() {

    }

    changeParameterFloat() {

    }

    changeParameterTexture() {

    }

    changeParameterVector() {

    }

    clearEffect(slot) {
        this.deepARInstance.clearEffect(slot);
    }

    downloadFaceTrackingModel(path) {
        this.deepARInstance.downloadFaceTrackingModel(path);
    }

    finishVideoRecording() {

    }

    fireTrigger() {

    }

    moveGameObject() {

    }

    pause() {

    }

    /** ## DeepAR.processImage
     * Processes an Uint8Array list to draw image on DeepAR's canvas.
     * @param {[Uint8Array]} imageUint8 Image Uint8Array data
     * @param {[number]} width Image's width
     * @param {[number]} height Image's height
     * @param {[bool]} mirror Mirror the image
     */
    processFrame(imageUint8, width, height, mirror) {
        this.deepARInstance.processFrame(imageUint8, width, height, mirror);
    }

    /**
     * ## DeepAR.processImage
     * Processes a url based image to draw image on DeepAR's canvas.
     * @param {String} imageSrc Image url src
     */
    processImage(imageSrc) {
        var image = new Image();
        image.crossOrigin = "anonymous";
        image.src = imageSrc;
        image.onload = () => {
            this.deepARInstance.processImage(image);
        }
    }

    /**
     * 
     */
    resume() {
        this.deepARInstance.resume();
    }

    setFaceDetectionSensitivity(sensitivity) {
        this.deepARInstance.setFaceDetectionSensitivity(sensitivity);
    }

    setFaceTrackingModel(model) {
        this.deepARInstance.setFaceTrackingModel(model);
    }

    setFps(fps) {
        this.deepARInstance.setFps(fps);
    }

    setOffscreenRenderingEnabled(value) {
        this.deepARInstance.setOffscreenRenderingEnabled(value);
    }

    // NOTE: not supported by flutter
    // setVideoElement() {
    // }

    //NOTE: To be later implemented
    // showColliders() { }

    /**
     * ## DeepAR.showStats
     * Display debugging stats on screen.
     * @param {[Boolean]} enable
     */
    showStats(enabled) {
        this.deepARInstance.showStats(enabled)
    }

    /**
     * ## DeepAR.dispose
     * Flutter equivalent of dispose function to completely discard object.
     * Shuts down the DeepAR SDK.
     */
    dispose() {
        this.deepARInstance.shutdown();
    }

    /**
     * ## DeepAR.simulatePhysics
     * Enable or disable DeepAR's global physics simulation.
     * @param {[Boolean]} enable
     */
    simulatePhysics(enable) {
        this.deepARInstance.simulatePhysics(enable);
    }

    /**
     * ## DeepAR.simulatePhysics
     * Starts the camera preview.
     * @param {[Boolean]} mirror
     */
    startVideo(mirror) {
        this.deepARInstance.startVideo(mirror);
    }

    //NOTE: To be later implemented
    // startVideoRecording() { }

    /**
     * ## DeepAR.stopVideo
     * Stops the camera preview.
     */
    stopVideo() {
        console.log(this.deepARInstance);
        this.deepARInstance.stopVideo(true);
    }

    /**
     * ## DeepAR.stopVideo
     * Downloads the effect file and loads it into the SDK for preview.
     * The method used to switch any effect in the scene.
     * @param {[number]} face Specifies on which face the effect will be applied. The allowed values are 0, 1, 2 and 3.
     * @param {[string]} slot Specifies a namespace for the effect in the scene. In each slot, there can be only one effect.
     * @param {[string]} path Path to the effect file exported from DeepAR studio.
     */
    switchEffect(face, slot, path) {
        this.deepARInstance.switchEffect(face, slot, path);
    }

    //NOTE: To be later implemented
    // takeScreenshot() { }

    //NOTE: To be later implemented
    // touchOccurred() { }
}


var exportClasses = { DeepARChannel: DeepARChannel };

let temp;

function initializeDeepar() {
    console.log("Starting up DeepAR");
    let canvas = document.getElementById('deepar-canvas');
    canvas.height = window.innerHeight / 2;
    canvas.width = window.innerWidth / 2;
    temp = new DeepARChannel('65b2a39ea742b1791b689af4282e07ecf0a6ca4c2e83277cb0ac0479c63e88dfc4513e002a6fa0d5', 'deepar-canvas');
    temp.downloadFaceTrackingModel("lib/models/face/models-68-extreme.bin");
}

function startCamera() {
    temp.startVideo();
}

function stopCamera() {
    temp.stopVideo();
}

function processImage() {
    temp.processImage("https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg");
}

function processFrame() {
    var url = window.prompt("Give me a URL of an image");
    if (isValidUrl(url) && url.length != 0) {
        console.log("Valid URL")
        var image = new Image();
        image.crossOrigin = "anonymous";
        image.src = url; //"https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg"
        image.onload = () => {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var lastImageByteArray = new Uint8Array(imageData.data.buffer);
            temp.processFrame(lastImageByteArray, image.width, image.height, false);
        }
    } else {
        console.log("Invalid URL")
        var image = new Image();
        image.crossOrigin = "anonymous";
        image.src = "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg";
        image.onload = () => {
            var canvas = document.createElement('canvas');
            var ctx = canvas.getContext('2d');
            canvas.width = image.width;
            canvas.height = image.height;
            ctx.drawImage(image, 0, 0);
            var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            var lastImageByteArray = new Uint8Array(imageData.data.buffer);
            temp.processFrame(lastImageByteArray, image.width, image.height, false);
        }
    }

}

function clearEffect() {
    if (currentSlots.length != 0) {
        for (const iterator of currentSlots) {
            temp.clearEffect(iterator);
        }
        currentSlots = [];
    }
}

const isValidUrl = urlString => {
    var inputElement = document.createElement('input');
    inputElement.type = 'url';
    inputElement.value = urlString;

    if (!inputElement.checkValidity()) {
        return false;
    } else {
        return true;
    }
}

var currentSlots = [];
var buttonList = document.getElementsByClassName("effect-button");

var effects = [
    './effects/viking_helmet.deepar',
    './effects/MakeupLook.deepar',
    './effects/Split_View_Look.deepar',
    './effects/Stallone.deepar',
    './effects/flower_face.deepar',
    './effects/galaxy_background_web.deepar',
    './effects/Humanoid.deepar',
    './effects/Neon_Devil_Horns.deepar',
    './effects/Ping_Pong.deepar',
    './effects/Pixel_Hearts.deepar',
    './effects/Snail.deepar',
    './effects/Hope.deepar',
    './effects/Vendetta_Mask.deepar',
    './effects/Fire_Effect.deepar',
    './effects/Elephant_Trunk.deepar'
];

window.onload = function () {
    initializeDeepar();
    console.log("Loaded deepar initialization");
    for (let index = 0; index < buttonList.length; index++) {
        buttonList[index].onclick = function () {
            currentSlots.push(`slot${index}`);
            temp.switchEffect(0, `slot${index}`, effects[index])
        };
    }
}
