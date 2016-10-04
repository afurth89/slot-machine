$( document ).ready(function() {
  
  var numOfPositions = 3; // Number of positions (choices) in a reel
  var reelHeight = 750; // px
  var onePositionHeight = reelHeight / numOfPositions;  // Height (px) of each reel position <li> element
  var colNames = ['one', 'two', 'three'];  // To capture column elements to clone first element in each column
  var beverageArray = ["coffee", "tea", "espresso"]; // For mapping winning bevs to finalReelPositions
  var reelsDoneSpinning; // Count of how many reels have finished spinning
  var beginSpinDelay = 0;  // Timed delay before starting spinning of next reel, to ensure staggered start for each reel
  var firstSpinDuration = 200;  // Default value for the duration of first "rotation"; increases on each spin to produce "slow-down" effect
  var totalReelRotations = 4;  // Col 1 will spin 4 times, Col 2 will spin 6 and col 3 will spin 8
  var finalReelPositions;  // Dynamically determined each spin



  // On DOM load, clone the first element; append to end of list

  // Reason? --> 
  // Under the hood, there is a jump between the last
  // <li> exiting the frame, and then the entire list
  // resetting and the first <li> filling the frame.
  // However since the first and last item are identical
  // the 'jump' is imperceptible to the user
  colNames.forEach((el) => {
    var listOfReelPositions = $('#col-'+el+'>ul:first')
    var firstReelPosition = listOfReelPositions.find('li:first')
    firstReelPosition.clone().appendTo(listOfReelPositions)
  })

  //***************************************************************************
  // CLICK EVENTS
  //***************************************************************************

  // Click 'spin' button
  $('#start-btn').click(function () {
    prepSlotMachine();  // Resets key variables, and determines new final positions for each reel
    startSlotMachine(); // Initiates setTimeout functions for each reel that will begin their spinning
  });

  // Reset Function
  $('#reset-btn').click(function() {
    // Animate out winner wrapper
    $('#winner-wrapper').animate({
      left: -2000
    }, 1000, 'linear')
  })


  //***************************************************************************
  // HELPER FUNCTIONS
  //***************************************************************************

  // Creates an array of three integers, each 0-2, that will determine what position each reel finishes on
  function determineReelPositions(numOfPositions) {
    // Create an array
    var finalPositionsArray = []
    // Iterate through a loop numOfPositions times
    for (var i = 1; i <= numOfPositions; i++) { 
      // Get random integer from 0 to numPositions minus 1
      // Push that integer to the array
      finalPositionsArray.push( Math.floor(Math.random() * numOfPositions) )
    }
    return finalPositionsArray;
  }

  // Resets key variables, and determines new final positions for each reel, to create a 'new spin'
  function prepSlotMachine() {
    // Reset key variables
    beginSpinDelay = 0;
    firstSpinDuration = 200;
    reelsDoneSpinning = 0;
    totalReelRotations = 4; 

    finalReelPositions = determineReelPositions(numOfPositions);  // Choose new winning positions for upcoming spin
  }

  // Begins the spinning process
  function startSlotMachine() {
    // Start each column spinning
    colNames.forEach((el, colIdx) => {
      // Capture each column using jQuery
      var colWrapper = $('#col-'+el)
      // spin function must be passed through anonymous func
      // so it isn't immediately invoked
      setTimeout(function() {
        spin(colWrapper, colIdx, totalReelRotations, firstSpinDuration, onePositionHeight, numOfPositions)
      }, beginSpinDelay)

      beginSpinDelay += 500  // Each successive reel will wait another 500ms before beginning, creating staggered start of reels
      totalReelRotations += 2;  // Add 2 extra rotations to each reel, to ensure they finish left-center-right
    });
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
        spinDuration += 50
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




