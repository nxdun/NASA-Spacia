#  🛰️Spacia
⭐ [Deployed application : Netlify](nasa-spacia.netlify.app/login)</br>
🦈 [Authentication Backend > Deployed Backend : Heroku + Docker](https://auth-server-x-fab950a2305f.herokuapp.com/)</br>



## Table of Contents

- [🛰️Spacia](#️spacia)
  - [Table of Contents](#table-of-contents)
  - [Description](#description)
  - [Installation](#installation)
  - [How-to-Run-Tests](#how-to-run-tests)
  - [Setting-enviroment-variables](#setting-enviroment-variables)
  - [License](#license)
  - [Contact](#contact)
## Description
  Spacia is a fullstack application that intergrate with official nasa api and provide images with personalised image gallery with download functionalities 
## Installation

To install Spacia, follow these steps:

1. Clone the repository from GitHub.
2. In commandLine Type `cd ./frontend`Navigate to the frontend directory.
3. Install dependencies using `npm install`.
4. Run `npm run dev` to open developer mode.

## How-to-Run-Tests

in root directory run `npm test` to run in commandline
in root directory run `npm tui` to run in Vitest user interface

## Setting-enviroment-variables
### frontend
- `VITE_AUTH_SERVER`: (Specify the backend server url)
- `VITE_NASA_API_KEY`: (API Key from Official Nasa Website
- `CAPTCHA_SECRET_KEY`: "Google recaptcha Client Key"

### backend
- `PORT`: (Specify the port number your server will run on)
- `MONGOSTRING`: "mongodb+srv:// " URL
- `JWT_SECRET`: SECRET key for Jwt Token
- `CAPTCHA_SECRET_KEY`: "Google recaptcha Server Key"
  

## License

TimeTide is licensed under the ISC License. See [LICENSE](LICENSE) for more information.

## Contact

For any inquiries or assistance, feel free to contact the project maintainer:

- Name: Lakshan S N
- Email: [inbox.nadun@gmail.com](mailto:inbox.nadun@gmail.com)
- GitHub: [github.com/nxdun](https://github.com/nxdun)
