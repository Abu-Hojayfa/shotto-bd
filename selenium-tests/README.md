# Selenium Tests for Shotto-BD Login & Signup

E2E tests using Selenium WebDriver and Mocha.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Make sure both the frontend and backend servers are running locally.
   - Frontend: `http://localhost:5173`
   - Backend: `http://localhost:5000/api`

## Running Tests

Run the following command in the `selenium-tests` folder:
```bash
npm test
```

To run Chrome in headless mode:
```bash
# Unix
HEADLESS=true npm test

# Windows (PowerShell)
$env:HEADLESS="true"; npm test; Remove-Item Env:\HEADLESS
```

## Configuration

You can override defaults using environment variables or a `.env` file in this folder:
- `BASE_URL` (default: `http://localhost:5173`)
- `HEADLESS` (default: `false`)
- `VITE_API_URL` (default: `http://localhost:5000/api`)
