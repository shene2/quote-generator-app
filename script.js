let currentQuote = "";
let currentAuthor = "";
let currentMood = "all";

// Fetch random quote
async function getQuote() {
    try {
        const response = await fetch("https://dummyjson.com/quotes/random");
        const data = await response.json();

        currentQuote = data.quote;
        currentAuthor = data.author;

        document.getElementById("quote").innerText = currentQuote;
        document.getElementById("author").innerText = "- " + currentAuthor;

    } catch (error) {
        document.getElementById("quote").innerText = "Failed to load quote.";
        console.error("Error:", error);
    }
}

// Change UI mood (category feel)
function setMood(mood) {
    currentMood = mood;

    const box = document.querySelector(".quote-box");

    if (mood === "calm") {
        box.style.background = "#e0f7fa";
    } else if (mood === "focus") {
        box.style.background = "#ede7f6";
    } else if (mood === "happy") {
        box.style.background = "#fff1f2";
    } else {
        box.style.background = "#f0f4ff";
    }

    getQuote(); // fetch new quote when mood changes
}