# Welcome to AdminUniversity!

This is the first version with a little functionality about manage courses, subject, teacher and student in an university 


# Demo

**https://www.youtube.com/watch?v=dAg0pQA18aY**

## How To Run

### Backend
You need to configure the data in the **application properties** in order to connect to Postgres database.
![enter image description here](https://i.postimg.cc/vg26jvHr/setup1.png)


### Frontend
You need to update the host and secret in the environment dev file. The host is the backend URL and the secret will be a whatever text it will be used like a key in order to encrypt sensitive data.
![enter image description here](https://i.postimg.cc/dZ7TKTLz/setup2.png)

After adding these values you can run the client side using the following command.

    npm run start:dev
