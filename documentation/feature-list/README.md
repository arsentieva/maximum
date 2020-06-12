# Medium

- Stories
  - Attributes
    - id
    - Headline/Title
    - Image - tricky: amazon s3 ? Predefined Gallery ?
    - body
    - byline/summary
    - publishing date
    - author
    - follow Button
    - est read time
  - Views
    - /articles   /articles/:id
      - view all articles or and individual article
    - main-page   /
      - root route will display all the article 
- Profiles
  - Attributes
- Commenting on stories
  - Attributes
    - CommentBody
    - Applause/like (optional)
    - User
    - picture
  - Views
    - /Responses/Show
    - /Responses
- Follows and feed
  - Attributes: Within every author's profile card, there is a follow button
    - Feed
      - Would contain articles pertaining to just the author's you followed
  - Views
    - /feed
- Likes
  - Attribute
    - Increment total of likes for the respective article/comment
- Login/Logout/SignUp
  - Authentication Login/Logout
  - Authorization
  - SignUp & user accounts
    - Demo account: can only see own content
      - New account created each time?
- Bonus: Topics/categories
- Bonus: Bookmarks

## Minimum Viable Product ERD
![ERD MVP Diagram](https://github.com/AaronTheBruce/maximum/blob/master/documentation/feature-packets/images/Maximum%20MVP.png)
