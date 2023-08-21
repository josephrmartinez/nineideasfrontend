- viewUser page
    - Combine viewUser and viewCurrentUser pages again. Drop the useAuth workaround for user/current?
        - If I get rid of user/current, I will need to update deleteList.jsx to useNavigate to the previous page.
    - Implement update bio functionality on viewCurrentUser
    - currentUser's lists are not updating. The useAuth is getting the public lists data on initial load. This is not getting updated after a user starts, completes, or deletes a list. Right now, you need to manually reload the page. 
    - Add click event on each list -> navigate to addList page if draft

- viewList page 
    - add icon and route to view all lists on the same topic

- Implement functionality to run a PATCH request on public/private toggle in addList and viewList pages