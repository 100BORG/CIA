# Invoice Generator

A modern React-based invoice generator application that allows users to create, preview, download, and send professional invoices.

![Invoice Generator Screenshot](https://www.deskera.com/blog/content/images/2020/06/eInvoice--1-.png)

## Features

- **User Authentication**: Secure login system
- **Intuitive UI**: Clean, responsive interface for easy invoice creation
- **Dual Currency Support**: Automatic conversion between USD and INR
- **PDF Generation**: Download invoices as professional PDF documents
- **Email Integration**: Send invoices directly to clients via email
- **Tax Calculation**: Automatic tax calculation based on specified rates
- **Nested Line Items**: Add detailed descriptions to invoice items
- **Company Branding**: Upload your company logo for professional invoicing

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (v6 or later)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd invoice-generator
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

### Login Credentials

For demo purposes, use these credentials:
- Email: user@example.com
- Password: password123

## Usage

1. **Login** to the application
2. Fill in the **invoice details** including:
   - Invoice number and date
   - Your company information
   - Client details
   - Invoice items and amounts
3. **Preview** the invoice to ensure everything looks correct
4. **Download** the invoice as a PDF or **send** it directly to the client via email

## Technology Stack

- **React**: Frontend UI library
- **React Router**: Navigation and routing
- **EmailJS**: Email sending functionality
- **jsPDF & html2canvas**: PDF generation
- **CSS3**: Styling with modern CSS features

## Customization

You can customize various aspects of the invoices:
- Company logo and information
- Tax rates
- Invoice notes and payment terms
- Currency settings (currently supports USD and INR)

## Building for Production

To build the app for production:

```bash
npm run build
```

This creates optimized files in the `build` folder that can be deployed to any static hosting service.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Design inspired by modern invoice applications
- Background image from [Deskera](https://www.deskera.com/)


