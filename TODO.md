Important updates for MVP:

- Add site content:
    - Add 50 new topics
    - Add 20 lists. 
    - Populate site with likes

- Implement pagination for main lists page
- Implement pagination for lists in viewUser page

- Troubleshoot: Are already completed topics being presented to the user? Update function to not display drafted topics either.

- Address top section nudging to the right when clicking from lists view to viewList

- Decrease load time for newTopic on initial load. Is this just taking a long time when the server is starting up?



Features:

- Implement 'delete account' feature: delete all associated likes and lists (and ideas)
    - Keep likes on lists, but remove all lists so that fetching all lists still works (author is null)

- Implement 'download lists' feature: output all lists in structured format


General issues for research:
- editList page:
    - Learn why patch update only works if I run it on the idea object itself and not the whole list. 

- authContext / root:
    - Why am I fetching data in BOTH root and authContext on initial load?
    - Need to troubleshoot the way that useAuth is handling userData. 
        If I log out of one account, the userId remains. This causes lists to be added to the previous user. (Check if still true)

