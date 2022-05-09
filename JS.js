//Язык раскладки

let lang = "";
let isCaps = false;
let isCapsPressed = false;
let isShiftPressed = false;
let isLShifePressed = false;
let isAltPressed = false;
let cursorPosition = 0;
let textAreaText = "";

let keyboard;

let KeysArray = new Array(); 
function MouseDownHandler(event){
   
    let key = KeysArray.filter((item) => item.GetKey() == event.currentTarget);
    let TA = document.getElementById("textArea");
    if(TA.selectionStart!=0){cursorPosition = TA.selectionStart;}
    
    if(key.length>0){
    key[0].Key.className ="key pressed";  
    let pos = TA.selectionStart;  
   
   TA.textContent =  TA.textContent.substring(0,cursorPosition) +key[0].GetChar() + TA.textContent.substring(cursorPosition);
   cursorPosition+=1;
    TA.selectionStart +=cursorPosition;
}
}
function MouseUpHandler(event){
    let key = KeysArray.filter((item) => item.GetKey() == event.currentTarget);
  
    if(key.length>0){
    key[0].Key.className ="key";  
   
}
}
function MouseLeaveHandler(event){
  
    let key = KeysArray.filter(item=>item.GetKey() == event.currentTarget)[0];  
    if( key.Code!="CapsLock") {
    key.GetKey().className ="key"; 
    }
}

function MouseDownControlHandler(event){
    let TA = document.getElementById("textArea");   
    let key = KeysArray.filter((item) => item.GetKey() == event.currentTarget)[0];   
    let code = key.Code;
    console.log(code);   
    let type = key.Type;
    if(type == "control"){
 
    key.GetKey().className ="key pressed";     
    if(code == "CapsLock"){
       isCapsPressed = isCapsPressed ==true ? false:true;
       setKeyboard();      
    }
  if(code == 'ShiftLeft'){
      isShiftPressed = true;
      setKeyboard();
     } 
     if(code == 'ShiftRight'){
        isShiftPressed = true;
        setKeyboard();
       } 
     if(code == 'AltLeft'){
        isAltPressed = true;
        TA.focus();
        setKeyboard();
       } 
    if(code == "AltRight"){
        TA.focus();
        
    }
  
  if(isShiftPressed && isAltPressed){
      changeLanuage();
  }




if(code == "Backspace"){
    let pos = TA.selectionStart;  
    TA.textContent =  TA.textContent.substring(0,pos-1) + TA.textContent.substring(pos);
      TA.selectionStart +=pos-1;
 }
 if(code == "Delete"){
    let pos = TA.selectionStart;  
    TA.textContent =  TA.textContent.substring(0,pos) + TA.textContent.substring(pos+1);
      TA.selectionStart +=pos;
 }
  
 if(code == "Enter"){
    let pos = TA.selectionStart;  
    TA.textContent =  TA.textContent.substring(0,pos) +'\n'+ TA.textContent.substring(pos);
    TA.selectionStart +=pos+1;
     
}
if(code == "Space"){
    let pos = TA.selectionStart;  
    TA.textContent =  TA.textContent.substring(0,pos) +' '+ TA.textContent.substring(pos);
    TA.selectionStart +=pos+1;
     
}
if(code == "Tab"){
    let pos = TA.selectionStart;  
    TA.textContent =  TA.textContent.substring(0,pos) +'\t'+ TA.textContent.substring(pos);
    TA.selectionStart +=pos+1; 
}
    }
 
}
function MouseUpControlHandler(event){

    let TA = document.getElementById("textArea");   
    let key = KeysArray.filter((item) => item.GetKey() == event.currentTarget)[0];   
    key.GetKey().className = "key";
    let code = key.Code;
   
    let type = key.Type;
    if(code == 'ShiftLeft'){
        isShiftPressed = false;
         setKeyboard();         
    }    
     if(code == 'ShiftRight'){
        isShiftPressed = false;
         setKeyboard();         
    }      
   
    
    
    if(code == "CapsLock"){
        console.log(isCapsPressed);
        key.GetKey().className = isCapsPressed == true? "key pressed" : "key"; 
        setKeyboard();       
     } 
     else{
       
     }
  
     if(code == 'AltLeft'){
        isAltPressed = true;
        
       } 
    if(code == "AltRight"){
              
    }
}

 class KeyboardKey{
     Key
    constructor(ru,en,ruS,enS,type,code)
    {

    this.Ru = ru;
    this.En = en;
    this.RuS = ruS;
    this.EnS = enS;
     this.Type = type;
     this.Code = code;
     this.Key =  document.createElement('div');  
     this.Key.className = "key";
    
    if( type == "swichable" ){     
        let labelBase = document.createElement('label'); labelBase.className="char-base"
        labelBase.innerText = ruS;
        let labelPrimary = document.createElement('label');labelPrimary.className = "char-primary"
        labelPrimary.innerText = ru;
        this.Key.appendChild(labelBase);
        this.Key.appendChild(labelPrimary);
        let span =document.createElement('span')
        this.Key.appendChild(span);
        this.Key.addEventListener("mousedown", MouseDownHandler);
        this.Key.addEventListener("mouseup", MouseUpHandler);
        this.Key.addEventListener("mouseleave" , MouseLeaveHandler);
       }
       if( type == "swichableNum" ){     
        let labelBase = document.createElement('label'); labelBase.className="char-base"
        labelBase.innerText = ruS;
        let labelPrimary = document.createElement('label');labelPrimary.className = "char-primary"
        labelPrimary.innerText = ru;
        this.Key.appendChild(labelBase);
        this.Key.appendChild(labelPrimary);
        let span =document.createElement('span')
        this.Key.appendChild(span);
        this.Key.addEventListener("mousedown", MouseDownHandler);
        this.Key.addEventListener("mouseup", MouseUpHandler);
        this.Key.addEventListener("mouseleave" , MouseLeaveHandler);
       }
    if(type == "Noswichable"){
        let labelBase = document.createElement('label'); labelBase.className="char-base"
        labelBase.innerText = '';
        let labelPrimary = document.createElement('label');labelPrimary.className = "char-primary"
        labelPrimary.innerText = ru;
        this.Key.appendChild(labelBase);
        this.Key.appendChild(labelPrimary);
        let span =document.createElement('span')
        this.Key.appendChild(span);
        this.Key.addEventListener("mousedown", MouseDownHandler);
        this.Key.addEventListener("mouseup", MouseUpHandler);
        this.Key.addEventListener("mouseleave" , MouseLeaveHandler);
    }
    if(type == "control"){
        let labelBase = document.createElement('label'); labelBase.className="char-base"
        labelBase.innerText = '';
        let labelPrimary = document.createElement('label');labelPrimary.className = "char-primary"
        labelPrimary.innerText = ru;
        this.Key.appendChild(labelBase);
        this.Key.appendChild(labelPrimary);
        let span =document.createElement('span')
        this.Key.appendChild(span);
        this.Key.addEventListener("mousedown", MouseDownControlHandler);
        this.Key.addEventListener("mouseup", MouseUpControlHandler);
        this.Key.addEventListener("mouseleave" , MouseLeaveHandler);
    }

    

     
}
    GetKey(){return this.Key;}
    GetChar(){
        let char;
        
        if(lang == "Ru"){
            char = isCaps ==true ? this.RuS : this.Ru;
        }
        if(lang == "En"){
            char = isCaps ==true ? this.EnS : this.En;
        }
        return char
        }
}



