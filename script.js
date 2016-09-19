// 1. Get two column items to switch back and forth on click
//    --Set .shown and .below classes
// 2. Get two col-items to animate back and forth on click
//    --For .shown, go from top = 0, to top = 200px
//    --For .below, go from top = -200px to top = 0px;
// 3. Create a continuous loop of Step 2
// 4. Repeat 1-3 with three items

function updateClass(el) {
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
    var refreshId = setInterval(() => {
      updateClass($item1);
      updateClass($item2);
      updateClass($item3);
    // At the moment the interval time needs to be larger 
    // than the animation speed or the animation breaks
    }, 550)
  })
});