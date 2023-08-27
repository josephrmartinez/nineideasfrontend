- implement "like" feature
    - style like to be more prominent 
    - implement "unlike" option

- viewUser page
    - Add click event on each list -> navigate to addList page if draft and pass along needed props to populate page correctly.

- viewList page
    - Create new route to view lists on same topic: lists/:topicId OR list/:topicId ??
    - add icon and route to view all lists on the same topic

- addList page:
    - Enable public/private toggle to make patch update to list

- authContext / root:
    - Why am I fetching data in BOTH root and authContext on initial load?
    - Need to troubleshoot the way that useAuth is handling userData. 
        If I log out of one account, the userId remains. This causes lists to be added to the previous user. 



- implement "comment" feature