window.addEventListener("load", function(){
    
    if(localStorage.getItem('lang') ==='Ru'){
        lang = 'En';
        changeLanuage();
    }
    else{
        lang='Ru';
        changeLanuage();
    }

    var link = document.createElement('link'); 
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'style.css';

document.getElementsByTagName('HEAD')[0].appendChild(link); 
 
  let textcontainer = this.document.createElement('div');
  textcontainer.className = "text-container";

   let textArea = this.document.createElement('textarea');
  textArea.id= "textArea";textArea.onkeydown = "return false"; textArea.className="text-Area";
  textcontainer.appendChild(textArea);
  
 let title = this.document.createElement('div');
 title.id = 'divtitle';
 title.innerText = 'Переключение языков: Левый Alt + Левый Shift';
 let p = this.document.createElement('p');
 this.document.body.appendChild(p);
  this.document.body.appendChild(p);
  this.document.body.appendChild(p);
  this.document.body.appendChild(p);
document.body.appendChild(title);
 textcontainer.appendChild(p);
  
  textcontainer.appendChild(p);
  textcontainer.appendChild(p);
  
  this.document.body.appendChild(p);
  this.document.body.appendChild(p);
  this.document.body.appendChild(textcontainer);
  this.document.body.appendChild(p);
  this.document.body.appendChild(p);
  this.document.body.appendChild(p);
  this.document.body.appendChild(p);

  let keyboardgridcontainer = this.document.createElement('div');
  keyboardgridcontainer.className="keyboard-grid-container";
  let row1 = this.document.createElement('div');row1.id = "row1";
  let row2 = this.document.createElement('div');row2.id = "row2";
  let row3 = this.document.createElement('div');row3.id = "row3";
  let row4 = this.document.createElement('div');row4.id = "row4";
  let row5 = this.document.createElement('div');row5.id = "row5";
  keyboardgridcontainer.appendChild(row1);
  keyboardgridcontainer.appendChild(row2);
  keyboardgridcontainer.appendChild(row3);
  keyboardgridcontainer.appendChild(row4);
  keyboardgridcontainer.appendChild(row5);
   this.document.body.appendChild(keyboardgridcontainer);
GenerateKeyboard();
this.document.addEventListener('keydown' , keyDownHandler)
this.document.addEventListener('keyup' , keyUpHandler)


});


