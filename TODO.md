Important updates for MVP:

- Form handling: prevent user from submitting idea twice.
    - This is currently possible onEnter and onSubmit (clicking add idea)


- Review max topic length. Delete topics that are too long (db operation):
    { "$expr": { "$gt": [ { "$strLenCP": "$name" }, 90 ] } }

    - Set limit on topic length for user generated topics: 90 characters




- Error handling with login:
    - Show message that tells user "username not found", "incorrect password" ?

- Update username storage and retrieval so that it is not case sensitive

- Create consistent appearance between addList and editList components

- Update visibility toggle on addList page to be same text color as "topic"
    - Update visibility toggle component to be DRY accross components if possible

- Why is component mounting on every onChange for textarea input on editList component but not addList?
    - Check ReactRouter configuration



Features:

- Set up content moderation AI API integration.
    - Check whether content is complete and related to topic. 

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


