// api
const API_KEY = "55c98ffe62df5cbb6d68882dde4d2f2c";
const URL = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;

const $inputBox = document.querySelector("#input-box");
const $searchBtn = document.querySelector("#search-btn");
const $searchImg = document.querySelector("#search-img");
const $movieCard = document.querySelector("#movie-card");

// header 우측 돋보기 클릭시, input box && button 화면에 표시
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
    // forEach 반목문으로 영화 포스터 태크 생성
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

      // alert로 영화 id 출력
      $div.addEventListener("click", () => {
        alert(`영화 id: ${el.id}`);
      });
    });

    // 필터링된 영화 목록 생성하는 함수
    const filterSearch = () => {
      let filterData = [];
      if ($inputBox.value.length === 0) {
        alert("내용을 입력하세요.");
      } else {
        filterData = data.results.filter((el) =>
          el.title.toLowerCase().includes($inputBox.value.toLowerCase())
        );
        console.log(filterData, "filter");
        if (filterData.length === 0) {
          alert("관련 영화가 없습니다.");
          $inputBox.value = "";
        } else {
          $movieCard.innerHTML = "";
          filterData.forEach((el, index) => {
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
          });
        }
      }
    };

    // 검색 버튼 클릭 이벤트
    $searchBtn.addEventListener("click", () => {
      filterSearch();
    });

    // 엔터 하면 검색하는 이벤트
    $inputBox.addEventListener("keypress", (e) => {
      if (e.keyCode === 13) {
        filterSearch();
      }
    });
  })
  .catch((error) => console.error("Error:", error));
