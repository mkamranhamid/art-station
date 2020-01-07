import { auth, database, firestore } from "../config/firebase"
import { uploadFile } from "./storage";
import { getPublishedDate } from "./common";

export async function uploadArt(artData, uid) {
    try {
        const uploaded = await uploadFile(artData.file);
        const url = await uploaded.ref.getDownloadURL();
        const productDetails = { title: artData.title, image: url, publishedAt: getPublishedDate() }
        await addProduct(productDetails, uid)
        return url;
    } catch (err) {
        throw err
    }
}

function addProduct(product, uid) {
    let productRef = firestore.doc(`products/${uid}`);
    productRef.set(product);
}