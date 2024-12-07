// Global Variables
let randomArray = []; // 2D array
let pointerPosition = 0; // Pointer as a single index for the flat array

// Generate a Random 2D Array
function generateRandomArray() {
    const rows = Math.floor(Math.random() * 2) + 2; // 2-3 rows
    const cols = Math.floor(Math.random() * 2) + 2; // 2-6 columns
    randomArray = Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => Math.floor(Math.random() * 100) + 1)
    );
    pointerPosition = 0; // Initialize pointer to start
}

// Display the Array
function displayArrayValues() {
    const arrayDisplay = document.getElementById("arrayDisplay");
    arrayDisplay.innerHTML = ""; // Clear previous display

    randomArray.forEach((row, rowIndex) => {
        const rowDiv = document.createElement("div");
        rowDiv.classList.add("array-row"); // Flexbox row

        row.forEach((value, colIndex) => {
            const cellDiv = document.createElement("div");
            cellDiv.classList.add("array-cell"); // Flexbox cell
            cellDiv.textContent = value;

            // Highlight the pointer position
            const flatIndex = rowIndex * randomArray[0].length + colIndex;
            if (flatIndex === pointerPosition) {
                cellDiv.classList.add("highlight");
            }

            rowDiv.appendChild(cellDiv); // Add cell to row
        });

        arrayDisplay.appendChild(rowDiv); // Add row to array display
    });
}

// Update Array Heading
function updateHeading() {
    const rows = randomArray.length;
    const cols = randomArray[0].length;
    document.querySelector("h1").textContent = `The Array: numbers[${rows} x ${cols}]`;
}

// Display Memory Addresses
function displayMemoryAddresses() {
    const memoryDisplay = document.getElementById("memoryDisplay");
    memoryDisplay.innerHTML = ""; // Clear previous memory display

    const memoryArray = [];
    randomArray.forEach((row, rowIndex) =>
        row.forEach((_, colIndex) => memoryArray.push(`Memory[${rowIndex}][${colIndex}]`))
    );

    memoryArray.forEach((memory, index) => {
        const div = document.createElement("div");
        div.classList.add("memory-cell");
        div.textContent = memory;

        // Highlight memory cell corresponding to pointer position
        if (index === pointerPosition) {
            div.classList.add("highlight-memory");
        }

        memoryDisplay.appendChild(div);
    });
}

// Update Pointer Operations
function updatePointerOperations() {
    const row = Math.floor(pointerPosition / randomArray[0].length);
    const col = pointerPosition % randomArray[0].length;

    // Update all elements with class "pointerCount"
    document.querySelectorAll(".pointerCount").forEach(el => {
        el.textContent = `${pointerPosition}`;
    });

    // Update all elements with class "pointerValue"
    document.querySelectorAll(".pointerValue").forEach(el => {
        el.textContent = `Memory[${row}][${col}]`;
    });

    // Update all elements with class "dereferencingValue"
    document.querySelectorAll(".dereferencingValue").forEach(el => {
        el.textContent = `${randomArray[row][col]}`;
    });
}

function displayPointerMemory() 
{
    // Add the "ptr" and "last" memory labels to the memory display
    const memoryDisplay = document.getElementById('memoryDisplay');

    // Create and display the "ptr" memory cell
    const pointerMemory = document.createElement('div'); 
    pointerMemory.classList.add('memory-cell', 'ptr-memory'); 
    pointerMemory.textContent = `ptr Memory`; 
    memoryDisplay.appendChild(pointerMemory); 
}
// Increment Pointer
function incrementPtr() {
    const maxIndex = randomArray.length * randomArray[0].length - 1;
    pointerPosition = (pointerPosition + 1) % (maxIndex + 1); // Wrap to start if out of bounds

    updatePointerOperations();
    displayArrayValues();
    displayMemoryAddresses();
    displayPointerMemory();
}

// Decrement Pointer
function decrementPtr() {
    const maxIndex = randomArray.length * randomArray[0].length - 1;
    pointerPosition = (pointerPosition - 1 + (maxIndex + 1)) % (maxIndex + 1); // Wrap to end if out of bounds

    updatePointerOperations();
    displayArrayValues();
    displayMemoryAddresses();
    displayPointerMemory();
}

// Generate and Display Array
function generateAndDisplayRandomArray() {
    generateRandomArray();
    displayArrayValues();
    updateHeading();
    displayMemoryAddresses();
    updatePointerOperations();
    displayPointerMemory();
}

// Close Modal
function closeModal() {
    document.getElementById("instructionModal").style.display = "none";
}

// Initialize on Page Load
window.onload = function () {
    generateAndDisplayRandomArray();
    document.getElementById("instructionModal").style.display = "block";
};
