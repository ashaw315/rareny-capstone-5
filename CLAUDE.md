# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Running the application
- `rake start` - Start both Rails API server (port 3000) and React client (port 4000) concurrently
- `bundle exec rails s` - Start Rails API server only (port 3000)
- `cd client && npm start` - Start React client only (port 4000)

### Testing
- `bundle exec rspec` - Run Rails API tests (requires Ruby 2.7.4 environment)
- `cd client && npm test` - Run React client tests

### Dependencies
- `bundle install` - Install Rails dependencies
- `cd client && npm install` - Install React dependencies

### Build commands
- `cd client && npm run build` - Build React client for production
- `npm run heroku-postbuild` - Production build script for Heroku deployment

## Architecture Overview

This is a full-stack web application called "RARE NY" (Resources for Artists Everywhere, NY) built with:

### Backend (Rails API)
- **Framework**: Ruby on Rails 6.1.3+ (requires Ruby 2.7.4)
- **Database**: PostgreSQL
- **Authentication**: bcrypt for password hashing, session-based auth
- **File Storage**: Cloudinary for image uploads
- **Testing**: RSpec with shoulda-matchers

### Frontend (React SPA)
- **Framework**: React 18.2 with React Router 6.10
- **Styling**: Bootstrap 5.2, Material-UI, styled-components
- **Proxy**: Configured to proxy API requests to localhost:3000
- **Testing**: Jest + React Testing Library

### Data Models & Relationships
The application centers around artist resources and community features:

**Core Models:**
- `User` - Artists with profiles and authentication
- `Listing` - Artist postings with images (Cloudinary integration)
- `ArtistResource` - NYC art resources by borough
- `Borough` - NYC geographical divisions for resource organization

**Community Features:**
- `Forum` → `Subforum` → `ForumPost` → `Comment` (nested forum structure)
- `ProfilePicture` - User avatars
- `Address` - Location data for resources
- `Residency` - Artist residency opportunities

### Key Application Features
1. **Interactive NYC Map**: SVG-based borough navigation for finding art resources
2. **Listings Marketplace**: Image carousels, search/filter functionality
3. **Community Forums**: Nested discussion structure with posts and comments
4. **Artist Profiles**: User accounts with posted content management
5. **Resource Directory**: Borough-based categorization of NYC art resources

### Development Notes
- Ruby version mismatch: Project specifies Ruby 2.7.4 but current environment may have 3.2.2
- React dev server runs on port 4000 to avoid conflicts with Rails on port 3000
- Uses Heroku for deployment with specific Node.js 16.x engine requirement
- Image uploads handled through Cloudinary service integration
- Session management for user authentication (no JWT tokens)