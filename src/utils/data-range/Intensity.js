/**
 * @author kyle / http://nikai.us/
 */

/**
 * Category
 * @param {Object} [options]   Available options:
 *                             {Object} gradient: { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"}
 */
function Intensity(options) {
    options = options || {};
    this.gradient = options.gradient || { 0.25: "rgb(0,0,255)", 0.55: "rgb(0,255,0)", 0.85: "yellow", 1.0: "rgb(255,0,0)"};
    this.maxSize = options.maxSize || 35;
    this.max = options.max || 100;
}

Intensity.prototype.getColor = function (value) {
    var max = this.max;

    if (value > max) {
        value = max;
    }

    var gradient = this.gradient;

    var paletteCanvas = document.createElement('canvas');
    paletteCanvas.width = 256;
    paletteCanvas.height = 1;

    var paletteCtx = paletteCanvas.getContext('2d');

    var lineGradient = paletteCtx.createLinearGradient(0, 0, 256, 1);
    for (var key in gradient) {
        lineGradient.addColorStop(key, gradient[key]);
    }

    paletteCtx.fillStyle = lineGradient;
    paletteCtx.fillRect(0, 0, 256, 1);

    var index = Math.floor(value / max * (256 - 1)) * 4;
    var imageData = paletteCtx.getImageData(0, 0, 256, 1).data;
    return "rgba(" + imageData[index] + ", " + imageData[index + 1] + ", " + imageData[index + 2] + ", " + imageData[index + 3] + ")";
}

/**
 * @param Number value 
 * @param Number max of value
 * @param Number max of size
 * @param Object other options
 */
Intensity.prototype.getSize = function (value) {

    var size = 0;
    var max = this.max;
    var maxSize = this.maxSize;

    if (value > max) {
        value = max;
    }

    size = value / max * maxSize;

    return size;
}

export default Intensity;
