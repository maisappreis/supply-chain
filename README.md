# Supply Chain System
### This project is a small supply chain system.



# Front-end

## 🛠️ Installation

In the project directory `/frontend`, install the dependencies:
```
npm install
```

## 🌱 On Development

In the project directory `/frontend`, you can run:
```
npm start
```

- It runs the app in the development mode.
- Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
- The page will reload when you make changes.
- You may also see any lint errors in the console.

```
npm test
```

- Launches the test runner in the interactive watch mode.
- See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.


## 💻 On Production

In the project directory `/frontend`, you can run:
```
npm run build
```

- Builds the app for production to the `build` folder.
- It correctly bundles React in production mode and optimizes the build for the best performance.
- The build is minified and the filenames include the hashes.
- Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.


# Back-end

## 🛠️ Installation

In the project directory `/backend`, create a virtual environment:
```
python -m venv .supply
```

Activate the Virtual Environment:

- on Mac (bash/zsh)
```
source .supply/bin/activate
```

- on Windows (PowerShell)
```
.supply\Scripts\Activate.ps1
```

Install the dependencies:
```
pip install -r requirements.txt
```

## 🌱 On Development

In the project directory `/back-end`:

- Create your .env file with your SECRET_KEY

Activate the Virtual Environment:

- On Mac (bash/zsh)
```
source .supply/bin/activate
```

- On Windows (PowerShell)
```
.\.supply\Scripts\Activate.ps1
```

Run in the development mode:
```
python manage.py runserver
```

- It runs the app in the development mode.
- Open [http://127.0.0.1:8000/](http://127.0.0.1:8000/)
