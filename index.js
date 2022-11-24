//initial references
let imageDisplayed = document.querySelector(".image-displayed");
let textUnderImage = document.getElementsByClassName("text-under-image");
let dashes = document.getElementsByClassName("dashes");
let keypad = document.getElementsByClassName("keypad");

//word list
let wordList = [
    "abruptly",
    "absurd",
    "abyss",
    "affix",
    "askew",
    "avenue",
    "awkward",
    "axiom",
    "azure",
    "bagpipes",
    "bandwagon",
    "banjo",
    "bayou",
    "beekeeper",
    "bikini",
    "blitz",
    "blizzard",
    "boggle",
    "bookworm",
    "boxcar",
    "boxful",
    "buckaroo",
    "buffalo",
    "buffoon",
    "buxom",
    "buzzard",
    "buzzing",
    "buzzwords",
    "caliph",
    "cobweb",
    "cockiness",
    "croquet",
    "crypt",
    "curacao",
    "cycle",
    "daiquiri",
    "dirndl",
    "disavow",
    "dizzying",
    "duplex",
    "dwarves",
    "embezzle",
    "equip",
    "espionage",
    "euouae",
    "exodus",
    "faking",
    "fishhook",
    "fixable",
    "fjord",
    "flapjack",
    "flopping",
    "fluffiness",
    "flyby",
    "foxglove",
    "frazzled",
    "frizzled",
    "fuchsia",
    "funny",
    "gabby",
    "galaxy",
    "galvanize",
    "gazebo",
    "giaour",
    "gizmo",
    "glowworm",
    "glyph",
    "gnarly",
    "gnostic",
    "gossip",
    "grogginess",
    "haiku",
    "haphazard",
    "hyphen",
    "iatrogenic",
    "icebox",
    "injury",
    "ivory",
    "ivy",
    "jackpot",
    "jaundice",
    "jawbreaker",
    "jaywalk",
    "jazziest",
    "jazzy",
    "jelly",
    "jigsaw",
    "jinx",
    "jiujitsu",
    "jockey",
    "jogging",
    "joking",
    "jovial",
    "joyful",
    "juicy",
    "jukebox",
    "jumbo",
    "kayak",
    "kazoo",
    "keyhole",
    "khaki",
    "kilobyte",
    "kiosk",
    "kitsch",
    "kiwifruit",
    "klutz",
    "knapsack",
    "larynx",
    "lengths",
    "lucky",
    "luxury",
    "lymph",
    "marquis",
    "matrix",
    "megahertz",
    "microwave",
    "mnemonic",
    "mystify",
    "naphtha",
    "nightclub",
    "nowadays",
    "numbskull",
    "nymph",
    "onyx",
    "ovary",
    "oxidize",
    "oxygen",
    "pajama",
    "peekaboo",
    "phlegm",
    "pixel",
    "pizazz",
    "pneumonia",
    "polka",
    "pshaw",
    "psyche",
    "puppy",
    "puzzling",
    "quartz",
    "queue",
    "quips",
    "quixotic",
    "quiz",
    "quizzes",
    "quorum",
    "razzmatazz",
    "rhubarb",
    "rhythm",
    "rickshaw",
    "schnapps",
    "scratch",
    "shiv",
    "snazzy",
    "sphinx",
    "spritz",
    "squawk",
    "staff",
    "strength",
    "strengths",
    "stretch",
    "stronghold",
    "stymied",
    "subway",
    "swivel",
    "syndrome",
    "thriftless",
    "thumbscrew",
    "topaz",
    "transcript",
    "transgress",
    "transplant",
    "triphthong",
    "twelfth",
    "twelfths",
    "unknown",
    "unworthy",
    "unzip",
    "uptown",
    "vaporize",
    "vixen",
    "vodka",
    "voodoo",
    "vortex",
    "voyeurism",
    "walkway",
    "waltz",
    "wave",
    "wavy",
    "waxy",
    "wellspring",
    "wheezy",
    "whiskey",
    "whizzing",
    "whomever",
    "wimpy",
    "witchcraft",
    "wizard",
    "woozy",
    "wristwatch",
    "wyvern",
    "xylophone",
    "yachtsman",
    "yippee",
    "yoked",
    "youthful",
    "yummy",
    "zephyr",
    "zigzag",
    "zigzagging",
    "zilch",
    "zipper",
    "zodiac",
    "zombie",
];


