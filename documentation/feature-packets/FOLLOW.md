
# Follow
## Attributes
- a connection is created between a follower and followed or not
- follower button creates a follows entry in the database
- unfollow button deletes the follows entry in database
- whether a button is follow or unfollow determined as it is rendered
## Endpoints/Routes
- Not Applicable: Will be utilized by a button on the story or user page
- GET:      /my-feed
    - render all stories that are followed by user
- POST:     /follow
    - follow
- DELETE:   /follow
    - unfollow
## Templates/Views
- feed.pug - similar to stories.pug
## Sketches
![Follows ERD Diagram](https://github.com/AaronTheBruce/maximum/blob/master/documentation/feature-packets/images/follows-model.png)
