$(function() {
  var speedOne = 1000,
      $startBtn = $("#start-btn");

  // Default: set the first number to 'current'
  $(".column-box .col-item:last-child").addClass("current").css("top", 0);
  $(".col-item").not(".current").css("top", 200)

  $startBtn.on("click", function() {
    console.log("CLICKED")
  })
});