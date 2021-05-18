const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quotte");
const loader = document.getElementById("loader");

let apiQuotes = [];
const Quotes = {
  loading: function () {
    loader.hidden = false;
    quoteContainer.hidden = true;
  },
  loadingComplete: function () {
    loader.hidden = true;
    quoteContainer.hidden = false;
  },
  newQuote: function () {
    this.loading();
    const index = Math.floor(Math.random() * apiQuotes.length);
    const quote = apiQuotes[index];
    const { text, author } = quote;
    if (!author) {
      authorText.innerHTML =
        '<span>Unknown <i class="far fa-frown"></i></span>';
    } else {
      authorText.textContent = author ?? "Unknow";
    }
    //Check Quote length to determine styling
    if (quote.text.length > 50) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.textContent = text;
    this.loadingComplete();
  },
  getQuotes: async function () {
    this.loading();
    const apiUrl = "https://type.fit/api/quotes";
    if (window.navigator.onLine) {
      try {
        const response = await fetch(apiUrl, {
          method: "GET",
        });

        apiQuotes = await response.json();
        this.newQuote();
        this.loadingComplete();
      } catch (err) {
        console.log(err);
        apiQuotes = LocalQuotes;
        this.newQuote();
        this.loadingComplete();
      }
    } else {
      apiQuotes = LocalQuotes;
      this.newQuote();
      this.loadingComplete();
    }
  },
  tweetQuote: function () {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
    window.open(twitterUrl, "_blank");
  },
  init: async function () {
    this.getQuotes();
  },
};
//On Load
Quotes.init();
//Event Listeners
newQuoteBtn.addEventListener("click", Quotes.newQuote.bind(Quotes));
twitterBtn.addEventListener("click", Quotes.tweetQuote);
