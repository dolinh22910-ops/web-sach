if (localStorage.getItem("currentUser")) {
  location.href = "tc.html";
}

let form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  let username = document.getElementById("username").value.trim();
  let email = document.getElementById("email").value.trim();
  let password = document.getElementById("password").value.trim();

  if (username.length < 2) {
    alert("Tên phải ít nhất 2 ký tự");
    return;
  }

  if (password.length < 6) {
    alert("Mật khẩu phải ít nhất 6 ký tự");
    return;
  }

  let users = JSON.parse(localStorage.getItem("users")) || [];

  if (users.some((u) => u.email === email)) {
    alert("Email đã tồn tại!");
    return;
  }

  users.push({ username, email, password });
  localStorage.setItem("users", JSON.stringify(users));

  alert("Đăng ký thành công!");
  location.href = "dn.html";
});