
# Stories
## Attributes
- id
- Headline/Title
- Image - tricky: amazon s3 ? Predefined Gallery ?
- body
- byline/summary
- publishing date
- author
- follow Button
- est read time
## Endpoints/Routes
    - GET: /
        - if logged in, render /stories
        - else redirect to login
    - GET: /stories (res.redirect)
	- GET: /stories/:id
## Templates/Views
    - stories.pug
        - lists all stories
    - story.pug
        - lists a specific story
    - new-story.pug
        - form for creating a new story
## Model/Sketch
![Stories ERD Diagram](https://github.com/AaronTheBruce/maximum/blob/master/documentation/feature-packets/images/stories-model.png)
