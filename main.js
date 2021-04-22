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
        difference = Math.floor(leftWristx - rightWristX);
        console.log('left wrist x = ' + leftWristX + 'right wrist x = ' + rightWristX + 'Difference' + difference);
    }
}

function draw() {
    background("grey");
     
    document.getElementById("shape_name").innerHTML = "Size of the shape is"+ difference+"px";
    stroke("black");
    fill("white");
    square( noseX, noseY, difference);
   
}