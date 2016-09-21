// Store the results of each spin
var columnPositions = [];


// A vertical scroll through the 
// list of items to simulate a 'spin'

// Will go through given number of 'spins'
// and on final spin will select a winning
// element and end 'spin' animation there
function spin(column, count, duration) {
  console.log("spin triggered")
  column
  .stop()  // Reset, ensure previous animation stopped
  // 'spin' animation, scroll item list top to bottom
  .animate({
      top: -750
  }, duration, 'linear', function () {
    // If final spin, determine ending element
    if (count == 0) {
      // Pick a 'winning' slot
      var slot = Math.floor(Math.random() * 3),
      // Set the height required for 'winning' slo
          top = -slot * 250,
      // Adjust time of animation to slot's distance
      // from top, so motion duration remains constant 
          time =  duration * slot / 3;
      console.log(count, slot, top, time)
      // Run final 'spin'
      $(this).css({
          top: 0
      }).animate({
          top: top
      }, time, 'linear', function() {
        // Trigger a function that count whether 
        // all three columns have finished spinning
        // Also, pass along the 'top' value to check for 
        // winner
        checkForWinner(top);
      })


    // If this is not the final spin, decrement count
    // and scroll through items again
    } else {
        $(this).css({
            top: 0
        })
        // Decrement count, but increase spin duration
        // to create 'slowing' down effect
        spin(column, count - 1, duration+100)
    };
  });
}


function checkForWinner(colPos) {
  // Add the position of column to arr, to check for winner
  columnPositions.push(colPos)
  // Check if all three columns finished spinning
  if (columnPositions.length === 3) {
    // Check if columns are same
    if (columnPositions[0] === columnPositions[1] &&
        columnPositions[0] === columnPositions[2]) {
      // Determine what the winning item is by checking
      // the first value (we've already determined all vals
      // in array are same)
      if(columnPositions[0] === 0) {
        showWinner("coffee")
      } else if (columnPositions[0] === -250) {
        showWinner("tea")
      } else {
        showWinner("espresso")
      }
    }
    // Reset columnPositions
    columnPositions = [];
  }
}


function showWinner(bevName) {
    // Update the src and alt attributes for img
    $('#winner-img-container>img').attr({
      src: './assets/cup_'+bevName+'.jpg',
      alt: bevName
    })
    // Insert the winning bev (uppercased) into h2
    $('#winning-bev-name').text(bevName.toUpperCase())
    // Animate in winner wrapper
    $('#winner-wrapper').animate({
      left: 150
    }, 1000, 'linear')
  }