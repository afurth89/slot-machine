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

  // TODO - Make "WINNER" blink

  // TODO: Delegate setting the css and calling 
  // 'spin' function across columns
  $('#start-btn').click(function () {
    // Set random spin values between 1 and 5 for colOne
      // We'll increment that val for cols Two and Three
      // to mirror a normal slot machine where reels finish
      // left to right
    var colOneSpins = Math.floor(Math.random() * 6)  

    // TODO - DRY code
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

  // Reset Function
  $('#reset-btn').click(function() {
    // Animate out winner wrapper
    $('#winner-wrapper').animate({
      left: -2000
    }, 1000, 'linear')
  })

});