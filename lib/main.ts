import { getServerDocuments, getStorageDocuments } from "./document";
import { formControl } from "./form-control";
import { renderDocuments } from "./render";

async function main() {
    // Copy server documents to local storage and render them
    const serverDocuments = await getServerDocuments();
    const storageDocuments = getStorageDocuments();
    localStorage.setItem("documents", JSON.stringify([...serverDocuments, ...storageDocuments]));
    
    const documents = getStorageDocuments();
    renderDocuments(documents);
    formControl();
}

main();
