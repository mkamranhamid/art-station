import { auth, database, firestore } from "../config/firebase"
import { uploadFile } from "./storage";
import { getPublishedDate } from "./common";

export async function uploadArt(artData, uid) {
    try {
        const uploaded = await uploadFile(artData.file);
        const url = await uploaded.ref.getDownloadURL();
        delete artData.file;
        const productDetails = {
            ...artData,
            image: url,
            publishedAt: getPublishedDate(),
            uid
        }
        await addProduct(productDetails)
        return url;
    } catch (err) {
        throw err
    }
}

export async function updateArt(artData, id) {
    try {
        let url;
        if (artData.file) {
            const uploaded = await uploadFile(artData.file);
            url = await uploaded.ref.getDownloadURL();
            artData.image = url;
        }
        delete artData.file;
        updateProduct(artData, id)
        return url;
    } catch (err) {
        throw err
    }
}

async function addProduct(product) {
    try {
        await firestore.collection(`products`).add(product);
        return
    } catch (err) {
        throw err
    }
}

async function updateProduct(product, id) {
    try {
        const productRef = firestore.doc(`products/${id}`);
        productRef.set(product)
    } catch (err) {
        throw err
    }
}

export async function fetchAllProducts() {
    try {
        const productRef = firestore.collection(`products`);
        const productSnapshot = await productRef.get();
        let products = []
        productSnapshot.forEach(doc => {
            products.push({ ...doc.data(), id: doc.id });
        });
        return products;
    } catch (err) {
        throw err;
    }
}

export async function fetchAllProductsByUID(uid) {
    try {
        const productRef = firestore.collection(`products`);
        const productSnapshot = await productRef.where('uid', '==', uid).get();
        let products = []
        productSnapshot.forEach(doc => {
            products.push({ ...doc.data(), id: doc.id });
        });
        return products;
    } catch (err) {
        throw err;
    }
}

export async function fetchProductById(id) {
    try {
        const product = await firestore.doc(`products/${id}`).get();
        if (!product.exists) {
            throw new Error('Error: Product dont exist in our database');
        }
        return product.data();
    } catch (err) {
        throw err;
    }
}

export async function fetchProductDetailById(id) {
    try {
        const product = await firestore.doc(`products/${id}`).get();
        if (!product.exists) {
            throw new Error('Error: Product dont exist in our database');
        }
        const user = await firestore.doc(`user/${product.data().uid}`).get();
        if (!user.exists) {
            throw new Error('Error: User doesnt exist in our database');
        }
        return { ...product.data(), user: { ...user.data() } };
    } catch (err) {
        throw err;
    }
}

export async function placeOrder(address, uid, carts, total) {
    let createdOrder = await createOrder(address, uid, total)
    carts.map(async (cart) => await createCart(createdOrder.id, cart.product.id, cart.cartQty))
    // let createdCart = await createCart(createdOrder.id, cart.product.id, cart.cartQty)
    console.log("createdOrder: ", createdOrder)
    // console.log("createdCart: ", createdCart)
    return
}

async function createOrder(address, uid, total) {
    try {
        let order = await firestore.collection(`orders`).add({ ...address, uid, total });
        return order
    } catch (err) {
        throw err
    }
}
async function createCart(orderId, productId, quantity) {
    try {
        let cart = await firestore.collection(`cart`).add({ orderId, productId, quantity });
        return cart;
    } catch (err) {
        throw err;
    }
}