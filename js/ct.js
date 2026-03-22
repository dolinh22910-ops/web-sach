const urlParams = new URLSearchParams(window.location.search);
const animeId = urlParams.get("id");

if (!animeId) {
  alert("Không tìm thấy Anime!");
  window.location.href = "tc.html";
}

const API_URL = `https://api.jikan.moe/v4/anime/${animeId}`;

async function loadAnimeDetail() {
  try {
    const response = await fetch(API_URL);
    const result = await response.json();
    const anime = result.data;

    document.getElementById("animeTitle").textContent = anime.title;
    document.getElementById("animeImage").src =
      anime.images.jpg.large_image_url;

    document.getElementById("animeScore").textContent =
      anime.score || "N/A";

    document.getElementById("animeGenres").textContent =
      anime.genres.map((g) => g.name).join(", ");

    document.getElementById("animeSynopsis").textContent =
      anime.synopsis;

    const price = Math.floor(Math.random() * 200000) + 50000;

    document.getElementById("animePrice").textContent =
      price.toLocaleString();
  } catch (error) {
    console.log("Lỗi:", error);
  }
}

loadAnimeDetail();

function buyAnime() {
  alert("Thanh toán thành công!");
}

function addToCart() {
  alert("Đã thêm vào giỏ hàng!");
}