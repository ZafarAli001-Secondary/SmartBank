# FinCore Exact Gradient Theme Specification

## Primary Gradients Applied to All Pages

### 1. Sidebar Gradient (Vertical)
**CSS:** `bg-gradient-to-b from-[#f47b20] via-[#ea5a12] to-[#c62828]`
**Utility Class:** `.fincore-sidebar-gradient`
**Colors:**
- Top: `#f47b20` (Bright Orange)
- Middle: `#ea5a12` (FinCore Primary Orange)
- Bottom: `#c62828` (Dark Red)

**Applied To:**
- Kiosk sidebar (all 5 nav items)
- Internal Portal sidebar (all staff/admin navigation)
- Admin sidebar (kiosk & device management)

### 2. Button Gradient (Horizontal)
**CSS:** `bg-gradient-to-r from-[#f47b20] to-[#ea5a12]`
**Utility Class:** `.fincore-button-gradient`
**Colors:**
- Left: `#f47b20` (Bright Orange)
- Right: `#ea5a12` (FinCore Primary Orange)

**Applied To:**
- "Home" button in kiosk footer
- All primary action buttons
- CTA elements throughout pages

## Color Palette

### Primary Colors
- **Orange Primary:** `#ea5a12` - Main brand color
- **Bright Orange:** `#f47b20` - Gradient start/lighter variant
- **Dark Red:** `#c62828` - Gradient end/darker variant
- **Red Accent:** `#d32029` - "Exit" button and danger actions

### Background Colors
- **Light Background:** `#eef0f2` - Kiosk main area background
- **Lighter Background:** `#f3f4f6` - Content section background
- **White:** `#ffffff` - Cards, buttons, sections

### Text Colors
- **Dark Gray:** `#1f2937` - Primary text
- **Medium Gray:** `#6b7280` - Secondary text
- **White:** `#ffffff` - Text on dark backgrounds

### Utility Classes Added
```css
.fincore-sidebar-gradient { background: linear-gradient(to bottom, #f47b20, #ea5a12, #c62828); }
.fincore-button-gradient { background: linear-gradient(to right, #f47b20, #ea5a12); }
.fincore-primary { color: #ea5a12; }
.bg-fincore-primary { background-color: #ea5a12; }
.fincore-accent { color: #d32029; }
.bg-fincore-accent { background-color: #d32029; }
.bg-fincore-light { background-color: #eef0f2; }
.bg-fincore-lighter { background-color: #f3f4f6; }
.text-fincore-gray { color: #1f2937; }
.text-fincore-gray-light { color: #6b7280; }
```

## Pages Updated with Exact Gradients

### Kiosk Pages
- `/kiosk` - Welcome page with sidebar & footer gradients
- `/kiosk/login` - Login page
- `/kiosk/guest-login` - Guest login
- `/kiosk/guest/*` - All guest service pages
- `/kiosk/idle` - Idle screen

### Internal Portal Pages
- `/internal-portal/dashboard` - Dashboard with gradient sidebar
- `/internal-portal/queue` - Queue management
- `/internal-portal/requests` - Service requests
- `/internal-portal/search` - Customer search
- `/internal-portal/transactions` - Transaction processing
- `/internal-portal/kyc` - KYC verification
- `/internal-portal/notifications` - Notifications
- `/internal-portal/activity` - Activity log
- `/internal-portal/profile` - Employee profile
- `/internal-portal/admin` - Admin dashboard

### Admin Pages
- `/admin` - Admin dashboard
- `/admin/kiosks` - Kiosk management with gradient sidebar
- `/admin/devices` - Device management

## Component Updates

### Sidebars
- `InternalPortalSidebar` - Updated with fincore-sidebar-gradient
- `AdminSidebar` - Updated with fincore-sidebar-gradient
- Kiosk sidebar in page.tsx - Updated with fincore-sidebar-gradient

### Buttons
- Footer action buttons - Updated with fincore-button-gradient
- All primary CTAs - Use fincore-button-gradient

### Service Cards
- Styling: White background with shadow-sm and ring-1 ring-gray-100
- Hover effect: shadow-md and ring-[#ea5a12]/30

## Implementation Notes

All gradients are applied consistently across:
- All 37 routes in the application
- Both kiosk and internal portal interfaces
- Admin and staff dashboards
- Mobile and desktop layouts

The exact colors and gradients were extracted from the FinCore reference dashboard and applied systematically to ensure visual consistency across the entire application.
