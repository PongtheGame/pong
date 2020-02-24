function setup() {
    var cnv = createCanvas(400, 400);
    // deze functie is nodig om een opzet te creëren
    cnv.position(295, 770);
};

new p5()

var currentScene = 1;
var objectSize = 30;
var colourCounter = 0;
var surpriseBart = false;
var goal = false;
var goalCounter = 0;

var counter = 0;
  
//Batje A
var batjeA = {
    size : 50,
    breedte : 20,
    hoogte : 180,
    snelheid: 0
};
batjeA.hoogte = 200 - 0.5*batjeA.size;
  
var calcSectorA = function() {  //het berekenen van de sectoren van batje A
    batjeA.beginsector1 = batjeA.hoogte;
    batjeA.beginsector2 = batjeA.hoogte + (batjeA.size/5);
    batjeA.beginsector3 = batjeA.hoogte + 2*(batjeA.size/5);
    batjeA.beginsector4 = batjeA.hoogte + 3*(batjeA.size/5);
    batjeA.beginsector5 = batjeA.hoogte + 4*(batjeA.size/5);
    batjeA.eindsector5 = batjeA.hoogte + batjeA.size;
};
  
//Batje B
var batjeB = {
    size : 50,
    breedte : 370,
};
batjeB.hoogte = 200 - 0.5*batjeB.size;
batjeB.snelheid = 0;
  
var calcSectorB = function() {  //het berekenen van de sectoren van batje A
    batjeB.beginsector1 = batjeB.hoogte; 
    batjeB.beginsector2 = batjeB.hoogte + (batjeB.size/5);
    batjeB.beginsector3 = batjeB.hoogte + 2*(batjeB.size/5);
    batjeB.beginsector4 = batjeB.hoogte + 3*(batjeB.size/5);
    batjeB.beginsector5 = batjeB.hoogte + 4*(batjeB.size/5);
    batjeB.eindsector5 = batjeB.hoogte + batjeB.size;
};

// de coördinaten voor het batje op het titelscherm (deze willen we nog laten bewegen)
var titleBatA = {
    Xpos : 20,
    Ypos : 230,
    breedte : 10,
    hoogte : 40
};
  
//coördinaten en grootte balletje
var ball = {
    Xpos : 200,
    Ypos : 200,
    straal : 7,
    kleur1 : 245,
    kleur2 : 255,
    kleur3 : 51
};

var ball2 = {
    Xpos : ball.Xpos,
    Ypos : ball.Ypos,
    straal : ball.straal
};

//richting balletje
var richting = {
    X : 1,
    Y : 0,
    X2 : 0,
    Y2 : 0
};

//ScoreBoard text
var score = {
    player1 : 0,
    player2 : 0,
    practise : 0,
    player1Ex : 0,
    player2Ex : 0
};

// posities powerUP
var powerUp = {
    X : 50, 
    Y : 50
};

var speeding = 1;
var PowerUpNr = 0;

//Het berekenen van de positie van batje A
var drawBatjeA = function() {
    calcSectorA();
    fill(255, 255, 255);
    stroke(255, 255, 255);
    rect(batjeA.breedte, batjeA.hoogte, 10, batjeA.size);
};
  
//het bereken van de positie van batje B
var drawBatjeB = function() {
    calcSectorB();
    fill(255, 255, 255);
    stroke(255, 255, 255);
    rect(batjeB.breedte, batjeB.hoogte, 10, batjeB.size);
};

// het maken van het Batje van player 2 bij PONG EXTREME
var drawBatjeBExtreme = function() {
    calcSectorB();
    fill(0, 0, 0);
    stroke(77, 252, 50);
    rect(batjeB.breedte, batjeB.hoogte, 10, batjeB.size);
};

// het maken van het Batje van player 1 bij PONG EXTREME
var drawBatjeAExtreme = function(){
    calcSectorA();
    fill(0, 0, 0);
    stroke(77, 252, 50);
    rect(batjeA.breedte, batjeA.hoogte, 10, batjeA.size);
};

// Een class die is aangemaakt voor de regel 'press E to go EXTREME' aan te maken en de laten bewegen op het titelscherm
class pongExtremeHint {
    constructor() {
        this.x = 200;
        this.y = 180;
        this.hintSize = 7;
        this.hintBigger = true;
    }
    draw() {
        textAlign(CENTER,CENTER);
        textSize(this.hintSize);
        fill(255);
        noStroke();
        text("Press E to go EXTREME", this.x, this.y);
        textAlign(LEFT, BASELINE);
    }
    update() {
        if (this.hintBigger) {
            this.hintSize += 0.1;
        }
        if (!this.hintBigger) {
            this.hintSize -= 0.1;
        }
        if (this.hintSize > 10) {
            this.hintBigger = false;
        }
        if (this.hintSize < 7) {
            this.hintBigger = true;
        }
    }
};

var hint = new pongExtremeHint();

// het laten zien van de PU-Faster

