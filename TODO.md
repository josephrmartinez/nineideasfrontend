- Learn how to determine on the viewUser page if the user is viewing their own page. Check if the url param matches the id from the decoded token?

- Implement functionality to run a PATCH request on public/private toggle in addList page


- In progress: updating list model to have boolean values for completed and visible

- viewUser page
    - Add click event on each list -> navigate to addList page if draft
    - Implement update bio functionality

- Refactor addList page to utilize ReactRouter

- Change isActive conditional styling in Root component for viewUser link.
    - Username should only change to orange semibold if the user is the CURRENT user. When viewing other users, this should not change the styling. I may need to make a totally separate page for viewing other users vs. viewing own profile?