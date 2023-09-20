Important updates for MVP:

- Troubleshoot: why is currentstreak and record streak not loading?

- Troubleshoot: Why are already completed topics being presented to the user?


- Address top section nudging to the right when clicking from lists view to viewList

- Change width of elements on addList and editList to match
    - Refactor addList route first. Then implement maintainable editList page with updates

- Implement pulsing effect on pending routes (addList, lists view, viewUser)

- Add idea has a network delay. Add some sort of isSubmitting indicator. Textarea?

- Decrease load time for newTopic on initial load. Is this just taking a long time when the server is starting up?

- Create "share list" function?

- Add 50 new topics

- Add 20 lists. 

- Populate site with likes

- Implement pagination for main lists page

- Implement pagination for lists in viewUser page

- Error handling with login:
    - Show message that tells user "username not found", "incorrect password" ?



- DRY refactoring:
- Update visibility toggle component across addList and editList
    - Create consistent appearance and functionality between addList and editList components

- Is component mounting on every onChange for textarea input on editList component but not addList? Or is this just console.log placement?
    - Check ReactRouter configuration


- Troubleshoot: list duplication?



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


Users:
josephm
saulg
kimw
peterg
darn
tyvek
matilda
