// Loader
const showLoader = () => {
  document.getElementById("loader").classList.remove("hidden");
  document.getElementById("video-container").classList.add("hidden");
};
const hideLoader = () => {
  document.getElementById("loader").classList.add("hidden");
  document.getElementById("video-container").classList.remove("hidden");
};
// Toggle
function removeActiveClass() {
  const activeButtons = document.getElementsByClassName("active");
  for (let btn of activeButtons) {
    btn.classList.remove("active");
  }
  console.log(activeButtons);
}

// Load Categories
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
    <button id="btn-${cat.category_id}" 
        class="btn btn-sm text-lg hover:bg-[#FF1F3D] hover:text-white py-5 px-4" onclick="categoryWiseVideo(${cat.category_id})"
      >
        ${cat.category}
      </button>`;

    // append elements to the container
    container.appendChild(catDiv);
  }
}
loadCategories();

// ------------------------------------

// Load Videos
function loadVideos(searchText = "") {
  showLoader();
  // fetch the data
  fetch(
    `https://openapi.programming-hero.com/api/phero-tube/videos?title=${searchText}`
  )
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      document.getElementById("btn-all").classList.add("active");
      displayVideos(data.videos);
    })
    .catch((err) => console.log(err));
}

const displayVideos = (videos) => {
  let videoContainer = document.getElementById("video-container");
  videoContainer.innerHTML = "";
  if (videos.length === 0) {
    videoContainer.innerHTML = `
    <div class="col-span-full py-10 px-10 mt-10 space-y-5">
          <img class="mx-auto" src="./Assets/Icon.png" alt="" />
          <h2 class="text-2xl font-bold text-center">
            Oops!! Sorry, There is no content here
          </h2>
        </div>`;
  }
  videos.forEach((video) => {
    let videoCard = document.createElement("div");
    videoCard.innerHTML = `
   <div class="card bg-base-100">
          <figure class="relative">
            <img class ="w-full h-[250px] object-cover" src="${
              video.thumbnail
            }" alt="Shoes" />
            <span
              class="absolute bottom-2 right-2 text-white py-2 px-4 rounded-lg bg-[rgba(23,23,23,1)] text-sm"
              >3hrs 56 min ago</span
            >
          </figure>
          <div class="flex gap-3 px-0 py-5">
            <!-- left div -->
            <div class="profile">
              <div class="avatar">
                <div
                  class="ring-primary ring-offset-base-100 w-10 rounded-full ring ring-offset-2"
                >
                  <img
                    src="${video.authors[0].profile_picture}"
                  />
                </div>
              </div>
            </div>
            <!-- right div -->
            <div class="intro text-sm font-semibold space-y-2">
              <h2 class="text-xl">${video.title}</h2>
              <p class="text-lg text-gray-400">
                ${video.authors[0].profile_name}
                ${
                  video.authors[0].verified
                    ? `<i class="fa-solid fa-circle-check text-blue-400"></i>`
                    : ""
                }
              </p>
              <p class="text-lg text-gray-400">${video.others.views}</p>
            </div>
          </div>
          <button onclick=videoDetails('${
            video.video_id
          }') class="btn btn-block text-lg">Show Details</button>
        </div>`;
    videoContainer.appendChild(videoCard);
  });
  hideLoader();
};

// loadVideos();

// ------------------------------------

// Load Category wise video

let categoryWiseVideo = (id) => {
  showLoader();
  fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
      removeActiveClass();
      const clickedButton = document.getElementById(`btn-${id}`);
      clickedButton.classList.add("active");
      displayVideos(data.category);
    });
};

// ------------------------------------

// load video details

const videoDetails = (videoId) => {
  const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
  fetch(url).then((res) =>
    res.json().then((data) => displayVideoDetails(data.video))
  );
};

const displayVideoDetails = (video) => {
  document.getElementById("video_details").showModal();
  const detailsContainer = document.getElementById("details-container");
  detailsContainer.innerHTML = `
  <div class="card bg-base-100 image-full  shadow-sm">
  <figure>
    <img
      src="${video.thumbnail}"
      alt="Shoes" />
  </figure>
  <div class="card-body">
    <h2 class="card-title">${video.title}</h2>
    <p>${video.description}</p>
    <div class="card-actions justify-end">
      
    </div>
  </div>
</div>`;
};

// ------------------------------------

// Search Video
document.getElementById("search-input").addEventListener("keyup", (e) => {
  e.preventDefault();
  const input = e.target.value;
  loadVideos(input);
});
