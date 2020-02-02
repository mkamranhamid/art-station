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

export async function fetchAllActiveProducts() {
    try {
        const productRef = firestore.collection(`products`);
        const productSnapshot = await productRef.where('status', '==', 'active').get();
        let products = []
        productSnapshot.forEach(doc => {
            products.push({ ...doc.data(), id: doc.id });
        });
        return products;
    } catch (err) {
        throw err;
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

export async function fetchAllOrdersByUID(uid, role) {
    try {
        let orders = [];
        if (role == 'user') {
            orders = await fetchAllUserOrdersByUID(uid);
        } else if (role == 'artist') {
            orders = await fetchAllArtistOrdersByUID(uid);
        } else if (role == 'admin') {
            orders = await fetchAllOrders();
        }
        return orders;
    } catch (err) {
        throw err;
    }
}

async function fetchAllUserOrdersByUID(uid) {
    try {
        const OrdersRef = firestore.collection(`orders`);
        const OrdersSnapshot = await OrdersRef.where('uid', '==', uid).get();
        let orders = []
        OrdersSnapshot.forEach(doc => {
            orders.push({ ...doc.data(), id: doc.id });
        });
        return orders;
    } catch (err) {
        throw err;
    }
}

async function fetchAllOrders() {
    try {
        const OrdersRef = firestore.collection(`orders`);
        const OrdersSnapshot = await OrdersRef.get();
        let orders = []
        OrdersSnapshot.forEach(doc => {
            orders.push({ ...doc.data(), id: doc.id });
        });
        return orders;
    } catch (err) {
        throw err;
    }
}

async function loopThruCartToGetProduct(CartsSnapshot) {
    let products = CartsSnapshot.docs.map(async (doc) => await fetchProductById(doc.data().productId))
    let allProds = await Promise.all(products)
    let cartProducts = CartsSnapshot.docs.map((doc, ind) => {
        return { ...doc.data(), id: doc.id, product: allProds[ind] }
    })
    return cartProducts;
}

async function fetchAllArtistOrdersByUID(uid) {
    try {
        const CartsRef = firestore.collection(`carts`);
        const CartsSnapshot = await CartsRef.where('productUUID', '==', uid).get();
        let orders = await loopThruCartToGetProduct(CartsSnapshot);
        return orders;
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
        const user = await firestore.doc(`users/${product.data().uid}`).get();
        if (!user.exists) {
            throw new Error('Error: User doesnt exist in our database');
        }
        return { ...product.data(), user: { ...user.data() } };
    } catch (err) {
        throw err;
    }
}

export async function placeOrder(address, uid, carts, total) {
    let publishedAt = getPublishedDate()
    let createdOrder = await createOrder(address, uid, total, publishedAt)
    carts.map(async (cart) => {
        updateProductById(cart.product.id, { quantity: 0 })
        return await createCart({
            orderId: createdOrder.id,
            productId: cart.product.id,
            productUUID: cart.product.productUUID,
            quantity: cart.cartQty,
            publishedAt
        })
    }

    )
    // let createdCart = await createCart(createdOrder.id, cart.product.id, cart.cartQty)
    console.log("createdOrder: ", createdOrder)
    // console.log("createdCart: ", createdCart)
    return
}

function updateProductById(productId, payload) {
    let productRef = firestore.collection('products').doc(productId);

    // update the product document fields
    let updateSingle = productRef.update(payload);

}

async function createOrder(address, uid, total, publishedAt) {

    try {
        let order = await firestore.collection(`orders`).add({ ...address, uid, total, publishedAt });
        return order
    } catch (err) {
        throw err
    }
}
async function createCart({ orderId, ...cartPayload }) {
    try {
        let cart = await firestore.collection(`carts`).add({ orderId, ...cartPayload });
        return cart;
    } catch (err) {
        throw err;
    }
}

export async function fetchAllUsers(uid) {
    try {
        const usersRef = firestore.collection(`users`);
        const usersSnapshot = await usersRef.where('uid', '>', uid).get();
        let users = []
        usersSnapshot.forEach(doc => {
            users.push({ ...doc.data(), id: doc.id });
        });
        return users;
    } catch (err) {
        throw err;
    }
}

export async function fetchCartsByOrderId(oid) {
    try {
        const CartsRef = firestore.collection(`carts`);
        const CartsSnapshot = await CartsRef.where('orderId', '==', oid).get();
        let carts = await loopThruCartToGetProduct(CartsSnapshot)
        /* CartsSnapshot.forEach(doc => {
            carts.push({ ...doc.data(), id: doc.id });
        }); */
        return carts;
    } catch (err) {
        throw err;
    }
}