export class FileService {

    readTextFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (event) => {
                resolve(event.target.result);
            }
            reader.onerror = (event) => {
                reject(event.target.error);
            }
            reader.readAsText(file);
        })
    }

    createTextFile(text) {
        return new Blob([text], {type: "text/plain"});
    }
}
