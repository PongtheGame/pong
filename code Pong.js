function setup() {
    var cnv = createCanvas(600, 600);
    // deze functie is nodig om een opzet te creëren
    cnv.position(440, 900);
};

new p5()

var resize = 1.5;

// alle variabelen op een rijtje die niet in een functie passen
var currentScene = 1;
var objectSize = 30*resize;
var colourCounter = 0;
var surpriseBart = false;
var goal = false;
var goalCounter = 0;

var counter = 0;
  
//Batje A
var batjeA = {
    size : 50*resize,
    X : 10*resize,
    Y : 180*resize,
    snelheid: 0
};
batjeA.Y = 200*resize - 0.5*batjeA.size; // de Y positie moest bepaald worden door een bepaalde formule daarom staat die buiten het object
  
var calcSectorA = function() {  //het berekenen van de sectoren van batje A
    batjeA.beginsector1 = batjeA.Y;
    batjeA.beginsector2 = batjeA.Y + (batjeA.size/5);
    batjeA.beginsector3 = batjeA.Y + 2*(batjeA.size/5);
    batjeA.beginsector4 = batjeA.Y + 3*(batjeA.size/5);
    batjeA.beginsector5 = batjeA.Y + 4*(batjeA.size/5);
    batjeA.eindsector5 = batjeA.Y + batjeA.size;
};
  
//Batje B
var batjeB = {
    size : 50*resize,
    X : 380*resize,
};
batjeB.Y = 200*resize - 0.5*batjeB.size; // de Y positie moest bepaald worden door een bepaalde formule daarom staat die buiten het object
batjeB.snelheid = 0;
  
var calcSectorB = function() {  //het berekenen van de sectoren van batje A
    batjeB.beginsector1 = batjeB.Y; 
    batjeB.beginsector2 = batjeB.Y + (batjeB.size/5);
    batjeB.beginsector3 = batjeB.Y + 2*(batjeB.size/5);
    batjeB.beginsector4 = batjeB.Y + 3*(batjeB.size/5);
    batjeB.beginsector5 = batjeB.Y + 4*(batjeB.size/5);
    batjeB.eindsector5 = batjeB.Y + batjeB.size;
};

// de coördinaten voor het batje op het titelscherm (deze willen we nog laten bewegen)
var titleBatA = {
    Xpos : 20*resize,
    Ypos : 230*resize,
    breedte : 10*resize,
    hoogte : 40*resize
};
  
//coördinaten en grootte balletje
var ball = {
    Xpos : 200*resize,
    Ypos : 200*resize,
    straal : 7*resize,
    kleur1 : 245,
    kleur2 : 255,
    kleur3 : 51
};

//coördinaten en grootte balletje van de powerup Twoball
var ball2 = {
    Xpos : ball.Xpos,
    Ypos : ball.Ypos,
    straal : ball.straal
};

//richting balletje
var richting = {
    X : 1*resize,
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
    X : 50*resize, 
    Y : 50*resize
};

//variabelen nodig voor de power-up functie
var speeding = 1*resize;
var PowerUpNr = 0;

//Het berekenen van de positie van batje A
var drawBatjeA = function() {
    calcSectorA();
    fill(255, 255, 255);
    stroke(255, 255, 255);
    rect(batjeA.X, batjeA.Y, 10*resize, batjeA.size);
};
  
//het bereken van de positie van batje B
var drawBatjeB = function() {
    calcSectorB();
    fill(255, 255, 255);
    stroke(255, 255, 255);
    rect(batjeB.X, batjeB.Y, 10*resize, batjeB.size);
};

// het maken van het Batje van player 2 bij PONG EXTREME
var drawBatjeBExtreme = function() {
    calcSectorB();
    fill(0, 0, 0);
    stroke(77, 252, 50);
    rect(batjeB.X, batjeB.Y, 10*resize, batjeB.size);
};

// het maken van het Batje van player 1 bij PONG EXTREME
var drawBatjeAExtreme = function(){
    calcSectorA();
    fill(0, 0, 0);
    stroke(77, 252, 50);
    rect(batjeA.X, batjeA.Y, 10*resize, batjeA.size);
};

// Een class die is aangemaakt voor de regel 'press E to go EXTREME' aan te maken en de laten bewegen op het titelscherm
class pongExtremeHint {
    constructor() { // dit zijn alle variabelen 
        this.x = 200*resize;
        this.y = 180*resize;
        this.hintSize = 7*resize;
        this.hintBigger = true;
    }
    draw() { // hier wordt de functie gevisualiseerd wat hij moet tekenen op het canvas
        textAlign(CENTER,CENTER);
        textSize(this.hintSize);
        fill(255);
        noStroke();
        text("Press E to go EXTREME", this.x, this.y);
        textAlign(LEFT, BASELINE);
    }
    update() { // dit is de uiteindelijke functie die de code moet uitvoeren om de zin 'press E to go EXTREME' te laten bewegen op en neer
        if (this.hintBigger) {
            this.hintSize += 0.1*resize;
        }
        if (!this.hintBigger) {
            this.hintSize -= 0.1*resize;
        }
        if (this.hintSize > 10*resize) {
            this.hintBigger = false;
        }
        if (this.hintSize < 7*resize) {
            this.hintBigger = true;
        }
    }
};

var hint = new pongExtremeHint();

