export function bindCloseSuggestionEvent() {
  $(document).on("mouseup", function (_event: JQuery.MouseUpEvent) {
    var suggestionContainer = $(".suggestions");
    // if the target of the click isn't the container nor a descendant of the container
    suggestionContainer.css("display", "none");
  });
}

export function removeListForEmptySuggestions(
  input: string,
  suggestionListElement: string,
  suggestionString: string
) {
  if (input === "") {
    $(suggestionListElement).remove();
    $(suggestionString).css("display", "none");
  }
}
