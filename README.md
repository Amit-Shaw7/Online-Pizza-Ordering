
<h1 align="center">
  <br>
  <a href="https://pijja.vercel.app/"><img src="https://res.cloudinary.com/amitkumarshaw/image/upload/v1699526044/logo_caixk8.png" alt="managet" width="200"></a>
  <br>
  Pijja
  <br>
</h1>

<h4 align="center">A online pizza ordering web app built using MERN Stack</h4>

<p align="center">
  <a href="https://react.dev/">
    <img width="20px" src="https://cdn.freebiesupply.com/logos/large/2x/react-1-logo-svg-vector.svg" alt="React">
  </a>
  
  <a href="https://nodejs.org/en">
  <img width="20px" src="https://cdn.freebiesupply.com/logos/large/2x/nodejs-icon-logo-svg-vector.svg" alt="Node js">
  </a>
  
  <a href="https://www.mongodb.com/">
      <img height="20px" src="https://1000logos.net/wp-content/uploads/2020/08/MongoDB-Emblem-640x400.jpg" alt="mongo db">
  </a>
  
  <a href="https://expressjs.com/">
    <img height="20px" src="https://www.vectorlogo.zone/logos/expressjs/expressjs-icon.svg" alt="express js">
  </a>
  
   <a href="https://sass-lang.com/documentation/">
    <img height="20px" width="30px" src="https://w7.pngwing.com/pngs/437/300/png-transparent-sass-npm-cascading-style-sheets-node-js-sass-purple-violet-text.png">
  </a>
  
   <a href="https://jwt.io/">
    <img height="20px" src="https://jwt.io/img/pic_logo.svg" alt="express js">
  </a>
</p>

<p align="center">
  <a href="#key-features">Key Features</a> •
  <a href="#how-to-use">How To Use</a> •
  <a href="#credits">Credits</a> •
  <a href="#related">Related</a> •
  <a href="#license">License</a>
</p>

## Preview

https://github.com/Amit-Shaw7/Online-Pizza-Ordering/assets/98527560/bbc43404-7556-4b84-8e64-f15e9e95ec7e


## Screenshots

![screenshot](https://res.cloudinary.com/amitkumarshaw/image/upload/v1699962803/Screenshot_287_morzla.png)

<hr/>

![screenshot](https://res.cloudinary.com/amitkumarshaw/image/upload/v1699962799/Screenshot_296_xtq3rq.png)

<hr/>

![screenshot](https://res.cloudinary.com/amitkumarshaw/image/upload/v1699962796/Screenshot_297_pzq1dh.png)

<hr/>

![screenshot](https://res.cloudinary.com/amitkumarshaw/image/upload/v1699962796/Screenshot_298_wkeq9f.png)

<hr/>

![screenshot](https://res.cloudinary.com/amitkumarshaw/image/upload/v1699962798/Screenshot_303_cprueq.png)

<hr/>

![screenshot](https://res.cloudinary.com/amitkumarshaw/image/upload/v1699962798/Screenshot_302_lhku4k.png)

<hr/>

## Key Features

* Complete user authentication.  
* Starting from signing up to paying online and order pizza full flow maintained properly.
* Admin authentication.
* A Basic admin dashboard and admin has some extra powers like viewing all orders , users and can create , update , delete products change order status.
* Check menu add pizza to your cart add delivery informations and pay either online or COD.
* View personal orders , carts , profile , order status , order details etc.
* Update profile add picture (using Cloudinary).
* Fully responsive.
* And many more 

## How to run in your system

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with [npm](http://npmjs.com)) installed on your computer. From your command line:

```bash
# Clone this repository
$ git clone ...

# Go into the frontend
$ cd frontend

# Install dependencies
$ npm install

# Come back to previous path
$ cd ..

# Go into the backend
$ cd backend

# Install dependencies
$ npm install

# Create a .env file.
# Open the .env file and
## create some variables 
### MONGO_URI with value your mongodb database connection uri.
### FRONTEND_URL = http://localhost:3000 (Make sure to run on this otherwise you have to change inside CORS() in app.js in backend)
### JWT_SECRET = Some secret key for JWT
### RAZORPAY_API_KEY = Create your test account on razorpay and paste your api key here
### RAZORPAY_API_SECRET = Your razorpay api secret
### PORT = 5000 (Make sure to run on this otherwise you have to change host in frontend)

# Come back to previous path
$ cd ..

# Run the app

## Go into the backend
$ cd backend
$ npm run start

# Come back to previous path
$ cd .. 

## Go into the frontend
$ cd frontend
$ npm run start
```

## How to use

- Please wait for 15 second after the first visit to this app beacuse it's backend is hosted in a free server and if no request is made in last 15 minutes the company switch the server off till the next request and when a new request comes it takes about 15 sec to give first response.


- **** FOR USERS ****

- Signup with an email , name and password. After succesfull signup you will be redirected to login page.

- Login with that email and password. After succesfull login you will be redirected to home page where you can see the menu.

- Add pizzas to your cart go to cart page see price summary and manage quantity.

- Move further add shipping details and select payment option (COD or online in Razorpay test mode if online use CARD NUMBER - 4111 1111 1111 1111).

- To verify order go to my orders page through navbar and click on the eye button to see a detailed order info.

- **** FOR ADMINS ****

- Login using admin credentials or login as guest.

- Admin can do all those things which a user can and also has some extra powers.

- Go to profile page form the navbar click on the Dashboard btn on the profile page you will be redirected to the admin panel and can perform some extra task mentioned above in the key feature section

## Credits

This web app uses the following technologies:

- [Node.js](https://nodejs.org/)
- [React.js ](https://react.dev/)
- [MongoDB - a database](https://www.mongodb.com/)
- [SCSS](https://sass-lang.com/documentation/)

This web app uses the following important npm packages:

- [express.js](https://expressjs.com//)
- [mongoose ](https://mongoosejs.com/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs)
- [jsonwebtoken](https://jwt.io/)
- [dotenv](https://www.npmjs.com/package/dotenv)
- [react-hot-toast - for toasts](https://react-hot-toast.com/)
- [react-icons - for icons](https://react-icons.github.io/react-icons/)

## Related

[Pijja](https://pijja.vercel.app/) - Deployed version of pijja (This web app)


## You may also like...

- [Youtube Clone](https://github.com/Amit-Shaw7/yt-clone-frontend) - A youtube clone.
- [Pijja](https://github.com/Amit-Shaw7/pizzaApp---Frontend) - A dummy pizza ordering webapp
- [Connect](https://github.com/Amit-Shaw7/connect) - A social media web app
- [Origin AI](https://github.com/Amit-Shaw7/saas-ai) - An ai tool like chatgpt
- [Managet](https://github.com/Amit-Shaw7/kanban-task-management) - A Task management web app with drag and drop feature

## License

MIT

---

> [Amit Shaw](https://amitshawv2.vercel.app) &nbsp;&middot;&nbsp;
> GitHub [Amit-Shaw7](https://github.com/Amit-Shaw7) &nbsp;&middot;&nbsp;
> LinkedIn [amit-shaw-a95121230](https://www.linkedin.com/in/amit-shaw-a95121230/)

