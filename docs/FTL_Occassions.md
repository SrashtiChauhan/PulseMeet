# Feature Traceability List (FTL) – PulseMeet

| Feature ID | Feature Name                      | Description                                       | User Role         | Expected Outcome                              | Priority |
| ---------- | --------------------------------- | ------------------------------------------------- | ----------------- | --------------------------------------------- | -------- |
| PM-F01     | User Authentication               | Secure registration and login using NextAuth.js   | Host, Attendee    | Authenticated access to protected features    | MVP      |
| PM-F02     | Role-Based Access Control         | Restrict dashboards and actions based on role     | Host, Attendee    | Users access only authorized functionality    | MVP      |
| PM-F03     | Event Creation                    | Create public events with required details        | Host              | Event becomes available publicly              | MVP      |
| PM-F04     | Event Editing                     | Modify event information after creation           | Host              | Updated information is reflected immediately  | MVP      |
| PM-F05     | Event Deletion                    | Remove events from the platform                   | Host              | Event is removed from listings and dashboards | MVP      |
| PM-F06     | Public Event Listing              | Display all available public events               | Visitor, Attendee | Users discover available events               | MVP      |
| PM-F07     | Event Details Page                | Dedicated page for each event                     | Visitor, Attendee | Users can view complete event information     | MVP      |
| PM-F08     | Event Registration                | Register for events                               | Attendee          | Registration record is created                | MVP      |
| PM-F09     | Duplicate Registration Prevention | Prevent multiple registrations for the same event | System            | Only one registration per attendee per event  | MVP      |
| PM-F10     | Capacity Enforcement              | Prevent registrations after capacity is reached   | System            | Registration is blocked when full             | MVP      |
| PM-F11     | Registration Deadline Validation  | Prevent registrations after cutoff date           | System            | Registration is rejected after deadline       | MVP      |
| PM-F12     | Organizer Dashboard               | Manage created events and attendees               | Host              | Centralized event management                  | MVP      |
| PM-F13     | Attendee Dashboard                | View registered events                            | Attendee          | Easy access to participation history          | MVP      |
| PM-F14     | CSV Export                        | Export attendee information                       | Host              | Downloadable attendee report                  | MVP      |
| PM-F15     | Attendee Search                   | Search attendees by name or email                 | Host              | Faster attendee management                    | Bonus    |
| PM-F16     | Live Attendee Count               | Show participant counts publicly                  | Visitor, Attendee | Improved event visibility                     | Bonus    |
| PM-F17     | Responsive Design                 | Support mobile, tablet, and desktop devices       | All Users         | Consistent user experience                    | Bonus    |
| PM-F18     | Protected Routes                  | Restrict unauthorized access                      | System            | Secure dashboard and management pages         | MVP      |
