
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


Acccessibility
- screen reader label for ReadingList button not set
- screen reader label for ReadingListTotalCount not set
- screen reader label for Search field not set
- screen reader label for Search icon not set