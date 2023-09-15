Important updates for MVP:

- Set up AI content moderation API integration.
    - Run on both addList and editList

- Troubleshoot: why is currentstreak and record streak not loading?

- Add idea has a network delay. Add some sort of isSubmitting indicator. Texttarea?

- Decrease load time for newTopic on initial load

- Add 50 new topics

- Error handling with login:
    - Show message that tells user "username not found", "incorrect password" ?

- Address top section nudging to the right when clicking from lists view to viewList


- DRY refactoring:
- Update visibility toggle component across addList and editList
    - Create consistent appearance and functionality between addList and editList components

- Is component mounting on every onChange for textarea input on editList component but not addList? Or is this just console.log placement?
    - Check ReactRouter configuration





Features:

- Implement 'delete account' feature: delete all associated likes and lists (and ideas)
    - Keep likes on lists, but remove all lists so that fetching all lists still works (author is null)

- Implement 'download lists' feature: output all lists in structured format


Optional features:

- Develop fully-functional logged out version of the app
    - Is it possible to create an "account" page for non-logged-in users?
    - Persist lists and calculate streak, etc all from data in local storage?
    - I may need to rethink the log in / sign up format in the root nav menu


- viewList page
    - Create new route to view lists on same topic: lists/:topicId OR list/:topicId ??
    - add icon and route to view all lists on the same topic or place onClick event on topic text

- editUser page:
    - consolidate this action into just the input box rendering and calling the PATCH request. 


General issues for research:
- editList page:
    - Learn why patch update only works if I run it on the idea object itself and not the whole list. 

- History stack
    - Check history stack throughout app: https://reactrouter.com/en/main/start/tutorial#managing-the-history-stack

- authContext / root:
    - Why am I fetching data in BOTH root and authContext on initial load?
    - Need to troubleshoot the way that useAuth is handling userData. 
        If I log out of one account, the userId remains. This causes lists to be added to the previous user. (Check if still true)
