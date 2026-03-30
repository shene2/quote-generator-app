let currentQuote = "";
let currentAuthor = "";

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