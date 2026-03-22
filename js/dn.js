// Nếu đã login thì về trang chủ
if (localStorage.getItem("currentUser")) {
  location.href = "tc.html";
}

let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  let existingUser = users.find(
    (user) => user.email === email && user.password === password
  );

  if (existingUser) {
    localStorage.setItem("currentUser", JSON.stringify(existingUser));
    alert("Đăng nhập thành công!");
    location.href = "tc.html";
  } else {
    alert("Email hoặc mật khẩu không đúng!");
  }
});