// deze functie zorgt ervoor dat de powerups random in het veld verschijnen
var drawPowerUps = function (){
    if (PowerUpNr === 0) { // als powerupNr 0 is pakt de code weer een nieuwe x, y positie en een nieuwe random powerup
        powerUp.X = random(100, 300)*resize;
        powerUp.Y = random(50, 380)*resize;
        PowerUpNr = ceil(random(0, 7));
    }
    if (PowerUpNr === 1) { // als powerupnr 1 is wordt de powerup Faster getoond
        puFaster();
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2)*resize + Math.pow(ball.Ypos - powerUp.Y,2))*resize <= 27*resize){ // als powerup 1 wordt geraakt wordt de powerup geactiveerd
            PowerUpNr = -1;
        }
    }
    if (PowerUpNr === -1) { // de powerup is geactiveerd
        counter += 1;
        speeding = 1.5*resize; // de bal gaat sneller
        if(counter >= 300){
            speeding = 1*resize;
            PowerUpNr = 0;
            counter = 0;
        }
    }
    if (PowerUpNr === 2) { // als powerupnr 2 is wordt de powerup BigBat getoond
        puBigBat();
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2)*resize + Math.pow(ball.Ypos - powerUp.Y,2))*resize <= 27*resize && richting.X >= 0){ // als powerup 2 wordt geraakt wordt de powerup geactiveerd
            PowerUpNr = -2;
        }
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2)*resize + Math.pow(ball.Ypos - powerUp.Y,2))*resize <= 27*resize && richting.X <= 0){ // als powerup 2 wordt geraakt wordt de powerup geactiveerd
            PowerUpNr = -2.1;
        }
    }
    if (PowerUpNr === -2) { // de powerup is geactiveerd
        counter += 1;
        batjeA.size = 70*resize; // het batje wordt groter van batjeA
        if (counter >= 420){
            batjeB.size = 50*resize;
            batjeA.size = 50*resize;
            counter = 0;
            PowerUpNr = 0;
        }
    }
    if(PowerUpNr === -2.1){ // de powerup is geactiveerd
        counter += 1;
        batjeB.size = 70*resize; // het batje wordt groter van batjeB
        if (counter >= 420){
            batjeB.size = 50*resize;
            batjeA.size = 50*resize;
            counter = 0;
            PowerUpNr = 0;
        }   
    }
    if (PowerUpNr === 3) { // als powerupnr 3 is wordt de powerup Invisible getoond
        puInvisible();
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2)*resize + Math.pow(ball.Ypos - powerUp.Y,2))*resize <= 27*resize){ // als powerup 3 wordt geraakt wordt de powerup geactiveerd
            PowerUpNr = -3;
        }
    }
    if (PowerUpNr === -3){ // de powerup is geactiveerd
        counter += 1;
        ball.kleur1 = 0; // de kleur van de ball gaat naar zwart, dit maakt de bal onzichtbaar
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
    if (PowerUpNr === 4){ // als powerupnr 4 is wordt de powerup SmallBat getoond
        puSmallBat();
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2)*resize + Math.pow(ball.Ypos - powerUp.Y,2))*resize <= 27*resize && richting.X >= 0){ // als powerup 4 wordt geraakt wordt de powerup geactiveerd
            PowerUpNr = -4;
        }
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2)*resize + Math.pow(ball.Ypos - powerUp.Y,2))*resize <= 27*resize && richting.X <= 0){ // als powerup 4 wordt geraakt wordt de powerup geactiveerd
            PowerUpNr = -4.1;
        }
    }
    if (PowerUpNr === -4){ // de powerup is geactiveerd
        counter += 1;
        batjeB.size = 30*resize; // het batje wordt kleiner van batje B
        if (counter >= 300){
            batjeB.size = 50*resize;
            batjeA.size = 50*resize;
            counter = 0;
            PowerUpNr = 0;
        }

    }
    if (PowerUpNr === -4.1){ // de powerup is geactiveerd
        counter += 1;
        batjeA.size = 30*resize; // het batje wordt kleiner van batje A
        if (counter >= 300){
            batjeB.size = 50*resize;
            batjeA.size = 50*resize;
            counter = 0;
            PowerUpNr = 0;
        }
    }
    if (PowerUpNr === 5){ // als powerupnr 5 is wordt de powerup Teleport getoond
        puTeleport();
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2)*resize + Math.pow(ball.Ypos - powerUp.Y,2))*resize <= 27*resize){ // als powerup 5 wordt geraakt wordt de powerup geactiveerd
            PowerUpNr = -5;
        }
    }
    if (PowerUpNr === -5){ // de powerup is geactiveerd
        counter += 1;
        if (counter === 1) {
            ball.Ypos = random(30, 380)*resize; // de bal verplaats op een random positie op de Y-as
        }
        if (counter > 0 && counter <= 40 || counter > 120 && counter <= 160 || counter > 240 && counter <= 280){ // de kleur verandert van de ball
            ball.kleur1 += 5;
            ball.kleur2 = 5;
            ball.kleur3 -= 10;
        }
        if (counter > 40 && counter <= 80 || counter > 160 && counter <= 200 || counter > 280 && counter <= 320) { // de kleur verandert van de ball
            ball.kleur2 += 5;
            ball.kleur1 = 5;
            ball.kleur3 -= 10;
        }
        if (counter > 80 && counter <= 120 || counter > 200 && counter <= 240 || counter > 320 && counter <= 360){ // de kleur verandert van de ball
            ball.kleur3 = 255;
            ball.kleur1 += 10;
            ball.kleur2 += 5;
        }
        if (counter > 360){ // de kleur verandert van de ball
            ball.kleur1 = 245;
            ball.kleur2 = 255;
            ball.kleur3 = 51;
            counter = 0;
            PowerUpNr = 0;
        }
    }
    if (PowerUpNr === 6){ // als powerupnr 6 is wordt de powerup Glitch getoond
        puGlitch();
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2)*resize + Math.pow(ball.Ypos - powerUp.Y,2))*resize <= 27*resize){ // als powerup 6 wordt geraakt wordt de powerup geactiveerd
            PowerUpNr = -6;
        }
    }
    if (PowerUpNr === -6){ // de powerup is geactiveerd
        ball.kleur1 = 0;
        ball.kleur2 = 255; // de kleur van de ball veranderd
        ball.kleur3 = 0;
        counter += 1;
        if (counter === 20 && ball.Ypos >= 40*resize && ball.Ypos <= 360*resize || counter === 50 && ball.Ypos >= 40*resize && ball.Ypos <= 360*resize|| counter === 80 && ball.Ypos >= 40*resize && ball.Ypos <= 360*resize){
            ball.Ypos = random(ball.Ypos + 40*resize, ball.Ypos - 40*resize); // de bal verspringt op verschillende tijdstippen over de y-as
        }
        if (counter > 120){
            counter = 0;
            PowerUpNr = 0;
            ball.kleur1 = 245;
            ball.kleur2 = 255;
            ball.kleur3 = 51;
        }
    }
    if (PowerUpNr === 7){ // als powerupnr 7 is wordt de powerup TwoBall getoond
        puTwoBall();
        if(Math.sqrt(Math.pow(ball.Xpos - powerUp.X,2)*resize + Math.pow(ball.Ypos - powerUp.Y,2))*resize <= 27*resize){ // als powerup 7 wordt geraakt wordt de powerup geactiveerd
            ball2.Xpos = ball.Xpos;
            ball2.Ypos = ball.Ypos;
            richting.X2 = richting.X*resize;
            richting.Y2 = richting.Y;
            richting.Y = -richting.Y;
            PowerUpNr = -7;
        }
    }
    if (PowerUpNr === -7){ // de powerup is geactiveerd
        if (richting.Y === 0 && ball.Xpos % 2 === 0){
		    richting.Y = 1;
            richting.Y2 = -1; // er wordt een extra ball gecreëerd en de tegenovergestelde richting op geschoten
        }
        else if (richting.Y === 0 && ball.Xpos % 2 !== 0){
		    richting.Y = -1;
		    richting.Y2 = 1; // er wordt een extra ball gecreëerd en de tegenovergestelde richting op geschoten
        }
        counter += 1;
        fill(253, 122, 0);
        stroke(253, 122, 0);
        ellipse(ball2.Xpos, ball2.Ypos, ball.straal, ball.straal);
        ball2.Xpos += richting.X2;
        ball2.Ypos += richting.Y2; // er wordt een extra ball gecreëerd en de tegenovergestelde richting op geschoten
        if (counter === 60){
            ball2.Xpos = 500;
            ball2.Ypos = 500;
            PowerUpNr = 0;
            counter = 0;
        }
    }

};

