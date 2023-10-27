status="";
object_name="";
object=[];
function setup(){
    canvas=createCanvas(480,380);
    canvas.center();
    video=createCapture(VIDEO);
    video.size(480,380);
    video.hide();
}
function start(){
    objectdetector=ml5.objectDetector("cocossd",modelloaded);
    document.getElementById("status").innerHTML="Status: Detecting Objects";
    object_name=document.getElementById("input_value").value;
}
function modelloaded(){
    console.log("Model is Loaded");
    status=true;
}
function draw(){
    image(video,0,0,480,380);
    if (status == "true"){
        objectdetector.detect(video,gotresults);

        for( i=0; i<object.length;i++){
            document.getElementById("status").innerHTML="Status: Objects Detected";
            fill("red");
            percent=floor(object[i].confidence *100);
            text(object[i].label+" "+percent+"%",object[i].x, object[i].y);
            noFill();
            stroke("red");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(object[i].label==object_name){
                document.getElementById("detect").innerHTML="Object Found";
                video.stop();
            }
            else{
                document.getElementById("detect").innerHTML="Object Not Found";
            }

        }
    }
}

function gotresults(error,results){
    if(error){
        console.log(error);
    }
    else{
        console.log(results);
        object=results;
    }
}