var drawPowerUps = function (){
    if (PowerUpNr === 0) {
        powerUp.X = random(100, 300);
        powerUp.Y = random(20, 380);
        PowerUpNr = ceil(random(0.1, 7));
    }
    if (PowerUpNr === 1) {
        //puFaster
        puFaster();
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2) + Math.pow(ball.Ypos - powerUp.Y,2)) <= 27){
            PowerUpNr = -1;
        }
    }
    if (PowerUpNr === -1) {
        counter += 1;
        speeding = 1.5;
        if(counter >= 300){
            speeding = 1;
            PowerUpNr = 0;
            counter = 0;
        }
    }
    if (PowerUpNr === 2) {
        //puBigBat
        puBigBat();
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2) + Math.pow(ball.Ypos - powerUp.Y,2)) <= 27 && richting.X >= 0){
            PowerUpNr = -2;
        }
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2) + Math.pow(ball.Ypos - powerUp.Y,2)) <= 27 && richting.X <= 0){
            PowerUpNr = -2.1;
        }
    }
    if (PowerUpNr === -2) {
        counter += 1;
        batjeA.size = 70;
        if (counter >= 420){
            batjeB.size = 50;
            batjeA.size = 50;
            counter = 0;
            PowerUpNr = 0;
        }
    }
    if(PowerUpNr === -2.1){
        counter += 1;
        batjeB.size = 70;
        if (counter >= 420){
            batjeB.size = 50;
            batjeA.size = 50;
            counter = 0;
            PowerUpNr = 0;
        }   
    }
    if (PowerUpNr === 3) {
        //puInvisible
        puInvisible();
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2) + Math.pow(ball.Ypos - powerUp.Y,2)) <= 27){
            PowerUpNr = -3;
        }
    }
    if (PowerUpNr === -3){
        counter += 1;
        ball.kleur1 = 0;
        ball.kleur2 = 0;
        ball.kleur3 = 0;
        if (counter >= 90){
            ball.kleur1 = 245;
            ball.kleur2 = 255;
            ball.kleur3 = 51;
            counter = 0;
            PowerUpNr = 0;
        }
    }
    if (PowerUpNr === 4){
        puSmallBat();
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2) + Math.pow(ball.Ypos - powerUp.Y,2)) <= 27 && richting.X >= 0){
            PowerUpNr = -4;
        }
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2) + Math.pow(ball.Ypos - powerUp.Y,2)) <= 27 && richting.X <= 0){
            PowerUpNr = -4.1;
        }
    }
    if (PowerUpNr === -4){
        counter += 1;
        batjeB.size = 30;
        if (counter >= 300){
            batjeB.size = 50;
            batjeA.size = 50;
            counter = 0;
            PowerUpNr = 0;
        }

    }
    if (PowerUpNr === -4.1){
        counter += 1;
        batjeA.size = 30;
        if (counter >= 300){
            batjeB.size = 50;
            batjeA.size = 50
            counter = 0;
            PowerUpNr = 0;
        }
    }
    if (PowerUpNr === 5){
        puTeleport();
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2) + Math.pow(ball.Ypos - powerUp.Y,2)) <= 27){
            PowerUpNr = -5;
        }
    }
    if (PowerUpNr === -5){
        counter += 1;
        if (counter === 1) {
            ball.Ypos = random(30, 380);
        }
        if (counter > 0 && counter <= 40 || counter > 120 && counter <= 160 || counter > 240 && counter <= 280){
            ball.kleur1 += 5;
            ball.kleur2 = 5;
            ball.kleur3 -= 10;
        }
        if (counter > 40 && counter <= 80 || counter > 160 && counter <= 200 || counter > 280 && counter <= 320) {
            ball.kleur2 += 5;
            ball.kleur1 = 5;
            ball.kleur3 -= 10;
        }
        if (counter > 80 && counter <= 120 || counter > 200 && counter <= 240 || counter > 320 && counter <= 360){
            ball.kleur3 = 255;
            ball.kleur1 += 10;
            ball.kleur2 += 5;
        }
        if (counter > 360){
            ball.kleur1 = 245;
            ball.kleur2 = 255;
            ball.kleur3 = 51;
            counter = 0;
            PowerUpNr = 0;
        }
    }
    if (PowerUpNr === 6){
        puGlitch();
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2) + Math.pow(ball.Ypos - powerUp.Y,2)) <= 27){
            PowerUpNr = -6;
        }
    }
    if (PowerUpNr === -6){
        ball.kleur1 = 0;
        ball.kleur2 = 255;
        ball.kleur3 = 0;
        counter += 1;
        if (counter === 20 && ball.Ypos >= 40 && ball.Ypos <= 360 || counter === 50 && ball.Ypos >= 40 && ball.Ypos <= 360|| counter === 80 && ball.Ypos >= 40 && ball.Ypos <= 360){
            ball.Ypos = random(ball.Ypos + 40, ball.Ypos - 40 );
        }
        if (counter > 120){
            counter = 0;
            PowerUpNr = 0;
            ball.kleur1 = 245;
            ball.kleur2 = 255;
            ball.kleur3 = 51;
        }
    }
    if (PowerUpNr === 7){
        puTwoBall();
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2) + Math.pow(ball.Ypos - powerUp.Y,2)) <= 27){
            ball2.Xpos = ball.Xpos;
            ball2.Ypos = ball.Ypos;
            richting.X2 = richting.X;
            richting.Y2 = richting.Y;
            richting.Y = -richting.Y;
            PowerUpNr = -7;
        }
    }
    if (PowerUpNr === -7){
        if (richting.Y <= 0 || richting.Y >= 0){
            counter += 1;
            fill(245, 255, 51);
            noStroke();
            ellipse(ball2.Xpos, ball2.Ypos, ball.straal, ball.straal);
            ball2.Xpos += richting.X2;
            ball2.Ypos += richting.Y2;
            if (counter === 60){
                ball2.Xpos = 500;
                ball2.Ypos = 500;
                PowerUpNr = 0;
                counter = 0;
            }
        }
        else if(richting.Y === 0){
            counter += 1;
            fill(245, 255, 51);
            noStroke();
            ellipse(ball2.Xpos, ball2.Ypos, ball.straal, ball.straal);
            richting.Y = 1;
            ball2.Xpos += richting.X2;
            ball2.Ypos += -1;
            ball.Ypos += 1;
            if (counter === 60){
                ball2.Xpos = 500;
                ball2.Ypos = 500;
                PowerUpNr = 0;
                counter = 0;
            }
        }
    }
};

// het laten zien van de PU-Faster
var puFaster = function(){
    fill(0, 0, 0);
    stroke(255, 255, 255);
    ellipse(powerUp.X, powerUp.Y, 20, 20);
    fill(255, 255, 255);
    noStroke();
    textSize(25);
    text('»',powerUp.X-6.5,powerUp.Y+6.5);
};

