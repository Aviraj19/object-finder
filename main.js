status1=""
objects=[]
label=""
function preload() {
}
function setup() {
    canvas=createCanvas(380,380)
    canvas.center();
    video=createCapture(VIDEO)
    video.size(380,380)
    video.hide()
}
function Start() {
    objectdetector=ml5.objectDetector("cocossd", modelloaded)
    document.getElementById("status").innerHTML="status : detecting objects"
    label=document.getElementById("input1").value
}
 function modelloaded() {
     console.log("Model is loaded")
     status1=true
 }
 function getresult(error,results) {
     if (error) {
         console.log("error")
     }
     else {
        console.log(results)
        objects = results
     }
 }
 function draw() {
    image(video,0,0,380,380)
    if (status1 !="") {
        objectdetector.detect(video,getresult)
        for(i=0;i<objects.length;i++) {
            r=random(255)
            g=random(255)
            b=random(255)
         fill(r,g,b)
         percent=floor(objects[i].confidence*100)
         text(objects[i].label+" "+ percent+"%",objects[i].x,objects[i].y)
         textSize(30)
         noFill()
         stroke(r,g,b)
         rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
         document.getElementById("status").innerHTML="status : objects detected"
         if (label==objects[i].label) {
            document.getElementById("objects_no").innerHTML="Object found";
         }
         else {
            document.getElementById("objects_no").innerHTML="Object not found"
         }
        }
    }
}