async function getQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();

        document.getElementById("quote").innerText = data.content;
        document.getElementById("author").innerText = "- " + data.author;

    } catch (error) {
        document.getElementById("quote").innerText = "Failed to load quote.";
    }
}