const textarea = document.getElementById("textarea"),
voiceList = document.querySelector("select"),
speechBtn = document.getElementById("button"),
work = document.getElementById("a");




let synth = speechSynthesis,
isSpeaking = true;


voices();
function test(){
textarea.value = `What is global warming?
Global warming occurs when carbon dioxide and other air pollutants collect in the earth's atmosphere. The term is used to describe the rising average temperatures on earth. It was first observed during the pre-industrial period, which took place between 1850 and 1900.
`;
}
function voices(){
    for(let voice of synth.getVoices()){
        let selected = voice.name === "Google US English" ? "selected" : "";
        let option = `<option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend", option);
    }
}

synth.addEventListener("voiceschanged", voices);

function textToSpeech(text){
    let utterance = new SpeechSynthesisUtterance(text);
    for(let voice of synth.getVoices()){
        if(voice.name === voiceList.value){
            utterance.voice = voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", e =>{
    e.preventDefault();
    if(textarea.value !== ""){
        if(!synth.speaking){
            textToSpeech(textarea.value);
        }
        if(textarea.value.length > 80){
            setInterval(()=>{
                if(!synth.speaking && !isSpeaking){
                    isSpeaking = true;
                  
                }else{
                }
            }, 500);
            if(isSpeaking){
                synth.resume();
                isSpeaking = false;
                speechBtn.innerText = "Pause Speech";
            }
            
            else{
                synth.pause();
                isSpeaking = true;
                speechBtn.innerText = "Resume Speech";
            }
        }
    }
});

