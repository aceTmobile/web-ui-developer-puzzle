
Problems or code smells in the app:

Failed Tests
- Books Reducer › valid Books actions › failedAddToReadingList should undo book addition to the state
- Books Reducer › valid Books actions › failedRemoveFromReadingList should undo book removal from the state

Readability
- books.effects.spec (the current test description "loadbooks$ | it should work" could be a bit more descriptive by stating a specific expectation such as "it should return a list of books if a valid query is provided")
- repeat for other specs where "it should work" & other vague descriptions are used

DRY Principle
- since API Endpoints are used in multiple places I would make them CONSTANTS instead of hard coded strings which can be proned to errors -> benefits track, change & debug in a single location
- repeat for all areas where hard coded strings are used mutiple times

Code Cleanup/Improvements
- add type annotations where appropriate to class members & methods
- add optional syntax to interface | State interface reading-list.reducer.ts
- removed unused lifecycle event | fix: ngOnInit total-count.component.ts
- removed format date class method | fix:  used "| date:..." in view instead
- memory leaks[observables] | no unsubscribe | fix: moved from .ts to view and used "| async"



Acccessibility
- [Lighthouse] Contrast failed - ReadingList button | fix: Changed the background color from $pink-accent  to $pink-dark
- [Lighthouse] Contrast failed - Search Placeholder text | fix: changed foreground color from $gray40 to $gray60
- [Lighthouse] Contrast failed - "Try searching..." hint text | fix: changed foreground color from $gray40 to $gray60

- [Manual] screen reader label for ReadingList button not set | fix: add aria label
- [Manual] screen reader label for Search field not set | fix: add aria label
- [Manual] add alt attribute to image tags
