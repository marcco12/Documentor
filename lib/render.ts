import { getStorageDocuments, prepareDocuments } from "./document.js";
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
        <div class="w-full relative">
            <div
                    class="absolute cursor-pointer hover:bg-stone-800 opacity-75 h-full w-full flex items-center justify-center group"
                    name="${id}"
                >
                    <!-- Delete Option on Hover -->
                    <svg
                        class="w-6 h-6 text-white hidden group-hover:block"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
            <div class="document h-full space-y-4">
                ${header}
                ${body}
                ${footer}
            </div>
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

    prepareDocuments();
}