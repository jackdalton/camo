function CamoControls() {
    this.width = 500;
    this.height = 500;
    this.squareSize = 5;
    this.regenerate = function() {
        generateCamo();
    };
    this.color1 = "#BAAB94";
    this.color2 = "#53544C";
    this.color3 = "#737369";
}


var canvas = document.getElementById("maincanvas");
var context = canvas.getContext("2d");
var controls = new CamoControls();
var gui = new dat.GUI();
var colorFolder = gui.addFolder("Colors");

colorFolder.addColor(controls, "color1");
colorFolder.addColor(controls, "color2");
colorFolder.addColor(controls, "color3");

gui.add(controls, "width", 1, 2000);
gui.add(controls, "height", 1, 2000);
gui.add(controls, "squareSize", 5, 100);
gui.add(controls, "regenerate");

generateCamo();

gui.onChange = function(fn) {
    var i, j;

    for (i in this.__controllers)
        this.__controllers[i].onChange(fn);
    for (i in this.__folders)
        for (j in this.__folders[i].__controllers)
            this.__folders[i].__controllers[j].onChange(fn);
};

gui.onChange(generateCamo);

function generateCamo() {
    var squareSize = controls.squareSize;
    
    canvas.width = controls.width;
    canvas.height = controls.height;

    for (var i = 0; i < canvas.width; i += squareSize) {
        for (var j = 0; j < canvas.height; j += squareSize) {
            var colorNumber = Math.floor(Math.random() * (3)) + 1;
            var color = controls["color" + colorNumber];

            context.fillStyle = color;
            context.fillRect(i, j, squareSize, squareSize);
        }
    }
}
