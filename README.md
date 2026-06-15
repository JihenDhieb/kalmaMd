# KlaraMD EyeCare Frontend

KlaraMD EyeCare is a front-end-only medical eye care prototype built with Next.js App Router, React, TypeScript, and Tailwind CSS.

The application includes public, patient, provider, admin, consultation, assessment, booking, profile, and shop workflows using local mock data only.

## Safety Scope

- No backend authentication.
- No TELUS, EMR, payment, email, video, database, or external service integrations.
- No secrets or production credentials.
- No real patient health information.
- Mock data and local prototype session state are used for front-end testing only.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validation

Run lint:

```bash
npm run lint
```

Run TypeScript checks:

```bash
npx tsc --noEmit
```

Run a production build:

```bash
npm run build
```

## Main Routes

- `/`
- `/login`
- `/register`
- `/patient/dashboard`
- `/patient/assessment`
- `/patient/results`
- `/patient/booking`
- `/patient/shop`
- `/provider/dashboard`
- `/admin`