// het laten zien van de PU-BigBat
var puBigBat = function() {
    fill(255, 0, 0);
    stroke(255, 0, 0);
    ellipse(powerUp.X, powerUp.Y, 20, 20);
    fill(255, 255, 255);
    textSize(18);
    text('⇳',powerUp.X-5.8,powerUp.Y+5.5);
};

// het laten zien van de PU-invisible
var puInvisible = function() {
    fill(255, 255, 255);
    stroke(255, 255, 255);
    ellipse(powerUp.X, powerUp.Y, 20, 20);
    fill(0, 0, 0);
    textSize(14);
    text('O',powerUp.X-5.5,powerUp.Y+5);
};

// het laten zien van de PU-SmalBat
var puSmallBat = function(){
    fill(85, 255, 0);
    stroke(85, 255, 0);
    ellipse(powerUp.X, powerUp.Y, 20, 20);
    fill(0, 0, 0);
    noStroke();
    textSize(18);
    text('↓', powerUp.X-4.5, powerUp.Y+4);
};

var puTeleport = function() {
    fill(134, 5, 255);
    stroke(134, 5, 255);
    ellipse(powerUp.X, powerUp.Y, 20, 20);
    fill(255, 255, 255);
    stroke(255, 255, 255);
    textSize(18);
    text('✦', powerUp.X-7.5, powerUp.Y+6);
};

var puGlitch = function() {
    fill(116, 231, 242);
    stroke(116, 231, 242);
    ellipse(powerUp.X, powerUp.Y, 20, 20);
    fill(0, 0, 0);
    noStroke();
    textSize(20);
    text('☢',powerUp.X-8.3, powerUp.Y+7);
};

var puTwoBall = function() {
    fill(255, 234, 0);
    stroke(255, 234, 0);
    ellipse(powerUp.X, powerUp.Y, 20, 20);
    fill(0, 0, 0);
    noStroke();
    textSize(18);
    text("☄", powerUp.X-7, powerUp.Y+6);
};

// het tekenen van het 'home screen' van de game. Vanaf hier kan je kiezen of je de game start, de practise room speelt, of de uitleg gaat lezen.
var drawTitleScreen = function(){
    currentScene = 1;
    background(40, 157, 235);
    fill(255, 255, 255);
    stroke(0, 0, 0);
    textSize(80);
    text("PONG", 85, 100);
    textSize(30);
    fill(0, 0, 0);
    text("THE GAME", 120, 160);
    fill(0, 0, 0);
    rect(20, 118, 360, 1);
    fill(255, 255, 255);
    rect(titleBatA.Xpos, titleBatA.Ypos, titleBatA.breedte, titleBatA.hoogte);
    rect(360, 150, 10, 40);
    fill(242, 125, 8);
    stroke(242, 125, 8);
    ellipse(180, 220, 5, 5);
    fill(255, 255, 255);
    stroke(255, 255, 255);
    rect(212, 240, 5, 110);
};

// Dit is de functie voor het tekenen van het 'glitch' effect van zowel PONG, the GAME en EXTREME
drawTitleAnimation = function() {
    if(currentScene === 10){
        textSize(80);
        if(random(0,10) > 8) {
        //rood
        if(random(0, 1000) > 800) {
            fill(255, 0, 0);
            stroke(0, 0, 0);
            text("PONG", 90, 105);
        }
        //geel
        if(random(0, 1000) > 100) {
            fill(245, 255, 51);
            stroke(0, 0, 0);
            text("PONG", 85, 100);
        }
        //blauw
        if(random(0,1000) > 970) {
            fill(0, 255, 234);
            stroke(0, 0, 0);
            text("PONG", 80, 95);
        }
    }   else if(random(0,1000) > 100) {
        //geel
        if(random(0, 10) > 0) {
            fill(245, 255, 51);
            stroke(0, 0, 0);
            text("PONG", 85, 100);
        }
        //the game blauw
        if(random(0, 1000) > 970) {
            fill(0, 255, 234);
            stroke(0, 0, 0);
            textSize(30);
            text("THE GAME", 118, 158);
        }
        if(random(0, 1000) > 980) {
            fill(255, 0, 0);
            stroke(0, 0, 0);
            textSize(30);
            text("THE GAME", 122, 162)
        }
        //eerste E van het woord Extreme
        if(random(0, 1000) > 0){
            rotate(-0.3);
            fill(255, 0, 0);
            stroke(255, 0, 0);
            textSize(15);
            text("E", 175, 240);
            text("E", 217, 240);
            text("E", 241, 240);
            rotate(0.3);
        }
    }
    }
    if (currentScene === 12){
        textSize(80);
        if (random(0, 10) > 8){
            if (random(0, 1000) > 5){
                fill(255, 0, 0);
                stroke(0, 0, 0);
                textSize(50);
                text("Rules", 140, 63);
        }   if(random(0, 10) > 0){
                fill(77, 252, 51);
                stroke(77, 252, 51);
                textSize(50);
                text("Rules", 137, 60); 
        }
    }
    }
};

// het tekenen van de regel 'EXTREME' op het homescreen van PONG EXTREME
var drawExtremeTitle = function() {
    rotate(-0.3);
    fill(255, 0, 0);
    stroke(255, 0, 0);
    textSize(15);
    text("   XTR   M   ", 173, 240);
    rotate(0.3);
};

