import { auth, database, firestore } from "../config/firebase"
import { uploadFile } from "./storage";
import { getPublishedDate } from "./common";

export async function uploadArt(artData, uid) {
    try {
        const uploaded = await uploadFile(artData.file);
        const url = await uploaded.ref.getDownloadURL();
        const productDetails = {
            title: artData.title,
            image: url,
            publishedAt: getPublishedDate(),
            price: artData.price,
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
            products.push(doc.data());
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