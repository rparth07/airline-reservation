export function bindCloseSuggestionEvent() {
    $(document).on("mouseup", function (_event) {
        var suggestionContainer = $(".suggestions");
        // if the target of the click isn't the container nor a descendant of the container
        suggestionContainer.css("display", "none");
    });
}
export function removeListForEmptySuggestions(input, suggestionListElement, suggestionString) {
    if (input === "") {
        $(suggestionListElement).remove();
        $(suggestionString).css("display", "none");
    }
}
