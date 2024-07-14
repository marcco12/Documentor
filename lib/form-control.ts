import { createDocument } from "./document.js";
import { renderDocuments } from "./render.js";
import { sortFields } from "./types.js";

function toggleModal() {    
    const modal = document.getElementsByClassName("modal");
    modal[0].classList.toggle("hidden");
    modal[0].classList.toggle("grid");
    modal[1].classList.toggle("hidden");
    modal[1].classList.toggle("grid");
    const body = document.querySelector("body");
    body.classList.toggle("overflow-hidden");
}

export function clearForm() {
    const titleInput = document.getElementById("title-input") as HTMLInputElement;
    titleInput.value = "";
    const versionInput = document.getElementById("version-input") as HTMLInputElement;
    versionInput.value = "";
    const contributorInput = document.getElementById("contributor-input") as HTMLInputElement;
    contributorInput.value = "";
    const attachmentsInput = document.getElementById("attachments-input") as HTMLInputElement;
    attachmentsInput.value = "";
}

export function getFormValues () {
    const title = (document.getElementById("title-input") as HTMLInputElement).value;
    const version = (document.getElementById("version-input") as HTMLInputElement).value;
    const contributors = (document.getElementById("contributor-input") as HTMLInputElement).value.split(",").map((name) => name.trim());
    const attachments = (document.getElementById("attachments-input") as HTMLInputElement).value.split(",").map((attachment) => attachment.trim());
    return { title, version, contributors, attachments };
}

export function formControl () {
    const createDocBtn = document.getElementById("create-doc-btn");
    createDocBtn.addEventListener("click", toggleModal);
    const closeModalBtn = document.getElementById("close-modal-btn");
    closeModalBtn.addEventListener("click", toggleModal);
    const saveDocBtn = document.getElementById("save-doc-btn");
    saveDocBtn.addEventListener("click", () => {
       
        const { title, version, contributors, attachments } = getFormValues();
        createDocument(title, version, contributors, attachments);

        const sortBy = localStorage.getItem("sortBy") as sortFields;
        renderDocuments(sortBy);
        toggleModal();
        clearForm();
    });
}