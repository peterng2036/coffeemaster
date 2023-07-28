import { getProductById } from "./Menu.js";

export async function addToCart(id) {
    const product = await getProductById(id);
    const results = app.store.cart.filter(p => p.id == id);
    if (results.length > 0) {
        app.store.cart = app.store.cart.map(p => {
            if (p.id == id) {
                return { ...p, quantity: p.quantity + 1 }
            }
            return p;
        })
    } else {
        app.store.cart = [...app.store.cart, { product, quantity: 1 }];
    }
}

export function removeFromCart(id) {
    const results = app.store.cart.filter(p => p.id != id);
    app.store.cart =results;
}