// het laten zien van de PU-Faster
var puFaster = function(){
    fill(0, 0, 0);
    stroke(255, 255, 255);
    ellipse(powerUp.X, powerUp.Y, 20*resize, 20*resize);
    fill(255, 255, 255);
    noStroke();
    textSize(25*resize);
    text('»',powerUp.X-6.5*resize,powerUp.Y+6.5*resize);
};

// het laten zien van de PU-BigBat
var puBigBat = function() {
    fill(255, 0, 0);
    stroke(255, 0, 0);
    ellipse(powerUp.X, powerUp.Y, 20*resize, 20*resize);
    fill(255, 255, 255);
    textSize(18*resize);
    text('⇳',powerUp.X-5.8*resize,powerUp.Y+5.5*resize);
};

// het laten zien van de PU-invisible
var puInvisible = function() {
    fill(255, 255, 255);
    stroke(255, 255, 255);
    ellipse(powerUp.X, powerUp.Y, 20*resize, 20*resize);
    fill(0, 0, 0);
    textSize(14*resize);
    text('O',powerUp.X-5.5*resize,powerUp.Y+5*resize);
};

// het laten zien van de PU-SmalBat
var puSmallBat = function(){
    fill(85, 255, 0);
    stroke(85, 255, 0);
    ellipse(powerUp.X, powerUp.Y, 20*resize, 20*resize);
    fill(0, 0, 0);
    noStroke();
    textSize(18*resize);
    text('↓', powerUp.X-4.5*resize, powerUp.Y+4*resize);
};

// het laten zien van de PU-Teleport
var puTeleport = function() {
    fill(134, 5, 255);
    stroke(134, 5, 255);
    ellipse(powerUp.X, powerUp.Y, 20*resize, 20*resize);
    fill(255, 255, 255);
    stroke(255, 255, 255);
    textSize(18*resize);
    text('✦', powerUp.X-7.5*resize, powerUp.Y+6*resize);
};

// het laten zien van de PU-Glitch
var puGlitch = function() {
    fill(116, 231, 242);
    stroke(116, 231, 242);
    ellipse(powerUp.X, powerUp.Y, 20*resize, 20*resize);
    fill(0, 0, 0);
    noStroke();
    textSize(20*resize);
    text('☢',powerUp.X-8.3*resize, powerUp.Y+7*resize);
};

// het laten zien van de PU-TwoBall
var puTwoBall = function() {
    fill(255, 234, 0);
    stroke(255, 234, 0);
    ellipse(powerUp.X, powerUp.Y, 20*resize, 20*resize);
    fill(0, 0, 0);
    noStroke();
    textSize(18*resize);
    text("☄", powerUp.X-7*resize, powerUp.Y+6*resize);
};

// het tekenen van het 'home screen' van de game. Vanaf hier kan je kiezen of je de game start, de practise room speelt, of de uitleg gaat lezen.
var drawTitleScreen = function(){
    currentScene = 1;
    background(40, 157, 235);
    fill(255, 255, 255);
    stroke(0, 0, 0);
    textSize(80*resize);
    text("PONG", 85*resize, 100*resize);
    textSize(30*resize);
    fill(0, 0, 0);
    text("THE GAME", 120*resize, 160*resize);
    fill(0, 0, 0);
    rect(20*resize, 118*resize, 360*resize, 1*resize);
    fill(255, 255, 255);
    rect(titleBatA.Xpos, titleBatA.Ypos, titleBatA.breedte, titleBatA.hoogte);
    rect(360*resize, 150*resize, 10*resize, 40*resize);
    fill(242, 125, 8);
    stroke(242, 125, 8);
    ellipse(180*resize, 220*resize, 5*resize, 5*resize);
    fill(255, 255, 255);
    stroke(255, 255, 255);
    rect(212*resize, 240*resize, 5*resize, 110*resize);
};

// Dit is de functie voor het tekenen van het 'glitch' effect van zowel PONG, the GAME en EXTREME
drawTitleAnimation = function() {
    if(currentScene === 10){
        textSize(80*resize);
        if(random(0,10) > 8) {
        //rood
        if(random(0, 1000) > 800) {
            fill(255, 0, 0);
            stroke(0, 0, 0);
            text("PONG", 90*resize, 105*resize);
        }
        //geel
        if(random(0, 1000) > 100) {
            fill(245, 255, 51);
            stroke(0, 0, 0);
            text("PONG", 85*resize, 100*resize);
        }
        //blauw
        if(random(0,1000) > 970) {
            fill(0, 255, 234);
            stroke(0, 0, 0);
            text("PONG", 80*resize, 95*resize);
        }
    }   else if(random(0,1000) > 100) {
        //geel
        if(random(0, 10) > 0) {
            fill(245, 255, 51);
            stroke(0, 0, 0);
            text("PONG", 85*resize, 100*resize);
        }
        //the game blauw
        if(random(0, 1000) > 970) {
            fill(0, 255, 234);
            stroke(0, 0, 0);
            textSize(30*resize);
            text("THE GAME", 118*resize, 158*resize);
        }
        // the game rood
        if(random(0, 1000) > 980) {
            fill(255, 0, 0);
            stroke(0, 0, 0);
            textSize(30*resize);
            text("THE GAME", 122*resize, 162*resize)
        }
        //eerste E van het woord Extreme
        if(random(0, 1000) > 0){
            rotate(-0.3);
            fill(255, 0, 0);
            stroke(255, 0, 0);
            textSize(15*resize);
            text("E", 175*resize, 240*resize);
            text("E", 217*resize, 240*resize);
            text("E", 241*resize, 240*resize);
            rotate(0.3);
        }
    }
    }
    // het laten glitchen van de titel bij Rules extreme
    if (currentScene === 12){
        textSize(80*resize);
        if (random(0, 10) > 8){
            if (random(0, 1000) > 5){
                fill(255, 0, 0);
                stroke(0, 0, 0);
                textSize(50*resize);
                text("Rules", 140*resize, 63*resize);
        }   if(random(0, 10) > 0){
                fill(77, 252, 51);
                stroke(77, 252, 51);
                textSize(50*resize);
                text("Rules", 137*resize, 60*resize); 
        }
    }
    }
};

