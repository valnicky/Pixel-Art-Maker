/*Create dynamically a grid, in other words the user will be able to decide width and height of it
choose dinamycally a color, for example he can use a color at the start of his session to then change it whenever he/she wants
click a cell in the to fill it with the color selected at that time */
$(document).ready(function() {
  $("#sizePicker, h2")
    .hide()
    .fadeIn(4000);
  $("#colorPicker")
    .hide()
    .fadeIn(6000);
  $(".design, h1")
    .hide()
    .fadeIn(8000);
});

// Select color input
// Select size input

// When size is submitted by the user, //call makeGrid()
function makeGrid() {
  //get pixel canvas
  let table = $("#pixel_canvas");

  //get rows and cols input
  let inputH = $("#input_height").val();
  let inputW = $("#input_width").val();

  //reset to empty table if we already created
  table.children().remove();

  //create rows
  for (let i = 1; i <= inputH; i++) {
    table.append("<tr></tr>");
    //create cols
    for (let j = 1; j <= inputW; j++) {
      table
        .children()
        .last()
        .append("<td></td>");
    }
  }
  //listen for cel clicks
  table.on("click", "td", function() {
    //get color from colorPicker
    let colorPick = $("input[type='color']").val();
    //apply color to cell
    $(this).attr("bgcolor", colorPick);
  });
}

//listen for btn clicks to trigger makeGrid()
$("form input:nth-child(3)").on("click", function(event) {
  event.preventDefault(); //required to
  // avoid submit and page reloaded
  makeGrid();
});

//reset Grid
const RESET_BUTTON = $("#remove input:last-child");
RESET_BUTTON.click(function(r) {
  r.preventDefault();
  resetGrid();
});
function resetGrid() {
  $("#pixel_canvas").empty();
}

//remove colors
const RESET_COLOR = $("#remove input:first-child");
RESET_COLOR.click(function(r) {
  r.preventDefault();
  resetColor();
});
function resetColor() {
  $("#pixel_canvas td").removeAttr("bgcolor");
}
