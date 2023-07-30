function calculateCleaning() {
  const bedrooms = parseInt(document.getElementById("bedrooms").value);
  const bathrooms = parseInt(document.getElementById("bathrooms").value);
  const squareFeet = parseInt(document.getElementById("square-feet").value);
  const dirtiness = parseInt(document.getElementById("dirtiness").value);

  // Calculate the estimated hours based on the inputs
  let estimatedHours =
    bedrooms * 1 + bathrooms * 0.5 + squareFeet / 500 + dirtiness * 0.25;

  // Calculate the estimated price (you can define your own pricing logic)
  let estimatedPrice = estimatedHours * 25; // Assuming $25 per hour

  // Display the results
  document.getElementById("estimated-hours").innerText =
    estimatedHours.toFixed(1) + " hours";
  document.getElementById("estimated-price").innerText =
    "$" + estimatedPrice.toFixed(2);
}
