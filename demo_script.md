# Riloka - Demo Script

## Project Overview
Riloka is a Next.js web application designed to connect consumers with local UMKM (Usaha Mikro, Kecil, dan Menengah) businesses in Indonesia. The platform serves as a directory for small businesses, making it easier for users to discover and support local entrepreneurs.

## Key Features

### 1. Homepage
- **Hero Section**: Eye-catching design with a search bar to find UMKM, products, or services
- **Category Explorer**: 5 main categories with visual icons:
  - Food (Makanan)
  - Drinks (Minuman)
  - Services (Jasa)
  - Fashion
  - Handicrafts (Kerajinan)
- **Featured UMKM**: Highlighted businesses displayed in a responsive grid/slider
- **Promotional Offers**: Featured deals from local businesses
- **Testimonials**: Customer reviews and feedback
- **Interactive Map**: Location-based UMKM discovery

### 2. UMKM Directory Page
- **Advanced Search**: Search by name, product, or service
- **Multiple Filter Options**:
  - Category filters (all or specific categories)
  - Price range filters
  - Minimum rating filters (1-5 stars)
- **Pagination**: 9 items per page with navigation controls
- **Responsive Design**: Works on desktop and mobile devices
- **Active Filter Display**: Shows all currently applied filters with remove options

### 3. UMKM Detail Page
- **Business Information**: Name, description, contact details
- **Gallery**: Multiple business photos
- **Address & Map**: Google Maps integration with directions
- **Operating Hours**: Clear schedule display
- **Product Catalog**: Menu/products with prices and images
- **Location Map**: Embedded Google Maps for easy navigation

### 4. About Page
- **Vision, Mission & Goals**: Clear organizational objectives
- **Core Values**: 4 main values (Collaboration, Innovation, Integrity, Empowerment)
- **Interactive Elements**: Video placeholder, statistics display
- **Registration Form**: For UMKM owners to join the platform

### 5. Static Pages
- **Terms & Conditions**: Legal framework for platform usage
- **Privacy Policy**: Data handling and protection information

## Technical Features

### Architecture
- Next.js 15.5.6 with React 19.1.0
- Tailwind CSS v4 for styling
- Lucide React for icons
- Framer Motion for animations

### Data Handling
- JSON API structure for UMKM, promo, and testimonial data
- Client-side data fetching
- Search parameters for filtering and navigation

### UI/UX Elements
- Responsive design for all screen sizes
- Modern gradient color scheme (primary: teal/blue, secondary: orange)
- Smooth animations and transitions
- Loading states and skeletons for better UX
- Interactive elements with hover effects

## Demo Flow

### Opening Demo
1. Start on homepage
2. Explain the purpose: "Riloka is a platform to discover and support local UMKM businesses"
3. Highlight the attractive hero section with search functionality

### Feature 1: Homepage Navigation
1. Show the category section and explain each category
2. Demonstrate clicking on a category (e.g., "Food")
3. Show how it takes you to the UMKM page with the category pre-selected

### Feature 2: UMKM Directory Exploration
1. Show the search functionality
2. Demonstrate filtering with multiple criteria:
   - Search "coffee"
   - Select category "Drinks"
   - Filter by price range
   - Filter by minimum 4-star rating
3. Show how active filters are displayed and can be removed

### Feature 3: UMKM Detail Page
1. Click on a featured UMKM from the homepage
2. Navigate to the detail page
3. Show:
   - Business information
   - Photo gallery
   - Address with map integration
   - Product catalog
   - Operating hours

### Feature 4: User Journey
1. Simulate a complete user journey:
   - User searches for "bakery" in their area
   - Filters by rating and price
   - Views business details
   - Finds address and directions
   - Decides to visit the business

## Unique Value Propositions

1. **Local Focus**: Specifically designed for Indonesian UMKM businesses
2. **Comprehensive Discovery**: Multiple ways to find businesses (search, categories, location)
3. **Rich Information**: Detailed profiles with photos, menus, hours, and maps
4. **Promotional Support**: Dedicated section for business promotions
5. **Community Impact**: Encourages economic support for local businesses

## Technical Implementation Notes

- Uses a mock JSON data structure (stored in /public/data/)
- Client-side routing with Next.js
- Responsive design using Tailwind CSS
- Interactive elements with React hooks
- Accessibility features with proper ARIA attributes

## Conclusion

Riloka represents a modern, user-friendly solution for connecting consumers with local businesses. The platform successfully combines attractive UI design with practical functionality to create a valuable tool for supporting Indonesia's UMKM ecosystem. The demonstration showcases how the platform can help users discover quality local businesses while providing UMKMs with a digital presence to reach more customers.