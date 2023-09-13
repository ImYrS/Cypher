const initPath = () => {
  let path = location.pathname.replace('.html', '');
  let apiKey = localStorage.apiKey;

  if (path === "/login" && apiKey) {
    location.href = "/zones.html";
  } else if ((path === "/zones" || path === "/zone") && !apiKey) {
    location.href = "/login.html";
  }
};

initPath();
