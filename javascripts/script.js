// TODO: Include sourcing?
// Much of my code for the slot machine animnation was
// based on the following fiddle:
// http://jsfiddle.net/jakecigar/aMmhZ/12/

$( document ).ready(function() {
  // Clone the first element; append to end of list

  // Reason? --> As the final item is exiting the viewport
  // the next item (which is realy the first item), must
  // 'appear' to be entering the frame.

  // Under the hood, there is a jump between the last
  // <li> entering the frame, and then the entire list
  // resetting and the first <li> filling the frame.
  // However since the first and last item are identical
  // the 'jump' is imperceptible to the user
  var columns = ['one', 'two', 'three']

  columns.forEach((el) => {
    var itemList = $('#col-'+el+'>ul:first')
    var firstItem = itemList.find('li:first')
    firstItem.clone().appendTo(itemList)
  })

  // TODO: Delegate setting the css and calling 
  // 'spin' function across columns
  $('#start-btn').click(function () {
    // Set random spin values between 1 and 5 for colOne
      // We'll increment that val for cols Two and Three
      // to mirror a normal slot machine where reels finish
      // left to right

    // TODO - Add more spins and make it muchfaster to start
    var colOneSpins = Math.floor(Math.random() * 12)  

    // TODO - DRY code
    $('#col-one').css({
        top: 0
    }) 
    spin($('#col-one'), colOneSpins, 200)

    $('#col-two').css({
        top: 0
    }) 
    spin($('#col-two'), colOneSpins+1, 200)

    $('#col-three').css({
        top: 0
    }) 
    spin($('#col-three'), colOneSpins+2, 200)
  });

  // Reset Function
  $('#reset-btn').click(function() {
    // Animate out winner wrapper
    $('#winner-wrapper').animate({
      left: -2000
    }, 1000, 'linear')
  })

});