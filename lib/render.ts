import type {document as docType} from "./types.js";

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
        <div class="documento w-full space-y-4 text-center border border-stone-300" value="${id}">
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
        <div>
            ${contributors
				.map((contributor) => `<p>${contributor}</p>`)
				.join("")}
        </div>
    `;
    return body;
}

function getDocumentFooter(attachments: string[]): string {
    const footer = `
        <div>
            ${attachments
                .map((attachment) => `<p>${attachment}</p>`)
                .join("")}
        </div>
    `;
    return footer;
}

export function renderDocuments(documents: docType[]): void {
    const documentContainer = document.getElementById("documents-grid");
    documents.forEach((document) => {
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