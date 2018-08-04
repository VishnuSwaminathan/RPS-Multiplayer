// Initialize Firebase
var config = {
  apiKey: 'AIzaSyCrOtJLznln7MwF4_VFx5wm2l2HPr9GTVc',
  authDomain: 'rps-multiplayer-b7289.firebaseapp.com',
  databaseURL: 'https://rps-multiplayer-b7289.firebaseio.com',
  projectId: 'rps-multiplayer-b7289',
  storageBucket: '',
  messagingSenderId: '180762991497'
};
firebase.initializeApp(config);
var database = firebase.database();
var refP1 = database.ref('players/player1');
var refP2 = database.ref('players/player2');
var refT = database.ref('turn');
var refC = database.ref('chat');
var player1 = {
  name: '',
  losses: 0,
  wins: 0,
  choice: ''
};
var player2 = {
  name: '',
  losses: 0,
  wins: 0,
  choice: ''
};
var choices = [];
// Check which created name first, set that instance as player1
// Set second instance as player2
//Wait untill submit clicked, then store name (for player1/2) value
database.ref('players').on('value', function(snapshot) {
  if (snapshot.child('player1').exists()) {
    $('#nameBtn').on('click', function() {
      var name2 = $('#name').val();
      player2.name = name2;
      refP2.set(player2);
      $('.choice1').html('');
      $('#player2').html(name2);
      console.log('You are player2');
      $('#choice1').html('<strong> Waiting on Player 1 </strong>');
      //Remove submit btn, name field
    });
  } else {
    $('#nameBtn').on('click', function() {
      var name1 = $('#name').val();
      player1.name = name1;
      refP1.set(player1);
      //Remove submit btn, name field
      $('.choice2').html('');
      $('#player1').html(name1);
      console.log('You are player1');
      return start1();
    });
  }
});

//Check which player you are
//Set name to player1
//If player1, go first
//(Wait until) one of the choices are clicked
//Store choice in firebase (store value of btn, ie. Rock, Paper, etc.)
//Display what choice you picked, remove choices
//Display "waiting for other player"
//set firebase token value to 1 (global, not child)
//Else if player2, wait until token value is 1, disp "waiting for player1"
//(Wait until) one of the choices are clicked
//Store choice in firebase
//Display what choice you picked, remove choices
//Retrieve player1 choice, store in local var, retrieve player2 choice, store in local var
//return result(player1Choice, player2Choice)

function start1() {
  $('.btn').on('click', function() {
    console.log('player1');
    console.log(this);
    choices[0] = $(this).html();
    player1.choice = choices[0];
    $('#choice1').html('<strong>' + choices[0] + '</strong>');
    refP1.child('choice').set(player1.choice);
    $('#choice1').html('Player1 has chosen ' + choices[0]);
    console.log('player2 can start');
    start2();
  });
}
function start2() {
  console.log('Player 2 started');
  $('.choice2').on('click', function() {
    console.log('player2');
    console.log(this);
    choices[1] = $(this).html();
    player2.choice = choices[0];
    refP2.child('choice').set(player2.choice);
    $('#choice2').html('Player1 has chosen ' + choices[0]);
    console.log('Onto results');
    result();
  });
}

function result() {
  if (choice[0] === choice[1]) {
    console.log('TIE');
  } else if (choice[0] === 'Rock' && choice[1] == 'Paper') {
    console.log('Player 2 wins');
  } else if (choice[0] === 'Rock' && choice[1] == 'Scissors') {
    console.log('Player 1 wins');
  } else if (choice[0] === 'Paper' && choice[1] == 'Rock') {
    console.log('Player 1 wins');
  } else if (choice[0] === 'Paper' && choice[1] == 'Scissors') {
    console.log('Player 2 wins');
  } else if (choice[0] === 'Scissors' && choice[1] == 'Rock') {
    console.log('Player 2 wins');
  } else if (choice[0] === 'Scissors' && choice[1] == 'Paper') {
    console.log('Player 1 wins');
  }
}

$('#playAgain').on('click', function() {
  player1.choice = '';
  player2.choice = '';
  $('#result').text('You Win/Lose/Tie!');
});
