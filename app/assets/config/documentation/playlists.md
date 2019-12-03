# Playlists

Each sprint has its own playlist folder.

Each group of files has its own playlist file, for example the directors routes for a company PSA.

A playlist file typically returns an object with a file directory (playlists only operate within a single folder) and the playlist itself. The playlist is an array of objects, each representing a view.

Normally a view just contains the filename of the view in question. However for some it can also contain branching information or show a jump to another playlist

- `view` (string) - the filename of the view
- `route` (string) - name of the branching route. This is the same for each view in the same route
- `routeStart` (boolean) - if the view has a `route`, setting this to `true` will indicate the first view in the route and create a new line on the overview page
- `routeEnd` (boolean) - if the view has a `route`, setting this to `true` will return the subsequent views in the overview page to standard flow
- `childRoute` (boolean) - if the view has a `route`, setting this to `true` will indent the route on the overview page. This allows a route to have an additional branch represented.
- `exitTo` (string) - setting this on a view will insert an additional block containing the given string in the overview page after the view it is set on. This can be used to indicate a jump off into another playlist. Currently this just renders text rather than an actual link.
