var studentCounter = 4;

const loadName = function () {
  var name = document.getElementById('displayName');
  name.style.display = 'inline-block';
  var button = document.getElementById('button');
  button.disabled = true;
  button.id = 'button-disabled';

  for(i=0; i<3; i++) {
    dropdown(i);
  }

  hideOtherColumns();

}

const hideOtherColumns = function () {
  var edcols = document.getElementsByClassName('editCol');
  var delCols = document.getElementsByClassName('dellCol');

  for (var i = 0; i < edcols.length; i++) {
    edcols.item(i).style.display = 'none';
 }

 for (var i = 0; i < delCols.length; i++) {
  delCols.item(i).style.display = 'none';
}
}

const dropdown = function (id) {
  console.log(id)
  element = document.getElementsByClassName('dropDownTextArea')[id];
  if (element.style.display === 'none') element.style.display = 'table-row';
  else element.style.display = 'none';
}

const deleteRow = function(event) {
  const button = event.target;
  const row = button.closest("tr");
  const rowParent = row.parentNode;

  const studentValue = row.querySelector("td:nth-child(" + 2 + ")").innerHTML;

  rowParent.removeChild(row);

  setTimeout(() => {
    alert(`${studentValue} Record deleted successfully`)
  }, 100);

  hidCheckboxfunc(event);

}

const editRow = function(event) {
  const button = event.target;
  const row = button.closest("tr");
  const studentValue = row.querySelector("td:nth-child(" + 2 + ")").innerHTML;

  let value = prompt(`Edit details of ${studentValue}`, studentValue);
  if (value == null || value == "") {
    
  } else {
    alert(`${studentValue} data updated successfully`);
  }
}

const AddStudent = function() {
  const tableBody = document.getElementById("myTable");

  const newRow = document.createElement("tr");

  // Add a checkbox column and dropdown image
  const checkboxCell = document.createElement("td");
  checkboxCell.innerHTML = '<input type="checkbox" /><br /><br /><img src="down.png" width="25px" onClick="dropdown('+ (studentCounter - 1) +')"/>';
  checkboxCell.addEventListener("change", handleCheckboxChange);
  newRow.appendChild(checkboxCell);

  // Add student and teacher columns with dynamic values
  const studentCell = document.createElement("td");
  studentCell.textContent = "Student " + studentCounter;
  newRow.appendChild(studentCell);

  const teacherCell = document.createElement("td");
  teacherCell.textContent = "Teacher " + studentCounter;
  newRow.appendChild(teacherCell);

  // Add other static columns with default values
  const otherColumns = ["Approved", "Fall", "TA", studentCounter + "23456", "100%", '<button onclick="editRow(event)">Edit</button>', '<button onclick="deleteRow(event)">Delete</button>'];
  for (const [index, value] of otherColumns.entries()) {
      const cell = document.createElement("td");
      cell.innerHTML = value;
      if (index >= 5 ) cell.style.display = 'none';
      newRow.appendChild(cell);
  }

  // Append the new row to the table body
  tableBody.appendChild(newRow);

  // Append the hidden row
  const newRow2 = document.createElement("tr");
  const colData = document.createElement("td");
  const staticRow = 'Advisor:<br /><br />Award Details<br />Summer 1-2014(TA)<br />Budget Number: <br />Tuition Number: <br />Comments:<br /><br /><br />Award Status:<br /><br /><br />';

  colData.innerHTML = staticRow;
  colData.colSpan = 8;
  newRow2.appendChild(colData);

  newRow2.classList.add('dropDownTextArea');

  tableBody.appendChild(newRow2);

  dropdown(studentCounter - 1);

  studentCounter++;

  setTimeout(() => {
    alert(`Student ${studentCounter - 1} Record added successfully`)
  }, 100);

}

function handleCheckboxChange(event) {
  const checkbox = event.target;
  const row = checkbox.closest("tr"); // Find the parent row of the checkbox
  const edcol = row.querySelector(":nth-child(" + 9 + ")");
  const dellcol = row.querySelector(":nth-child(" + 10 + ")");

  var edcolsHead = document.getElementsByClassName('editCol')[0];
  var delColsHead = document.getElementsByClassName('dellCol')[0];

  if (checkbox.checked) {
      // Checkbox is checked, change row color to "Yellow"
      row.style.backgroundColor = "yellow";

      edcolsHead.style.display = 'table-cell';
      delColsHead.style.display = 'table-cell';

      edcol.style.display = 'table-cell';
      dellcol.style.display = 'table-cell';

      // Change the Submit button color to "Orange"
      const submitButton = document.getElementById("button-disabled");
      if (submitButton) submitButton.id = "button";

  } else {
      // Checkbox is unchecked, reset row color
      row.style.backgroundColor = "";
      hidCheckboxfunc(event);
  }
}

const hidCheckboxfunc = function(event) {
  // Check if any checkboxes are still checked
  const checkbox = event.target;
  const row = checkbox.closest("tr");
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  const edcol = row.querySelector(":nth-child(" + 9 + ")");
  const dellcol = row.querySelector(":nth-child(" + 10 + ")");

  var edcolsHead = document.getElementsByClassName('editCol')[0];
  var delColsHead = document.getElementsByClassName('dellCol')[0];

  edcol.style.display = 'none';
  dellcol.style.display = 'none';
  let anyChecked = false;
  checkboxes.forEach((chk) => {
      if (chk.checked) {
          anyChecked = true;
      }
  });

  // If no checkboxes are checked, reset the Submit button color to its default
  if (!anyChecked) {
      const submitButton = document.getElementById("button");
      submitButton.id = "button-disabled";

      edcolsHead.style.display = 'none';
      delColsHead.style.display = 'none';
  }
}