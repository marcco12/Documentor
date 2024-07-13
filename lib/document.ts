import { document } from "./types";

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

export async function updateDocument(documentID: string, updatedTitle: string, updatedVersion: string, updatedContributors: string[], updatedAttachments: string[]): Promise<void> {
    
}