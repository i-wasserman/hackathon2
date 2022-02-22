//Global Arrays
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z']
var easyWords = ["hello","tree","taco","cat", "cart", "tone","flew","grow","small","plant","harm","time","rose","dogs","happy","word","star","sign","pipes","pike","error","basic","down","bird","guess","board","flag","doors","blue","green","tried","play","over"]

var mediumWords = ["unicorn","pancake","creative","graft","shrouded","eroded","silently","flowers","thyme","excuse","family","polearm","debates","feature","structured","project","fictitious","earbuds","telephone","benefit","remains","beginner","medium","jacket","curtain","details","realize","purple","orange","reality","rainbow","caution","bicycle"]

var hardWords = ["exclusive", "phenomenon","hypodermic","perpendicular","cryonic","vivacious","iridescent","archaic","halcyon","cataclysmic","stratosphere","impossible","dictionary","encyclopedic","centennial","anachronistic","deplorable","salacious","generations","description","encouraged","enamored","endothermic","entropic","providers","denominator","atrociously","fountains","enigmatic", "misspelled", "intelligence", "pronunciation", "handkerchief", "iogorrhea", "chiaroscurist", "verisimilitude", "sesquipedalian", "worcestershire", "hippopotomonstrosesquippedaliophobia"]

var words = [];
//test

var codes = [65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90];

//Global Vars
var pos = [];
var numPos = 0;
var y = 0;
var yspeed = 1;
var scl = 1;
var letsO = [];
var repeater = setInterval('','');
var score = 0;
var lives = 5;

//Background 
function setup() {
  createCanvas(1000, 600);
  frameRate(30);
  background(255, 130, 0);
  stroke(255,0,0);
  line(0, 800, 1000, 800);
}
//When you hit the start game button
function startNewGame() {
  console.log('game start');
  for (var i = 100; i < 900; i += 20) {
    pos.push(i);
    numPos++;
  }
  repeater = setInterval(show,900);
  yspeed = 1;
  score = 0;
  document.getElementById('score').innerHTML = "Score:" + score;
  lives = 5;
  document.getElementById('lives').innerHTML = "Lives: " + lives;
}

function stop(){
  clearInterval(repeater);
  yspeed = 0;
}

//letter color and positions
function show() {
  for (let j = 0; j < 1; j++) {
    var rand = int(random(0, letters.length - 1));
    var randB = int(random(0, numPos));
    var randC = int(random(0, letters.length - 1));
    var randD = int(random(0, numPos));
    r = random(255);
    g = random(100, 200);
    b = random(100);
    a = random(200, 255);
    fill(0, 280, 0, 255);
    textSize(20);
    textFont('Courier New');
    
    if (score <= 20){
      text(letters[randC], pos[randD], 40);
      letsO.push(new Letter(letters[randC], pos[randD], 40));
    }
    if (score > 20 && score <= 100){
      text(easyWords[rand], pos[randB], 40);
      words.push(new Letter(easyWords[rand], pos[randB], 40));
    }else if(score <= 250 && score > 100){
      text(mediumWords[rand], pos[randB], 40);
      words.push(new Letter(mediumWords[rand], pos[randB], 40));
    }else if(score > 250){
      text(hardWords[rand], pos[randB], 40);
      words.push(new Letter(hardWords[rand], pos[randB], 40));
    }
    for(var k = 0; k < words.length; k++){
      var currentWord = words[k].id;
      letsO.push(new Letter(currentWord.substring(0,1), pos[randB], 40));
    }
  }
}



function gC(inp) {
  var place = letters.indexOf(inp);
  return codes[place];
}
//letter class
class Letter {
  constructor(id, x, y) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.code = gC(this.id);
  }
  //when a key is pressed
  pressed(key) {
    if(this.id.length == 1){
      if (key === this.code) {
        var tempo = [];
        for(var j = 0; j < letsO.length;j++){
          if(letsO[j].id != this.id){
           tempo.push(letsO[j]);
          }
        }
        for(var l = tempo.length;l<letsO.length;l++){
        score++;
         document.getElementById('score').innerHTML = "Score:" + score;
       }
        letsO = tempo;
      }
    }
    //WORK ON THIS
    if(score > 20){
     if(key === this.code){
        var tempa = [];
        for(var k = 0; k < words.length; k++){
          if(words[k].id.substring(0,1) != this.id){
            tempa.push(words[k]);
          }else{
            var tempnew = words[k].id.substring(1);
            tempa.push(new Letter(tempnew, words[k].x, words[k].y));
            letsO.push(new Letter(words[k].id.substring(1,2),words[k].x,words[k].y));
          }
        }
        words = tempa;
      }
      
    }
  }
}

var arrOLets = [];

for (var i = 0; i < 26; i++) {
  arrOLets.push(new Letter(letters[i], 0, 0));
}

function keyPressed(){
  for(var i = 0; i < 26; i++){
    arrOLets[i].pressed(keyCode);
  }
}

function draw() {
  update();

}

//makes letters move
function update() {
  for (var i = 0; i < letsO.length; i++) {
    if(scl > 0){
      letsO[i].y = letsO[i].y + yspeed * scl;
    }else{
      letsO[i].y = letsO[i].y + yspeed;
    }
    
  }
  for (var k = 0; k < words.length; k++) {
    words[k].y = words[k].y + yspeed;
  }
  background(0, 0, 0);
  for (var j = 0; j < letsO.length; j++) {
    text(letsO[j].id, letsO[j].x, letsO[j].y);
  }
  for (var l = 0; l < words.length; l++) {
    text(words[l].id, words[l].x, words[l].y);
  }

  var tempE = [];
  for(var g = 0; g<letsO.length;g++){
    if(letsO[g].y < 600){
      tempE.push(letsO[g]);
    }else{
      lives--;
      document.getElementById('lives').innerHTML = "Lives: " + lives;
    }
  }
  if(tempE != letsO){
    letsO = tempE;
  }
  var tempH = [];
  for(var h = 0; h<words.length;h++){
    if(words[h].y < 600){
      tempH.push(words[h]);
    }else{
      lives--;
      document.getElementById('lives').innerHTML = "Lives: " + lives;
    }
  }
  if(tempH != words && tempH != []){
    words = tempH;
  }/*
  if(lives<=0){
    stop();
    background(190);
    fill(0);
    textFont('Courier New');
 
    fill(45);
    textSize(150);
    text('DEATH', 200, 200);
  }*/
} 


function restart(){
  words = [];
  letsO = [];
  score = 0;
  lives = 5;
  startNewGame();
}




// function keyPressed(){
//   if(keyCode === gC('a')){
//     console.log('help');
//   }

//   if(keyCode === gC('b')){
//     console.log('me');
//   }

//   if(keyCode === UP_ARROW){

//   }

//   if(keyCode === UP_ARROW){

//   }

// }






// function draw() {
//   noStroke()
//   fill(random(colorlist));
//   ellipse(mouseX, mouseY, 25, 15);
// }