// het tekenen van het titelscherm van PONG the GAME EXTREME
var drawTitleScreenExtreme = function() {
    currentScene = 10;
    background (0, 0, 0);
    fill(77, 252, 50);
    stroke(77, 252, 50);
    rect(20, 118, 360, 1);
    textSize(30);
    text("THE GAME", 120, 160);
    drawExtremeTitle();
    fill(0, 0, 0);
    stroke(70, 252, 50);
    rect(20, 230, 10, 40);
    rect(360, 150, 10, 40);
    fill(245, 255, 51);
    stroke(245, 255, 51);
    ellipse(180, 220, 5, 5);
    // de knop start wordt getekend bij PONG extreme
    fill(255, 46, 189);
    stroke(0, 0, 0);
    rect(75, 285, 120, 40);
    fill(0, 0, 0);
    textSize(25);
    text("Start", 108, 314);
    // de 3D  van de start button wordt toegepast 
    fill(0, 0, 0);
    stroke(70, 252, 50);
    rect(212, 240, 5, 110);
    // de 3D van de practise button wordt toegepast
    fill(36, 115, 29);
    stroke(0, 0, 0);
    rect(233, 253, 100, 35);
};
  
// het tekenen van de spelregels van de game. Dit scherm verschijnt wanneer er op de knop 'uitleg' wordt gedrukt.
var drawRulesScreen = function() {
    currentScene = 4;
    background(255, 140, 0);
    fill(255, 255, 255);
    textSize(50);
    text("Rules", 137, 60);
    fill(0, 0, 0);
    textSize(20);
    text("1. Probeer te scoren bij de ander", 25, 100);
    text("2. De eerste speler die 3 punten scoort", 25, 150);
    text("is de winnaar.", 50, 180);
    textSize(11);
    text("Druk op ESC om terug te gaan", 125, 300);
};

// het tekenen van de spelregels bij PONG Extreme (het uitlegscherm)
var drawRulesScreenExtreme = function(){
    currentScene = 12;
    background(0, 0, 0);
    fill(77, 252, 51);
    stroke(77, 252, 51);
    textSize(50);
    text("Rules", 137, 60);
    fill(255, 46, 189);
    noStroke();
    textSize(20);
    text("1. Probeer te scoren bij de ander", 25, 100);
    text("2. De eerste speler die 5 punten scoort", 25 ,150);
    text("is de winnaar", 50, 180);
    text("3. Dit is EXTREME dus er zijn powerup's", 25, 210);
    text("deze verschijnen willekeurig in het spel", 50, 240);
    text("4. GO EXTREME", 25, 280);
    textSize(11);
    text("Druk op ESC om terug te gaan", 125, 380);
    powerUp.X = 50;
    powerUp.Y = 330;
    // tekenen van powerUp faster icoon
    puFaster();
    // tekenen van powerUp Invisible icoon
    powerUp.X = 100;
    puInvisible();
    // tekenen van powerUp BigBat icoon
    powerUp.X = 150;
    puBigBat();
    // tekenen van powerUp SmallBat icoon
    powerUp.X = 200;
    puSmallBat();
    // tekenen van powerUp Teleport icoon
    powerUp.X = 250;
    puTeleport();
    // tekenen van powerUp Glitch icoon
    powerUp.X = 300;
    puGlitch();
    // tekenen van powerUp TwoBall icoon
    powerUp.X = 350;
    puTwoBall();


}
// deze functie zorgt ervoor dat de batjes kunnen bewegen tegenover elkaar  
batjesUpdate = function() {
    var stepSize = 4
    if (keyIsDown(79) == true) { // pijltje omhoog
        batjeB.snelheid = -stepSize;
    } else if (keyIsDown(76) == true) { // pijltje omlaag
        batjeB.snelheid = stepSize;
    } else {
        batjeB.snelheid = 0;
    }
    if (keyIsDown(87) == true) { // w
        batjeA.snelheid = -stepSize;
    } else if (keyIsDown(83) == true) { // s
        batjeA.snelheid = stepSize;
    } else {
        batjeA.snelheid = 0;
    }
    batjeA.hoogte += batjeA.snelheid;
    batjeB.hoogte += batjeB.snelheid;
    if (batjeB.hoogte > 390 - batjeB.size) {
        batjeB.hoogte = 390 - batjeB.size;
    }
    if (batjeB.hoogte < 10) {
        batjeB.hoogte = 10;
    }
    if (batjeA.hoogte > 390 - batjeA.size) {
        batjeA.hoogte = 390 - batjeA.size;
    }
    if (batjeA.hoogte < 10) {
        batjeA.hoogte = 10;
    }
};
  
// de functie tekent de knop 'start' om de game te starten
var drawPlayButton = function() {
    fill(10, 222, 250);
    stroke(0, 0, 0);
    rect(80, 280, 120, 40);
    fill(0, 0, 0);
    textSize(25);
    text("Start", 113, 309);
};

// de functie tekent de knop 'start' bij PONG extreme, om het spel te kunnen starten
var drawPlayExtremeButton = function() {
    fill(245, 255, 51);
    stroke(0, 0, 0);
    rect(80, 280, 120, 40);
    fill(0, 0, 0);
    textSize(25);
    text("Start", 113, 309);
};
  
// de functie tekent de knop 'return to menu' als een van de spelers gewonnen heeft om nog een potje te kunnen spelen
var drawReturnButton = function() {
    fill(10, 222, 250);
    rect(135, 260, 120, 40);
    fill(0, 0, 0);
    textSize(16);
    text("Return to Menu", 140, 287);
};
  
// de functie tekent de knop 'back' hiermee kan je de practise room verlaten of het scherm van de spelregels
var drawBackButton = function() {
    fill(10, 237, 245);
    rect(10, 10, 40, 20);
    fill(0, 0, 0);
    textSize(15);
    text("Back", 13, 26);
};
  
// de functie tekent de knop 'practise', als je op die knop drukt kan je de practise room uitproberen
var drawPractiseButton = function() {
    fill(38, 0, 255);
    rect(230, 250, 100, 35);
    fill(255, 255, 255);
    textSize(14);
    text("Practise", 255, 273);
}; 
  
