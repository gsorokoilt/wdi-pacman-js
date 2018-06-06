// Setup initial game stats
var score = 0;
var lives = 2;
var ghosts = [getInky(),getBlinky(),getPinky(),getClyde()];
var powerPellets = 4;

// Define your ghosts here

// replace this comment with your four ghosts setup as objects
function getInky(){
    var inky = {
      menu_option: '1',
      name: 'Inky',
      colour: 'Red',
      character: 'Shadow',
      edible: false
    };

    return inky;
  }

function getBlinky(){
    var blinky = {
      menu_option: '2',
      name: 'Blinky',
      colour: 'Cyan',
      character: 'Speedy',
      edible: false
    };

    return blinky;
  }

function getPinky(){
    var pinky = {
      menu_option: '3',
      name: 'Pinky',
      colour: 'Pink',
      character: 'Bashful',
      edible: false
    };

    return pinky;
  }

function getClyde(){
    var clyde = {
      menu_option: '4',
      name: 'Clyde',
      colour: 'Orange',
      character: 'Pokey',
      edible: false
    };

      return clyde;
}


// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    gameOver();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives);
  console.log('\n     Power-Pellets:'+ powerPellets);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');

  if(powerPellets  > 0){
    console.log('(p) Eat Power-Pellet');
  }

  for(i = 0; i < ghosts.length; i++){
      console.log('(' + ghosts[i].menu_option +') Eat '+ ghosts[i].name+'('+ ghosts[i].edible +')');
  }

  console.log('(q) Quit');
}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatPowerPellet(){

  score += 50;
  powerPellets -=1;

  for(i=0; i<ghosts.length; i++){
    ghosts[i].edible = true; //HOW TO ASSIGN EDIBLE TO TRUE
  }

}

function eatGhost(menu_option){

  for(i=0; i<ghosts.length; i++){
    if(menu_option === ghosts[i].menu_option){

      if(ghosts[i].edible === false){
        lives -=1;
        console.log('\nColor of '+ghosts[i].name+' ghost is '+ ghosts[i].colour);
      }
      else{
        console.log('\nColor of '+ghosts[i].name+' ghost is '+ ghosts[i].colour+ 'and the personality is ' + ghosts[i].character);
        score +=200;
        for(j=0; j<ghosts.length; j++){
          ghosts[j].edible = false;
        }
      }

    }
  }
}

function gameOver(){
  if (lives ==0){
    process.exit();
  }
}

// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
        if(powerPellets>0){
            eatPowerPellet();
            break;
        }
        else{
          console.log('\nNot enough Pelets');
        }
    case '1':
      eatGhost('1');
      break;
    case '2':
      eatGhost('2');
      break;
    case '3':
      eatGhost('3');
      break;
    case '4':
      eatGhost('4');
      break;
    default:
      console.log('\nInvalid Command!');
  }
}


//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 300); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
