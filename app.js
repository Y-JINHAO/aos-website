// Scroll to top 滚动直顶部
const scrolltp = document.querySelector("#scrolltp");
// 点击按钮滚动到顶部
scrolltp.addEventListener("click", function () {
  // window.scrollTo(x-coord,y-coord) 方法可把内容滚动到指定的坐标。x-coord 是文档中的横轴坐标。
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth", // behavior 类型 String,表示滚动行为,支持参数 smooth(平滑滚动),instant(瞬间滚动),默认值 auto,实测效果等同于 instant
  });
});
window.addEventListener("scroll", function () {
  if (window.scrollY >= 700) {
    scrolltp.style.opacity = 1;
  } else {
    scrolltp.style.opacity = 0;
  }
});


// 切换亮暗主题
const themeToggle = document.querySelector(".checkbox");
const body = document.querySelector("body");

const darkmode = sessionStorage.getItem("dark");

if (darkmode) {
  body.classList.add("dark");
  themeToggle.checked = true;
}

// 监听 change 事件，选中复选框会给 body 添加一个 dark class
themeToggle.addEventListener("change", function () {
  // toggle() 方法切换元素的可见状态。
  body.classList.toggle("dark");

  // contains()判断指定内容中是否包含括号中的内容
  if (body.classList.contains("dark")) {
    sessionStorage.setItem("dark", "active");
  } else {
    sessionStorage.removeItem("dark");
  }
});
