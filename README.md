# StadiaSync AI

## Chosen Vertical
**Smart Venues / Entertainment & Sports Technology**
StadiaSync AI targets large-scale sporting and entertainment venues to solve critical pain points: crowd bottlenecks, long concession lines, and fragmented communication.

## Approach and Logic
The application is built as a mobile-first, single-page React application (Next.js). The logic is divided into three core pillars:
1. **Smart Routing:** Uses spatial mapping and simulated crowd density data to calculate the fastest path to a user's seat.
2. **Zero-Wait Concessions:** Aggregates vendor data to display real-time wait times, allowing users to order ahead and track progress.
3. **Live Event Sync:** A centralized, real-time communication feed for venue announcements and crowd-sourced issue reporting.

## How the Solution Works
- **Frontend Interface:** Built with React, Tailwind CSS, and Framer Motion for a fluid, native-app-like experience.
- **State Management:** Utilizes React Hooks (`useState`, `useEffect`) to manage active tabs, order progress intervals, and modal states without page reloads.
- **Interactive Map:** A CSS-grid/flexbox based visualization of a stadium that overlays SVG paths dynamically when the AI route is calculated.
- **Secure Reporting:** The issue reporting form sanitizes user input and simulates a secure, encrypted payload submission to venue security.

## Assumptions Made
- **Infrastructure:** The venue is equipped with IoT sensors or camera-based AI to provide real-time crowd density metrics.
- **Vendor Integration:** Concession stands have an integrated POS system capable of receiving digital orders and estimating wait times.
- **Connectivity:** Attendees have access to venue Wi-Fi or 5G to receive real-time WebSocket/Server-Sent-Events updates.

---

## Evaluation Criteria Alignment

### Code Quality
- **Structure:** Component logic is cleanly separated into state management, UI rendering, and interactive overlays.
- **Readability:** Uses semantic HTML5 tags (`<header>`, `<main>`, `<nav>`) and descriptive variable names.
- **Maintainability:** Built on Next.js and Tailwind CSS, ensuring styles are scoped and components are modular.

### Security
- **XSS Prevention:** React natively escapes all dynamic data rendered in JSX, preventing Cross-Site Scripting.
- **Input Sanitization:** Form inputs are trimmed and validated before submission.
- **State Isolation:** Client-side state ensures no cross-pollination of user data. (In a production environment, this is paired with secure JWT authentication and HTTPS).

### Efficiency
- **Optimal Resources:** Uses lightweight Lucide SVG icons instead of heavy image assets, reducing bundle size.
- **Animation Performance:** Framer Motion handles animations using hardware-accelerated CSS transforms (`opacity`, `transform`) rather than expensive layout recalculations.

### Testing
- **Validation:** Form submissions require valid, non-empty strings. Buttons disable during processing states to prevent duplicate submissions and race conditions.

### Accessibility
- **Inclusive Design:** High contrast dark mode theme (WCAG compliant).
- **Screen Readers:** Implemented `aria-labels` on navigation buttons, `role="alert"` on toast notifications, and explicit `htmlFor` attributes on form inputs.
- **Visual Cues:** Color-coded density indicators (Red/Yellow/Green) are accompanied by text labels (High/Med/Low) for color-blind users.

### Google Services Integration
*(Note: As a frontend prototype, these are the designed architectural integrations)*
- **Google Maps Platform (Indoor Maps API):** Designed to replace the CSS stadium map with interactive, floor-aware indoor routing.
- **Firebase Realtime Database:** The "Live Event Sync" and "Concessions" tabs are architected to consume Firebase streams for sub-second latency updates.
- **Google Cloud Armor:** Intended to protect the "Report Issue" endpoint from DDoS and injection attacks in production.
