const deck = {
    11: 4,
    2: 4,
    3: 4,
    4: 4,
    5: 4,
    6: 4,
    7: 4,
    8: 4,
    9: 4,
    10: 4,
    12: 4,
    13: 4,
    14: 4,
};

let player = [0];
let playercopy = [0];
let cpu = [0];
let cpucopy = [0];
let result = 0;
let dealerResult = 0;
let counts = 0;
let clicked = 0;

dealCards();

let num1 = document.getElementById("imgPlayer");
let dealernum1 = document.getElementById("imgCPU");

let gameOver = document.getElementById("gameResult");

let sum = document.getElementById("sum");
let dsum =  document.getElementById("dsum");
let messg = document.getElementById("msg");

sum.innerText = result;
dsum.innerText = dealerResult;

message();
imagesPlayer();

if (result == 21) {
    gameOver.innerText = "Blackjack!"
    clicked = 1;
}

function dealCards() {
    //dealing cards
    for (let i = 0; i < 2; i++) {
        let ran1 = parseInt(Math.random() * 13 + 2);

        //assures that right amt of each card in a deck is dealt 
        ran1 = countDeckCards(ran1);
        countCards(ran1);
        player.unshift(ran1);
        playercopy.unshift(ran1);
    }

    //cards sum
    for (let i = 0; i < 2; i++) {
        if (playercopy[i] >= 12) {
            playercopy[i] = 10;
        }
        result += playercopy[i];
    }
}

function dealCardsCPU() {
    //dealing cards
    for (let i = 0; i < 2; i++) {
        let ran2 = parseInt(Math.random() * 13 + 2); 
        ran2 = countDeckCards(ran2);
        countCards(ran2);

        cpu.unshift(ran2);
        cpucopy.unshift(ran2);
    }

    //cards sum
    for (let i = 0; i < 2; i++) {
        if (cpucopy[i] >= 12) {
            cpucopy[i] = 10;
        } 
        dealerResult += cpucopy[i];
    }

    imagesCPU();
}

function countDeckCards(ran) {
    while (deck[eval(ran)] == 0) {
        ran = parseInt(Math.random() * 13 + 2);
    }
    deck[eval(ran)]--;
    return ran;
}

function message() {
    if (result < 21) {
        messg.innerText = "Would you like to hit?"
    } else if (result > 21) {
        messg.innerText = "Game Over"
        gameOver.innerText = "You Lost!"
    }
}


function hit() {
    let gameStatus = playerLoseCheck();
    console.log("clciked" + clicked);
    if (!gameStatus && clicked != 1) {
        refillDeck();
    
        let ran = parseInt(Math.random() * 13 + 2);
        let ranImg = 0;
        ran = countDeckCards(ran);
        countCards(ran);
    
        ranImg = ran;
        //controls value of letter cards
        if (ran >= 12) {
            ran = 10;
        }
    
        result += ran;
    
        player.unshift(ranImg);
        playercopy.unshift(ranImg);
    
        sum.innerText = checkA();

        message();
        imagesPlayer();
    }
}


function stand() {
    refillDeck();

    let gameStatus = playerLoseCheck();
    if (!gameStatus && clicked == 0) {
        while (dealerResult < 17) {
            let ran = parseInt(Math.random() * 13 + 2);
            let ranImg = 0;
            ran = countDeckCards(ran);
            countCards(ran);
    
            ranImg = ran;
    
            //controls value of letter cards
            if (ran >= 12) {
                ran = 10;
            }
    
            dealerResult += ran;
    
            cpu.unshift(ranImg);
            cpucopy.unshift(ranImg);
    
            dsum.innerText = checkAcpu();
            imagesCPU();
            winCheck();
        }
        winCheck();
    }
    clicked = 1;
}


function imagesPlayer() { 
    for (let i = 0; i < player.length; i++) {
        let valx = "'cards/card" + player.shift() + ".png'";
        var img = new Image();
        img.src = eval(valx);
        document.getElementById('imgPlayer').appendChild(img);
    }
}


function imagesCPU() {
    for (let i = 0; i < cpu.length; i++) {
        let valx = "'cards/card" + cpu.shift() + ".png'";
        var img = new Image();
        img.src = eval(valx);
        document.getElementById('imgCPU').appendChild(img);
    }
}

function checkA() {
    for (let i = 0; i < playercopy.length; i++) {
        if (playercopy[i] == 11) {
            if (result > 21) {
                playercopy[i] = 1;
                result -= 10;
                return result;
            }
        }
    }
    return result;
}


function checkAcpu() {
    for (let i = 0; i < cpucopy.length; i++) {
        if (cpucopy[i] == 11) {
            if (dealerResult > 21) {
                cpucopy[i] = 1;
                dealerResult -= 10;
                return dealerResult;
            } 
        }
    }
    return dealerResult;
}


function winCheck() {
    if (dealerResult > 21) {
        gameOver.innerText = "You Won!"
        return true;
    } else if (result == dealerResult) {
        gameOver.innerText = "It's a tie!"
        return true;
    } else if (result > dealerResult) {
        gameOver.innerText = "You Won!"
        return true;
    } else if (result < dealerResult) {
        gameOver.innerText = "Dealer Won!"
        return true;
    } 
    return false;
}

function playerLoseCheck() {
    if (result > 21) {
        gameOver.innerText = "You Lost!"
        clicked = 1;
        return true;
    } 
    return false;
}

function next() {
    player = [0];
    playercopy = [0];
    cpu = [0];
    cpucopy = [0];
    clicked = 0;

    document.getElementById('imgPlayer').innerText = "";
    document.getElementById("imgCPU").innerText = "";

    result = 0;
    dealerResult = 0;
    gameOver.innerText = "";
    messg.innerText = "";

    refillDeck();
    dealCards();
    sum.innerText = result;
    dsum.innerText = dealerResult;

    if (result == 21 || dealerResult == 21) {
        gameOver.innerText = "Blackjack!"
        clicked = 1;
    }

    message();
    imagesPlayer();
}

function check() {
    for (let i = 2; i < 15; i++) {
        console.log(i + ": " + deck[i]);
    }
}

function countCards(ran) {
    if (ran >= 2 && ran <= 6) {
        counts++;
    } else if (ran >= 10) {
        counts--;
    }
    console.log("current count: " + counts);
}

function refillDeck() {
    let amt = 0;
    for (let i = 2; i < 15; i++) {
        if (deck[i] != 0) {
            amt += deck[i];
        }
    }

    if (amt <= 4) {
        for (let i = 2; i < 15; i++) {
            deck[i] = 4;
        }
    }
}
