<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="https://github.com/owncoral/pgzod">
    <img src="https://avatars.githubusercontent.com/u/76981916?s=200&v=4" alt="Logo" width="80" height="80">
  </a>

<h3 align="center"><code>pgzod</code></h3>

  <p align="center">
    Transform PostgreSQL schemas into Zod validators and types
    <br />
    <a href="https://owncoral.github.io/pgzod"><strong>Explore the docs »</strong></a>
    <!-- <br /> -->
    <br />
    <!-- <a href="https://github.com/owncoral/pgzod">View Demo</a> -->
    <!-- · -->
    <a href="https://github.com/owncoral/pgzod/issues">Report Bug</a>
    ·
    <a href="https://github.com/owncoral/pgzod/issues">Request Feature</a>
  </p>
</div>


<h2>Table of Contents</h2>

<!-- TABLE OF CONTENTS -->
- [1. About The Project](#1-about-the-project)
  - [1.1. Built With](#11-built-with)
- [2. Getting Started](#2-getting-started)
- [3. Usage](#3-usage)
- [4. Roadmap](#4-roadmap)
- [5. Contributing](#5-contributing)
- [6. License](#6-license)
- [7. Contact](#7-contact)

<!-- ABOUT THE PROJECT -->
## 1. About The Project

Keeping Typescript types in sync with your PostgreSQL database schemas is very useful but challenging.
With PGZod that you can maintain all your tables in sync with Typescript through
["Zod"][zod]. Zod is, in their own words:

> a TypeScript-first schema declaration and validation library. You can use a Zod schema for validation or as a normal type.

It works great when you couple it with a PostgreSQL client like [slonik][slonik].

<p align="right">(<a href="#top">back to top</a>)</p>

### 1.1. Built With

* [Slonik][slonik]
* [Typescript][typescript]
* [Yargs][yargs]
* [Zod][zod]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## 2. Getting Started

The best way to run PGZod is by installing it globally or using it through `npx`.

* npm
  ```sh
  npm install pgzod -g
  ```
* yarn
  ```sh
  yarn global add pgzod
  ```

If you want to use `npx`, you don't have to install PGZod run:

```sh
# Shows the command help.
npx pgzod --help
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## 3. Usage

You can use PGZod from the command line. It needs the credentials and the address of the live
database from where to read the schema. You can provide this information through command options or
environment variables. All the [variables from PostgreSQL][postgresql-env-vars] are supported.

Your database credentials could be stored on a local `.env` file, or even better, on a secret
manager. You then load the credentials to your current session and run the PGZod command.

For example, you could build the following `.env` file:

```ini
PGHOST=some.postgresql.host
PGPORT=12345
PGDATABASE=app
PGSSLMODE=require
PGUSER=postgres
PGPASSWORD=yourpassword!
```

Load the `.env` variables, and override others through command options.

```sh
env $(xargs < .env) pgzod --pghost 127.0.0.1 --pgport 5432 --schema public
```

> PGZod will not look for tables on your whole database just a single `schema`. You can
> indicate your database `schema` through the`--schema` option. If you don't provide it, PGZod
> runs against the `public` schemas.

_For more examples, please refer to the [Documentation][docs]_

### Strategies

PGZod offers the concept of `strategies` to define how it should create the `Zod` validator files. Here
is the current list of strategies exposed:

| Value | Description |
| ---   | ---         |
| `write` | Creates `Zod` validators considering only writes to the table. Columns that have default values will be marked as `optional`. |
| `readwrite` | Creates `Zod` validators for both read and write actions. PGZod will create two validators for each `table` with the `Read` and `Write` suffix to differentiate both actions. **This is probably the strategy you want to work with**. |


<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## 4. Roadmap

- Find a better solution to deal with dates, and currently, we treat them as strings.
- Add support for more types.
- Allow the user to override the current type mappings.
- Add tests.

See the [open issues](https://github.com/owncoral/pgzod/issues) for a complete list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## 5. Contributing

Your contributions make the open-source community a fantastic place to learn, inspire, and create.

To suggest how to improve this project, please fork the repo and create a pull request.

You can also create an issue with the tag "enhancement."

Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## 6. License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## 7. Contact

Your Name - [@owncoral](https://twitter.com/owncoral) - support@owncoral.com

Project Link: [https://github.com/owncoral/pgzod](https://github.com/owncoral/pgzod)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/owncoral/pgzod.svg?style=for-the-badge
[contributors-url]: https://github.com/owncoral/pgzod/graphs/contributors
[docs]: https://github.com/owncoral/pgzod
[forks-shield]: https://img.shields.io/github/forks/owncoral/pgzod.svg?style=for-the-badge
[forks-url]: https://github.com/owncoral/pgzod/network/members
[issues-shield]: https://img.shields.io/github/issues/owncoral/pgzod.svg?style=for-the-badge
[issues-url]: https://github.com/owncoral/pgzod/issues
[license-shield]: https://img.shields.io/github/license/owncoral/pgzod.svg?style=for-the-badge
[license-url]: https://github.com/owncoral/pgzod/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[postgresql-env-vars]: https://www.postgresql.org/docs/current/libpq-envars.html
[slonik]: https://www.npmjs.com/package/slonik
[stars-shield]: https://img.shields.io/github/stars/owncoral/pgzod.svg?style=for-the-badge
[stars-url]: https://github.com/owncoral/pgzod/stargazers
[typescript]: https://typescript.com
[yargs]: https://www.npmjs.com/package/yargs
[zod]: https://www.npmjs.com/package/zod
