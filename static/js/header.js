const initPath = () => {
  let path = location.pathname.replace('.html', '');
  let apiToken = localStorage.apiToken;

  if (path === "/login" && apiToken) {
    location.href = "/zones.html";
  } else if ((path === "/zones" || path === "/zone") && !apiToken) {
    location.href = "/login.html";
  }
};

initPath();
