// api
const API_KEY = "55c98ffe62df5cbb6d68882dde4d2f2c";
const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

const $inputBox = document.querySelector("#input-box");
const $searchBtn = document.querySelector("#search-btn");
const $searchImg = document.querySelector("#search-img");
const $movieCard = document.querySelector("#movie-card");

// 검색 이미지 클릭시, input box && button 화면에 보임
let num = 0;
$searchImg.addEventListener("click", () => {
  if (num === 0) {
    $inputBox.style.display = "block";
    $searchBtn.style.display = "block";
    num = 1;
  } else {
    $inputBox.style.display = "none";
    $searchBtn.style.display = "none";
    num = 0;
  }
});

fetch(URL)
  .then((response) => response.json())
  .then((data) => {
    data.results.forEach((el, index) => {
      const $div = document.createElement("div");
      $div.className = "card";
      $div.innerHTML = `
              <p id="rank">No.${index + 1}</p>
              <div id="contentBox">
                <div class="content" id="${el.id}">${el.overview}</div>
                <img
                  id="poster-img"
                  src="https://image.tmdb.org/t/p/w500/${el.poster_path}"
                  alt="img"
                />
              </div>
              <div id="movie-p">
                <p>${el.title}</p>
                <p>Rating: ${el.vote_average}</p>
              </div>
              `;
      $movieCard.appendChild($div);

      $div.addEventListener("click", () => {
        alert(`영화 id: ${el.id}`);
      });
    });

    $searchBtn.addEventListener("click", () => {
      $movieCard.innerHTML = "";
      data.results.forEach((el, index) => {
        if (el.title.includes($inputBox.value)) {
          const $div = document.createElement("div");
          $div.className = "card";
          $div.innerHTML = `
              <p id="rank">No.${index + 1}</p>
              <div id="contentBox">
                <div class="content" id="${el.id}">${el.overview}</div>
                <img
                  id="poster-img"
                  src="https://image.tmdb.org/t/p/w500/${el.poster_path}"
                  alt="img"
                />
              </div>
              <div id="movie-p">
                <p>${el.title}</p>
                <p>Rating: ${el.vote_average}</p>
              </div>
              `;
          $movieCard.appendChild($div);

          $div.addEventListener("click", () => {
            alert(`영화 id: ${el.id}`);
          });
          $inputBox.value = "";
        }
      });
    });
  })
  .catch((error) => console.error("Error:", error));
