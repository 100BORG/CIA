# Invoice Generator

A professional invoice generator application with support for USD and INR currencies.

## Features

- Modern UI with glass morphism design
- Authentication system with session timeout handling
- Dual currency support (USD and INR) with automatic conversion
- PDF generation and download using jsPDF and html2canvas
- Email sending capability via EmailJS
- Tax calculation and detailed invoice preview
- Responsive design with dark mode toggle
- Diagnostic and debug tools for troubleshooting
- LocalStorage-based session and data management

## How to Use

1. **Login** using the credentials:
   - Email: `user@example.com`
   - Password: `password123`
   
2. **Fill in the Invoice Details:**
   - Add company and client information
   - Add invoice items with amounts in USD or INR
   - Specify tax rate and payment terms

3. **Preview and Export:**
   - Preview the invoice
   - Download as a PDF
   - Send via email

4. **Manage Sessions:**
   - Auto-login and session timeout features are included
   - Use diagnostic tools to test LocalStorage and libraries

## Demo

![Demo Screenshot](https://i.imgur.com/UwVEIyM.png)

## Technologies Used

- **Frontend:** HTML5, CSS3, Vanilla JavaScript
- **Libraries:**
  - [jsPDF](https://github.com/MrRio/jsPDF) for PDF generation
  - [html2canvas](https://html2canvas.hertzen.com/) for HTML to image conversion
  - [EmailJS](https://www.emailjs.com/) for email integration
- **Backend:** Node.js (for serving static files)
- **Tools:** Diagnostic and debug pages for troubleshooting

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/invoice-generator.git
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. Open the application in your browser:
   ```
   http://localhost:3000
   ```

## Usage

### Login

Use the following credentials to access the application:
- **Email:** `user@example.com`
- **Password:** `password123`

### Creating an Invoice

1. **Fill in the Invoice Information:**
   - Invoice Number (auto-generated)
   - Invoice Date
   - Tax Rate

2. **Add Company Details:**
   - Your company name
   - Company logo (optional)
   - Address
   - GSTIN

3. **Add Client Details:**
   - Client name
   - Email address
   - Address
   - Phone number
   - GSTIN and PAN details

4. **Add Invoice Items:**
   - Enter item names and descriptions
   - Enter amounts in USD (INR will calculate automatically) or vice versa
   - Add multiple items as needed

5. **Add Payment Information:**
   - Banking details
   - Payment terms

6. **Preview and Export:**
   - Preview your invoice
   - Download as PDF
   - Send via email

## Features In Detail

### Dual Currency Support

The system automatically converts between USD and INR at a fixed exchange rate (currently set to 1 USD = 82 INR). When you enter an amount in one currency, the equivalent in the other currency is calculated automatically.

### Tax Calculations

Enter your tax rate percentage, and the system will automatically calculate the tax amount and add it to the total.

### PDF Export

Generate professional-looking PDFs of your invoices with a single click. The PDF includes all invoice details formatted in a clean, professional layout.

### Email Integration

Send invoices directly to clients via email using the integrated EmailJS service.

### Responsive Design and Dark Mode

The application is mobile-friendly and includes a dark mode toggle for better user experience.

### Diagnostic and Debug Tools

- **Diagnostic Page:** Test library loading, LocalStorage, and login state.
- **Debug Page:** Verify server setup and file accessibility.

## Customization

You can customize various aspects of the invoice:

- **Company Details:** Update your company information in the sender section
- **Bank Details:** Modify the payment information in the notes section
- **Invoice Design:** Edit the CSS in the `<style>` section of the HTML file

## Development

### File Structure

- **HTML Files:** `index.html`, `login.html`, `demo.html`, `diagnostic.html`, `debug.html`
- **JavaScript Files:**
  - `js/utils.js`: Utility functions
  - `js/main.js`: Main application logic
  - `js/invoice-items.js`: Invoice item management
  - `js/invoice-actions.js`: Invoice reset and email sending
  - `js/preview.js`: Invoice preview and PDF generation
  - `js/calculations.js`: Currency conversion and tax calculations
  - `js/auth.js`: Authentication and session management
- **Server:** `server.js` (Node.js-based static file server)

### Scripts

- Start the server:
  ```bash
  npm start
  ```
- Development mode with live reload:
  ```bash
  npm run dev
  ```

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [jsPDF](https://github.com/MrRio/jsPDF) - For PDF generation
- [html2canvas](https://html2canvas.hertzen.com/) - For HTML to image conversion
- [EmailJS](https://www.emailjs.com/) - For email integration


