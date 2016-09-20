// TODO: Include sourcing?
// Much of my code for the slot machine animnation was
// based on the following fiddle:
// http://jsfiddle.net/jakecigar/aMmhZ/12/

$( document ).ready(function() {
  // Store final result of each column
  var columnPositions;



  // Clone the first element; append to end of list

  // Reason? --> As the final item is exiting the viewport
  // the next item (which is realy the first item), must
  // 'appear' to be entering the frame.

  // Under the hood, there is a jump between the last
  // <li> entering the frame, and then the entire list
  // resetting and the first <li> filling the frame.
  // However since the first and last item are identical
  // the 'jump' is imperceptible to the user

  // TODO: Create function to delegate cloning of
  // first item in list

  // Clone Col 1
  var itemList1 = $('#col-one>ul:first')
  var firstItem1 = itemList1.find('li:first')
  firstItem1.clone().appendTo(itemList1)


  // Clone Col 2
  var itemList2 = $('#col-two>ul:first')
  var firstItem2 = itemList2.find('li:first')
  firstItem2.clone().appendTo(itemList2)

  // Clone Col 3
  var itemList3 = $('#col-three>ul:first')
  var firstItem3 = itemList3.find('li:first')
  firstItem3.clone().appendTo(itemList3)

  
  // A vertical scroll through the 
  // list of items to simulate a 'spin'

  // Will go through given number of 'spins'
  // and on final spin will select a winning
  // element and end 'spin' animation there
  function spin(column, count, duration) {
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
        }, time, 'linear')

        // Trigger a function that count whether 
        // all three columns have finished spinning
        // Also, pass along the 'top' value to check for 
        // winner
        checkForWinner(top);

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
    if (columnPositions.length === 3) {
      console.log("Let's check for a winner")
      showWinner()
      // Check is columns are same
      if (columnPositions[0] === columnPositions[1] &&
          columnPositions[0] === columnPositions[2]) {
        console.log('WINNER')
        // Determine what the winning item is
        if(columnPositions[0] === 0) {
          console.log("All 1s")
        } else if (columnPositions[0] === -200) {
          console.log("All 2s")
        } else {
          console.log("All 3s")
        }
      }
    }
  }


  function showWinner() {
    $('#winner-wrapper').animate({
      left: 150
    }, 1000, 'linear')
  }

  // TODO: Delegate setting the css and calling 
  // 'spin' function across columns
  $('#start-btn').click(function () {
    // Clear the columnPositions array
    columnPositions = [];
    // Set random spin values between 1 and 5 for colOne
      // We'll increment that val for cols Two and Three
      // to mirror how a normal slot machine finishes
    var colOneSpins = Math.floor(Math.random() * 6)  
    $('#col-one').css({
        top: 0
    }) 
    spin($('#col-one'), colOneSpins, 500)

    $('#col-two').css({
        top: 0
    }) 
    spin($('#col-two'), colOneSpins+1, 600)

    $('#col-three').css({
        top: 0
    }) 
    spin($('#col-three'), colOneSpins+2, 700)
  });

});