const initPath = () => {
  let path = location.pathname;
  let apiKey = localStorage.apiKey;

  if (path === "/login.html" && apiKey) {
    location.href = "/zones.html";
  } else if ((path === "/zones.html" || path === "/zone.html") && !apiKey) {
    location.href = "/login.html";
  }
};

initPath();
