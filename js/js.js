/*Create dynamically a grid, in other words the user will be able to decide width and height of it
choose dinamycally a color, for example he can use a color at the start of his session to then change it whenever he/she wants
click a cell in the to fill it with the color selected at that time */
$(document).ready(function() {
  $("h1 span")
    .hide(1000)
    .fadeIn(3000);
});
//get pixel canvas
let table = $("#pixel_canvas");

// When size is submitted by the user, //call makeGrid()
function makeGrid() {
  // Select color input
  //get color from colorPicker
  let colorPick = $("#colorPicker");
  // Select size input
  //get rows and cols input
  const inputH = $("#input_height");
  const inputW = $("#input_width");

  const maximumValueAlert = $("#maximumValueAlert");
  //reset to empty table if we already created
  table.children().remove();

  //Making sure the user does not chose/write a higher number than the number I chose [40]
  if (inputH.val() > 40 || inputW.val() > 40) {
    maximumValueAlert.css("visibility", "visible");
    setTimeout(() => maximumValueAlert.css("visibility", "hidden"), 1000);
    inputW.val(40);
    inputH.val(20);
    return;
  }
  //create rows
  for (let i = 1; i <= inputH.val(); i++) {
    table.append("<tr></tr>");
    //create cols
    for (let j = 1; j <= inputW.val(); j++) {
      table
        .children()
        .last()
        .append("<td></td>");
    }
  }

  //listen for cell clicks
  table.on("click", "td", function() {
    //apply color to cell
    $(this).attr("bgcolor", colorPick.val());
  });

  /*press mouse down and draw multiple cells*/
  let mouseDown = false;
  table.mousedown(function(e) {
    e.preventDefault();
    mouseDown = true;
  });

  $("body").mouseup(function() {
    mouseDown = false;
  });

  table.on("mousemove", "td", function() {
    if (mouseDown) {
      $(this).css("background-color", colorPick.val());
    }
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
const RESET_COLOR = $("#removeColors");
RESET_COLOR.click(function(e) {
  e.preventDefault();
  resetColor();
});
function resetColor() {
  $("td").each(function() {
    $(this).css("background-color", "#fff");
  });
}

//random button
function randomRgba() {
  return (
    "rgba(" +
    Math.round(Math.random() * 255) +
    "," +
    Math.round(Math.random() * 255) +
    "," +
    Math.round(Math.random() * 255) +
    "," +
    Math.random().toFixed(1) +
    ")"
  );
}

function randomNumber(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function randomFill() {
  const rowsNumber = table[0].rows.length;
  const colsNumber = table[0].rows[0].cells.length;
  let randomCells_to_fill = rowsNumber * colsNumber / 2;
  for (let i = 0; i < randomCells_to_fill; i++) {
    let randomRowNumber = randomNumber(0, rowsNumber);
    let randomColNumber = randomNumber(0, colsNumber);
    table.children()[randomRowNumber].cells[
      randomColNumber
    ].style.backgroundColor = randomRgba();
  }
}

$("#randomColors").click(function(e) {
  e.preventDefault();
  randomFill();
});
