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

    // Minimum 5, max 10 spins for column one 
    var colSpins = Math.floor(Math.random() * 6) + 5  
    var colDelay = 0;

    // Start each column spinning
    colNames.forEach((el) => {
      var colWrapper = $('#col-'+el)
      // spin function must be passed through anonymous func
      // so it isn't immediately invoked
      setTimeout(function() {
        spin(colWrapper, colSpins, 200)
      }, colDelay)
      // Increment setTimeout delay so columns start spinning
      // in order (not simultaneously)
      colDelay += 500;
      // Increment colSpins so columns always finish left-center-right
      colSpins += 4;
    })

  });

  // Reset Function
  $('#reset-btn').click(function() {
    // Animate out winner wrapper
    $('#winner-wrapper').animate({
      left: -2000
    }, 1000, 'linear')
  })

});