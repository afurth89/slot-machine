$( document ).ready(function() {
  
  var numOfPositions = 3; // Number of positions (choices) in a reel
  var reelHeight = 750; // px
  var onePositionHeight = reelHeight / numOfPositions;
  var colNames = ['one', 'two', 'three'];  // To run forEach func's on each column
  var beverageArray = ["coffee", "tea", "espresso"]; // For mapping winning bevs to finalReelPositions
  var reelsDoneSpinning; // Count of how many reels have finished spinning
  var beginSpinDelay = 0;  // Timed delay to ensure stagged start to reels beginning to spin
  var firstSpinDuration = 200;  // Default value for the duration of first "rotation"; increases on each spin to produce "slow-down" effect
  var totalReelRotations;  // Dynamically determined each spin
  var finalReelPositions;  // Dynamically determined each spin

  // Clone the first element; append to end of list

  // Reason? --> As the final item is exiting the viewport
  // the next item (which is realy the first item), must
  // 'appear' to be entering the frame.

  // Under the hood, there is a jump between the last
  // <li> entering the frame, and then the entire list
  // resetting and the first <li> filling the frame.
  // However since the first and last item are identical
  // the 'jump' is imperceptible to the user

  colNames.forEach((el) => {
    var itemList = $('#col-'+el+'>ul:first')
    var firstItem = itemList.find('li:first')
    firstItem.clone().appendTo(itemList)
  })

  // Start a spin
  $('#start-btn').click(function () {
    // Determine final reel positions and number of reel rotations for this spin
    finalReelPositions = determineReelPositions(numOfPositions);
    console.log("Final reel positions for this spin are..., ", finalReelPositions)
    totalReelRotations = Math.floor(Math.random() * 6) + 2 // Minimum 2, max 7 spins for column one 
    // Reset delay and duration values
    beginSpinDelay = 0;
    firstSpinDuration = 200;
    reelsDoneSpinning = 0;


    // Start each column spinning
    colNames.forEach((el, colIdx) => {
      var colWrapper = $('#col-'+el)
      // spin function must be passed through anonymous func
      // so it isn't immediately invoked
      setTimeout(function() {
        spin(colWrapper, colIdx, totalReelRotations, firstSpinDuration, onePositionHeight, numOfPositions)
      }, beginSpinDelay)

      beginSpinDelay += 500  // Each successive reel will wait another 500ms before beginning, creating staggered start of reels
      totalReelRotations += 2;  // Add 2 extra rotations to each reel, to ensure they finish left-center-right
    });
  });

  // Reset Function
  $('#reset-btn').click(function() {
    // Animate out winner wrapper
    $('#winner-wrapper').animate({
      left: -2000
    }, 1000, 'linear')
  })

  // Creates an array of three integers, each 0-2, that will determine what position each reel finishes on
  function determineReelPositions(numOfPositions) {
    // Create an array
    var finalPositionsArray = []
    // Iterate through a loop numOfPositions times
    for (var i = 1; i <= numOfPositions; i++) { 
      // Get random integer from 0-2
      // Push that integer to the array
      finalPositionsArray.push( Math.floor(Math.random() * numOfPositions) )
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
  function spin(columnElement, colIdx, spinsRemaining, spinDuration, onePositionHeight, numOfSlots) {
    columnElement
    // Reset, ensure previous animation stopped
    .stop()  
    // 'spin' animation, changing the "top" property of the reel from 0 to the negative of it's height
    // which animates the reel traveling upwards
    .animate({
        top: -(onePositionHeight*numOfSlots)
    }, spinDuration, 'linear', function () {
      
      // If final spin, determine ending element
      if (spinsRemaining == 0) {
        // Pick a 'winning' slot
        var winningPosition = finalReelPositions[colIdx],
        // Set the height required for animation to end on 'winning position'
        winningPositionHeight = winningPosition * -onePositionHeight
        // Adjust time of animation to winningPosition's distance
        // from top, so motion spinDuration remains constant 
        winningPositionSpinDuration =  spinDuration * winningPosition / numOfSlots;
        // Run final 'spin'
        $(this).css({
            top: 0
        }).animate({
            top: winningPositionHeight
        }, winningPositionSpinDuration, 'linear', function() {
          // Trigger a function that count whether 
          // all three columns have finished spinning
          // Also, pass along the 'top' value to check for 
          // winner
          console.log("The winning item for this column is, ", beverageArray[winningPosition])
          checkForWinner();
        })


      // If this is not the final spin, decrement spinsRemaining
      // and scroll through items again
      } else {
        // Reset "top" position to create illusion of the reel being back at the first position
        $(this).css({
            top: 0
        })
        // Decrement spinsRemaining, but increase spin spinDuration
        // to create 'slowing' down effect on each successive "spin"
        spinsRemaining--
        spinDuration+=50
        spin(columnElement, colIdx, spinsRemaining, spinDuration, onePositionHeight, numOfSlots)
      };
    });
  }

  function checkForWinner() {
    // Increment doneSpinning count
    reelsDoneSpinning++ 
    // Check if all three columns finished spinning
    if (reelsDoneSpinning === 3) {
      // Check if same beverage appeared all three times
      if (finalReelPositions[0] === finalReelPositions[1] &&
          finalReelPositions[0] === finalReelPositions[2]) {

        // Show winning beverage, using the winning index (from finalReelPositions array)
        showWinner(beverageArray[finalReelPositions[0]])
      }
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
});




