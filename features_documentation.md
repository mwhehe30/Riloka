# Riloka - Features and Functionality Documentation

## Project Overview
Riloka is a Next.js web application designed to create a comprehensive directory for UMKM (Usaha Mikro, Kecil, dan Menengah) businesses in Indonesia. The platform connects consumers with local businesses, promoting economic support for small entrepreneurs.

## Core Features

### 1. Homepage Features
**Hero Section**
- Full-screen background image with overlay
- Search functionality for finding UMKM, products, or services
- Clear call-to-action prompting users to explore local businesses
- Responsive design that adapts to different screen sizes

**Category Explorer**
- 5 main business categories with unique color coding:
  - Food (Makanan): Reddish color with utensil icon
  - Drinks (Minuman): Blue color with coffee icon
  - Services (Jasa): Purple color with scissors icon
  - Fashion: Pink color with shirt icon
  - Handicrafts (Kerajinan): Yellow color with hammer icon
- Interactive cards with hover effects that rotate and lift
- Category count display showing number of businesses in each category
- Direct navigation to filtered UMKM listings

**Featured UMKM Section**
- Rotating display of highlighted businesses
- Horizontal scrolling on desktop, grid layout on mobile
- Loading skeletons for smooth UX during data fetch
- Responsive design adapting to screen size

**Promotions Section**
- Special offers and deals from local businesses
- Visual cards with promotional images
- Connection between promotional offers and associated businesses
- Mobile-responsive grid and desktop slider displays

**Testimonials Section**
- Customer reviews and feedback
- Carousel slider with user photos and ratings
- Loading skeletons for smooth experience
- Highlighted genuine user experiences

### 2. UMKM Directory Page Features
**Advanced Search**
- Real-time search with keyboard support (Enter key)
- Search across business names, descriptions, and product names
- Temporary search state management
- URL parameter synchronization

**Multiple Filtering Options**
- Category filtering with multi-select capability
- "All Categories" toggle (selects all or clears all)
- Price range filtering with 6 tier options:
  - All Prices (0 - ∞)
  - Rp 0 - 10,000
  - Rp 10,000 - 25,000
  - Rp 25,000 - 50,000
  - Rp 50,000 - 100,000
  - Rp 100,000+
- Minimum rating filter (1-5 stars)
- Active filter display with removal options
- URL synchronization for all filters

**Pagination System**
- 9 items per page
- Advanced pagination showing 5 page numbers at a time
- Previous/Next navigation buttons
- Current page highlighting
- Results count display

**Results Display**
- Responsive grid (1 column mobile, 2 column tablet, 3 column desktop)
- Loading skeletons during data fetch
- Empty state when no results match filters
- Reset filters option

### 3. UMKM Detail Page Features
**Business Information**
- Detailed business description
- Complete address with Google Maps integration
- Contact information display
- Operating hours and days of operation
- Rating and review statistics

**Visual Gallery**
- Photo carousel with multiple business images
- Thumbnail navigation
- Responsive image display
- Fallback image system

**Interactive Map**
- Embedded Google Maps with business location
- Direct navigation link
- Map URL and link properties

**Product Catalog**
- Menu items with images, names, and prices
- Responsive card layout
- Price range display
- Product images with image fallbacks

### 4. Navigation and User Experience
**Responsive Navigation**
- Fixed header that changes appearance on scroll
- Dynamic back button for detail pages
- Logo and branding on main pages
- Mobile-friendly hamburger menu structure

**URL Management**
- Search parameters for all filtering options
- URL synchronization with filter states
- Browser back button support
- Shareable filtered views

**Loading States**
- Skeleton screens during data loading
- Smooth transitions between states
- Loading indicators where appropriate
- Performance optimization

### 5. About Page Features
**Organizational Information**
- Vision statement
- Mission statement with 4 key points
- Goals with specific targets
- Core values with visual representation
- Promotional video placeholder

**Call-to-Action**
- UMKM registration modal
- Contact form for business registration
- Clear pathway for new business onboarding

### 6. Technical Features
**Performance Optimization**
- Client-side data fetching
- JSON data structure for fast loading
- Lazy loading for components
- Efficient state management

**Accessibility Features**
- Proper semantic HTML structure
- ARIA labels and attributes
- Keyboard navigation support
- Responsive design for all devices

**Data Management**
- JSON-based data structure
- API abstraction layer
- Error handling and fallbacks
- Consistent data format across all endpoints

## Data Structure

### UMKM Data (`/public/data/umkm.json`)
```json
{
  "id": number,
  "slug": string,
  "name": string,
  "category": string[],
  "description": string,
  "long_desc": string,
  "address": string,
  "map": {
    "url": string,
    "link": string
  },
  "thumb": string,
  "images": string[],
  "contact": {
    "phone": string
  },
  "hours": {
    "open": string,
    "close": string,
    "days": string[]
  },
  "featured": boolean,
  "priceRange": string,
  "products": [{
    "id": number,
    "name": string,
    "image": string,
    "price": number
  }]
}
```

### Promo Data (`/public/data/promo.json`)
```json
{
  "id": number,
  "slug": string,
  "name": string,
  "description": string,
  "image": string,
  "date": string,
  "rating": number,
  "status": boolean,
  "review": number
}
```

### Testimonials Data (`/public/data/testimoni.json`)
```json
{
  "id": number,
  "name": string,
  "rating": number,
  "review": string,
  "date": string,
  "photo": string
}
```

## Color System
- Primary: Teal/blue (oklch(0.52 0.16 160))
- Secondary: Orange (oklch(81% 0.1573 76.193))
- Category Colors:
  - Food: Reddish (oklch(0.6 0.15 25))
  - Drinks: Blue (oklch(0.55 0.12 230))
  - Services: Purple (oklch(0.55 0.14 300))
  - Fashion: Pink (oklch(0.58 0.16 330))
  - Handicrafts: Yellow (oklch(0.52 0.13 70))

## API Endpoints
- `getUmkm()`: Fetch all UMKM data
- `getUmkmById(id)`: Fetch single UMKM by ID
- `getUmkmBySlug(slug)`: Fetch single UMKM by slug
- `getPromo()`: Fetch all promotional data
- `getTestimonials()`: Fetch all testimonials

## Responsive Breakpoints
- Mobile: <768px
- Tablet: ≥768px
- Desktop: ≥1024px
- Large Desktop: ≥1280px

## Security Considerations
- Client-side data only (no sensitive backend)
- Input sanitization in search functionality
- URL parameter validation
- No direct user data collection