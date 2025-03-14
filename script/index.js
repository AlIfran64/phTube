function loadCategories() {
  // fetch the data
  fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
    // convert promise to json object
    .then((res) => {
      return res.json();
    })
    // send data to display
    .then((data) => {
      return displayCategory(data.categories);
    })
    // error handling
    .catch((err) => {
      return console.log(err);
    });
}

function displayCategory(categories) {
  // get the container
  let container = document.getElementById("category-container");

  // loop through the categories
  for (let cat of categories) {
    // create elements
    let catDiv = document.createElement("div");
    catDiv.innerHTML = `
    <button
        class="btn btn-sm text-lg hover:bg-[#FF1F3D] hover:text-white py-5 px-4"
      >
        ${cat.category}
      </button>`;

    // append elements to the container
    container.appendChild(catDiv);
  }
}

loadCategories();
