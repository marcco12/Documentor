import { renderDocuments } from "./render.js";
import type { document, sortFields } from "./types.js";

export async function getServerDocuments() {
    const documents = await fetch("http://localhost:8080/documents").then(res => res.json());
    return documents as document[];
}

export function getStorageDocuments(): document[] {
    const storedDocuments = JSON.parse(localStorage.getItem("documents")) || [];
    return storedDocuments;
}

export async function createDocument(title: string, version: string, contributors: string[], attachments: string[]): Promise<void> {
    const document: document = {
        ID: Math.random().toString(36).substr(2, 9),
        CreatedAt: new Date(),
        UpdatedAt: new Date(),
        Title: title,
        Version: version,
        Contributors: contributors.map((name) => ({ ID: Math.random().toString(36).substr(2, 9), Name: name })),
        Attachments: attachments,
    }

    const existingDocuments = getStorageDocuments();

    localStorage.setItem("documents", JSON.stringify([...existingDocuments, document]));
}

export function deleteDocument(id: string): void {
    console.log(id);
    
    // Update the localStorage
    const existingDocuments = getStorageDocuments();
    const updatedDocuments = existingDocuments.filter((doc) => doc.ID!== id);
    localStorage.setItem("documents", JSON.stringify(updatedDocuments));

    // Render the updated documents
    const sortBy = localStorage.getItem("sortBy") as sortFields;
    renderDocuments(sortBy);
}

export function prepareDocuments () {
    const documents = document.querySelectorAll("#documents-grid > div:not(:first-child)");

    Array.from(documents).forEach((document) => {
        document.addEventListener("click", (event) => {
            deleteDocument((event.target as HTMLElement).getAttribute("name"));
        });
    });
}