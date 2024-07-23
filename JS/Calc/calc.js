
let result;
let loses = 0;
let wons = 0;
let talbeString = "";
let lastAns = "";
let mainNumb1;
let mainNum2;
let loadingStatus = false;
let attempt = 0;

const statusbar = document.querySelector('#status');
const targil = document.querySelector("#exam");
const winningsamount = document.querySelector('#winsamount');
const losesamount = document.querySelector('#losesamount');
const table = document.querySelector('.tData');

let operator = document.querySelector('#operator').value;

let range = document.querySelector('#range').value;


function randomNum() { 
    range = document.getElementById('range').value;
    if(range == 0) {
        return Math.floor(Math.random() * 100);
    }
    else if(range == 1){
        return Math.floor(Math.random() * 1000);
    }
    else if (range == 2){
        return  Math.floor(Math.random() * 10);
    }
}

function generateTargil(num1, num2){
    if(operator == 0){
        return num1 + ' + ' + num2 +' = ?'; 
    }
    else if(operator == 1)
    {
        return num1 + ' - ' + num2 +' = ?'; 
    }
    else if(operator == 2)
    {
        return num1 + ' * ' + num2 +' = ?'; 
    }
    else if(operator == 3)
    {
        return num1 + ' / ' + num2 +' = ?'; 
    }

}
function generateResult(num1, num2){
    if(operator == 0){
        return num1 + num2; 
    }
    else if(operator == 1)
    {
        return num1- num2; 
    }
    else if(operator == 2)
    {
        return num1 * num2; 
    }
    else if(operator == 3)
    {
        return num1  / num2; 
    }
}

function NewExam(){
    let fNumber;
    let sNumber;
   
    operator = document.querySelector('#operator').value;
    fNumber = randomNum();
    sNumber = randomNum();
    result = generateResult(fNumber, sNumber);


    targil.innerHTML = generateTargil(fNumber, sNumber);
    console.log(generateTargil(fNumber, sNumber));
    statusbar.innerHTML = ".ענה על התשובה";

    mainNumb1 = fNumber;
    mainNumb2 = sNumber;


}

function AddTable()
{
    talbeString +=  `<tr>
    <td>${generateTargil(mainNumb1, mainNumb2)}</td>
    <td>${result}</td>
    <td>${lastAns}</td>
    </tr>`;
    table.innerHTML = talbeString;
}
document.getElementById('btnSend').addEventListener('click', () => {

    if(loadingStatus){
        return document.querySelector('#status').innerHTML = "אנא המתן, המערכת מכינה תרגיל!";
    }

    operator = document.querySelector('#operator').value;
    console.log(operator);
    let answer = document.querySelector('.exam-input').value;
    lastAns = answer;
    
    if(answer == result){

        wons++;
        document.querySelector('#status').innerHTML = "!כל הכבוד, זכית";
        winningsamount.innerHTML = wons;
        setTimeout(AddTable, 3000);
        setTimeout(NewExam, 3000);
        move();
        loadingStatus = true;
    }
    else{

        attempt++;
        losesamount.innerHTML = loses;
        document.querySelector('#status').innerHTML = attempt + "/3 :תשובה שגויה! ניסיונות שנותרו";

        if(attempt == 3)
        {
            attempt = 0;
            loses++;
            losesamount.innerHTML = loses;
            document.querySelector('#status').innerHTML = "!נכשלת יותר מידי פעמים, נסה תרגיל אחר";
            setTimeout(AddTable, 3000);
            setTimeout(NewExam, 3000);
            move();
            loadingStatus = true;
        }
    }

});

var i = 0;
function move() {
  if (i == 0) {
        i = 1;
        var elem = document.getElementById("myBar");
        var width = 1;
        var id = setInterval(frame, 30);
        function frame() {
        if (width >= 100) {
            clearInterval(id);
            loadingStatus = false;
            i = 0;
            elem.style.width = "1%";
            document.querySelector('.exam-input').value = '';
      } else {
            width++;
            elem.style.width = width + "%";

      }
    }
  }
}

NewExam();