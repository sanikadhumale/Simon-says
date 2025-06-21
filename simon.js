let gamSeq=[];
let userSeq=[];
let buttons=["yellow","red","purple","blue"];
let started=false;
let level=0;
let score=0;

let h2=document.querySelector("h2");
let h4=document.querySelector("h4");

let startBtn = document.getElementById("startBtn");

startBtn.addEventListener("click", function () {
    if (!started) {
        console.log("game started");
        started = true;
        levelup();
        startBtn.style.display = "none"; // hide after game starts
    }
});

function gameFlash(btn){
    btn.classList.add("flash");
    setTimeout(function(){
        btn.classList.remove("flash");
    },250);
}

function userFlash(btn){
    btn.classList.add("userFlash");
    setTimeout(function(){
        btn.classList.remove("userFlash");
    },250);
}

function levelup(){
    userSeq=[];
    level++;
    h2.innerText=`level ${level}`;
    h4.innerText=`Highest Score= ${score}`;
    let randomidx=Math.floor(Math.random()*3);
    let randomColor=buttons[randomidx];
    let randombtn=document.querySelector(`.${randomColor}`);
    gamSeq.push(randomColor);
    gameFlash(randombtn);
}

function btnPress(){
    let btn=this;
    userFlash(btn);

    userColor=btn.getAttribute("id");
    userSeq.push(userColor);

    checkAns(userSeq.length-1);

}

function checkAns(idx)
{   
    if(userSeq[idx]==gamSeq[idx]){
        if(userSeq.length==gamSeq.length){
            setTimeout(levelup,1000);
        }
    }else{
        h2.innerHTML=`game over!<b> Your Score was ${level} <b><br>Press any key to start`;
        let body=document.querySelector("body");
        body.style.backgroundColor="red";
        setTimeout(function(){
            let body=document.querySelector("body");
            body.style.backgroundColor="white"
        },150);
        reset();
    }
}
let allBtns=document.querySelectorAll(".btn");
for(btn of allBtns){
    btn.addEventListener("click",btnPress);
}

function reset(){
    started=false;
    gamSeq=[];
    userSeq=[];
    if(score<level){
        score=level;
    }
    level=0;
    startBtn.style.display = "block";
}
