// Global Variables
let randomArray = []; // 2D array
let pointerPosition = 0; // Initial pointer position

function generateRandomArray() 
{
    // Generate a Random 2D Array
    const rows = Math.floor(Math.random() * 2) + 2; // 2-3 rows
    const cols = Math.floor(Math.random() * 2) + 2; // 2-3 columns
    randomArray = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.floor(Math.random() * 100) + 1)
    );
    pointerPosition = 0; // Reset pointer to start
}

function displayArrayValues() 
{
    // Display the Array
    const arrayDisplay = document.getElementById("arrayDisplay");
    arrayDisplay.innerHTML = ""; // Clear previous display

    randomArray.forEach((row, rowIndex) => 
    {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("array-row"); // Flexbox row

        row.forEach((value, colIndex) => 
        {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("array-cell"); // Flexbox cell
            cellDiv.textContent = value;
            // Highlight the pointer position
            const flatIndex = rowIndex * randomArray[0].length + colIndex;
            if (flatIndex === pointerPosition) 
                cellDiv.classList.add("highlight");
            rowDiv.appendChild(cellDiv); // Add cell to row
        });
        arrayDisplay.appendChild(rowDiv); // Add row to array display
    });
}

function updateHeading() 
{
    // Update Array Heading
    const rows = randomArray.length;
    const cols = randomArray[0].length;
    document.querySelector("h1").textContent = `The Array: numbers[${rows} x ${cols}]`;
}

function displayMemoryAddresses() 
{
    // Display Memory Addresses Block
    const memoryDisplay = document.getElementById("memoryDisplay");
    memoryDisplay.innerHTML = ""; // Clear previous memory display
    const memoryArray = [];
    randomArray.forEach((row, rowIndex) =>
        row.forEach((_, colIndex) => 
            memoryArray.push(`Memory[${rowIndex}][${colIndex}]`)));

    memoryArray.forEach((memory, index) => 
    {
        const div = document.createElement("div");
        div.classList.add("memory-cell");
        div.textContent = memory;
        // Highlight memory cell from pointer position
        if (index === pointerPosition) 
            div.classList.add("highlight-memory");
        memoryDisplay.appendChild(div);
    });
}

function updatePointerOperations() 
{
    // Update Pointer Operations
    const row = Math.floor(pointerPosition / randomArray[0].length);
    const col = pointerPosition % randomArray[0].length;

    // Update elements that display the pointer counter
    document.querySelectorAll(".pointerCount").forEach(el => 
    {
        el.textContent = `${pointerPosition}`;
    });
    // Update elements that display the pointer value
    document.querySelectorAll(".pointerValue").forEach(el => 
    {
        el.textContent = `Memory[${row}][${col}]`;
    });
    // Update elements that display the array value items
    document.querySelectorAll(".dereferencingValue").forEach(el => 
    {
        el.textContent = `${randomArray[row][col]}`;
    });
    
}

function displayPointerMemory() 
{
    // Create and display the "ptr" memory cell
    const memoryDisplay = document.getElementById('memoryDisplay');
    const pointerMemory = document.createElement('div'); 

    pointerMemory.classList.add('memory-cell', 'ptr-memory'); 
    pointerMemory.textContent = `ptr Memory`; 
    memoryDisplay.appendChild(pointerMemory); 
}

function incrementPtr() {
    // Increment Pointer by one
    const maxIndex = randomArray.length * randomArray[0].length - 1;

    pointerPosition = (pointerPosition + 1) % (maxIndex + 1); // Wrap to start if out of bounds
    updatePointerOperations();
    displayArrayValues();
    displayMemoryAddresses();
    displayFirstElementOfSecondRow()
    displayPointerMemory();
}

function decrementPtr() {
    // Decrement Pointer by one
    const maxIndex = randomArray.length * randomArray[0].length - 1;

    pointerPosition = (pointerPosition - 1 + (maxIndex + 1)) % (maxIndex + 1); // Wrap to end if out of bounds
    updatePointerOperations();
    displayArrayValues();
    displayMemoryAddresses();
    displayFirstElementOfSecondRow()
    displayPointerMemory();
}

function getFirstElementOfSecondRow() {
    return randomArray[1][0];
}
function displayFirstElementOfSecondRow() {
    const firstElement = getFirstElementOfSecondRow();
    const displayElement = document.getElementById("first-row-memory");
    displayElement.textContent=`${firstElement}`;
}

function generateAndDisplayRandomArray() 
{
    // Generate and Display Array
    generateRandomArray();
    displayArrayValues();
    displayFirstElementOfSecondRow();
    updateHeading();
    displayMemoryAddresses();
    updatePointerOperations();
    updateFirstRowValues();
    displayPointerMemory();
   
}

window.onload = function () 
{
    // Initialize Modal instructions on lage load
    generateAndDisplayRandomArray();
    document.getElementById("instructionModal").style.display = "block";
};

function closeModal() 
{
    // Close Modal
    document.getElementById("instructionModal").style.display = "none";
}