$(function() {
  var speedOne = 1000,
      $startBtn = $("#start-btn");

  // Default: set the first number to 'current'
  $(".column-box .col:first-child").addClass("current");

  $startBtn.on("click", function() {
    console.log("CLICKED")
  })
});