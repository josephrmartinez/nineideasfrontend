<!-- MVP -->

- NEW USERTOPIC route 
    - Spin up new database for project
    - Populate new Topic collection
    - Confirm correct implementation of UserTopic document creation
    - Confirm correct implementation of CommonTopic

- addList page:
    - BUG FIX: Pressing enter on new UserTopic is causing a DOUBLE submit to the API. But clicking outside the text input does not. Why? Try without strict mode



<!-- AFTER DEPLOY -->

- viewList page
    - Create new route to view lists on same topic: lists/:topicId OR list/:topicId ??
    - add icon and route to view all lists on the same topic or place onClick event on topic text


- Developed logged out version of the app
    - Create isLoggedIn value, pass it to relevant components. (isLoggedIn has already been created on likeIcon. Pass this up to parent.)

- API
    - Clean up unused endpoint functions (get lists by user is still using visibility: public, but this endpoint is not ever being called.)


- editUser page:
    - consolidate this action into just the input box rendering and calling the PATCH request. 

- addList page:
    - Set up content moderation AI API integration.
        - Check whether content is complete and related to topic. 

- editList page:
    - Learn why patch update only works if I run it on the idea object itself and not the whole list. 


- general
    - Check history stack: https://reactrouter.com/en/main/start/tutorial#managing-the-history-stack

- authContext / root:
    - Why am I fetching data in BOTH root and authContext on initial load?
    - Need to troubleshoot the way that useAuth is handling userData. 
        If I log out of one account, the userId remains. This causes lists to be added to the previous user. 


