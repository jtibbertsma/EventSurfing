# EventSurfing

[Heroku link][heroku]

[heroku]: http://pad-crashing.herokuapp.com/

## Minimum Viable Product
EventSurfing is a clone of CouchSurfing built on Rails and Backbone. Users can:

<!-- This is a Markdown checklist. Use it to keep track of your progress! -->

- [x] Create accounts
- [x] Create sessions (log in)
- [x] Create events
- [x] Join events
- [ ] Search for events
- [ ] Users can get/give references.

## Design Docs
* [View Wireframes][views]
* [DB schema][schema]

[views]: ./docs/views.md
[schema]: ./docs/schema.md

## Implementation Timeline

### Phase 1: User Authentication, Views for Events (~1 day)
I will implement user authentication in Rails based on the practices learned at
App Academy. For now I'll just have a login form on the navbar; I'll worry about
pretty user sign up forms and front page later.

[Details][phase-one]

### Phase 2: View, Join, and Search for Events (~3 days)
I will add API routes to serve event and user data as JSON, then add Backbone
models and collections that fetch data from those routes. I'll add code to calculate
distances between two location. Once I have that, it will be easy to let users search
for hosters, travellers, and events close to a given city. I will have a table of cities
with their coordinates to accomplish this functionality. This is the heart and guts
of this project.

[Details][phase-two]

### Phase 3: Forms for User Creation and Event Creation (1 day)
I'll devote a day to creating nice forms tocreate new users and events. I'll also
make nice user view pages to display user profiles. If I take too long on phase two,
I'll put this phase off until the end.

[Details][phase-three]

### Phase 4: ???

I've totally given up on phase 4. I really bit off more than I could chew with this
project.

[Details][phase-four]

### Phase 5: References (~1 days)
Give users the ability to give references to other users and vice versa. Adjust search
routes so that users are sorted by number of references.

[Details][phase-five]

### Bonus Features (TBD)
- [ ] Comments
- [ ] Friends
- [ ] Use backbone for login/new user screens
- [ ] Pagination/infinite scroll
- [ ] Activity history
- [ ] User avatars
- [ ] Typeahead search bar

[phase-one]: ./docs/phases/phase1.md
[phase-two]: ./docs/phases/phase2.md
[phase-three]: ./docs/phases/phase3.md
[phase-four]: ./docs/phases/phase4.md
[phase-five]: ./docs/phases/phase5.md
