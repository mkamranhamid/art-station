import { storage } from "../config/firebase"

export async function uploadFile(file) {
    try {
        let metadata = {
            contentType: 'image/jpeg',
        }
        const fileName = `${file.name}-${new Date().getTime()}.${file.name.split('.').pop()}`
        var uploadTask = storage.child(`images/${fileName}`).put(file, metadata);
        return uploadTask;
    } catch (err) {
        throw err
    }
}