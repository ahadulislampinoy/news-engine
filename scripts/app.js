// get all category data
const getNews = () => {
  fetch("https://openapi.programming-hero.com/api/news/categories")
    .then((res) => res.json())
    .then((data) => displayCategories(data.data.news_category))
    // if api link is not correct then it will show an aleart
    .catch((error) => alert(error.name));
};

// displaying all category names into list
const displayCategories = (allCategories) => {
  const categoryList = document.getElementById("category-list");
  allCategories.forEach((category) => {
    // make new li and enter categories names into the li
    const li = document.createElement("li");
    li.innerHTML = `
      <li onclick="categoryId('${category.category_id}','${category.category_name}')">${category.category_name}</li>
      `;
    categoryList.appendChild(li);
  });
};

// get specific category data
const categoryId = (id, categoryName) => {
  fetch(`https://openapi.programming-hero.com/api/news/category/${id}`)
    .then((res) => res.json())
    .then((data) => displayNews(data.data, categoryName))
    .catch((err) => alert(err.name));
  // loading spinner start
  loadingSpinner(true);
};

// displaying the specific category all data into a card
const displayNews = (allNews, categoryName) => {
  // sorting news by views number
  allNews.sort((a, b) => {
    return b.total_view - a.total_view;
  });
  // adding number of founded news
  const foundItemsNumber = document.getElementById("found-items-number");
  foundItemsNumber.innerText = allNews.length;
  // adding name of category
  const foundCategoryName = document.getElementById("found-category-name");
  foundCategoryName.innerText = categoryName;
  // no news found message here
  const noNewsMessage = document.getElementById("no-news-message");
  if (allNews.length === 0) {
    noNewsMessage.classList.remove("d-none");
  } else {
    noNewsMessage.classList.add("d-none");
  }
  // adding specific datas into card
  const colContainer = document.getElementById("col-container");
  colContainer.innerHTML = "";
  allNews.forEach((news) => {
    const colDiv = document.createElement("div");
    colDiv.classList.add("col");
    colDiv.innerHTML = `
      <div class="card">
      <div class="row g-0 p-3">
        <div class="col-md-3 d-flex">
          <img src="${
            news.thumbnail_url
          }" class="img-fluid rounded w-100" alt="..." />
        </div>
        <div class="col-md-9 card-body d-flex flex-column justify-content-around">
            <h5 class="card-title">${news.title}</h5>
            <p class="card-text py-1" style=" display: -webkit-box;
            -webkit-line-clamp: 10;
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
                <div class="col text-center">
                  <i class="fa-regular fa-eye"></i><span> ${
                    news.total_view ? news.total_view : "No views found"
                  }</span>
                </div>
                <div class="col text-center">
                  <a href="#" onclick="getModalContent('${
                    news._id
                  }')" class="text-success fw-bold" data-bs-toggle="modal" data-bs-target="#detailsModal"><i
                  class="fa-solid fa-arrow-right"></i></a>
                </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
    `;
    colContainer.appendChild(colDiv);
  });
  // loading spinner end
  loadingSpinner(false);
};

// get modal news data
const getModalContent = (newsId) => {
  fetch(`https://openapi.programming-hero.com/api/news/${newsId}`)
    .then((res) => res.json())
    .then((data) => displayModalContent(data.data[0]))
    .catch((err) => alert(err.name));
};

// showing modal news data
const displayModalContent = (news) => {
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
  <img src="${news.image_url}" alt="" class="w-100 py-2" />
  <h5 class="py-3">${news.title}</h5>
  <p>${news.details}</p>`;
};

// loading spinner functionality
const loadingSpinner = (isLoading) => {
  const loadingSpinner = document.getElementById("loading-spinner");
  if (isLoading) {
    loadingSpinner.classList.remove("d-none");
  } else {
    loadingSpinner.classList.add("d-none");
  }
};
getNews();
