import { renderDocuments } from "./render.js";
import { sortFields } from "./types.js";

export function filters() {
    // -- Event Listeners Setup --
    // Sort by filter
    const sortBySelector = document.getElementById('sortBy-selector') as HTMLSelectElement;
    sortBySelector.addEventListener('change', sortByFilter);

    // View filter

}

function sortByFilter (event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    localStorage.setItem("sortBy", selectedOption);
    renderDocuments(selectedOption as sortFields);
}