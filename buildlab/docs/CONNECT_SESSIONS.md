# BuildLab Connect: publishing sessions

The public page is `connect.html`. Its listings come from `connect-data.js`. The array is empty until a session is confirmed; the page then shows an invitation to register interest or suggest a topic.

## Add a confirmed session

1. Open `connect-data.js` and add an object inside `window.buildLabConnectSessions`. Use this format:

   ```js
   {
     id: "unique-session-id",
     title: "Your confirmed title",
     topic: "A short business topic",
     date: "2026-12-15",
     time: "14:00",
     timeZone: "Asia/Kathmandu",
     format: "Online",
     description: "What attendees can expect to discuss.",
     status: "upcoming"
   }
   ```

2. Confirm the title, date, time zone, format, and description before publishing. Use a unique `id` for each session. `date` uses `YYYY-MM-DD` and `time` uses 24-hour `HH:MM`. Only entries with all fields and `status: "upcoming"` display. Use `status: "draft"` to hide an entry while preparing it. Remove a past session or change its status when it should no longer appear.
3. Save, preview `connect.html`, and check the listing and session dropdown. Commit and push through the normal site publishing workflow.

## Interest and registration wording

The form posts to the site's existing FormSubmit mailbox. It sends the visitor's interest type, optional selected session, name, email, organization, and description. It does **not** reserve a seat. While using this interest form, keep the disclaimer “This is an expression of interest, not a confirmed booking” visible even when a session is listed.

If BuildLab later opens confirmed registration, first decide how capacity, confirmations, cancellations, and privacy will be handled. Only then update the form button, help text, disclaimer, and confirmation workflow. Do not call interest submissions registrations until a booking process exists. Check that the FormSubmit mailbox is active before promoting a session.
