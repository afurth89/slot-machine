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

// Initiates the spinning for each column with
// a random number of spins
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
    spinItem(item1);
    spinItem(item2);
    spinItem(item3);
    counter++;
    // console.log("counter is ", counter)

  // At the moment the interval time needs to be larger 
  // than the animation speed or the animation breaks
  }, 550)
}

// This function will automate setting the class for each
// column
function setClass(itm1, itm2, itm3) {
  itm1.addClass("shown").css("top", 0);
  itm2.addClass("next").css("top", -200);
  itm3.addClass("last").css("top", -200);  
}

$(function() {
  var speedOne = 1000,
      $startBtn = $("#start-btn");

  // Column One
  $oneOne = $("#col-one .item-one");
  $oneTwo = $("#col-one .item-two");
  $oneThree = $("#col-one .item-three");
  // Column Two
  $twoOne = $("#col-two .item-one");
  $twoTwo = $("#col-two .item-two");
  $twoThree = $("#col-two .item-three");
  // Column Three
  $threeOne = $("#col-three .item-one");
  $threeTwo = $("#col-three .item-two");
  $threeThree = $("#col-three .item-three");

  // Set classes for each column
  setClass($oneOne, $oneTwo, $oneThree);
  setClass($twoOne, $twoTwo, $twoThree);
  setClass($threeOne, $threeTwo, $threeThree);


  $startBtn.on("click", function() {
    initiateSpin($oneOne, $oneTwo, $oneThree);
    initiateSpin($twoOne, $twoTwo, $twoThree);
    initiateSpin($threeOne, $threeTwo, $threeThree);
  })
});