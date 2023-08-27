
- addList page:
    - BUG FIX: IDEAS 2 - 9 ARE NOT BEING PATCHED INTO THE LIST OBJ. FIX ASAP
    - Check that only unused topics are being suggested by fetchNewTopic
    - Enable public/private toggle to make patch update to list. This works on viewList but not yet on the addList page.
    - Enable user to write their own topic by double clicking topic text. Submit to create topic endpoint on completion
    - Set up content moderation AI API integration.
        - Check whether content is complete and related to topic. 


- lists page
    - update feed to only display lists NOT by current user

- sign up
    - make email optional. write warning about no password recovery without email.
    - confirm username needs to be unique on sign up

- viewUser page
    - sort lists by reverse chronological order. newest on top.
    - Add click event on each list -> navigate to addList page if draft and pass along needed props to populate page correctly.

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