// het tekenen van de regel 'EXTREME' op het homescreen van PONG EXTREME
var drawExtremeTitle = function() {
    rotate(-0.3);
    fill(255, 0, 0);
    stroke(255, 0, 0);
    textSize(15*resize);
    text("   XTR   M   ", 173*resize, 240*resize);
    rotate(0.3);
};

// het tekenen van het titelscherm van PONG the GAME EXTREME
var drawTitleScreenExtreme = function() {
    currentScene = 10;
    background (0, 0, 0);
    fill(77, 252, 50);
    stroke(77, 252, 50);
    rect(20*resize, 118*resize, 360*resize, 1*resize);
    textSize(30*resize);
    text("THE GAME", 120*resize, 160*resize);
    drawExtremeTitle();
    fill(0, 0, 0);
    stroke(70, 252, 50);
    rect(20*resize, 230*resize, 10*resize, 40*resize);
    rect(360*resize, 150*resize, 10*resize, 40*resize);
    fill(245, 255, 51);
    stroke(245, 255, 51);
    ellipse(180*resize, 220*resize, 5*resize, 5*resize);
    // de knop start wordt getekend bij PONG extreme
    fill(255, 46, 189);
    stroke(0, 0, 0);
    rect(75*resize, 285*resize, 120*resize, 40*resize);
    fill(0, 0, 0);
    textSize(25*resize);
    text("Start", 108*resize, 314*resize);
    // de 3D  van de start button wordt toegepast 
    fill(0, 0, 0);
    stroke(70, 252, 50);
    rect(212*resize, 240*resize, 5*resize, 110*resize);
    // de 3D van de practise button wordt toegepast
    fill(36, 115, 29);
    stroke(0, 0, 0);
    rect(233*resize, 253*resize, 100*resize, 35*resize);
};
  
// het tekenen van de spelregels van de game. Dit scherm verschijnt wanneer er op de knop 'uitleg' wordt gedrukt.
var drawRulesScreen = function() {
    currentScene = 4;
    background(255, 140, 0);
    fill(255, 255, 255);
    textSize(50*resize);
    text("Rules", 137*resize, 60*resize);
    fill(0, 0, 0);
    textSize(20*resize);
    text("1. Probeer te scoren bij de ander", 25*resize, 100*resize);
    text("2. De eerste speler die 3 punten scoort", 25*resize, 150*resize);
    text("is de winnaar.", 50*resize, 180*resize);
    textSize(11*resize);
    text("Druk op ESC om terug te gaan", 125*resize, 300*resize);
};

// het tekenen van de spelregels bij PONG Extreme (het uitlegscherm)
var drawRulesScreenExtreme = function(){
    currentScene = 12;
    background(0, 0, 0);
    fill(77, 252, 51);
    stroke(77, 252, 51);
    textSize(50*resize);
    text("Rules", 137*resize, 60*resize);
    fill(255, 46, 189);
    noStroke();
    textSize(20*resize);
    text("1. Probeer te scoren bij de ander", 25*resize, 100*resize);
    text("2. De eerste speler die 5 punten scoort", 25*resize ,150*resize);
    text("is de winnaar", 50*resize, 180*resize);
    text("3. Dit is EXTREME dus er zijn powerup's", 25*resize, 210*resize);
    text("deze verschijnen willekeurig in het spel", 50*resize, 240*resize);
    text("4. GO EXTREME", 25*resize, 280*resize);
    textSize(11*resize);
    text("Druk op ESC om terug te gaan", 125*resize, 380*resize);
    powerUp.X = 50*resize;
    powerUp.Y = 330*resize;
    // tekenen van powerUp faster icoon
    puFaster();
    // tekenen van powerUp Invisible icoon
    powerUp.X = 100*resize;
    puInvisible();
    // tekenen van powerUp BigBat icoon
    powerUp.X = 150*resize;
    puBigBat();
    // tekenen van powerUp SmallBat icoon
    powerUp.X = 200*resize;
    puSmallBat();
    // tekenen van powerUp Teleport icoon
    powerUp.X = 250*resize;
    puTeleport();
    // tekenen van powerUp Glitch icoon
    powerUp.X = 300*resize;
    puGlitch();
    // tekenen van powerUp TwoBall icoon
    powerUp.X = 350*resize;
    puTwoBall();


}
// deze functie zorgt ervoor dat de batjes kunnen bewegen tegenover elkaar  
batjesUpdate = function() {
    var stepSize = 4*resize
    if (keyIsDown(79) == true) { //  de toets o
        batjeB.snelheid = -stepSize;
    } else if (keyIsDown(76) == true) { // de toets s
        batjeB.snelheid = stepSize;
    } else {
        batjeB.snelheid = 0;
    }
    if (keyIsDown(87) == true) { // de toets w
        batjeA.snelheid = -stepSize;
    } else if (keyIsDown(83) == true) { // de toets s
        batjeA.snelheid = stepSize;
    } else {
        batjeA.snelheid = 0;
    }
    batjeA.Y += batjeA.snelheid;
    batjeB.Y += batjeB.snelheid;
    if (batjeB.Y > 390*resize - batjeB.size) { // als de Y positie van batje B groter is dan 390 kan hij niet meer groter worden
        batjeB.Y = 390*resize - batjeB.size;
    }
    if (batjeB.Y < 10*resize) { // als de Y positie van Batje B kleiner is dan 10 kan hij niet meer kleiner worden
        batjeB.Y = 10*resize;
    }
    if (batjeA.Y > 390*resize - batjeA.size) { // als de Y positie van batje A groter is dan 390 kan hij niet meer groter worden
        batjeA.Y = 390*resize - batjeA.size;
    }
    if (batjeA.Y < 10*resize) { // als de Y positie van Batje A kleiner is dan 10 kan hij niet meer kleiner worden
        batjeA.Y = 10*resize;
    }
};