//To select word from word list
let wordPosition = Math.floor(Math.random()*212)+1
wordToGuess = wordList[wordPosition]


// split the letters of the word to guess into an array
wordArray = wordToGuess.split("")


// empty array to be used
newWordArray = []

//for each letter of the word add a textbox to the empty array
wordArray.forEach(element => {
    newWordArray.push(`<input type="text" value="" readonly></input>`)
});

    
//make the textbox appear in one line, with consecutive dashes sepearted by whitespace
dashesDispalyed=newWordArray.join(' ')

//To generate textbox for each letter of the word on the page
document.querySelector(".dashes").innerHTML=dashesDispalyed


//To get value from the button and disable it
const allButtons = document.querySelector(".keypad");
allButtons.addEventListener('click', enterValue);


function enterValue(e){
   if(e.target.nodeName === "INPUT"){
    let letter1 = e.target.value.toLowerCase();
    e.target.disabled = true;

    findLetter(letter1); //find the letter in the wordArray and insert into the input box if found. 
    
   }
}

//To get value from keyboard
document.addEventListener('keydown', function(keyBoardPress){
    var keyboardKey = keyBoardPress.key
    findLetter(keyboardKey)
});






let tries = 0;
let numOfLettersGuessed = 0;
function findLetter(letter){
    let foundLetter = false; //We initially assume the letter is not found
    
    wordArray.forEach((l, index)=>{ //looping through the wordArray to find the letter
        if(l == letter){
            foundLetter = true; // we assign true when the letter has been found
            newWordArray[index] = `<input type="text" value="${letter.toUpperCase()}" readonly></input>`; //Update the newWordArray when the right letter is guessed
            numOfLettersGuessed++;
            showLetter();//To display the letter when found
        }
        disableKeyboardAfterWordGuessed();
    })

    updateHangmanImage(foundLetter);
}

//To disable keyboard after all letters are guessed
function disableKeyboardAfterWordGuessed(){
    if(wordArray.length == numOfLettersGuessed){
        disableKeyboard();
        document.getElementById("change-this").innerHTML="Congratulations🎉. You correctly guessed the word."
        document.getElementById("refresh-page").innerHTML="Refresh page to play again"
    }
}


function updateHangmanImage(foundLetter){ //Update the hangman image when the letter is not found per the number of tries
    if(foundLetter == false){ 
        tries++;
        switch(tries){
            case 1: 
                imageDisplayed.src = "images\\hangman-1.jpg";
                document.getElementById("change-this").innerHTML="5 tries remaining"
                break;
            case 2: 
                imageDisplayed.src = "images\\hangman-2.jpg";
                document.getElementById("change-this").innerHTML="4 tries remaining"
                break;
            case 3: 
                imageDisplayed.src = "images\\hangman-3.jpg";
                document.getElementById("change-this").innerHTML="3 tries remaining"
                break;
            case 4: 
                imageDisplayed.src = "images\\hangman-4.jpg";
                document.getElementById("change-this").innerHTML="2 tries remaining"
                break;
            case 5: 
                imageDisplayed.src = "images\\hangman-5.jpg";
                document.getElementById("change-this").innerHTML="1 try remaining"
                break;
            case 6: 
                imageDisplayed.src = "images\\hangman-6.jpg";
                document.getElementById("change-this").innerHTML="Game Over 💀"
                document.getElementById("refresh-page").innerHTML="Refresh page to play again"
                document.getElementById("word-to-guess").innerHTML="The word to guess was "+wordToGuess
                disableKeyboard();
                break;
        }
        
    }
}

let elems = document.getElementsByClassName("but");
function disableKeyboard(){
        for(let i = 0; i < elems.length; i++) {
            elems[i].disabled = true;
            }
}


function showLetter(){   //To display the letter when found
    document.querySelector(".dashes").innerHTML = newWordArray.join(' '); 
}





let numOfTries =6
let endOfGame=false

while (endOfGame=false) {
    if (condition) {
        
    } else {
        
    }
    
}