let currentQuote = "";
let currentAuthor = "";

// Get quote from API
async function getQuote() {
    try {
        const response = await fetch("https://api.quotable.io/random");
        const data = await response.json();

        currentQuote = data.content;
        currentAuthor = data.author;

        document.getElementById("quote").innerText = currentQuote;
        document.getElementById("author").innerText = "- " + currentAuthor;

    } catch (error) {
        document.getElementById("quote").innerText = "Failed to load quote.";
    }
}

// Save quote to localStorage
function saveQuote() {
    if (!currentQuote) return;

    let favorites = JSON.parse(localStorage.getItem("quotes")) || [];

    favorites.push({
        quote: currentQuote,
        author: currentAuthor
    });

    localStorage.setItem("quotes", JSON.stringify(favorites));

    alert("Quote saved!");
}

// Display saved quotes
function viewFavorites() {
    let favorites = JSON.parse(localStorage.getItem("quotes")) || [];
    let container = document.getElementById("favorites");

    container.innerHTML = "<h2>Saved Quotes:</h2>";

    favorites.forEach(q => {
        container.innerHTML += `
            <p>"${q.quote}"<br><small>- ${q.author}</small></p>
            <hr>
        `;
    });
}