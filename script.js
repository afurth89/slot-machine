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

  var itemList = $('#col-one>ul:first')
  var firstItem = itemList.find('li:first')
  firstItem.clone().appendTo(itemList)


  // 1. Pass in a count for the number of spins
  // 2. .stop() allows us to ensure that any effects
      // effects of previous spin animation are killed
  // 3. Animates the list sliding upwards, creating a 
      // scroll effect
  // 4. IF still iterations left in count...
      // repeat spin animation (count decrements)
    // ELSE if count is at 0 and this is final iteration

  function spin(count) {
    $('#col-one').stop().animate({
        top: -600
    }, 2000, 'linear', function () {
        if (count == 0) {
            var slot = Math.floor(Math.random() * 3),
                top = -slot * 200,
                time =  2000 * slot / 3;
            console.log(count, slot, top, time)
            $(this).css({
                top: 0
            }).animate({
                top: top
            }, time, 'linear')
        } else {
            $(this).css({
                top: 0
            })
            spin(count - 1)
        };
    });
  }

  $('#start-btn').click(function () {
      $('#col-one').css({
          top: 0
      }) 
      spin(1)
  });

});