function changeLanuage(){
    lang = lang === "Ru"? "En" : "Ru";
    localStorage.setItem('lang',lang);
KeysArray
if(lang == "Ru")
{
    let keys1  = KeysArray.filter((item)=>item.Type =="swichable");
    keys1.forEach((item)=>{
                item.Key.querySelectorAll('label')[0].textContent = item.En;
                item.Key.querySelectorAll('label')[1].textContent = item.Ru;
    })
    let keys2  = KeysArray.filter((item)=>item.Type =="swichableNum");
    keys2.forEach((item)=>{
                item.Key.querySelectorAll('label')[0].textContent = item.RuS;
                item.Key.querySelectorAll('label')[1].textContent = item.Ru;
    })
}
if(lang == "En")
{
    let keys1  = KeysArray.filter((item)=>item.Type =="swichable");
    keys1.forEach((item)=>{
                item.Key.querySelectorAll('label')[0].textContent = item.Ru;
                item.Key.querySelectorAll('label')[1].textContent = item.En;
    })
    let keys2  = KeysArray.filter((item)=>item.Type =="swichableNum");
    keys2.forEach((item)=>{
                item.Key.querySelectorAll('label')[0].textContent = item.EnS;
                item.Key.querySelectorAll('label')[1].textContent = item.En;
    })
}


}

function setKeyboard(){   
   
    if(isCapsPressed){
        isCaps = isShiftPressed == true ? false :true; 
    }
    if(!isCapsPressed){
        isCaps = isShiftPressed; 
    }
    if(lang == "Ru")
{
    let keys1  = KeysArray.filter((item)=>item.Type =="swichable");
    keys1.forEach((item)=>{
        
                item.Key.querySelectorAll('label')[0].textContent = item.En;
                item.Key.querySelectorAll('label')[1].textContent = item.Ru;
                if(isCaps ==true){
                    item.Key.querySelectorAll('label')[0].textContent = item.EnS;
                item.Key.querySelectorAll('label')[1].textContent = item.RuS;
                }
    })
    let keys2  = KeysArray.filter((item)=>item.Type =="swichableNum");
    keys2.forEach((item)=>{
                item.Key.querySelectorAll('label')[0].textContent = item.RuS;
                item.Key.querySelectorAll('label')[1].textContent = item.Ru;
                if(isCaps==true){
                    item.Key.querySelectorAll('label')[1].textContent = item.RuS;
                    item.Key.querySelectorAll('label')[0].textContent = item.Ru;
                }
    })
}
if(lang == "En")
{
    let keys1  = KeysArray.filter((item)=>item.Type =="swichable");
    keys1.forEach((item)=>{
        
                item.Key.querySelectorAll('label')[0].textContent = item.Ru;
                item.Key.querySelectorAll('label')[1].textContent = item.En;
                if(isCaps ==true){
                    item.Key.querySelectorAll('label')[0].textContent = item.RuS;
                item.Key.querySelectorAll('label')[1].textContent = item.EnS;
                }
    })
    let keys2  = KeysArray.filter((item)=>item.Type =="swichableNum");
    keys2.forEach((item)=>{
                item.Key.querySelectorAll('label')[0].textContent = item.EnS;
                item.Key.querySelectorAll('label')[1].textContent = item.En;
                if(isCaps==true){
                    item.Key.querySelectorAll('label')[1].textContent = item.EnS;
                    item.Key.querySelectorAll('label')[0].textContent = item.En;
                }
    })
}




}

