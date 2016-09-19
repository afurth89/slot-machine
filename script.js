// 1. Get two column items to switch back and forth on click
//    --Set .shown and .below classes
// 2. Get two col-items to animate back and forth on click
//    --For .shown, go from top = 0, to top = 200px
//    --For .below, go from top = -200px to top = 0px;
// 3. Create a continuous loop of Step 2
// 4. Repeat 1-3 with three items

function updateClass(el) {
  // If currently class is "shown", 
    // 1. change class to "below" 
    // 2. and change top to 200px;
  if (el.hasClass("shown")) {
    el.removeClass("shown")
    el.animate({
      "top": 200
    }, 1000)
    el.addClass("below")
  // If currently class is "below", 
    // 1. change class to "below" 
    // 2. and change top to -200px;
  } else if (el.hasClass("below")) {
    el.removeClass("below").css("top", -200)
    el.animate({
      "top": 0
    }, 1000)
    el.addClass("shown")
  }
}

$(function() {
  var speedOne = 1000,
      $startBtn = $("#start-btn");

  // Default: 
  //    set the first col-item to '.shown'
  //      and top: 0px
  $item1 = $(".column-box .item-one:first");
  $item1.addClass("shown").css("top", 0);
  //    set the second col-item to '.below'
  //      and top: 200px
  $item2 = $(".column-box .item-two")
  $item2.addClass("below").css("top", 200);


  $startBtn.on("click", function() {
    var refreshId = setInterval(() => {
      updateClass($item1);
      updateClass($item2);
    }, 2000)
  })
});