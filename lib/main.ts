import { getServerDocuments, getStorageDocuments } from "./document.js";
import { filters } from "./filters.js";
import { formControl } from "./form-control.js";
import { notification } from "./notification.js";
import { renderDocuments } from "./render.js";

async function main() {
    const documents = getStorageDocuments();
    // If there are no documents in local storage, fetch them from the server and add them to local storage
    if (documents.length === 0) {
        const serverDocuments = await getServerDocuments();
        localStorage.setItem("documents", JSON.stringify([...serverDocuments]));
    }

    //Stablish the sortBy default method
    localStorage.setItem("sortBy", "CreatedAt");
    
    renderDocuments("CreatedAt");
    filters();
    formControl();
    notification();
}

main();
