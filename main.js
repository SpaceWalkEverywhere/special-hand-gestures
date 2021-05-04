Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
cam=document.getElementById("cam");
Webcam.attach("#cam");
pr1="";
pr2="";
function snap(){
    Webcam.snap(function(data_URI){
        document.getElementById("snapshot").innerHTML='<img src="'+data_URI+'" id="res_img" class="img-responsive">';
    })
}
classify=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/nqni5SxQj/model.json',modell);
function modell(){
    console.log("Wooooohooooo! Model Loaded")
}
function speak(){
    var speakk=window.speechSynthesis;
    predsp1="The first prediction is - "+pr1;
    predsp2="The second prediction is - "+pr2;
    pls_utter= new SpeechSynthesisUtterance(predsp1+predsp2);
    speakk.speak(pls_utter);
}
function check() {
    img_saved=document.getElementById("res_img");
    classify.classify(img_saved,gr);
}
function gr(error,result) {
    if (error) {
        console.error("errrrorrrr !!! Malfunctionnnnn");
    }
    else {
        console.log(result);
        document.getElementById("en1").innerHTML=result[0].label;
        document.getElementById("en2").innerHTML=result[1].label;
        pr1=result[0].label;
        pr2=result[1].label;
        speak()
        if(pr1=="Thumbsup"){
            document.getElementById("upd-emg1").innerHTML="👍";
        }
        else if(pr1=="Yo"){
            document.getElementById("upd-emg1").innerHTML="🤟";
        }
        else if(pr1=="Hi"){
            document.getElementById("upd-emg1").innerHTML="✋";
        }
        else if (pr1=="Nothing"){
            document.getElementById("upd-emg1").innerHTML="<p style='color:black;'>no gesture found try a new gesture or pls move of the frame!!!</p>";
        }
        if(pr2=="Thumbsup"){
            document.getElementById("upd-emg2").innerHTML="👍";
        }
        else if(pr2=="Yo"){
            document.getElementById("upd-emg2").innerHTML="🤟";
        }
        else if(pr2=="Hi"){
            document.getElementById("upd-emg2").innerHTML="✋";
        }
        else if (pr1=="Nothing"){
            document.getElementById("upd-emg2").innerHTML="<p style='color:black;'>no gesture found try a new gesture or pls move of the frame!!!</p>";
        }
    }
}