// deze functie veranderd alle waarden, die in het spel zijn veranderd, terug naar de beginwaarden
var resetValues = function(){
    ball.Xpos = 200*resize;
    ball.Ypos = 200*resize;
    richting.X = 1;
    richting.Y = 0;
    PowerUpNr = 0;
    batjeA.Y = (200*resize - 0.5*batjeA.size);
    batjeB.Y = (200*resize - 0.5*batjeB.size);
    score.practise = 0;
    score.player1 = 0;
    score.player2 = 0;
    score.player1Ex = 0;
    score.player2Ex = 0;
    ball.kleur1 = 245;
    ball.kleur2 = 255;
    ball.kleur3 = 51;
    counter = 0;
};

// de functie tekent de knop 'start' om de game te starten
var drawPlayButton = function() {
    fill(10, 222, 250);
    stroke(0, 0, 0);
    rect(80*resize, 280*resize, 120*resize, 40*resize);
    fill(0, 0, 0);
    textSize(25*resize);
    text("Start", 113*resize, 309*resize);
};

// de functie tekent de knop 'start' bij PONG extreme, om het spel te kunnen starten
var drawPlayExtremeButton = function() {
    fill(245, 255, 51);
    stroke(0, 0, 0);
    rect(80*resize, 280*resize, 120*resize, 40*resize);
    fill(0, 0, 0);
    textSize(25*resize);
    text("Start", 113*resize, 309*resize);
};
  
// de functie tekent de knop 'return to menu' als een van de spelers gewonnen heeft om nog een potje te kunnen spelen
var drawReturnButton = function() {
    fill(10, 222, 250);
    rect(135*resize, 260*resize, 120*resize, 40*resize);
    fill(0, 0, 0);
    textSize(16*resize);
    text("Return to Menu", 140*resize, 287*resize);
};
  
// de functie tekent de knop 'back' hiermee kan je de practise room verlaten of het scherm van de spelregels
var drawBackButton = function() {
    fill(10, 237, 245);
    rect(10*resize, 10*resize, 40*resize, 20*resize);
    fill(0, 0, 0);
    textSize(15*resize);
    text("Back", 13*resize, 26*resize);
};
  
// de functie tekent de knop 'practise', als je op die knop drukt kan je de practise room uitproberen
var drawPractiseButton = function() {
    fill(38, 0, 255);
    rect(230*resize, 250*resize, 100*resize, 35*resize);
    fill(255, 255, 255);
    textSize(14*resize);
    text("Practise", 255*resize, 273*resize);
}; 
  
// de funtie tekent de knop voor de practise room bij PONG the Game Extreme, maar er is geen practise room in de extreme versie
var drawPractiseExtremeButton = function() {
    fill(70, 252, 50);
    rect(230*resize, 250*resize, 100*resize, 35*resize);
    fill(0, 0, 0);
    textSize(14*resize);
    text("X", 275*resize, 273*resize);
};

// de functie tekent de knop voor de spelregels
var drawRules = function() {
    fill(255, 153, 0);
    rect(246*resize, 300*resize, 70*resize, 40*resize);
    fill(0, 0, 0);
    textSize(14*resize);
    text("Rules", 263*resize, 325*resize);
};
  
// de functie tekent de knop voor de spelregels bij PONG the Game Extreme
var drawRulesExtreme = function(){
    fill(255, 153, 0);
    rect(249*resize, 304*resize, 71*resize, 39*resize);
    fill(10, 222, 250);
    rect(246*resize, 300*resize, 70*resize, 40*resize);
    fill(0, 0, 0);
    textSize(14*resize);
    text("Rules", 263*resize, 325*resize);
};

// deze functie tekent het scoreboard in Pong the GAME
var drawScoreBoard = function() {
    fill(0, 0, 0);
    textSize(30*resize);
    text(score.player1, 140*resize, 30*resize);
    text(score.player2, 240*resize, 30*resize);
};
  
// deze functie tekent het scoreboard in de practise room om hoog te kunnen houden
var drawScoreBoardPractise = function() {
    fill(0, 0, 0);
    textSize(30*resize);
    text(score.practise, 240*resize, 30*resize);
};

// deze functie tekent het scoreboard in PONG EXTREME
var drawScoreBoardExtreme = function(){
    fill(245, 255, 51);
    stroke(0, 0, 0);
    textSize(30*resize);
    text(score.player1Ex, 140*resize, 30*resize);
    text(score.player2Ex, 240*resize, 30*resize);
};
  
// zodra speler 1 wint eindigt het spel en verschijnt er een tekst met 'player 1 wint', ook wordt de return button getekent
var player1Wins = function() {
    fill(255, 0, 0);
    stroke(0, 0, 0);
    rect(125*resize, 180*resize, 140*resize, 40*resize);
    fill(0, 0, 0);
    textSize(20*resize);
    text("Player 1 Wins", 134*resize, 207*resize);
    richting.X = 0;
    richting.Y = 0;
    drawReturnButton();       
};
  
// deze functie doet precies hetzelfde als de functie van player1Wins alleen dan voor speler 2
var player2Wins = function(){
    fill(255, 0, 0);
    stroke(0, 0, 0);
    rect(125*resize, 180*resize, 140*resize, 40*resize);
    fill(0, 0, 0);
    textSize(20*resize);
    text("Player 2 Wins", 134*resize, 207*resize);
    richting.X = 0;
    richting.Y = 0;
    drawReturnButton();    
};