// de funtie tekent de knop voor de practise room bij PONG the Game Extreme, maar er is geen practise room in de extreme versie
var drawPractiseExtremeButton = function() {
    fill(70, 252, 50);
    rect(230, 250, 100, 35);
    fill(0, 0, 0);
    textSize(14);
    text("X", 275, 273);
};

// de functie tekent de knop voor de spelregels
var drawRules = function() {
    fill(255, 153, 0);
    rect(246, 300, 70, 40);
    fill(0, 0, 0);
    textSize(14);
    text("Uitleg", 263, 325);
};
  
// de functie tekent de knop voor de spelregels bij PONG the Game Extreme
var drawRulesExtreme = function(){
    fill(255, 153, 0);
    rect(249, 304, 71, 39);
    fill(10, 222, 250);
    rect(246, 300, 70, 40);
    fill(0, 0, 0);
    textSize(14);
    text("Uitleg", 263, 325);
};

// deze functie tekent het scoreboard in Pong the GAME
var drawScoreBoard = function() {
    fill(0, 0, 0);
    textSize(30);
    text(score.player1, 140, 30);
    text(score.player2, 240, 30);
};
  
// deze functie tekent het scoreboard in de practise room om hoog te kunnen houden
var drawScoreBoardPractise = function() {
    fill(0, 0, 0);
    textSize(30);
    text(score.practise, 240, 30);
};

var drawScoreBoardExtreme = function(){
    fill(245, 255, 51);
    stroke(0, 0, 0);
    textSize(30);
    text(score.player1Ex, 140, 30);
    text(score.player2Ex, 240, 30);
};
  
// zodra speler 1 wint eindigt het spel en verschijnt er een tekst met 'player 1 wint', ook wordt de return button getekent
var player1Wins = function() {
    powerUp.X = 200;
    powerUp.Y = 200;fill(255, 0, 0);
    stroke(0, 0, 0);
    rect(125, 180, 140, 40);
    fill(0, 0, 0);
    textSize(20);
    text("Player 1 Wins", 134, 207);
    richting.X = 0;
    richting.Y = 0;
    drawReturnButton();
    counter = 0;
    ball.kleur1 = 245;
    ball.kleur2 = 255;
    ball.kleur3 = 51;
};
  
// deze functie doet precies hetzelfde als de functie van player1Wins alleen dan voor speler 2
var player2Wins = function(){
    powerUp.X = 200;
    powerUp.Y = 200;
    fill(255, 0, 0);
    stroke(0, 0, 0);
    rect(125, 180, 140, 40);
    fill(0, 0, 0);
    textSize(20);
    text("Player 2 Wins", 134, 207);
    richting.X = 0;
    richting.Y = 0;
    drawReturnButton();
    counter = 0;
    ball.kleur1 = 245;
    ball.kleur2 = 255;
    ball.kleur3 = 51;
};

var bSurprise = function() {
    if (colourCounter === 0) {
        //Rondje met Bartpower
        if (objectSize < 600) {
            objectSize = objectSize + 7;
            noStroke();
            fill(255, 255, 255);
            ellipse(200, 200, objectSize, objectSize);
            fill(0, 0, 0);
            ellipse(200, 200, 0.95 * objectSize, 0.95 * objectSize);
            fill(255, 255, 255);
            textSize(0.2 * objectSize);
            text("BART", 200 - 0.25 * objectSize, 200 - 0.1 * objectSize);
            text("POWER", 200 - 0.37 * objectSize, 200 + 0.2 * objectSize);
            fill(0, 0, 0);
            textSize(0.15 * objectSize);
            text("▓▓▓▓▓▓▓", 200 - 0.36 * objectSize, 200 + 0.16 * objectSize);
            text("▓▓▓▓▓", 200 - 0.25 * objectSize, 200 - 0.12 * objectSize);
        }
        if (objectSize >= 600) {
            objectSize = 0;
            colourCounter = 1;
        }
    }
    if (colourCounter === 1) {
        //driehoek met Bartpower
        if (objectSize < 500) {
            objectSize = objectSize + 5;  
            noStroke();
            fill(255, 255, 255);
            triangle(200, 195 - objectSize, 190 - objectSize, 210 + objectSize, 210 + objectSize, 210 + objectSize);
            fill(255, 0, 0);
            triangle(200, 195 - objectSize, 190 - objectSize, 150 + objectSize, 170 + objectSize, 210 + objectSize);
            fill(255, 255, 255);
            textSize(0.2 * objectSize);
            text("THE", 200 - 0.2 * objectSize, 200 - 0.3 * objectSize);
            text("AND ONLY", 200 - 0.5 * objectSize, 200 + 0.4 * objectSize);
            fill(0, 0, 0);
            text("B A R T", 200 - 0.34 * objectSize, 200 + 0.11 * objectSize);
            fill(255, 255, 255);
            text("▒▒▒▒▒▒", 200 - 0.43 * objectSize, 200 + 0.1 * objectSize);
            fill(0, 0, 0);
            textSize(0.5 * objectSize);
            text("1", 200 - 0.15* objectSize, 200 + 0.18 * objectSize);
        }
        if (objectSize >= 500) {
            objectSize = 0;
            colourCounter = 2;
        }
    }
    if (colourCounter === 2) {
       // vierkant met bart forever
        if (objectSize < 210) {
            objectSize = objectSize + 3;
            noStroke();
            fill(9, 0, 255);
            rect(200 - objectSize, 200 - objectSize, 2 * objectSize, 2 * objectSize);  
            fill(255, 0, 0);
            textSize(0.5 * objectSize);
            text("♥♥♥♥♥♥", 200 - 0.87 * objectSize, 200 + 0.1 *objectSize);
            fill(255, 255, 255);
            textSize(0.35 * objectSize);
            text("BART", 200 - 0.45 * objectSize, 200 - 0.4 * objectSize);
            text("FOREVER", 200 - 0.85 * objectSize, 200 + 0.55 * objectSize);
        }
        if (objectSize >= 210) {
            objectSize = 0;
            colourCounter = 0;
        }
    }
};

