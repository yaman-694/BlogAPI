# REST API

### User 
- CREATE USER `api/v1/user/register`
    ```
    {
        "email": "jfs@sdsfsdf.om",
        "password": "12323",
        "display_name": "Faltu"
    }
    ```
- LOGIN USER `api/v1/user/login`
    ```
    {
        "email": "jfs@sdsfsdf.om",
        "password": "12323",
    }
    ```


### BLOG
- CREATE BLOG `api/v1/blog/create-blog`
    ```
    authorization header
    {
        "title": "Ya",
        "content": "asdfasdfasdf"
    }
    ```
- GET BLOGS `api/v1/blog/get-blogs`
- GET BLOG `api/v1/blog/get-blog/:id`
- UPDATE BLOG `api/v1/blog/update-blog/:id` *authorization header
- DELETE BLOG `api/v1/blog/delete-blog/:id` *authorization header

![image](https://github.com/yaman-694/BlogAPI/assets/72979343/3e50c284-53af-4dcd-a050-4ca343f55006)