function  keyDownHandler (event){
    let code = event.code;
  
    let TA = document.getElementById("textArea");
  
   
    let key = KeysArray.filter(item=>item.Code == code)[0];
    let type = key.Type;
    if(type == "control"){
 
    key.GetKey().className ="key pressed";  
   
    if(code == "CapsLock"){
       isCapsPressed = isCapsPressed ==true ? false:true;
     
      
    }
  if(code == 'ShiftLeft'){
      isShiftPressed = true;
      isLShifePressed = true;
       setKeyboard();
     } 
     if(code == 'ShiftRight'){
        isShiftPressed = true;
       setKeyboard();
       } 
     if(code == 'AltLeft'){
        isAltPressed = true;
        TA.focus();
       
       } 
    if(code == "AltRight"){
        TA.focus();
        
    }
  
  if(isLShifePressed && isAltPressed){
      changeLanuage();
  }




if(code == "Backspace"){
    let pos = TA.selectionStart;  
    TA.textContent =  TA.textContent.substring(0,pos-1) + TA.textContent.substring(pos);
      TA.selectionStart +=pos-1;
 }
 if(code == "Delete"){
    let pos = TA.selectionStart;  
    TA.textContent =  TA.textContent.substring(0,pos) + TA.textContent.substring(pos+1);
      TA.selectionStart +=pos;
 }
  
 if(code == "Enter"){
    let pos = TA.selectionStart;  
    TA.textContent =  TA.textContent.substring(0,pos) +'\n'+ TA.textContent.substring(pos);
    TA.selectionStart +=pos+1;     
}
if(code == "Space"){
    let pos = TA.selectionStart;  
    TA.textContent =  TA.textContent.substring(0,pos) +' '+ TA.textContent.substring(pos);
    TA.selectionStart +=pos+1;     
}
if(code == "Tab"){
    let pos = TA.selectionStart;  
    TA.textContent =  TA.textContent.substring(0,pos) +'\t'+ TA.textContent.substring(pos);
    TA.selectionStart +=pos+1; 
}
    }
    else{


    key.GetKey().className ="key pressed";  
  let pos = TA.selectionStart;  
  TA.textContent =  TA.textContent.substring(0,pos) +key.GetChar() + TA.textContent.substring(pos);
    TA.selectionStart +=pos+1;
    }
    setKeyboard();
}
function  keyUpHandler (event){   
    if(event.code == 'ShiftLeft'){
        isShiftPressed = false;
        isLShifePressed = false;      
                 
    }    
     if(event.code == 'ShiftRight'){
        isShiftPressed = false;
       
    }    
    let code = event.code;
    let key = KeysArray.filter(item=>item.Code == code)[0].GetKey();
    
    
    if(code == "CapsLock"){
        console.log(isCapsPressed);
        key.className = isCapsPressed == true? "key pressed" : "key"; 
          
     } 
     else{
        key.className = "key";
     }
     let TA = document.getElementById("textArea");
     if(code == 'AltLeft'){
        isAltPressed = false;
        window.focus();
        TA.focus();
      
       } 
    if(code == "AltRight"){
        TA.focus();
        window.focus();        
    }
    setKeyboard();
    }

   function GenerateKeyboard(){
   
    let k1_1 = new KeyboardKey('ё','`','Ё' ,'~',  'swichableNum' , 'Backquote');
    let k1_2 = new KeyboardKey('1','1','!' ,'!','swichableNum','Digit1');
    let k1_3 = new KeyboardKey('2','2','"' ,'@','swichableNum','Digit2');
    let k1_4 = new KeyboardKey('3','3','№' ,'#','swichableNum','Digit3');
    let k1_5 = new KeyboardKey('4','4',';' ,'$','swichableNum','Digit4');
    let k1_6 = new KeyboardKey('5','5','%' ,'%','swichableNum','Digit5');
    let k1_7 = new KeyboardKey('6','6',':' ,'^','swichableNum','Digit6');
    let k1_8 = new KeyboardKey('7','7','?' ,'&','swichableNum','Digit7');
    let k1_9 = new KeyboardKey('8','8','*' ,'*','swichableNum','Digit8');
    let k1_10 = new KeyboardKey('9','9','(' ,'(','swichableNum','Digit9');
    let k1_11 = new KeyboardKey('0','0',')' ,')','swichableNum','Digit0');
    let k1_12 = new KeyboardKey('-','-','_' ,'_','swichableNum','Minus');
    let k1_13 = new KeyboardKey('=','=','+' ,'+','swichableNum','Equal');
    let k1_14 = new KeyboardKey('Backspace','Backspace','Backspace' ,'Backspace','control','Backspace');
    KeysArray.push(k1_1);
    KeysArray.push(k1_2);
    KeysArray.push(k1_3);
    KeysArray.push(k1_4);
    KeysArray.push(k1_5);
    KeysArray.push(k1_6);
    KeysArray.push(k1_7);
    KeysArray.push(k1_8);
    KeysArray.push(k1_9);
    KeysArray.push(k1_10);
    KeysArray.push(k1_11);
    KeysArray.push(k1_12);
    KeysArray.push(k1_13);
    KeysArray.push(k1_14);
    
    let row1 = this.document.getElementById("row1");
    for(let i = 0 ; i<14;i++){
        let node = KeysArray[i].GetKey();
        row1.appendChild(node);
    }


     let row2 = this.document.getElementById("row2");
    let k2_0 = new KeyboardKey('Tab','Tab','Tab' ,'Tab',  'control' , 'Tab');  
    let k2_1 = new KeyboardKey('й','q','Й' ,'Q',  'swichable' ,'KeyQ' );
    let k2_2 = new KeyboardKey('ц','w','Ц' ,'W','swichable','KeyW' );
    let k2_3 = new KeyboardKey('у','e','У' ,'E','swichable','KeyE' );
    let k2_4 = new KeyboardKey('к','r','К' ,'R','swichable','KeyR' );
    let k2_5 = new KeyboardKey('е','t','Е' ,'T','swichable','KeyT' );
    let k2_6 = new KeyboardKey('н','y','Н' ,'Y','swichable','KeyY' );
    let k2_7 = new KeyboardKey('г','u','Г' ,'U','swichable','KeyU' );;
    let k2_8 = new KeyboardKey('ш','i','Ш' ,'I','swichable','KeyI' );;
    let k2_9 = new KeyboardKey('щ','o','Щ' ,'O','swichable','KeyO' );
    let k2_10 = new KeyboardKey('з','p','З' ,'P','swichable','KeyP' );
    let k2_11 = new KeyboardKey('х','[','Х' ,'{','swichable','BracketLeft' );
    let k2_12 = new KeyboardKey('ъ',']','Ъ' ,'}','swichable','BracketRight' );
    let k2_13 = new KeyboardKey("/" ,"\\",'/' ,'|','swichable','Backslash' );
    let k2_14 = new KeyboardKey("Del" ,"Del",'Del' ,'Del','control','Delete' );
    KeysArray.push(k2_0);
    KeysArray.push(k2_1);
    KeysArray.push(k2_2);
    KeysArray.push(k2_3);
    KeysArray.push(k2_4);
    KeysArray.push(k2_5);
    KeysArray.push(k2_6);
    KeysArray.push(k2_7);
    KeysArray.push(k2_8);
    KeysArray.push(k2_9);
    KeysArray.push(k2_10);
    KeysArray.push(k2_11);
    KeysArray.push(k2_12);
    KeysArray.push(k2_13);
    KeysArray.push(k2_14);

    for(let i = 14 ; i<29;i++){
        let node = KeysArray[i].GetKey();
        row2.appendChild(node);
    }

let row3 = this.document.getElementById("row3");

let k3_0 = new KeyboardKey('CapsLock','CapsLock','CapsLock' ,'CapsLock',  'control','CapsLock' );
 let k3_1 = new KeyboardKey('ф','a','ф' ,'A',  'swichable','KeyA' );
 let k3_2 = new KeyboardKey('ы','s','Ы' ,'S','swichable','KeyS' );
 let k3_3 = new KeyboardKey('в','d','В' ,'D','swichable','KeyD' );
 let k3_4 = new KeyboardKey('а','f','А' ,'F','swichable','KeyF' );
 let k3_5 = new KeyboardKey('п','g','П' ,'G','swichable','KeyG' );
 let k3_6 = new KeyboardKey('р','h','Р' ,'H','swichable','KeyH' );;
 let k3_7 = new KeyboardKey('о','j','О' ,'J','swichable','KeyJ' );
 let k3_8 = new KeyboardKey('л','k','Л' ,'K','swichable','KeyK' );
 let k3_9 = new KeyboardKey('д','l','Д' ,'L','swichable','KeyL' );
 let k3_10 = new KeyboardKey('ж',';','Ж' ,':','swichable','Semicolon' );
 let k3_11 = new KeyboardKey('э','\'','Э' ,'"','swichable','Quote' );
 let k3_12 = new KeyboardKey('Enter','Enter','Enter' ,'Enter','control','Enter' );
 KeysArray.push(k3_0);
 KeysArray.push(k3_1);
 KeysArray.push(k3_2);
 KeysArray.push(k3_3);
 KeysArray.push(k3_4);
 KeysArray.push(k3_5);
 KeysArray.push(k3_6);
 KeysArray.push(k3_7);
 KeysArray.push(k3_8);
 KeysArray.push(k3_9);
 KeysArray.push(k3_10);
 KeysArray.push(k3_11);
 KeysArray.push(k3_12);
 for(let i = 29 ; i<42;i++){
     let node = KeysArray[i].GetKey();
     row3.appendChild(node);
 }

 let row4 = this.document.getElementById("row4");

let k4_0 = new KeyboardKey('Shift','Shift','Shift' ,'Shift',  'control','ShiftLeft' );
let k4_1 = new KeyboardKey('я','z','Я' ,'Z',  'swichable','KeyZ' );
let k4_2 = new KeyboardKey('ч','x','Ч' ,'X','swichable','KeyX' );
let k4_3 = new KeyboardKey('с','c','С' ,'C','swichable','KeyC' );
let k4_4 = new KeyboardKey('м','v','М' ,'V','swichable','KeyV' );
let k4_5 = new KeyboardKey('и','b','И' ,'B','swichable','KeyB' );
let k4_6 = new KeyboardKey('т','n','Т' ,'N','swichable','KeyN' );
let k4_7 = new KeyboardKey('ь','m','Ь' ,'M','swichable','KeyM' );
let k4_8 = new KeyboardKey('б',',','Б' ,'<','swichable','Comma' );
let k4_9 = new KeyboardKey('ю','.','Ю' ,'>','swichable','Period' );
let k4_10 = new KeyboardKey('.','/',',' ,'?','swichable','Slash' );
let k4_11 = new KeyboardKey('▲','▲','▲' ,'▲','Noswichable' , 'ArrowUp');
let k4_12 = new KeyboardKey('Shift','Shift','Shift' ,'Shift',  'control','ShiftRight' );
KeysArray.push(k4_0);
KeysArray.push(k4_1);
 KeysArray.push(k4_2);
 KeysArray.push(k4_3);
 KeysArray.push(k4_4);
 KeysArray.push(k4_5);
 KeysArray.push(k4_6);
 KeysArray.push(k4_7);
 KeysArray.push(k4_8);
 KeysArray.push(k4_9);
 KeysArray.push(k4_10);
 KeysArray.push(k4_11);
 KeysArray.push(k4_12);
for(let i = 42 ; i<55;i++){
    let node = KeysArray[i].GetKey();
    row4.appendChild(node);
}

 let row5 = this.document.getElementById("row5");

let k5_1 = new KeyboardKey('Ctrl','Ctrl','Ctrl' ,'Ctrl','control', 'ControlLeft');
let k5_2 = new KeyboardKey('Win','Win','Win' ,'Win','control', 'MetaLeft');
let k5_3 = new KeyboardKey('Alt','Alt','Alt' ,'Alt','control', 'AltLeft');
let k5_4 = new KeyboardKey('','','' ,'','control', 'Space');
let k5_5 = new KeyboardKey('Alt','Alt','Alt' ,'Alt','control', 'AltRight');
let k5_6 = new KeyboardKey('◄','◄','◄' ,'◄','Noswichable','ArrowLeft');
let k5_7 = new KeyboardKey('▼','▼','▼' ,'▼','Noswichable', 'ArrowDown');
let k5_8 = new KeyboardKey('►','►','►' ,'►','Noswichable','ArrowRight');
let k5_9 = new KeyboardKey('Ctrl','Ctrl','Ctrl' ,'Ctrl','control', 'ControlRight');
KeysArray.push(k5_1);row5.appendChild(k5_1.GetKey());
KeysArray.push(k5_2);row5.appendChild(k5_2.GetKey());
KeysArray.push(k5_3);row5.appendChild(k5_3.GetKey());
KeysArray.push(k5_4);row5.appendChild(k5_4.GetKey());
KeysArray.push(k5_5);row5.appendChild(k5_5.GetKey());
KeysArray.push(k5_6);row5.appendChild(k5_6.GetKey());
KeysArray.push(k5_7);row5.appendChild(k5_7.GetKey());
KeysArray.push(k5_8);row5.appendChild(k5_8.GetKey());
KeysArray.push(k5_9);row5.appendChild(k5_9.GetKey());


   }
   