var goalSign = function(){
    if(ball.Xpos >= 395 || ball.Xpos <= 5){
        goal = true;
    }
    if(goal === true){
        goalCounter += 1;
        noStroke();
        fill(255, 255, 7);
        rect(0, 105, 400, 40);
        fill(0, 0, 0);
        stroke(0, 0, 0);
        textSize(30);
        text("GOAL!", 158, 135);
        if(goalCounter === 90){
            goal = false;
            goalCounter = 0;
        }
    }
};

//het bepalen van de richting van het balletje bij bereiken van Batja B
var drawBounceBatjeB = function() {
    //sector 1: 45 graden omhoog
    if(ball.Ypos >= batjeB.beginsector1 && ball.Ypos <= batjeB.beginsector2 && ball.Xpos >= batjeB.breedte - ball.straal && ball.Xpos <= batjeB.breedte + 5 + ball.straal) {
        richting.X = -3; 
        richting.Y = -3;
    }
    //sector 2: 22.5 graden omhoog
    else if(ball.Ypos > batjeB.beginsector2 && ball.Ypos <= batjeB.beginsector3 && ball.Xpos >= batjeB.breedte - ball.straal && ball.Xpos <= batjeB.breedte + 5 + ball.straal) {
        richting.X = -3; 
        richting.Y = -1.5;
    }
    //sector 3: 0 graden
    else if(ball.Ypos > batjeB.beginsector3 && ball.Ypos <= batjeB.beginsector4 && ball.Xpos >= batjeB.breedte - ball.straal && ball.Xpos <= batjeB.breedte + 5 + ball.straal) {    
        richting.X = -3; 
        richting.Y = 0;
    }
    //sector 4: 22.5 graden omlaag
    else if(ball.Ypos > batjeB.beginsector4 && ball.Ypos <= batjeB.beginsector5 && ball.Xpos >= batjeB.breedte - ball.straal && ball.Xpos <= batjeB.breedte + 5 + ball.straal) {    
        richting.X = -3; 
        richting.Y = 1.5;
    }
    //sector 5: 45 graden omlaag
    else if(ball.Ypos > batjeB.beginsector5 && ball.Ypos <= batjeB.eindsector5 && ball.Xpos >= batjeB.breedte - ball.straal && ball.Xpos <= batjeB.breedte + 5 + ball.straal) {    
        richting.X = -3; 
        richting.Y = 3;
    }
};
  
// het tekenen van de practise room
var drawPractiseRoom = function() {
    currentScene = 3;
    background(40, 157, 235);
    fill(204, 70, 8);
    stroke(204, 70, 8);
    rect(1, 0, 15, 400);
    rect(0, 0, 2, 400);
    rect(398, 0, 2, 400);
    rect(0, 0, 400, 2);
    rect(0, 398, 400, 2);
    fill(87, 53, 3);
    rect(190, 0, 10, 10);
    rect(190, 390, 10, 10);
    fill(255, 255, 255);
    stroke(255, 255, 255);
    rect(192.4, 11, 5, 378);
    
    fill(247, 138, 5);
    stroke(247, 138, 5);
    ellipse (ball.Xpos, ball.Ypos, ball.straal, ball.straal);
    ball.Xpos += richting.X;
    ball.Ypos += richting.Y;
    fill(255, 255, 255);
    stroke(255, 255, 255);
    drawBounceBatjeB();
     
    if(ball.Ypos >= 400 || ball.Ypos <= 0){
        richting.Y = -richting.Y;
    }
    if(ball.Xpos <= 20){
        richting.X = -richting.X;
        score.practise = score.practise + 1;
    }
    if(ball.Xpos >= 400) {
        richting.X = 1;
        richting.Y = 0;
        ball.Xpos = 200;
        ball.Ypos = 200;
        score.practise = 0;
    }
};
 
