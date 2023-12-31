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
    if (addToHistory) {
      history.pushState({ route }, "", route);
    }

    let pageElement = null;
    switch (route) {
      case "/":
        pageElement = document.createElement("menu-page");
        break;
      case "/order":
        pageElement = document.createElement("order-page");
        break;
      default:
        if (route.startsWith("/product-")) {
          pageElement = document.createElement("details-page");
          const paramId = route.substring(route.lastIndexOf("-") + 1);
          pageElement.dataset.productId = paramId;
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