// dit is voor jou Bart omdat we zoveel van je houden, oh ja en het laat 3 banners zien met allemaal quotes voor jouw werk
var bSurprise = function() {
    if (colourCounter === 0) {
        //Rondje met Bartpower
        if (objectSize < 600) {
            objectSize = objectSize + (7*resize);
            noStroke();
            fill(255, 255, 255);
            ellipse(200*resize, 200*resize, objectSize, objectSize);
            fill(0, 0, 0);
            ellipse(200*resize, 200*resize, 0.95 * objectSize, 0.95 * objectSize);
            fill(255, 255, 255);
            textSize(0.2 * objectSize);
            text("BART", 200*resize - 0.25 * objectSize, 200*resize - 0.1 * objectSize);
            text("POWER", 200*resize - 0.37 * objectSize, 200*resize + 0.2 * objectSize);
            fill(0, 0, 0);
            textSize(0.15 * objectSize);
            text("▓▓▓▓▓▓▓", 200*resize - 0.36 * objectSize, 200*resize + 0.16 * objectSize);
            text("▓▓▓▓▓", 200*resize - 0.25 * objectSize, 200*resize - 0.12 * objectSize);
        }
        if (objectSize >= 600) {
            objectSize = 0;
            colourCounter = 1;
        }
    }
    if (colourCounter === 1) {
        //driehoek met Bartpower
        if (objectSize < 500) {
            objectSize = objectSize + (5*resize);  
            noStroke();
            fill(255, 255, 255);
            triangle(200*resize, 195*resize - objectSize, 190*resize - objectSize, 210*resize + objectSize, 210*resize + objectSize, 210*resize + objectSize);
            fill(255, 0, 0);
            triangle(200*resize, 195*resize - objectSize, 190*resize - objectSize, 150*resize + objectSize, 170*resize + objectSize, 210*resize + objectSize);
            fill(255, 255, 255);
            textSize(0.2 * objectSize);
            text("THE", 200*resize - 0.2 * objectSize, 200*resize - 0.3 * objectSize);
            text("AND ONLY", 200*resize - 0.5 * objectSize, 200*resize + 0.4 * objectSize);
            fill(0, 0, 0);
            text("B A R T", 200*resize - 0.34 * objectSize, 200*resize + 0.11 * objectSize);
            fill(255, 255, 255);
            text("▒▒▒▒▒▒", 200*resize - 0.43 * objectSize, 200*resize + 0.1 * objectSize);
            fill(0, 0, 0);
            textSize(0.5 * objectSize);
            text("1", 200*resize - 0.15* objectSize, 200*resize + 0.18 * objectSize);
        }
        if (objectSize >= 500) {
            objectSize = 0;
            colourCounter = 2;
        }
    }
    if (colourCounter === 2) {
       // vierkant met bart forever
        if (objectSize < 210*resize) {
            objectSize = objectSize + (3*resize);
            noStroke();
            fill(9, 0, 255);
            rect(200*resize - objectSize, 200*resize - objectSize, 2 * objectSize, 2 * objectSize);  
            fill(255, 0, 0);
            textSize(0.5 * objectSize);
            text("♥♥♥♥♥♥", 200*resize - 0.89 * objectSize, 200*resize + 0.1 *objectSize);
            fill(255, 255, 255);
            textSize(0.35 * objectSize);
            text("BART", 200*resize - 0.45 * objectSize, 200*resize - 0.4 * objectSize);
            text("FOREVER", 200*resize - 0.85 * objectSize, 200*resize + 0.55 * objectSize);
        }
        if (objectSize >= 210*resize) {
            objectSize = 0;
            colourCounter = 0;
        }
    }
};

var goalSign = function(){ // het maken van de banner met daarop GOAL wanneer iemand heeft gescoord
    if(ball.Xpos >= 395*resize || ball.Xpos <= 5*resize){
        goal = true;
    }
    if(goal === true){ // wanneer er is gescoord wordt de banner vertoond
        goalCounter += 1;
        noStroke();
        fill(255, 255, 255);
        if(currentScene === 11){
            fill(255, 255, 7);
        }
        rect(0*resize, 105*resize, 400*resize, 40*resize);
        fill(0, 0, 0);
        stroke(0, 0, 0);
        textSize(30*resize);
        text("GOAL!", 158*resize, 135*resize);
        if(goalCounter === 90){ // wanneer er is gescoord wordt de banner vertoond
            goal = false;
            goalCounter = 0;
        }
    }
};

