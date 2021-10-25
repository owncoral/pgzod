<div id="top"></div>

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]



<!-- PROJECT LOGO -->
<br />
<div align="center">
  <!-- <a href="https://github.com/guzmonne/pgzod"> -->
  <!--   <img src="images/logo.png" alt="Logo" width="80" height="80"> -->
  <!-- </a> -->

<h3 align="center"><code>pgzod</code></h3>

  <p align="center">
    Transform PostgreSQL schemas into Zod validators and types
    <br />
    <a href="https://github.com/guzmonne/pgzod"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <!-- <a href="https://github.com/guzmonne/pgzod">View Demo</a> -->
    <!-- · -->
    <a href="https://github.com/guzmonne/pgzod/issues">Report Bug</a>
    ·
    <a href="https://github.com/guzmonne/pgzod/issues">Request Feature</a>
  </p>
</div>



<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#usage">Usage</a></li>
    <li><a href="#roadmap">Roadmap</a></li>
    <li><a href="#contributing">Contributing</a></li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
    <li><a href="#acknowledgments">Acknowledgments</a></li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
## About The Project

Keeping Typescript types in sync with your PostgreSQL database schemas very useful but hard.
With `pgzod` that you can maintain all your tables in sync with Typescript through
["Zod"][zod]. Zod is, in their own words:

> a TypeScript-first schema declaration and validation library. You can use a Zod schema for validation or as a normal type.

It works great when you couple it with a PostgreSQL client like `[slonik][slonik]`.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built With

* [Slonik][slonik]
* [Typescript][typescript]
* [Yargs][yargs]
* [Zod][zod]

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->
## Getting Started

The best way to run `pgzod` is by installing it globally or using it through `npx`.

* npm
  ```sh
  npm install pgzod -g
  ```
* yarn
  ```sh
  yarn global add pgzod
  ```

If you want to use `npx`, you don't have to install `pgzod` run:

```sh
# Shows the command help.
npx pgzod --help
```

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->
## Usage

You can use `pgzod` from the command line. It needs the credentials and the address of the live
database from where to read the schema. You can provide this information through command options or
environment variables. All the [variables from PostgreSQL][postgresql-env-vars] are supported.

Your database credentials could be stored on a local `.env` file, or even better, on a secret
manager. You then load the credentials to your current session and run the `pgzod` command.

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
env $(xargs < .env) pgzod --pghost 127.0.0.1 --pgport 5432
```

_For more examples, please refer to the [Documentation][docs]_

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->
## Roadmap

- Find a better solution to deal with dates. Currently we treat them as strings.
- Add support for more types.
- Allow the user to override the current type mappings.
- Add tests.

See the [open issues](https://github.com/guzmonne/pgzod/issues) for a complete list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTRIBUTING -->
## Contributing

Your contributions makes the open source community a fantastic place to learn, inspire, and create.

If you have a suggestion to improve this project, please fork the repo and create a pull request.
You can also create an issue with the tag "enhancement."

Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->
## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- CONTACT -->
## Contact

Your Name - [@guzmonne](https://twitter.com/guzmonne) - guzmonne@hotmail.com

Project Link: [https://github.com/guzmonne/pgzod](https://github.com/guzmonne/pgzod)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->
[contributors-shield]: https://img.shields.io/github/contributors/guzmonne/pgzod.svg?style=for-the-badge
[contributors-url]: https://github.com/guzmonne/pgzod/graphs/contributors
[docs]: https://github.com/guzmonne/pgzod
[forks-shield]: https://img.shields.io/github/forks/guzmonne/pgzod.svg?style=for-the-badge
[forks-url]: https://github.com/guzmonne/pgzod/network/members
[issues-shield]: https://img.shields.io/github/issues/guzmonne/pgzod.svg?style=for-the-badge
[issues-url]: https://github.com/guzmonne/pgzod/issues
[license-shield]: https://img.shields.io/github/license/guzmonne/pgzod.svg?style=for-the-badge
[license-url]: https://github.com/guzmonne/pgzod/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/ing-gmonne
[postgresql-env-vars]: https://www.postgresql.org/docs/current/libpq-envars.html
[slonik]: https://www.npmjs.com/package/slonik
[stars-shield]: https://img.shields.io/github/stars/guzmonne/pgzod.svg?style=for-the-badge
[stars-url]: https://github.com/guzmonne/pgzod/stargazers
[typescript]: https://typescript.com
[yargs]: https://www.npmjs.com/package/yargs
[zod]: https://www.npmjs.com/package/zod
