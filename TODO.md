- Simplify sign up to no longer require email?

- Review max topic length. Delete topics that are too long (db operation). 
- Set limit on topic length for user generated topics

- Implement 'delete user' feature: delete all associated likes and lists (and ideas)

- viewList page
    - Create new route to view lists on same topic: lists/:topicId OR list/:topicId ??
    - add icon and route to view all lists on the same topic or place onClick event on topic text


- Developed logged out version of the app
    - Create isLoggedIn value, pass it to relevant components. (isLoggedIn has already been created on likeIcon. Pass this up to parent.)


- editUser page:
    - consolidate this action into just the input box rendering and calling the PATCH request. 

- addList page:
    - Set up content moderation AI API integration.
        - Check whether content is complete and related to topic. 
`
- editList page:
    - Learn why patch update only works if I run it on the idea object itself and not the whole list. 


- general
    - Check history stack: https://reactrouter.com/en/main/start/tutorial#managing-the-history-stack

- authContext / root:
    - Why am I fetching data in BOTH root and authContext on initial load?
    - Need to troubleshoot the way that useAuth is handling userData. 
        If I log out of one account, the userId remains. This causes lists to be added to the previous user. 


