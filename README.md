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

// create
router.post("/create-blog", createBlogController as any);
// read
router.get("/get-blogs", getBlogsController);
router.get("/get-blogs/:id", getBlogController);
// update
router.put("/update-blog/:id", postVerify as any, updateBlogController as any);
// delete
router.delete("/delete-blog/:id", postVerify as any, deleteBlogController as any);
- CREATE BLOG `api/v1/blog/create-blog`
    ```
    {
        "title": "Ya",
        "content": "asdfasdfasdf"
    }
    ```
- GET BLOGS `api/v1/blog/get-blogs`
- GET BLOG `api/v1/blog/get-blog/:id`
- UPDATE BLOG `api/v1/blog/update-blog/:id`
- DELETE BLOG `api/v1/blog/delete-blog/:id`
