/**
 * TC.js - Xử lý logic cho trang chủ: Fetch API Anime, Tìm kiếm và Quản lý Đăng nhập
 */

// API URL từ Jikan (MyAnimeList API)
const ANIME_API_URL = "https://api.jikan.moe/v4/top/anime";
const SEARCH_API_URL = "https://api.jikan.moe/v4/anime?q=";

// Đợi DOM tải xong mới thực thi code
document.addEventListener("DOMContentLoaded", () => {
  fetchAnimeData(); // Gọi hàm lấy dữ liệu anime khi trang web load
  checkLoginStatus(); // Kiểm tra trạng thái đăng nhập
});

/**
 * Hàm lấy dữ liệu Anime từ API và hiển thị lên giao diện
 */
async function fetchAnimeData() {
  const container = document.getElementById("animeContainer");
  
  try {
    const response = await fetch(ANIME_API_URL);
    const result = await response.json();
    const animeList = result.data;

    displayAnime(animeList); // Gọi hàm hiển thị
  } catch (error) {
    console.error("Lỗi khi fetch API:", error);
    container.innerHTML = `<p class="text-danger text-center w-100">Không thể tải dữ liệu. Vui lòng thử lại sau!</p>`;
  }
}

/**
 * Hàm hiển thị danh sách Anime ra HTML
 * @param {Array} animeList - Danh sách các đối tượng Anime
 */
function displayAnime(animeList) {
  const container = document.getElementById("animeContainer");
  container.innerHTML = ""; // Xóa loading spinner hoặc nội dung cũ

  if (!animeList || animeList.length === 0) {
    container.innerHTML = `<p class="text-center w-100">Không tìm thấy Anime nào.</p>`;
    return;
  }

  animeList.forEach((anime) => {
    // Tạo cấu trúc card cho từng Anime dùng Bootstrap
    const animeCard = `
      <div class="col">
        <div class="card h-100 shadow-sm border-0 anime-card">
          <img src="${anime.images.jpg.image_url}" class="card-img-top" alt="${anime.title}" style="height: 350px; object-fit: cover;">
          <div class="card-body">
            <h5 class="card-title text-truncate" title="${anime.title}">${anime.title}</h5>
            <p class="card-text small text-muted">
              <strong>Điểm:</strong> ${anime.score || "N/A"}<br>
              <strong>Thể loại:</strong> ${anime.genres.map(g => g.name).join(", ")}
            </p>
<a href="ct1.html?id=${anime.mal_id}" class="btn btn-outline-primary">
Xem chi tiết
</a>          </div>
        </div>
      </div>
    `;
    container.insertAdjacentHTML("beforeend", animeCard);
  });
}

/**
 * Hàm tìm kiếm Anime qua API
 * @param {Event} event - Sự kiện submit form
 */
async function searchAnime(event) {
  if (event) event.preventDefault(); // Ngăn trang web reload khi submit form

  const keyword = document.getElementById("searchInput").value.trim();
  const container = document.getElementById("animeContainer");

  // Nếu ô tìm kiếm trống, quay lại hiển thị top anime
  if (!keyword) {
    fetchAnimeData();
    return;
  }

  // Hiển thị loading khi đang tìm kiếm
  container.innerHTML = `<div class="text-center w-100"><div class="spinner-border text-primary"></div></div>`;

  try {
    const response = await fetch(`${SEARCH_API_URL}${keyword}`);
    const result = await response.json();
    displayAnime(result.data);
  } catch (error) {
    console.error("Lỗi tìm kiếm:", error);
  }
}

/**
 * Kiểm tra trạng thái đăng nhập từ localStorage để thay đổi Navbar
 */
function checkLoginStatus() {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navRegister = document.getElementById("nav-register");
  const navLogin = document.getElementById("nav-login");
  const navList = document.querySelector(".navbar-nav");

  if (currentUser && navList) {
    // Ẩn nút đăng ký và đăng nhập
    if (navRegister) navRegister.style.display = "none";
    if (navLogin) navLogin.style.display = "none";

    // Thêm tên người dùng và nút đăng xuất vào navbar
    const userItem = document.createElement("li");
    userItem.className = "nav-item dropdown";
    userItem.innerHTML = `
      <a class="nav-link dropdown-toggle text-info" href="#" role="button" data-bs-toggle="dropdown">
        Chào, ${currentUser.username}
      </a>
      <ul class="dropdown-menu dropdown-menu-end">
        <li><a class="dropdown-item" href="#" onclick="logout()">Đăng xuất</a></li>
      </ul>
    `;
    navList.appendChild(userItem);
  }
}

/**
 * Hàm xử lý Đăng xuất
 */
function logout() {
  localStorage.removeItem("currentUser");
  alert("Bạn đã đăng xuất thành công!");
  location.reload(); // Load lại trang để cập nhật giao diện
}
