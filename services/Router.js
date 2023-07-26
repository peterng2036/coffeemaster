const Router = {
  init: () => {
    const links = document.querySelectorAll("a.navlink");
    links.forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const url = link.getAttribute("href");
        Router.go(url);
      });
    });

    window.addEventListener("popstate", (e) => {
      const { route } = e.state;
      Router.go(route, false);
    });

    Router.go(location.pathname);
  },
  go: (route, addToHistory = true) => {
    console.log(`Going to ${route} with addToHistory ${addToHistory}`);
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("h1");
        pageElement.innerText = "Menu";
        break;
      case "/order":
        pageElement = document.createElement("h1");
        pageElement.innerText = "Your Order";
        break;
      default:
        if (route.startsWith("/product-/")) {
          pageElement = document.createElement("h1");
          pageElement.innerText = "Details";
          const paramId = route.substring(route.lastIndexOf("-") + 1);
          pageElement.dataset.id = paramId;
        }
    }

    if (pageElement) {
      const main = document.querySelector("main");
      main.children[0] && main.children[0].remove();
      main.appendChild(pageElement);
      window.scrollX = window.screenY = 0;
    }
  },
};

export default Router;
