# React System Logs and Metrics Application

This is a React application designed to allow users to fetch and view system logs and metrics. The application comprises two main screens: Logs and Metrics. Users can toggle between these screens using the Navbar. The single-page application (SPA) navigation is integrated with React Router for seamless navigation between screens.

## Features

### Logs

- Terminal-like view rendering logs.
- Quick selection for time-range (Last {n} minutes/hours) with live logs enabled. Custom time range selection opens a date and time range picker.

![logs](https://github.com/sushantyerawar1/Frontend-Assignment/assets/84599862/a7cccd2e-e6c1-49d1-b490-6e16daabd519)

### Metrics

- Four charts (mix of line and area charts) rendered using Chart.js with React.
  ![metrics](https://github.com/sushantyerawar1/Frontend-Assignment/assets/84599862/1dcefeca-17be-42f2-b5e9-48e51b680cd1)

- Selection and dragging over any section within a chart (Peak/valley) provides an option to check logs for the corresponding time range.

## Installation & Setup

1. Clone the repository:

```bash
git clone https://github.com/sushantyerawar1/Frontend-Assignment.git
cd Frontend-Assignment
```

2. Install dependencies:

- Install in frontend (React)

```bash
npm install
```

3. Run

- frontend (React)

```bash
npm start
```
