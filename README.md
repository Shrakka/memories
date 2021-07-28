# Memories

```
Memories game for Ecole O'Clock
25/07/2021
```

[Online demo](https://memories-oclock.herokuapp.com/)

| Home | Game |
| -- | -- |
| ![](https://user-images.githubusercontent.com/18345624/126913267-5f47f156-8aed-40a1-a2b7-4f9458b7ad9f.png)  | ![](https://user-images.githubusercontent.com/18345624/126913265-6cc45d45-3f4b-45b8-8fc3-5bbf9a1f64ef.png)  |

:warning: Note: I slightly updated the code *after* the deadline to include a proper HTML file, as explained below. I think the result is clearer for readers. I kept old code on `master` for transparency, but I recommand to read the [dev branch](https://github.com/Shrakka/memories/tree/dev). :warning:

## Set up locally

<details><summary>
Setup a PostgreSQL database
</summary>

* Install PostgreSQL [cf](https://wiki.postgresql.org/wiki/Homebrew)
* Start PostgreSQL service [cf](https://wiki.postgresql.org/wiki/Homebrew)
* Create a database and a 'statistics' table

```
// In your favorite Terminal

> psql // connect to your local instance via command line interface
> \l   // list all databases in postgresql

> CREATE DATABASE memories;
> \c statistics  // move inside the 'memories' database

> \dt  // show tables in the database
> CREATE TABLE IF NOT EXISTS statistics (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  completion_time_ms INT NOT NULL
);

> INSERT INTO statistics(username, completion_time_ms)
  VALUES ('YourName', XXXXX); -- Example to set a entry in the table
```

Your database should be good to go for the application.

* Note down your connectionString:
    * `postgresql://<username>:<password>@<host>:<port>/<database_name>`
    * ex: `postgresql://enzo@localhost:5432/memories`

</details>

<details><summary>
Setup the project
</summary>

* Clone repository
* Move into repository: `cd memories`
* Install dependencies: `yarn install` [cf](https://classic.yarnpkg.com/en/docs/install/#mac-stable)
* Create an environment file: `cp .env.example .env` and update the `DATABASE_URL` connection string to your local instance value.
* Compile the client code: `yarn dev:client`
* Start the backend: `yarn dev:backend`

</details>

## How to deploy on Heroku

<details><summary>
Tutorial
</summary>

* Create an account / login to Heroku
* Install the Heroku CLI [cf](https://devcenter.heroku.com/articles/heroku-command-line)
* Install a Postgre Heroku add-on to your project [cf](https://elements.heroku.com/addons/heroku-postgresql): this will provision a Cloud DB for you.
    * In your project Settings tab, you'll find a your DB URL (`connectionString`) in the `Config Vars`, under `DATABASE_URL`
    * It should look like `postgres://dfgsdsdfsdf:9kjhdkfghd8987sdf@ec2-55-74-33-87.eu-west-1.compute.amazonaws.com:5432/dfkgjfdhkgh`
    * Connect via `psql <DATABSE_URL>` and setup the database/table similarly to the local tutorial above.
* Add heroku remote branch (from `memories` folder): `heroku git:remote -a <your_project_name>`
* Push your project: `git push heroku master`
* It's online!

</details>


<details><summary>
Why does it work?
</summary>

* Env file:
    * The NodeJS code in the project is using `process.env.<variable>`.
    * On your local, it's equal to the content of the `.env` file.
    * On Heroku, there exists a similar `.env` file, which you cannot edit, that will point to the right values ('production' node env, open http port, and database URL that you just created)
* Npm scripts:
    * Heroky deploy script automatically search for your `package.json` scripts:
        * It will call the `build` script first => therefore, it will compile the client code.
        * It will then call the `start` script => therefore, the server will start!

</details>

## Remarks on the project

### What could be interesting for students?

<details><summary>
Webpack
</summary>

We're here setting a simple webpack config to:
- compile JS / SASS code into a `dist` folder.
- generate the `html` file within this folder

</details>

<details><summary>
How to quickly deploy an app to heroku, with a database.
</summary>

Cf section above.

</details>

<details><summary>
Backend API folder structure for NodeJS projects
</summary>

* Router ⬇
* Controllers ⬇
* Lib ⬇ (not present here, but wish I had more time)
* Repositories (not present here, but wish I had more time)

</details>

<details><summary>
Misc client stuff
</summary>

* CSS:
    * `media queries` (2 examples)
    * `speudo-elements` (ex `:before`)
    * `flexbox` layout
    * `grid` layout
    * `sass` utils (`for`/`extend`/`use`...)
* JS:
    * `classes` syntax
    * `setTimeout`/`setInterval`
* DOM:
    * `fetch`: (GET / POST syntax)
    * `querySelectors`
    * `events` (we can dispatch our own events!)
    * `eventListeners`
    * `setInterval`/`setTimeout`

</details>

### What I would change

<details><summary>
Functional improvements (exercices)
</summary>

* Easy:
    * Include favicon
    * Limit the number of displayed `statistics`
    * Only display the best `completionTime` of each `userName`
    * Add rounded borders to the `timer`
    * Save the completion date on the backend, display it on the client

* Less easy:
    * Let the user choose between 3 modes for the game: `Easy` (20 cards - 1 minute) `Medium` (28 cards) `Hard` (36 cards)
    * Add Nice flip effect for card clicks: https://www.w3schools.com/howto/howto_css_flip_card.asp
    * Get CA certification for SSL on Heroku (to avoid the `rejectUnauthorized: false` in the code)
    * Have a deployment script to create the DB rather than doing it manually
    * Better handle the express errors
    * Properly close DB Pool on app exit

</details>

<details><summary>
Client code
</summary>

<details><summary>
I missed simple HTML 😭 I had the (weird) idea to completely generate the HTML via webpack and JS. Won't do it ever again.
</summary>

<details><summary>
It would have been simpler (and easier to understand for students - easier to maintain) to create two HTML pages, one for each of the app pages (home < - > game), and include them in the `dist` build via webpack:
</summary>

```
{
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    })
  ]
}
```

</details>

</details>

<details><summary>
Also, I wanted no redirections between the 2 states: hence I handed everything manually in JS and regenerated the DOM elements
</summary>

=> For that, using a framework (React/Vue) would definitely help. But not sure if it was the idea of the challenge though, so I skipped that too.

</details>

<details><summary>
Use complete MVC
</summary>

Normally the model dispatch an event for the controller to update the view. Here the controller does everything.

</details>

</details>


<details><summary>
Backend code
</summary>

* Tests!! There are super exciting to create, and not long to setup
* Create `lib` and `repository` layers
* Error middleware

</details>
