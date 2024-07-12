import { document } from "./types";

export async function getDocuments() {
    const documents = await fetch("http://localhost:8080/documents").then(res => res.json());
    return documents as document[];
}

export function getDocumentElement(
	title: string,
	version: string,
	contributors: string[],
	attachments: string[]
): string {
	const header = getDocumentHeader(title, version);
	const body = getDocumentBody(contributors);
	const footer = getDocumentFooter(attachments);
    
    const document = `
        <div class="documento w-full space-y-4 text-center">
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

function renderDocuments(documents: document[]): void {
    const documentContainer = document.getElementById("documents-grid");
    documents.forEach((document) => {
        const documentElement = getDocumentElement(
            document.Title,
            document.Version,
            document.Contributors.map((contributor) => contributor.Name),
            document.Attachments
        );
        documentContainer.innerHTML += documentElement;
    });
}

function toggleModal() {
    console.log("holaaa");
    
    const modal = document.getElementsByClassName("modal");
    modal[0].classList.toggle("hidden");
    modal[0].classList.toggle("grid");
    modal[1].classList.toggle("hidden");
    modal[1].classList.toggle("grid");
    const body = document.querySelector("body");
    body.classList.toggle("overflow-hidden");
}

async function main() {
    const documents = await getDocuments();
    renderDocuments(documents);
    const createDocBtn = document.getElementById("create-doc-btn");
    createDocBtn.addEventListener("click", toggleModal)
    const closeModalBtn = document.getElementById("close-modal-btn");
    closeModalBtn.addEventListener("click", toggleModal)
        
}

main();

