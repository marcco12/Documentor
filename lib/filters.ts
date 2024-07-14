import { renderDocuments } from "./render.js";
import { sortFields } from "./types.js";

export function filters() {
    // -- Event Listeners Setup --
    // Sort by filter
    const sortBySelector = document.getElementById('sortBy-selector') as HTMLSelectElement;
    sortBySelector.addEventListener('change', sortByFilter);

    // View filter
    const listView = document.getElementById('list-view');
    const gridView = document.getElementById('grid-view');
    listView.addEventListener('click', switchView);
    gridView.addEventListener('click', switchView);
}

function sortByFilter (event: Event) {
    const selectedOption = (event.target as HTMLSelectElement).value;
    localStorage.setItem("sortBy", selectedOption);
    renderDocuments(selectedOption as sortFields);
}

function switchView (event: Event) {

    // Update the status of the view buttons
    const listView = document.getElementById('list-view');
    const gridView = document.getElementById('grid-view');

    // Check if the selected view button is already active and do nothing if so
    switch (event.target) {
        case listView:
            if (!listView.classList.contains('selected-view')) {
                listView.classList.toggle('selected-view');
                gridView.classList.toggle('selected-view');
            } 
            break;
            case gridView:
                if (!gridView.classList.contains('selected-view')) {
                    listView.classList.toggle('selected-view');
                    gridView.classList.toggle('selected-view');
            } 
            break;
        default:
            break;
    }

    // Change the view of the grid
    const documentsGrid = document.getElementById('documents-grid');
    // Make the documents grid of just one column for list view
    documentsGrid.classList.toggle('md:grid-cols-2');
    documentsGrid.classList.toggle('lg:grid-cols-3');

    // Make de documents display information in a single row for list view
    const documents = document.getElementsByClassName('documento');
    Array.from(documents).forEach((documento) => {
        documento.classList.toggle('grid');
        documento.classList.toggle('grid-cols-3');
        documento.classList.toggle('items-center');
    });

}