//變數設定
var cards=document.getElementsByClassName('card');   //取得所有的卡牌元素
var fronts=document.getElementsByClassName('front'); //取得所有的卡面元素
var backs=document.getElementsByClassName('back');   //取得所有背面元素
var gap=[1,1];          //用來計算卡牌翻面時間的基準值，最多同時兩張牌，所以以陣列方式存放兩個值
var frames=[0,0];       //用來計算翻牌期間的幀數，作為條件判斷的值，最多同時兩張牌，所以以陣列方式存放兩個值
var ani=new Array();    //存放動畫執行時的計時物件
var shows=new Array();  //存放被翻牌的元素物件
var suit = ["s","h","d","c"]; //存放花色陣列
var gameData=new Array(52);   //用來存放要放在遊戲中的牌組內容
var complete=0;
var player=true;
var p1=0;
var p2=0;
var p1chips=0
var p2chips=0;
document.getElementById("nowplayer2").style.display="none";
//startGame()

//遊戲啟動
function startGame(){
  document.getElementsByClassName('mask')[0].style.display="none";

  initial();   //初始化全域變數及資料

  shuffle(gameData);  //對遊戲資料進行洗牌

  //設定卡牌的資料內及顯示圖片
  for(i=0;i<fronts.length;i++){
    fronts[i].setAttribute("data-type",(gameData[i]%13+1)); //設定資料內容
    fronts[i].style.background="url('./image/"+suit[Math.floor(gameData[i]/13)] +(gameData[i]%13+1)+".gif') no-repeat"; //設定背景圖
  }

  //設定卡牌的點擊偵測事件
  for(i=0;i<cards.length;i++){

    //卡牌點擊事件綁定function，發生onclick時才會去執行
    cards[i].onclick=function(){   

      gap[0]=1;
      document.getElementById("wall").style.display="block";  //把透明牆打開，以防誤點

      //判斷陣列中是否有重覆的元素以及元素是否是己經完成的牌卡
      if(shows.indexOf(this)==-1 && this.style.animationName!="opa"){
        shows.push(this);
        ani[0]=setInterval(fade,25,this,0)
        frames[0]=0
      }else{
        document.getElementById("wall").style.display="none";
        
      }
    }
  }
}

//初始化相關資料
function initial(){
  gap=[1,1];       
  frames=[0,0];    
  ani.length=0;    
  shows.length=0;
  gameData.length=52;
  for(i=0;i<gameData.length;i++)
  {
    gameData[i]=i;
  }
  complete=0;
  player=true;
  p1=0;
  p2=0;
  p1chips=0
  p2chips=0;
  document.getElementById("p1chip").innerHTML=0;
  document.getElementById("p2chip").innerHTML=0;
  document.getElementById("player1").innerHTML=p1;
  document.getElementById("player2").innerHTML=p2;
  document.querySelector("#player1chips").innerHTML=null;
  document.querySelector("#player2chips").innerHTML=null;
  //將卡牌元素中的style屬性都先移除
  for(i=0;i<cards.length;i++){
    cards[i].removeAttribute('style');
    cards[i].childNodes[0].removeAttribute('style');
    cards[i].childNodes[1].removeAttribute('style');
  }
}

//結果判定
function result(){
  var str;
  if(p1>p2){
    str="遊戲結果\n恭喜完成遊戲\n恭喜Player1玩家獲勝\n<button onclick='startGame()'>繼續遊戲</button>";
  }
  else if(p1<p2){
    str="遊戲結果\n恭喜完成遊戲\n恭喜Player2玩家獲勝\n<button onclick='startGame()'>繼續遊戲</button>";
  }
  else{
    str="遊戲結果\n恭喜完成遊戲\n恭喜玩家平手\n<button onclick='startGame()'>繼續遊戲</button>";
  }
  
  //把結果字串寫入提示顯示區
  document.getElementsByClassName('intro')[0].innerHTML=str;
  document.getElementsByClassName('mask')[0].style.display="block";

}

//檢查牌面是否相同，相同則透明，不同則翻轉回去
function chk(){
  if(shows[0].childNodes[0].dataset.type==shows[1].childNodes[0].dataset.type){
    shows[0].style.animation="opa 500ms ease forwards";
    shows[1].style.animation="opa 500ms ease forwards";
    complete+=1;
    if(complete==26){
      result();
    }
    if(player)
    {
      p1++;
    }
    else
    {
      p2++;
    }
    document.getElementById("player1").innerHTML=p1;
    document.getElementById("player2").innerHTML=p2;
    document.getElementById("wall").style.display="none";
  }else{
    shows[0].removeAttribute('style');
    shows[1].removeAttribute('style');
    document.getElementById("wall").style.display="block";
    ani[0]=setInterval(fade,25,shows[0],0);
    ani[1]=setInterval(fade,25,shows[1],1);
    if(player==true){
      player = false;
      document.getElementById("nowplayer1").style.display="none";
      document.getElementById("nowplayer2").style.display="block";
    }
    else{
      player = true;
      document.getElementById("nowplayer2").style.display="none";
      document.getElementById("nowplayer1").style.display="block";
    }
  }
  shows.length=0;
}

//翻牌
function fade(obj,d){
  //判定翻轉到一半時，交換要顯示的牌面內容
  if(frames[d]==10){
      if(obj.childNodes[0].style.display=="none" || obj.childNodes[0].style.display=="" ){
          obj.childNodes[1].style.display="none";
          obj.childNodes[0].style.display="block";
        }else{
          obj.childNodes[1].style.display="block";
          obj.childNodes[0].style.display="none";
        }      
    }  

  //根據不同的幀數來決定要進行的動作  
  if(frames[d]>=20){
    if(shows.length<2){
      document.getElementById("wall").style.display="none";
    }else{
      document.getElementById("wall").style.display="block";
      setTimeout(chk,1000);
    }
    clearInterval(ani[d])
    frames[d]=0;
  }else if(frames[d]>=10){
    gap[d]+=0.1;
    obj.style.transform="scaleX("+gap[d]+")";
    frames[d]+=1;
  }else{
    gap[d]-=0.1;
    obj.style.transform="scaleX("+gap[d]+")";
    frames[d]+=1;
  }
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
  if(player){
      p1chips++;
      document.querySelector("#player1chips").appendChild(chips);
      document.getElementById("p1chip").innerHTML=p1chips*100;
  }
  else{
      p2chips++;
      document.querySelector("#player2chips").appendChild(chips);
      document.getElementById("p2chip").innerHTML=p2chips*100;
  }
}