// het tekenen van PONG the GAME  
var drawPongTheGame = function() {
    currentScene = 2;
    background(40, 157, 235);
    fill(255, 255, 255);
    stroke(255, 255, 255);
    rect(190, 0, 10, 400);
    rect(0, 199, 400, 2);
    rect(0, 0, 2, 400);
    rect(398, 0, 2, 400);
    rect(0, 0, 400, 2);
    rect(0, 398, 400, 2);
    fill(87, 53, 3);
    rect(190, 0, 10, 10);
    rect(190, 390, 10, 10);
    fill(247, 138, 5);
    stroke(247, 138, 5);
    ellipse (ball.Xpos, ball.Ypos, ball.straal, ball.straal);
    ball.Xpos += richting.X * speeding;
    ball.Ypos += richting.Y * speeding;
    fill(255, 255, 255);
    stroke(255, 255, 255);
    
    //richting bepalen bij kaatsing van batje A in de verschillende sectoren
    //batjeA sector 1: 45 graden omhoog
    if(ball.Ypos >= batjeA.beginsector1 && ball.Ypos <= batjeA.beginsector2 && ball.Xpos >= batjeA.breedte + 5 + ball.straal && ball.Xpos <= batjeA.breedte + 10 + ball.straal) {
        richting.X = 3;
        richting.Y = -3;
    }
    //batje A sector 2: 22.5 graden omhoog
    else if(ball.Ypos >= batjeA.beginsector2 && ball.Ypos <= batjeA.beginsector3 && ball.Xpos >= batjeA.breedte + 5 + ball.straal && ball.Xpos <= batjeA.breedte + 10 + ball.straal) {       
        richting.X = 3;
        richting.Y = -1.5;
    }
    //batje A sector 3: 0 graden
    else if(ball.Ypos > batjeA.beginsector3 && ball.Ypos <= batjeA.beginsector4 && ball.Xpos >= batjeA.breedte + 5 + ball.straal && ball.Xpos <= batjeA.breedte + 10 + ball.straal) {
        richting.X = 3;
        richting.Y = 0;
    }
    //batje A sector 4: 22.5 graden omlaag
    else if(ball.Ypos > batjeA.beginsector4 && ball.Ypos <= batjeA.beginsector5 && ball.Xpos >= batjeA.breedte + 5 + ball.straal && ball.Xpos <= batjeA.breedte + 10 + ball.straal) {
        richting.X = 3;
        richting.Y = 1.5;
    }
    //Batje A sector 5: 45 graden omlaag
    else if(ball.Ypos > batjeA.beginsector5 && ball.Ypos <= batjeA.eindsector5 && ball.Xpos >= batjeA.breedte + 5 + ball.straal && ball.Xpos <= batjeA.breedte + 10 + ball.straal) {    
        richting.X = 3; 
        richting.Y = 3;
    }
    drawBounceBatjeB(); //functie aanroepen om richting bij kaatsen batje B te bepalen
    
    //kaatsen van de bal tegen de onderkant en bovenkant van het canvas
    if(ball.Ypos >= 400 || ball.Ypos <= 0) {    
        richting.Y = -richting.Y;
    }
    //het balletje raakt rechterzijkant canvas
    else if(ball.Xpos >= 400) {
        score.player1 = score.player1 + 1;  //score gaat omhoog bij player 1
        ball.Xpos = 200;        //het balletje in startpositie
        ball.Ypos = 200;
        richting.X = 1;         //balletje richting player 1
        richting.Y = 0;
    }
    // ball raakt linkerzijkant canvas
    else if(ball.Xpos <= 0) {
        score.player2 = score.player2 + 1;  //score gaat omhoog bij player 2
        ball.Xpos = 200;    //het balletje in startpositie 
        ball.Ypos = 200;
        richting.X = -1;    //balletje richting player 1
        richting.Y = 0;
    }
    //einde spel, winnaar is player 1
    if(score.player1 === 3) {
        player1Wins();
    }
    //einde spel, winnaar is player 2
    else if(score.player2 === 3) {
        player2Wins();
    }
};

var drawPongExtreme = function(){
    currentScene = 11;
    background(0, 0, 0);
    fill(255, 242, 0);
    stroke(255, 242, 0);
    rect(5, 5, 390, 1);
    rect(5, 395, 390, 1);
    rect(5, 5, 1, 390);
    rect(395, 5, 1, 390);
    fill(0, 0, 0);
    ellipse(200, 200, 40, 40);
    fill(255, 242, 0);
    ellipse(200, 200, 2, 2);
    rect(199.5, 5, 0.1, 390);
    fill(77, 252, 50);
    stroke(77, 252, 50);

    fill(ball.kleur1, ball.kleur2, ball.kleur3);
    stroke(ball.kleur1, ball.kleur2, ball.kleur3);
    ellipse (ball.Xpos, ball.Ypos, ball.straal, ball.straal);
    ball.Xpos += richting.X * speeding;
    ball.Ypos += richting.Y * speeding;
    fill(255, 255, 255);
    stroke(255, 255, 255);
    
    //richting bepalen bij kaatsing van batje A in de verschillende sectoren
    //batjeA sector 1: 45 graden omhoog
    if(ball.Ypos >= batjeA.beginsector1 && ball.Ypos <= batjeA.beginsector2 && ball.Xpos >= batjeA.breedte + 5 + ball.straal && ball.Xpos <= batjeA.breedte + 10 + ball.straal) {
        richting.X = 3;
        richting.Y = -3;
    }
    //batje A sector 2: 22.5 graden omhoog
    else if(ball.Ypos >= batjeA.beginsector2 && ball.Ypos <= batjeA.beginsector3 && ball.Xpos >= batjeA.breedte + 5 + ball.straal && ball.Xpos <= batjeA.breedte + 10 + ball.straal) {       
        richting.X = 3;
        richting.Y = -1.5;
    }
    //batje A sector 3: 0 graden
    else if(ball.Ypos > batjeA.beginsector3 && ball.Ypos <= batjeA.beginsector4 && ball.Xpos >= batjeA.breedte + 5 + ball.straal && ball.Xpos <= batjeA.breedte + 10 + ball.straal) {
        richting.X = 3;
        richting.Y = 0;
    }
    //batje A sector 4: 22.5 graden omlaag
    else if(ball.Ypos > batjeA.beginsector4 && ball.Ypos <= batjeA.beginsector5 && ball.Xpos >= batjeA.breedte + 5 + ball.straal && ball.Xpos <= batjeA.breedte + 10 + ball.straal) {
        richting.X = 3;
        richting.Y = 1.5;
    }
    //Batje A sector 5: 45 graden omlaag
    else if(ball.Ypos > batjeA.beginsector5 && ball.Ypos <= batjeA.eindsector5 && ball.Xpos >= batjeA.breedte + 5 + ball.straal && ball.Xpos <= batjeA.breedte + 10 + ball.straal) {    
        richting.X = 3; 
        richting.Y = 3;
    }
    drawBounceBatjeB(); //functie aanroepen om richting bij kaatsen batje B te bepalen
    
    //kaatsen van de bal tegen de onderkant en bovenkant van het canvas
    if(ball.Ypos >= 400 || ball.Ypos <= 0) {    
        richting.Y = -richting.Y;
    }
    //het balletje raakt rechterzijkant canvas
    else if(ball.Xpos >= 400) {
        score.player1Ex = score.player1Ex + 1;  //score gaat omhoog bij player 1
        ball.Xpos = 200;        //het balletje in startpositie
        ball.Ypos = 200;
        richting.X = 1;         //balletje richting player 1
        richting.Y = 0;
    }
    // ball raakt linkerzijkant canvas
    else if(ball.Xpos <= 0) {
        score.player2Ex = score.player2Ex + 1;  //score gaat omhoog bij player 2
        ball.Xpos = 200;    //het balletje in startpositie 
        ball.Ypos = 200;
        richting.X = -1;    //balletje richting player 1
        richting.Y = 0;
    }
    //einde spel, winnaar is player 1
    if(score.player1Ex === 5) {
        player1Wins();
    }
    //einde spel, winnaar is player 2
    else if(score.player2Ex === 5) {
        player2Wins();
    }

};

