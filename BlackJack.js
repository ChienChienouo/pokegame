var suit = ["s","h","d","c"]; //存放花色陣列
var gameData=new Array(52);
var player1 =new Array();
var Computer =new Array();
var player=true;
var p1=0;
var Com=0;
var p1money;
var Commoney;
var chip=0;
var poke=0;

//遊戲啟動
function startGame(){
    document.getElementsByClassName('mask')[0].style.display="none";
    initial();   //初始化全域變數及資料
    shuffle(gameData);  //對遊戲資料進行洗牌
    player1 = [getNewCard(gameData,"player1")];
    Computer = [getNewCard(gameData,"Computer")];
    document.getElementById("player1").innerHTML=p1;
    document.getElementById("Computer").innerHTML="?";
}
//檢查是否爆炸
function checkpoint(player){
    if(player){
        if(p1>21){
            str="遊戲結果\n恭喜完成遊戲\n恭喜Computer獲勝\n<button onclick='startGame()'>繼續遊戲</button>";
            document.getElementsByClassName('intro')[0].innerHTML=str;
            document.getElementsByClassName('mask')[0].style.display="block";
            document.getElementById("p1Money").innerHTML=parseInt(p1money)-(chip*100);
            document.getElementById("ComMoney").innerHTML=parseInt(Commoney)+(chip*100);
        }
    }
    else{
        if(Com>21){
            str="遊戲結果\n恭喜完成遊戲\n恭喜Player1玩家獲勝\n<button onclick='startGame()'>繼續遊戲</button>";
            document.getElementsByClassName('intro')[0].innerHTML=str;
            document.getElementsByClassName('mask')[0].style.display="block";
            document.getElementById("p1Money").innerHTML=parseInt(p1money)+(chip*100);
            document.getElementById("ComMoney").innerHTML=parseInt(Commoney)-(chip*100);
        }
        else if(Com>p1){
            str="遊戲結果\n恭喜完成遊戲\n恭喜Computer獲勝\n<button onclick='startGame()'>繼續遊戲</button>";
            document.getElementsByClassName('intro')[0].innerHTML=str;
            document.getElementsByClassName('mask')[0].style.display="block";
            document.getElementById("p1Money").innerHTML=parseInt(p1money)-(chip*100);
            document.getElementById("ComMoney").innerHTML=parseInt(Commoney)+(chip*100);
        }
        else if(Com==21&&p1==21){
            str="遊戲結果\n恭喜完成遊戲\n恭喜平手\n<button onclick='startGame()'>繼續遊戲</button>";
            document.getElementsByClassName('intro')[0].innerHTML=str;
            document.getElementsByClassName('mask')[0].style.display="block";
        }
        else{
            hitMe();
        }
    }
}
//加牌
function hitMe(){
    var Card = document.createElement("img");
    Card.setAttribute("src","./image/"+suit[Math.floor(gameData[poke]/13)] +(gameData[poke]%13+1)+".gif");
    let point=0;
    if((gameData[poke]%13+1)>10){
        point=10;
    }
    else if(((gameData[poke]%13+1)==1)&&((player&&p1+11<=21)||(!player&&Com+11<=21))){
        
        point=11;
    }
    else{
        point=gameData[poke]%13+1;
    }
    if(player){
        p1+=point;
        document.querySelector("#player1poke").appendChild(Card);
        document.getElementById("player1").innerHTML=p1;
    }
    else{
        Com+=point;
        document.querySelector("#Computerpoke").appendChild(Card);
        document.getElementById("Computer").innerHTML=Com;
    }
    poke++;
    checkpoint(player);
}
//停牌
function stay(){
    player=false;
    document.getElementById("Front").remove();
    document.getElementById("Card").removeAttribute("style");
    document.getElementById("Card").removeAttribute("id");
    document.getElementById("Computer").innerHTML=Com;
    hitMe();
}
//獲得新卡片
function getNewCard(gameData,player){
    var Card = document.createElement("img");
    Card.setAttribute("src","./image/"+suit[Math.floor(gameData[poke]/13)] +(gameData[poke]%13+1)+".gif");
    let point=0;
    if((gameData[poke]%13+1)>10){
        point=10;
    }
    else if(((gameData[poke]%13+1)==1)&&((player=="player1"&&p1+11<=21)||(player=="Computer"&&Com+11<=21))){
        point=11;
    }
    else{
        point=gameData[poke]%13+1;
    }
    if(player=="player1"){
        p1+=point;
        document.querySelector("#player1poke").appendChild(Card);
    }
    else{
        var Front =document.createElement("img");
        Front.setAttribute("id","Front");
        Front.setAttribute("src","./image/b2fv.gif");
        Com+=point;
        Card.setAttribute("id","Card");
        document.querySelector("#Computerpoke").appendChild(Front);
        document.querySelector("#Computerpoke").appendChild(Card);
        document.getElementById("Card").style.display="none";
    }
    poke++;
}
//初始化相關資料
function initial(){
    gameData.length=52;
    player1.length=0;
    Computer.length=0;
    poke=0;
    for(i=0;i<gameData.length;i++)
    {
      gameData[i]=i;
    }
    player=true;
    p1=0;
    Com=0;
    chip=0;
    p1money=document.getElementById("p1Money").innerHTML;
    Commoney=document.getElementById("ComMoney").innerHTML;
    if(p1money<=0||Commoney<=0){
        p1money=10000;
        Commoney=10000;
        document.getElementById("p1Money").innerHTML=p1money;
        document.getElementById("ComMoney").innerHTML=Commoney;
    }
    document.getElementById("player1").innerHTML=p1;
    document.getElementById("Computer").innerHTML=Com;
    document.querySelector("#chips").innerHTML='<p>下注:<span id="chip"></span></p>';
    document.querySelector("#chip").innerHTML=chip;
    document.querySelector("#player1poke").innerHTML=null;
    document.querySelector("#Computerpoke").innerHTML=null;
}
//陣列洗牌
function shuffle(array){
    for(i=0;i<array.length;i++){
        let seed=Math.floor(Math.random()*array.length);
        let temp=array[i];
        array[i]=array[seed];
        array[seed]=temp;
    }
    return array;
}
//產生籌碼
function chips(){
    var chips = document.createElement("img");
    chips.setAttribute("src","./image/poker.svg");
    chips.setAttribute("width","50px");
    chips.setAttribute("height","50px");
    chip++;
    if((chip*100)<=p1money){
        if(chip<=20){
            document.querySelector("#chips").appendChild(chips);
        }
        document.getElementById("chip").innerHTML=(chip*100);
    }
}