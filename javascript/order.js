document.getElementById("order-button").onclick = function (event) {
  event.preventDefault();

  const coffeeType = document.getElementById("coffee-type").value;
  const coffeeQuantity = document.getElementById("coffee-quantity").value;
  const size = document.getElementById("size").value;

  if (coffeeType === "" || coffeeQuantity === "" || size === "") {
    alert("Please fill in all required fields!");
  } else {
    alert("Your order has been successfully placed!");

    document.querySelector(".order-form").reset();
  }
};

document.getElementById("submit-button").addEventListener("click", function () {
  alert("Your Message has been successfully sent!");
});
