const initPath = () => {
  let path = location.pathname.replace('.html', '');
  let apiToken = localStorage.apiToken;
  let accountId = localStorage.accountId;

  if (path === "/login" && apiToken && accountId) {
    location.href = "/zones.html";
  } else if ((path === "/zones" || path === "/zone") && (!apiToken || !accountId)) {
    location.href = "/login.html";
  }
};

initPath();