//het bepalen van de richting van het balletje bij bereiken van Batja B
var drawBounceBatjeB = function() {
    //sector 1: 45 graden omhoog
    if(ball.Ypos >= batjeB.beginsector1 && ball.Ypos <= batjeB.beginsector2 && ball.Xpos >= batjeB.X - ball.straal && ball.Xpos <= batjeB.X + 5 + ball.straal) {
        richting.X = -3; 
        richting.Y = -3;
    }
    //sector 2: 22.5 graden omhoog
    else if(ball.Ypos > batjeB.beginsector2 && ball.Ypos <= batjeB.beginsector3 && ball.Xpos >= batjeB.X - ball.straal && ball.Xpos <= batjeB.X + 5 + ball.straal) {
        richting.X = -3; 
        richting.Y = -1.5;
    }
    //sector 3: 0 graden
    else if(ball.Ypos > batjeB.beginsector3 && ball.Ypos <= batjeB.beginsector4 && ball.Xpos >= batjeB.X - ball.straal && ball.Xpos <= batjeB.X + 5 + ball.straal) {    
        richting.X = -3; 
        richting.Y = 0;
    }
    //sector 4: 22.5 graden omlaag
    else if(ball.Ypos > batjeB.beginsector4 && ball.Ypos <= batjeB.beginsector5 && ball.Xpos >= batjeB.X - ball.straal && ball.Xpos <= batjeB.X + 5 + ball.straal) {    
        richting.X = -3; 
        richting.Y = 1.5;
    }
    //sector 5: 45 graden omlaag
    else if(ball.Ypos > batjeB.beginsector5 && ball.Ypos <= batjeB.eindsector5 && ball.Xpos >= batjeB.X - ball.straal && ball.Xpos <= batjeB.X + 5 + ball.straal) {    
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
    rect(1*resize, 0, 15*resize, 400*resize);
    rect(0, 0, 2*resize, 400*resize);
    rect(398*resize, 0, 2*resize, 400*resize);
    rect(0, 0, 400*resize, 2*resize);
    rect(0, 398*resize, 400*resize, 2*resize);
    fill(87, 53, 3);
    rect(190*resize, 0, 10*resize, 10*resize);
    rect(190*resize, 390*resize, 10*resize, 10*resize);
    fill(255, 255, 255);
    stroke(255, 255, 255);
    rect(192.4*resize, 11*resize, 5*resize, 378*resize);
    rect(10*resize, 60*resize, 10*resize, 30*resize);
    rect(10*resize, 310*resize, 10*resize, 30*resize);
    fill(247, 138, 5);
    stroke(247, 138, 5);
    ellipse (ball.Xpos, ball.Ypos, ball.straal, ball.straal);
    ball.Xpos += richting.X * speeding;
    ball.Ypos += richting.Y * speeding;
    fill(255, 255, 255);
    stroke(255, 255, 255);
    drawBounceBatjeB();
     
    if(ball.Ypos >= 400*resize || ball.Ypos <= 0*resize){
        richting.Y = -richting.Y;
    }
    if(ball.Xpos >= 400*resize || ball.Xpos <= 20*resize) {
        richting.X = -richting.X;
    }
    if(ball.Xpos <= 20*resize && ball.Ypos >= 60*resize && ball.Ypos <= 90*resize || ball.Xpos <= 20*resize && ball.Ypos >= 310*resize && ball.Ypos <= 340*resize) {
        score.practise += 1;
    }
    if(ball.Xpos >= 400*resize) {
        richting.X = 1;
        richting.Y = 0;
        ball.Xpos = 200*resize;
        ball.Ypos = 200*resize;
        score.practise = 0;
    }
};
 
// het tekenen van PONG the GAME  
var drawPongTheGame = function() {
    currentScene = 2;
    background(40, 157, 235);
    fill(255, 255, 255);
    stroke(255, 255, 255);
    rect(190*resize, 0, 10*resize, 400*resize);
    rect(0, 199*resize, 400*resize, 2*resize);
    rect(0, 0, 2*resize, 400*resize);
    rect(398*resize, 0, 2*resize, 400*resize);
    rect(0, 0, 400*resize, 2*resize);
    rect(0, 398*resize, 400*resize, 2*resize);
    fill(87, 53, 3);
    rect(190*resize, 0, 10*resize, 10*resize);
    rect(190*resize, 390*resize, 10*resize, 10*resize);
    fill(247, 138, 5);
    stroke(247, 138, 5);
    ellipse (ball.Xpos, ball.Ypos, ball.straal, ball.straal);
    ball.Xpos += richting.X * speeding;
    ball.Ypos += richting.Y * speeding;
    fill(255, 255, 255);
    stroke(255, 255, 255);
    
    //richting bepalen bij kaatsing van batje A in de verschillende sectoren
    if(ball.Ypos >= batjeA.beginsector1 && ball.Ypos <= batjeA.beginsector2 && ball.Xpos >= batjeA.X + ball.straal && ball.Xpos <= batjeA.X + 10 + ball.straal) {
        richting.X = 3;
        richting.Y = -3;
    }
    //batje A sector 2: 22.5 graden omhoog
    else if(ball.Ypos >= batjeA.beginsector2 && ball.Ypos <= batjeA.beginsector3 && ball.Xpos >= batjeA.X + ball.straal && ball.Xpos <= batjeA.X + 10 + ball.straal) {      
        richting.X = 3;
        richting.Y = -1.5;
    }
    //batje A sector 3: 0 graden
    else if(ball.Ypos > batjeA.beginsector3 && ball.Ypos <= batjeA.beginsector4 && ball.Xpos >= batjeA.X + ball.straal && ball.Xpos <= batjeA.X + 10 + ball.straal) {
        richting.X = 3;
        richting.Y = 0;
    }
    //batje A sector 4: 22.5 graden omlaag
    else if(ball.Ypos > batjeA.beginsector4 && ball.Ypos <= batjeA.beginsector5 && ball.Xpos >= batjeA.X + ball.straal && ball.Xpos <= batjeA.X + 10 + ball.straal) {
        richting.X = 3;
        richting.Y = 1.5;
    }
    //Batje A sector 5: 45 graden omlaag
    else if(ball.Ypos > batjeA.beginsector5 && ball.Ypos <= batjeA.eindsector5 && ball.Xpos >= batjeA.X + ball.straal && ball.Xpos <= batjeA.X + 10 + ball.straal) {   
        richting.X = 3;
        richting.Y = 3;
    }
    drawBounceBatjeB(); //functie aanroepen om richting bij kaatsen batje B te bepalen
    
    //kaatsen van de bal tegen de onderkant en bovenkant van het canvas
    if(ball.Ypos >= 400*resize || ball.Ypos <= 0) {    
        richting.Y = -richting.Y;
    }
    //het balletje raakt rechterzijkant canvas
    else if(ball.Xpos >= 400*resize) {
        score.player1 = score.player1 + 1;  //score gaat omhoog bij player 1
        ball.Xpos = 200*resize;        //het balletje in startpositie
        ball.Ypos = 200*resize;
        richting.X = 1;         //balletje richting player 1
        richting.Y = 0;
    }
    // ball raakt linkerzijkant canvas
    else if(ball.Xpos <= 0) {
        score.player2 = score.player2 + 1;  //score gaat omhoog bij player 2
        ball.Xpos = 200*resize;    //het balletje in startpositie 
        ball.Ypos = 200*resize;
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

var drawPongExtreme = function(){ // het tekenen van PONG the game EXTREME
    currentScene = 11;
    background(0, 0, 0);
    fill(255, 242, 0);
    stroke(255, 242, 0);
    rect(5*resize, 5*resize, 390*resize, 1*resize);
    rect(5*resize, 395*resize, 390*resize, 1*resize);
    rect(5*resize, 5*resize, 1*resize, 390*resize);
    rect(395*resize, 5*resize, 1*resize, 390*resize);
    fill(0, 0, 0);
    ellipse(200*resize, 200*resize, 40*resize, 40*resize);
    fill(255, 242, 0);
    ellipse(200*resize, 200*resize, 2*resize, 2*resize);
    rect(199.5*resize, 5*resize, 0.1*resize, 390*resize);
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
    if(ball.Ypos >= batjeA.beginsector1 && ball.Ypos <= batjeA.beginsector2 && ball.Xpos >= batjeA.X + 5 + ball.straal && ball.Xpos <= batjeA.X + 10 + ball.straal) {
        richting.X = 3;
        richting.Y = -3;
    }
    //batje A sector 2: 22.5 graden omhoog
    else if(ball.Ypos >= batjeA.beginsector2 && ball.Ypos <= batjeA.beginsector3 && ball.Xpos >= batjeA.X + 5 + ball.straal && ball.Xpos <= batjeA.X + 10 + ball.straal) {       
        richting.X = 3;
        richting.Y = -1.5;
    }
    //batje A sector 3: 0 graden
    else if(ball.Ypos > batjeA.beginsector3 && ball.Ypos <= batjeA.beginsector4 && ball.Xpos >= batjeA.X + 5 + ball.straal && ball.Xpos <= batjeA.X + 10 + ball.straal) {
        richting.X = 3;
        richting.Y = 0;
    }
    //batje A sector 4: 22.5 graden omlaag
    else if(ball.Ypos > batjeA.beginsector4 && ball.Ypos <= batjeA.beginsector5 && ball.Xpos >= batjeA.X + 5 + ball.straal && ball.Xpos <= batjeA.X + 10 + ball.straal) {
        richting.X = 3;
        richting.Y = 1.5;
    }
    //Batje A sector 5: 45 graden omlaag
    else if(ball.Ypos > batjeA.beginsector5 && ball.Ypos <= batjeA.eindsector5 && ball.Xpos >= batjeA.X + 5 + ball.straal && ball.Xpos <= batjeA.X + 10 + ball.straal) {    
        richting.X = 3; 
        richting.Y = 3;
    }
    drawBounceBatjeB(); //functie aanroepen om richting bij kaatsen batje B te bepalen
    
    //kaatsen van de bal tegen de onderkant en bovenkant van het canvas
    if(ball.Ypos >= 400*resize || ball.Ypos <= 0) {    
        richting.Y = -richting.Y;
    }
    //het balletje raakt rechterzijkant canvas
    else if(ball.Xpos >= 400*resize) {
        score.player1Ex = score.player1Ex + 1;  //score gaat omhoog bij player 1
        ball.Xpos = 200*resize;        //het balletje in startpositie
        ball.Ypos = 200*resize;
        richting.X = 1;         //balletje richting player 1
        richting.Y = 0;
    }
    // ball raakt linkerzijkant canvas
    else if(ball.Xpos <= 0) {
        score.player2Ex = score.player2Ex + 1;  //score gaat omhoog bij player 2
        ball.Xpos = 200*resize;    //het balletje in startpositie 
        ball.Ypos = 200*resize;
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

keyPressed = function(){ // bij het drukken op de bepaalde toetsen van het keyboard gebeuren er verschillende functies
    if(keyCode === 69 && currentScene === 1) { // de E toets, Naar PONG EXTREME titelscherm
        drawTitleScreenExtreme();
        currentScene = 10; }
    else if(keyCode === 69 && currentScene === 10) { // de E toets, terug naar het normale titelscherm
        drawTitleScreen();
        drawPlayButton();
        drawPractiseButton();
        drawRules(); }
    else if(keyCode === 27 && currentScene === 2 || keyCode === 27 && currentScene === 3 || keyCode === 27 && currentScene === 4){ // de ESC toets, terug naar het normale titelscherm
        currentScene = 1;
        resetValues();
    }
    else if(keyCode === 27 && currentScene === 11 || keyCode === 27 && currentScene === 12){ // de ESC toets, terug naar het EXTREME titelscherm
        currentScene = 10;
        resetValues();
    }
    else if(keyCode === 66 && surpriseBart === false){ // de B toets, om de surprise voor bart te showen
        surpriseBart = true;
    }
};

keyReleased = function(){
    if(keyCode === 66 && surpriseBart === true){ // als de B toets wordt losgelaten verdwijnt de surprise
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
        goalSign();
    }
    if (currentScene === 2) { // zoals je kan zien wordt dit getekent bij scene 2
        drawPongTheGame();
        drawScoreBoard();
        drawBatjeA();
        drawBatjeB();
        batjesUpdate();
        goalSign();
    }
    if (currentScene === 3) { // en onderstaande wordt getekent bij scene 3
        drawPractiseRoom();
        drawBackButton();
        drawScoreBoardPractise();
        drawBatjeB();
        batjesUpdate();
    }
    if (currentScene === 10) { // dit wordt getekent bij scene 10
        drawTitleScreenExtreme();
        drawTitleAnimation();
        drawPlayExtremeButton();
        drawPractiseExtremeButton();
        drawRulesExtreme();
        PowerUpNr = 0;
        speeding = 1*resize;
    }
    if (currentScene === 11){ // dit wordt getekent bij scene 11
        drawPongExtreme();
        drawBatjeAExtreme();
        drawBatjeBExtreme();
        drawScoreBoardExtreme();
        batjesUpdate();
        drawPowerUps();
        goalSign();
    }
    if(currentScene === 12){ // dit wordt getekent bij scene 12
        drawRulesScreenExtreme();
        drawBackButton();
        drawTitleAnimation();
        
        
    }
    if(surpriseBart === true){ // dit wordt getekent wanneer de B toets wordt ingedrukt
        bSurprise();
    }
};
  
// zodra de muis van de computer op een bepaalde plek op het canvas klikt (in dit geval de knoppen van de game) veranderd de game naar een nieuwe 'scene'. Hierdoor kan je meerdere schermen creëren.
mouseClicked = function() {
    if (mouseX >= 80*resize && mouseX <= 200*resize && mouseY >= 280*resize && mouseY <= 320*resize) { // wanneer er met de muis binnen deze marges wordt geklikt
        if(currentScene === 1) {
            drawPongTheGame(); }
        if(currentScene === 10){
            drawPongExtreme();
        }
        else if(mouseX >= 135*resize && mouseX <= 255*resize && mouseY >= 260*resize && mouseY <= 300*resize){ // wanneer er met de muis binnen deze marges wordt geklikt
            if(currentScene === 2) {
            drawTitleScreen();
            drawPlayButton();
            drawPractiseButton();
            drawRules();
            resetValues();
            currentScene = 1; }
            if(currentScene === 11){
                drawTitleScreenExtreme();
                drawTitleAnimation();
                drawPlayExtremeButton();
                drawPractiseExtremeButton();
                drawRulesExtreme();
                resetValues();
                currentScene = 10;
            }
        }
        }
    if (mouseX >= 230*resize && mouseX <= 330*resize && mouseY >= 250*resize && mouseY <= 285*resize && currentScene === 1) { // wanneer er met de muis binnen deze marges wordt geklikt
        drawPractiseRoom();
    } else if(mouseX >= 10*resize && mouseX <= 50*resize && mouseY >= 10*resize && mouseY <= 30*resize && currentScene === 3 || mouseX >= 10*resize && mouseX <= 50*resize && mouseY >= 10*resize && mouseY <= 30*resize && currentScene === 4) { // wanneer er met de muis binnen deze marges wordt geklikt
        drawTitleScreen();
        drawPlayButton();
        drawPractiseButton();
        drawRules();
        resetValues();
        currentScene = 1;
    }
    if(mouseX >= 10*resize && mouseX <= 50*resize && mouseY >= 10*resize && mouseY <= 30*resize && currentScene === 12){ // wanneer er met de muis binnen deze marges wordt geklikt
        drawTitleScreenExtreme();
        drawTitleAnimation();
        drawPlayExtremeButton();
        drawPractiseExtremeButton();
        drawRulesExtreme();
        resetValues();
        PowerUpNr = 0; 
    }
    if(mouseX >= 246*resize && mouseX <= 316*resize && mouseY >= 300*resize && mouseY <= 340*resize) { // wanneer er met de muis binnen deze marges wordt geklikt
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