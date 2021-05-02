noseX = 0;
noseY = 0;
difference = 0;
leftWristX = 0;
rightWristX = 0;

function setup() {
    video = createCapture(VIDEO);
    video.size(500, 400);
    video.position(150, 175);
    canvas = createCanvas(500, 400);
    canvas.position(700, 175);
    posenet = ml5.poseNet(video, modelLoaded);
    posenet.on("pose", getPoses);
}

function modelLoaded() {
    console.log("Model Loaded");

}

function getPoses(results) {
    if (results.length > 0) {
        console.log(results);
        noseX = results[0].pose.nose.x;
        noseY = results[0].pose.nose.y;
        console.log("nose X = " + noseX + " Nose Y = " + noseY);
        leftWristX = results[0].pose.leftWrist.x;
        rightWristX = results[0].pose.rightWrist.x;
        difference = Math.floor(leftWristX - rightWristX);
        console.log('left wrist x = ' + leftWristX + 'right wrist x = ' + rightWristX + 'Difference' + difference);
    }
}

function draw() {
    background("grey");
    shape = document.getElementById("select").value;
    document.getElementById("shape_name").innerHTML = "Size of the " + shape + " is" + difference + " px";
    stroke("black");
    fill("white");
    if (shape == "Square") {
        square(noseX, noseY, difference);
    };
    if (shape == "Circle") {
        circle(noseX, noseY, difference);
    }
    if (shape == "Rectangle") {
        Breadth = difference * 0.66;
        rect(noseX, noseY, difference, Breadth);

    }
    if (shape == "Triangle") {
        difference_1 = difference / 2;
        X1 = noseX - difference_1;
        X3 = noseX + difference_1;
        y = noseY + difference_1;
        triangle(X1, y, noseX, noseY, X3, y);
    }
    if(shape=="Flower"){
        noStroke();
        translate(noseX, noseY);
        for(var i=0; i < 10; i++){
            ellipse(0,20,20,difference);
            rotate(PI / 5);
        }
    }


}
