$( document ).ready(function() {
  
  var totalNumOfSlots = 3;
  var fullReelHeight = 750;
  var onePositionHeight = fullReelHeight / totalNumOfSlots;
  var totalReelRotations = Math.floor(Math.random() * 6) + 5  // Minimum 5, max 10 spins for column one 
  var beginSpinDelay = 0;  // First reel will have no delay in beginning to spin
  var firstSpinDuration = 200;  // First spin
  


  // Predetermined results of the spin
  var finalReelPositions = determineReelPositions(totalNumOfSlots);

  // Clone the first element; append to end of list

  // Reason? --> As the final item is exiting the viewport
  // the next item (which is realy the first item), must
  // 'appear' to be entering the frame.

  // Under the hood, there is a jump between the last
  // <li> entering the frame, and then the entire list
  // resetting and the first <li> filling the frame.
  // However since the first and last item are identical
  // the 'jump' is imperceptible to the user
  var colNames = ['one', 'two', 'three']

  colNames.forEach((el) => {
    var itemList = $('#col-'+el+'>ul:first')
    var firstItem = itemList.find('li:first')
    firstItem.clone().appendTo(itemList)
  })

  // Start a spin
  $('#start-btn').click(function () {
    // Set random spin values for colOne
      // We'll increment that val for cols Two and Three
      // to mirror a normal slot machine where reels finish
      // left to right


    // Start each column spinning
    colNames.forEach((el) => {
      var colWrapper = $('#col-'+el)
      // spin function must be passed through anonymous func
      // so it isn't immediately invoked
      setTimeout(function() {
        spin(colWrapper, totalReelRotations, firstSpinDuration, onePositionHeight, totalNumOfSlots)
      }, beginSpinDelay)
      beginSpinDelay += 500  // Each successive reel will wait another 500ms before beginning, creating staggered start of reels
      totalReelRotations += 4;  // Add extra rotations to each reel, to ensure they finish left-center-right
    });
  });

  // Reset Function
  $('#reset-btn').click(function() {
    // Animate out winner wrapper
    $('#winner-wrapper').animate({
      left: -2000
    }, 1000, 'linear')
  })

});

  // Creates an array of three integers, each 0-2, that will determine what position each reel finishes on
  function determineReelPositions(totalNumOfSlots) {
    // Create an array
    var finalPositionsArray = []
    // Iterate through a loop totalNumOfSlots times
    for (var i = 1; i <= totalNumOfSlots; i++) { 
      // Get random integer from 0-2
      // Push that integer to the array
      finalPositionsArray.push( Math.floor(Math.random() * totalNumOfSlots) )
    }
    return finalPositionsArray;
  }

// Citation: http://jsfiddle.net/jakecigar/aMmhZ/12/
// "Spinning" animation logic was based on this code

// A vertical scroll through the 
// list of items to simulate a 'spin'

// Will go through given number of 'spins'
// and on final spin will select a winning
// element and end 'spin' animation there
function spin(column, count, duration, onePositionHeight, numOfSlots) {
  column
  .stop()  // Reset, ensure previous animation stopped
  // 'spin' animation, scroll item list top to bottom
  .animate({
      top: -(onePositionHeight*numOfSlots)
  }, duration, 'linear', function () {
    // If final spin, determine ending element
    if (count == 0) {
      // Pick a 'winning' slot
      var slot = Math.floor(Math.random() * numOfSlots),
      // Set the height required for 'winning' slo
      top = slot * -onePositionHeight
      // Adjust time of animation to slot's distance
      // from top, so motion duration remains constant 
      time =  duration * slot / numOfSlots;
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
        spin(column, count - 1, duration+50)
    };
  });
}


function checkForWinner(colPos) {
  // Add the position of column to arr, to check for winner
  columnPositions.push(colPos)
  // Check if all three columns finished spinning
  if (columnPositions.length === totalNumOfSlots) {
    var firstVal = columnPositions[0]
    // Check if columns are same
    if (firstVal === columnPositions[1] &&
        firstVal === columnPositions[2]) {
      // Determine what the winning item is by checking
      // the first value (we've already determined all vals
      // in array are same)
      if(firstVal === 0) {
        showWinner("coffee")
      } else if (firstVal === -250) {
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