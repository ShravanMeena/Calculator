/*
TODO:
    Limit number input
    Clean up structure
*/

(function() {
    "use strict";

    // Shortcut to get elements
    var el = function(element) {
      if (element.charAt(0) === "#") { // If passed an ID...
        return document.querySelector(element); // ... returns single element
      }

      return document.querySelectorAll(element); // Otherwise, returns a nodelist
    };
    // Variables
    var viewer = el("#viewer"), // Calculator screen where result is displayed
      equals = el("#equals"), // Equal button
      nums = el(".num"), // List of numbers
      ops = el(".ops"), // List of operators
      theNum = "", // Current number
      oldNum = "", // First number
      resultNum, // Result
      operator; // Batman

    // When: Number is clicked. Get the current number selected
    var setNum = function() {
      //if . was pressed, then only do this if theNum doesn't already include a .
      if ((this.getAttribute("data-num")==="." && theNum.indexOf(".") === -1) || this.getAttribute("data-num")!=="."){
        if (resultNum) { // If a result was displayed, reset number
          theNum = this.getAttribute("data-num");
          resultNum = "";
        } else { // Otherwise, add digit to previous number (this is a string!)
          theNum += this.getAttribute("data-num");
        }

        viewer.innerHTML = theNum; // Display current number
      }

    };

    // When: Number key is pressed. Get the current number selected
    var setNumKey = function(keyPressed) {
      //if . was pressed, then only do this if theNum doesn't already include a .
      if ((keyPressed ==="." && theNum.indexOf(".") === -1) || keyPressed !=="."){
        if (resultNum) { // If a result was displayed, reset number
          theNum = keyPressed;
          resultNum = "";
        } else { // Otherwise, add digit to previous number (this is a string!)
          theNum += keyPressed;
        }

         viewer.innerHTML = theNum; // Display current number
       }
    }

    // When: Operator is clicked. Pass number to oldNum and save operator
    var moveNum = function() {
      oldNum = theNum;
      theNum = "";
      operator = this.getAttribute("data-ops");

      equals.setAttribute("data-result", ""); // Reset result in attr
    };

    // When: Operator is clicked. Pass number to oldNum and save operator
    var moveNumKey = function(wordOperator) {
      oldNum = theNum;
      theNum = "";
      operator = wordOperator;

      equals.setAttribute("data-result", ""); // Reset result in attr
    };

    // When: Equals is clicked. Calculate result
    var displayNum = function() {

      // Convert string input to numbers
      oldNum = parseFloat(oldNum);
      theNum = parseFloat(theNum);

      // Perform operation
      switch (operator) {
        case "plus":
          resultNum = oldNum + theNum;
          break;

        case "minus":
          resultNum = oldNum - theNum;
          break;

        case "times":
          resultNum = oldNum * theNum;
          break;

        case "divided by":
          resultNum = oldNum / theNum;
          break;

        case "square":
          resultNum = oldNum ** 2;
          break;

        case "cube":
          resultNum = oldNum ** 3;
          break;

        case "square root":
          resultNum = Math.sqrt(oldNum);
          break;

        case "power":
          resultNum = oldNum ** theNum;
          break;

        case "sin":
          resultNum = Math.sin(oldNum);
          break;

        case "cos":
          resultNum = Math.cos(oldNum);
          break;

        case "tan":
          resultNum = Math.tan(oldNum);
          break;

          // If equal is pressed without an operator, keep number and continue
        default:
          resultNum = theNum;
      }

      // If NaN or Infinity returned
      if (!isFinite(resultNum)) {
        if (!isInt(resultNum) || !isFloat(resultNum)) { // If result is not a number; set off by, eg, double-clicking operators
          resultNum = "You broke it!";
        } else { // If result is infinity, set off by dividing by zero
          resultNum = "Look at what you've done";
          el('#calculator').classList.add("broken"); // Break calculator
          el('#reset').classList.add("show"); // And show reset button
        }
      }

      // Display result, finally!
      viewer.innerHTML = resultNum;
      equals.setAttribute("data-result", resultNum);

      // Now reset oldNum & keep result
      oldNum = 0;
      theNum = resultNum;

    };

    // When: Clear button is pressed. Clear everything
    var clearAll = function() {
      oldNum = "";
      theNum = "";
      viewer.innerHTML = "0";
      equals.setAttribute("data-result", resultNum);
    };

    // When: Key is pressed, find out if it's a valid one and send to relevant function if so
    var findKey = function(e){
      if((e.key >= 0 && e.key <= 9) || e.key == "."){
        setNumKey(e.key);
      }
      // Operator keys
      switch (e.key) {
        case "+":
          moveNumKey("plus");
          break;
        case "-":
          moveNumKey("minus");
          break;
        case "*":
          moveNumKey("times");
          break;
        case "/":
          moveNumKey("divided by");
          break;
        case "=":
        case "Enter":
          displayNum();
          break;
        case "Escape":
        case "c":
        case "C":
          clearAll();
          break;
        // if another key is pressed then do nothing
        default:
          break;
      }
    }

    /* The click events */

    // Add click event to numbers
    for (var i = 0, l = nums.length; i < l; i++) {
      nums[i].onclick = setNum;
    }

    // Add click event to operators
    for (var i = 0, l = ops.length; i < l; i++) {
      ops[i].onclick = moveNum;
    }

    //Add keyboard event to use numbers and basic operators
    document.onkeyup = findKey;

    // Add click event to equal sign
    equals.onclick = displayNum;

    // Add click event to clear button
    el("#clear").onclick = clearAll;

    // Add click event to reset button
    el("#reset").onclick = function() {
      window.location = window.location;
    };

  }());
