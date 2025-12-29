# Vue 3 SPA Dashboard

## Overview
This project is a **Vue 3 single-page application (SPA)** built using the **Composition API**.  
It demonstrates a full-featured dashboard with authentication, responsive navigation, and state management.

- **State Management:** Pinia for authentication, user profile, permissions, theme preference, and UI state (sidebar collapse, loading states).  
- **Routing:** Vue Router with **route guards** to protect private routes and redirect unauthenticated users to login.  
- **UI Libraries:** FontAwesome for icons. Styling is handled with plain CSS for flexibility.

---

## Authentication Flow
- **Token-based simulation** using `user_data.json`.  
- Tokens stored in **localStorage** if "Remember Me" is checked; otherwise in **sessionStorage**.  
- **Token expiration** is simulated with an **auto-logout** after a period of inactivity.  
- Login form validation uses **Vuelidate** for real-time password/username checks.  
- **Throttling simulation:** after 3 failed login attempts, a cooldown message is displayed.

---

## Layout & UI/UX Decisions
- **Top Navigation Bar:** fixed for persistent access to branding, profile dropdown, and theme toggle.  
- **Sidebar Navigation:**
  - Collapsible on desktop (icon-only view when collapsed).  
  - Slide-in/out on mobile with a hamburger toggle.  
  - Active route highlighting for clarity.  
- **Responsive design:**  
  - Desktop: sidebar width adjusts, content is offset to prevent overlap with top nav.  
  - Mobile: sidebar overlays content for optimal space usage.  
- **Theme Toggle:** light/dark mode switch stored in Pinia state and synced with user preferences.

---

## State Management
- Pinia encapsulates authentication logic and UI-related state.  
- **Getters** provide derived state, e.g., login status, token cooldown, user permissions.  
- Using the store ensures a **single source of truth**, making the app maintainable and predictable.

---

## How It Works
1. **Login:** User enters credentials; failed attempts trigger a cooldown.  
2. **Remember Me:** Optional storage in localStorage for persistent login.  
3. **Dashboard:** Accessible only if authenticated; shows top nav and collapsible sidebar.  
4. **Sidebar & TopNav:** Responsive and interactive with active route highlighting.  
5. **Theme Toggle & Auto-Logout:** User preferences saved; inactivity triggers logout.  
