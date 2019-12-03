# Message files

Each sprint has its own messages file.

These operate in a similar way to message files in production, with key/value pairs. This makes it easy for content designers to manage the content (it's all in one file) and a consistent copy approach is more possible than trying to deal with copy scattered throughout a prototype. It also has the added advantage of making copy transfer to production much easier and of course any updates mid-project.

The message file is parsed within the sprint routes file (see `getMessages` function call) and each key/value pair is saved to a `res.locals` key. The default (and any custom) routes call `getMessages` and this makes the messages available in each view. The messages are then just referenced in the view to display the copy. For example in the view `{{ messages__common__first_name }}`.
