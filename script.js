const form = document.getElementById("form");
const symbolsInput = document.getElementById("symbols");
const chartDiv = document.getElementById("chart");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const symbols = symbolsInput.value.split(",").map((symbol) => symbol.trim());

  if (symbols.length === 0) {
    alert("Please enter at least one symbol.");
    return;
  }

  const apiUrl = `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${symbols.join(
    ","
  )}`;
  const apiKey = "29366e8f-d165-48fb-94c2-e36c5b79d456";

  fetch(apiUrl, { headers: { "X-CMC_PRO_API_KEY": apiKey } })
    .then((response) => response.json())
    .then((data) => {
      const prices = symbols.map((symbol) => data.data[symbol].quote.USD.price);

      const chartData = {
        x: symbols,
        y: prices,
        type: "bar",
      };

      const layout = {
        title: "Bitcoin Prices",
        xaxis: {
          title: "Symbol",
        },
        yaxis: {
          title: "Price (USD)",
        },
      };

      Plotly.newPlot(chartDiv, [chartData], layout);
    })
    .catch((error) => {
      console.error(error);
      alert("Error getting prices. Please try again later.");
    });
});
