// get common category data
const getNews = () => {
  fetch(`https://openapi.programming-hero.com/api/news/categories`)
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category));
};

// make new li and enter categories names into the li
const displayCategories = (allCategories) => {
  const categoryList = document.getElementById("category-list");
  allCategories.forEach((category) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <li onclick="categoryId(${category.category_id})">${category.category_name}</li>
      `;
    categoryList.appendChild(li);
  });
};

// get specific category data
const categoryId = (id) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/0${id}`)
    .then((res) => res.json())
    .then((data) => displayNews(data.data));
};

//  showing the specific category data into a card
const displayNews = (allNews) => {
  // no News found message here
  const noNewsMessage = document.getElementById("no-news-message");
  if (allNews.length === 0) {
    noNewsMessage.classList.remove("d-none");
  } else {
    noNewsMessage.classList.add("d-none");
  }
  const colContainer = document.getElementById("col-container");
  colContainer.innerHTML = "";
  allNews.forEach((news) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col");
    colDiv.innerHTML = `
      <div class="card">
      <div class="row g-0 p-3">
        <div class="col-md-4">
          <img src="${
            news.author.img
          }" class="img-fluid rounded-start" alt="..." />
        </div>
        <div class="col-md-8 card-body d-flex flex-column justify-content-around">
            <h5 class="card-title">${news.title}</h5>
            <p class="card-text pb-2" style=" display: -webkit-box;
            -webkit-line-clamp: 6;
            -webkit-box-orient: vertical;
            overflow: hidden;"
            >${news.details}</p>
            <div>
              <div class="row align-items-center">
                <div class="col">
                  <img
                    src="${news.author.img}"
                    alt=""
                    class="rounded-circle"
                    style="width: 15%"
                  />
                  <p class="mb-0 d-inline-block">${
                    news.author.name ? news.author.name : "No name found"
                  }</p>
                </div>
                <div class="col">
                  <i class="fa-regular fa-eye"></i><span> ${
                    news.total_view ? news.total_view : "No views found"
                  }</span>
                </div>
                <div class="col text-center">
                  <a
                    href="#"
                    class="text-success fw-bold"
                    data-bs-toggle="modal"
                    data-bs-target="#detailsModal"
                    ><i class="fa-solid fa-arrow-right"></i
                  ></a>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    `;
    colContainer.appendChild(colDiv);
  });
};
getNews();
