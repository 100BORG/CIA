# Frontend Documentation

## Overview
The CIA Frontend codebase appears to be a collection of HTML templates, likely based on Bootstrap 4 with custom UI components. The codebase consists of multiple templates that share common structures, particularly in the navigation and header sections.

## Project Structure

### Templates
The project contains multiple template variations:
- `stream-ui-kit*.html` - UI kit templates with various versions
- `stream-dashboard-ui-kit*.html` - Dashboard UI templates
- `stream-sketch-ui-kit.html` - Sketch-based UI kit
- `docs-ui-kit*.html` - Documentation templates
- `front-dashboard/*.html` - Dashboard interfaces for the Front template
- `front/*.html` - Main frontend templates

### Common Layout Components

#### Header Navigation
Most templates share a common navigation structure with the following elements:

```html
<header id="js-header" class="u-header u-header--static">
    <div class="u-header__section u-header__section--light">
        <div class="container">
            <nav class="navbar navbar-expand-lg px-0">
                <!-- Navigation items -->
                <ul class="navbar-nav g-font-size-default mr-auto">
                    <li class="nav-item g-mx-15--lg">
                        <a href="../index.html" class="nav-link g-color-primary--hover px-0">Freebies</a>
                    </li>
                    <li class="nav-item g-mx-15--lg">
                        <a href="../premium.html" class="nav-link g-color-primary--hover px-0">Premium</a>
                    </li>
                    <li class="nav-item g-mx-15--lg">
                        <a href="../blog.html" class="nav-link g-color-primary--hover px-0">Blog</a>
                    </li>
                    <li class="nav-item g-mx-15--lg">
                        <a href="../hire-us.html" class="nav-link g-color-primary--hover px-0">Hire Us</a>
                    </li>
                </ul>
                
                <!-- Login/Signup section -->
                <ul class="u-list-inline ml-auto">
                    <li class="list-inline-item g-ml-0 mx-3 d-none d-sm-inline-block">
                        <a href="#modal-login" data-modal-target="#modal-login" data-modal-effect="fadein">Login</a>
                    </li>
                    <li class="list-inline-item g-ml-0">
                        <a class="btn u-btn-primary" href="#modal-sign-up" data-modal-target="#modal-sign-up" data-modal-effect="fadein">Sign Up Free</a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</header>
```

#### Footer
Templates include a consistent footer with:
- Copyright information
- Social media links
- Footer menu with links to Privacy Policy, Terms of Use, Licenses, and Contact Us

#### Modal Components
The codebase includes several modal components:
- Login Modal
- Sign Up Modal
- Reset Password Modal

### Dashboard Templates (`front-dashboard/`)
These templates are specialized for dashboard interfaces, featuring:
- Different layout structures compared to public-facing templates
- Use of cards, tables, and data visualization components
- Support for both light and dark themes
- Various layout options (default, collapsible, sidebar detached)

### CSS Architecture
The styling appears to follow a consistent approach:
- Bootstrap 4 as the base framework
- Custom CSS classes with prefixes like `g-`, `u-`
- Utility classes for margin, padding, colors, etc.

### JavaScript Components
Various JavaScript dependencies and custom components are used across the templates:
- Core libraries: jQuery, jQuery-migrate, Popper.js, Bootstrap
- Custom components for headers, navigation, modals
- Validation libraries
- Analytics integrations for Google Analytics and Yandex Metrika

## Key Features

### UI Components
The templates contain a rich set of UI components including:
- Navigation menus and dropdowns
- Cards and panels
- Form elements and validation
- Modals and popups
- Responsive layout system

### Authentication System
The templates include UIs for:
- Login forms with email/password and social auth options (Facebook, Google, Github)
- Registration forms
- Password recovery

### Page Templates
Different page templates are available for:
- Marketing/public pages
- Blog posts and article layouts
- Dashboard interfaces
- Documentation pages

## Implementation Notes

### Responsive Design
The templates use Bootstrap's responsive grid system with custom enhancements:
- Mobile-first approach
- Custom breakpoint classes (`g-hidden-sm-down`, etc.)
- Responsive utility classes for visibility and spacing

### Theme Customization
The dashboard templates support theme customization:
- Light/dark mode switching
- Various layout options
- Color scheme variations

### Modal Windows
Modals are implemented using a custom approach:
- Data attributes for triggering (`data-modal-target`, `data-modal-effect`)
- Custom animation effects
- Support for various content types

## Dependencies

### CSS
- Bootstrap 4
- Custom icon fonts
- Custom utility classes

### JavaScript
- jQuery
- Bootstrap JS components
- Custom components for UI functionality
- Form validation libraries
- Analytics and tracking code

## Best Practices for Extending

1. **Maintain Consistent Class Naming**:
   - Follow existing prefix conventions (`g-`, `u-`)
   - Use similar naming patterns for new components

2. **Respect Component Architecture**:
   - Keep modal structures consistent
   - Follow established patterns for navigation elements

3. **JavaScript Integration**:
   - Initialize components using the existing patterns
   - Use the component initialization approach shown in template files

4. **Responsive Considerations**:
   - Test all additions across various device sizes
   - Use the existing responsive utility classes

## Common Usage Patterns

### Adding a New Page
1. Copy a similar template as starting point
2. Maintain header and footer structure
3. Customize content area
4. Ensure all required JavaScript components are initialized

### Creating a New Component
1. Follow existing HTML structure patterns
2. Use consistent class naming
3. Add any required JavaScript initialization
4. Test across different templates and screen sizes

## Known Issues and Limitations

Based on the code samples provided, potential issues to be aware of:
- Some templates may contain references to external resources
- There might be dependencies on specific jQuery versions
- Third-party services (analytics, social login) require proper configuration
