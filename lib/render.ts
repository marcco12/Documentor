import { getStorageDocuments } from "./document.js";
import type { document as docType, sortFields } from "./types.js";

export function getDocumentElement(
    id: string,
	title: string,
	version: string,
	contributors: string[],
	attachments: string[]
): string {
	const header = getDocumentHeader(title, version);
	const body = getDocumentBody(contributors);
	const footer = getDocumentFooter(attachments);
    
    const document = `
        <div class="documento space-y-4" name="${id}">
            ${header}
            ${body}
            ${footer}
        </div>
    `;
    return document;
}

function getDocumentHeader(title: string, version: string): string {
	const header = `
        <div>
            <h2 class="font-bold text-lg">${title}</h2>
            <p class="text-sm">Version ${version}</p>
        </div>
    `;
    return header;
}

function getDocumentBody(contributors: string[]): string {
	const body = `
        <div class="mt-0">
            ${contributors
				.map((contributor) => `<p>${contributor}</p>`)
				.join("")}
        </div>
    `;
    return body;
}

function getDocumentFooter(attachments: string[]): string {
    const footer = `
        <div class="mt-0">
            ${attachments
                .map((attachment) => `<p>${attachment}</p>`)
                .join("")}
        </div>
    `;
    return footer;
}

export function sortDocuments(documents: docType[], sortBy: sortFields ) {
    return documents.sort((a, b) => {
        if (sortBy === "CreatedAt") {
            // The recent one comes first.
            return new Date(b.CreatedAt).getTime() - new Date(a.CreatedAt).getTime();
        } else {
            return a[sortBy].localeCompare(b[sortBy]);
        }
    }); 
}

export function renderDocuments(sortBy: sortFields): void {

    const documents = getStorageDocuments();
    const sortedDocuments = sortDocuments(documents, sortBy);

    const documentContainer = document.getElementById("documents-grid");
    
    // Clear the existing documents in the grid before rendering new ones.
    const createDocBtn = document.getElementById("create-doc-btn");
    documentContainer.innerHTML = "";
    documentContainer.appendChild(createDocBtn);
    
    // Render the new documents.
    sortedDocuments.forEach((document) => {
        const documentElement = getDocumentElement(
            document.ID,
            document.Title,
            document.Version,
            document.Contributors.map((contributor) => contributor.Name),
            document.Attachments
        );
        documentContainer.innerHTML += documentElement;
    });
}