keyPressed = function(){
    if(keyCode === 69 && currentScene === 1) {
        drawTitleScreenExtreme();
        currentScene = 10; }
    else if(keyCode === 69 && currentScene === 10) {
        drawTitleScreen();
        drawPlayButton();
        drawPractiseButton();
        drawRules(); }
    else if(keyCode === 27 && currentScene === 2 || currentScene === 3 || currentScene === 4){
        currentScene = 1;
    }
    else if(keyCode === 27 && currentScene === 11 || currentScene === 12){
        currentScene = 10;
    }
    else if(keyCode === 66 && surpriseBart === false){
        surpriseBart = true;
    }
};

keyReleased = function(){
    if(keyCode === 66 && surpriseBart === true){
        surpriseBart = false;
    }
};

// dit is de draw functie die alles tekent op een bepaald moment/een bepaalde scene
function draw() {
    if (currentScene === 1) {
        drawTitleScreen();
        drawPlayButton();
        drawPractiseButton();
        drawRules();
        hint.draw();
        hint.update();
        batjeA.breedte = 20;
        batjeA.hoogte = 200 - 0.5*batjeA.size;
        batjeB.breedte = 380;
        batjeB.hoogte = 200 - 0.5*batjeB.size;
        goalSign();
    }
    if (currentScene === 2) { // zoals je kan zien wordt dit getekent bij scene 2
        drawPongTheGame();
        drawScoreBoard();
        drawBatjeA();
        drawBatjeB();
        batjesUpdate();
        goalSign();
        // print(PowerUpNr);
        // print(powerUp.X, powerUp.Y);
    }
    if (currentScene === 3) { // en onderstaande wordt getekent bij scene 3
        drawPractiseRoom();
        drawBackButton();
        drawScoreBoardPractise();
        drawBatjeB();
    }
    if (currentScene === 10) {
        drawTitleScreenExtreme();
        drawTitleAnimation();
        drawPlayExtremeButton();
        drawPractiseExtremeButton();
        drawRulesExtreme();
        PowerUpNr = 0; 
        ball.kleur1 = 245;
        ball.kleur2 = 255;
        ball.kleur3 = 51;
        batjeA.breedte = 20;
        batjeA.hoogte = 200 - 0.5*batjeA.size;
        batjeB.breedte = 380;
        batjeB.hoogte = 200 - 0.5*batjeB.size;
        ball.Xpos = 200;
        ball.Ypos = 200;
        speeding = 1;
    }
    if (currentScene === 11){
        drawPongExtreme();
        drawBatjeAExtreme();
        drawBatjeBExtreme();
        drawScoreBoardExtreme();
        batjesUpdate();
        drawPowerUps();
        goalSign();
    }
    if(currentScene === 12){
        drawRulesScreenExtreme();
        drawBackButton();
        drawTitleAnimation();
        
        
    }
    if(surpriseBart === true){
        bSurprise();
    }
};
  
// zodra de muis van de computer op een bepaalde plek op het canvas klikt (in dit geval de knoppen van de game) veranderd de game naar een nieuwe 'scene'. Hierdoor kan je meerdere schermen creëren.
mouseClicked = function() {
    if (mouseX >= 80 && mouseX <= 200 && mouseY >= 280 && mouseY <= 320) {
        if(currentScene === 1) {
            drawPongTheGame(); }
        if(currentScene === 10){
            drawPongExtreme();
        }
        else if(mouseX >= 135 && mouseX <= 255 && mouseY >= 260 && mouseY <= 300){
            if(currentScene === 2) {
            drawTitleScreen();
            drawPlayButton();
            drawPractiseButton();
            drawRules();
            score.player1 = 0;
            score.player2 = 0;
            richting.X = 1;
            richting.Y = 0;
            currentScene = 1; }
            if(currentScene === 11){
                drawTitleScreenExtreme();
                drawTitleAnimation();
                drawPlayExtremeButton();
                drawPractiseExtremeButton();
                drawRulesExtreme();
                score.player1Ex = 0;
                score.player2Ex = 0;
                richting.X = 1;
                richting.Y = 0;
                currentScene = 10;
                counter = 0;
            }
        }
        }
    if (mouseX >= 230 && mouseX <= 330 && mouseY >= 250 && mouseY <= 285 && currentScene === 1) {
        drawPractiseRoom();
    } else if(mouseX >= 10 && mouseX <= 50 && mouseY >= 10 && mouseY <= 30 && currentScene === 3 || mouseX >= 10 && mouseX <= 50 && mouseY >= 10 && mouseY <= 30 && currentScene === 4) {
        drawTitleScreen();
        drawPlayButton();
        drawPractiseButton();
        drawRules();
        score.practise = 0;
        richting.X = 1;
        richting.Y = 0;
        ball.Xpos = 200;
        ball.Ypos = 200;
        currentScene = 1;
    }
    if(mouseX >= 10 && mouseX <= 50 && mouseY >= 10 && mouseY <= 30 && currentScene === 12){
        drawTitleScreenExtreme();
        drawTitleAnimation();
        drawPlayExtremeButton();
        drawPractiseExtremeButton();
        drawRulesExtreme();
        PowerUpNr = 0; 
    }
    if(mouseX >= 246 && mouseX <= 316 && mouseY >= 300 && mouseY <= 340) {
        if(currentScene === 1){
            drawRulesScreen();
            drawBackButton();
        }
        if(currentScene === 10){
            drawRulesScreenExtreme();
            drawBackButton();
        }
        
    }
};