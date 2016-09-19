// 1. spinItem function (consider name)
// 2. Set names of item divs in each row
// 3. Abstract function for initiateSpin for each column



// Function updates the class and animates change to
// CSS position for items
function spinItem(el) {
  if (el.hasClass("shown")) {
  // If currently class is "shown", 
    // 1. change class to "below" 
    // 2. and animate top to 200px;
    // (simulates sliding down out of frame)
    el.removeClass("shown")
    el.animate({
      "top": 200
    }, 500)
    el.addClass("last")
  } else if (el.hasClass("last")) {
  // If currently class is "below", 
    // 1. change class to "above" 
    // 2. and change top to -200px;
    el.removeClass("last").css("top", -200).addClass("next")
  } else {
  // If currently class is "above", 
    // 1. change class to "show" 
    // 2. and animate top to 0px;
    // (simulates sliding down into the fram)
    el.removeClass("next")
    el.animate({
      "top": 0
    }, 500)
    el.addClass("shown")
  }
}

function initiateSpin(item1, item2, item3) {
  // Determine number of spins and set count
  var spinTotal = Math.floor(Math.random() * 10);
  var counter = 0;
  // console.log("Number of spins is ", spinTotal)
  var refreshId = setInterval(() => {
    if (counter === spinTotal) {
      clearInterval(refreshId)
      // console.log("INTERVAL STOPPED")
    }
    spinItem($item1);
    spinItem($item2);
    spinItem($item3);
    counter++;
    // console.log("counter is ", counter)

  // At the moment the interval time needs to be larger 
  // than the animation speed or the animation breaks
  }, 550)
}

$(function() {
  var speedOne = 1000,
      $startBtn = $("#start-btn");

  // Default: 
  //    set the first col-item to '.shown'
  //      and top: 0px
  $item1 = $(".column-box .item-one");
  $item1.addClass("shown").css("top", 0);
  //    set the second col-item to '.below'
  //      and top: 200px
  $item2 = $(".column-box .item-two")
  $item2.addClass("next").css("top", -200);
  //    set the third col-item to '.above'
  //      and top: -200px
  $item3 = $(".column-box .item-three")
  $item3.addClass("last").css("top", -200);

  $startBtn.on("click", function() {
    initiateSpin($item1, $item2, $item3);
  })
});