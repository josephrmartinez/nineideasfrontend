
- editList page:
    - Troubleshoot why patch update is not correctly updating idea text field
    - Prevent component from remounting on every key stroke in textarea. e.g. console.log("listData:", listData) is running on every key stroke.
    - Clean up all unused functions and conditional rendering logic. Use ReactRouter action for ever add idea event

- addList page:
    - Check that only unused topics are being suggested by fetchNewTopic
    - Enable user to write their own topic by double clicking topic text. Submit to create topic endpoint on completion
    - Set up content moderation AI API integration.
        - Check whether content is complete and related to topic. 

- API
    - Clean up unused endpoint functions (get lists by user is still using visibility: public, but this endpoint is not ever being called.)

- lists page
    - update feed to only display lists NOT by current user?

- sign up
    - Error handling: pass a useful error from the server to the frontend if the user tries to sign up with a username that is already taken

- log in
    - error handling for wrong password / user does not exist

- viewUser page
    - Add click event on each list -> navigate to addList page if draft and pass along needed props to populate page correctly.

- editUser page:
    - consolidate this action into just the input box rendering and calling the PATCH request. 

- viewList page
    - Header content is shifting over to the right compared to lists page. This is due to the scroll bar gutter. Address this so that content does not shift over between pages.
    - Create new route to view lists on same topic: lists/:topicId OR list/:topicId ??
    - add icon and route to view all lists on the same topic or place onClick event on topic text


- Developed logged out version of the app
    - Create isLoggedIn value, pass it to relevant components. (isLoggedIn has already been created on likeIcon. Pass this up to parent.)


- authContext / root:
    - Why am I fetching data in BOTH root and authContext on initial load?
    - Need to troubleshoot the way that useAuth is handling userData. 
        If I log out of one account, the userId remains. This causes lists to be added to the previous user. 


