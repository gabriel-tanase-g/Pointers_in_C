// Global Variables
let randomArray = []; // 1D array
let pointerPosition = 0;  // Initial pointer position

function generateRandomArray() 
{
    // Generate a random array of size 1-10 with random values from 1-100
    // Reset the pointer position to 0 after generating a new array
    let arrayLength = Math.floor(Math.random() * 10) + 1;  
    randomArray = []; // Clear the array before filling it
    for (let i = 0; i < arrayLength; i++) 
        randomArray.push(Math.floor(Math.random() * 100) + 1); 
    pointerPosition = 0; // Reset pointer position after generating a new array
}

function displayArrayValues() 
{
    // Display the array values in the id 'arrayDisplay'
    // Highlight the current pointer position by adding a 'highlight' class
    const arrayDisplay = document.getElementById('arrayDisplay');
    arrayDisplay.innerHTML = ''; // Clear previous array display

    randomArray.forEach((num, index) => 
    {
        const div = document.createElement('div');
        div.classList.add('array-cell');
        div.textContent = num;
        if (index === pointerPosition) 
            div.classList.add('highlight');  // Highlight the pointer's current position
        arrayDisplay.appendChild(div);
    });
}

function displayArrayIndices() 
{
    // Display the array indices in id 'indicesDisplay'
    // Add an index for each array element.
    const indicesDisplay = document.getElementById('indicesDisplay');
    indicesDisplay.innerHTML = ''; // Clear previous indices display

    randomArray.forEach((_, index) => 
    {
        const div = document.createElement('div');
        div.classList.add('array-index');
        div.textContent = index;
        indicesDisplay.appendChild(div);
    });
}

function updateHeading() 
{
    // Update the heading of the array display with current size of random array
    document.querySelector('h1').textContent = `The Array: numbers[ ${randomArray.length} ]`;
}

function displayLastIndexAndValue() 
{
    //Display the last index and its corresponding value in the array
    const lastIndex = randomArray.length - 1;
    document.getElementById('lastIndex').textContent = `${lastIndex}`;
    document.getElementById('lastValue').textContent = `${randomArray[lastIndex]}`;
}

function displayMemoryAddresses() 
{
    // Display the memory addresses corresponding to each array element
    // Highlight the memory cell corresponding to the pointer position
    const memoryDisplay = document.getElementById('memoryDisplay');
    memoryDisplay.innerHTML = ''; // Clear previous memory display
    const memoryArray = []; // Store memory display

    randomArray.forEach((_, index) => 
    {
        memoryArray.push(`Memory[${index}]`);
        const div = document.createElement('div');
        div.classList.add('memory-cell');
        div.textContent = memoryArray[index];
        // Highlight memory cell if it's in the pointer position
        if (index === pointerPosition) 
        div.classList.add('highlight-memory');
        memoryDisplay.appendChild(div);
    });
    // Add "ptr" and "last" memory labels
    displayPointerMemory(); 

    return memoryArray;
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
    // Create and display the "last" memory cell
    const lastMemory = document.createElement('div'); 
    lastMemory.classList.add('memory-cell', 'last-memory'); 
    lastMemory.textContent = `last Memory`; 
    memoryDisplay.appendChild(lastMemory); 
}

function updatePointerOperations(memoryArray) 
{
    // Update the pointer operations in the display
    // Display the value at the pointer, the memory address of the pointer, and other pointer operations
    document.getElementById('pointerCount').textContent = `${pointerPosition}`;
    document.getElementById('dereferencingValue').textContent = `${randomArray[pointerPosition]}`;
    document.getElementById('pointer-value').textContent = `[${memoryArray[pointerPosition]}]`;
    document.getElementById('pointerPlus3').textContent = `[${memoryArray[pointerPosition+3]}]`;
    document.getElementById('lastMinus3').textContent = `${randomArray[randomArray.length - 3]}`;
}

function incrementPtr() 
{
    // Increment the pointer position by 1, if the pointer is not at the end of the array
    // Update the display 
    if (pointerPosition < randomArray.length - 1) 
    {
        pointerPosition++;  // Increment the pointer
        updatePointerOperations(displayMemoryAddresses());  // Update the display
        displayArrayValues();  // Redraw the array
    }
}

function decrementPtr() 
{   
    // Decrement the pointer position by 1, if the pointer is not at the start of the array
    // Update the display
    if (pointerPosition > 0) 
    {
        pointerPosition--;  // Decrement the pointer
        updatePointerOperations(displayMemoryAddresses());  // Update the display
        displayArrayValues();  // Redraw the array
    }
}

function generateAndDisplayRandomArray() 
{
    // Generate a random array, then displays it along with its memory addresses, 
    // last index, and pointer operations
    generateRandomArray(); // Generate random array with random values and reset pointer position
    displayArrayValues();  // Display the array values and highlight the current pointer position
    displayArrayIndices(); // Display the indices of the array elements
    updatePointerOperations(displayMemoryAddresses()); // Update pointer operations based on the current pointer position
    updateHeading();       // Update the heading with the size of the generated array
    displayMemoryAddresses(); // Display memory addresses corresponding to each array element
    displayLastIndexAndValue(); // Display the last index and its value in the array
}

window.onload = function() 
{
    // Show the instruction when the page loads
    document.getElementById("instructionModal").style.display = "block";
}

function closeModal() {
    // Close the instruction when user clicks on the "x" button
    document.getElementById("instructionModal").style.display = "none";
}
