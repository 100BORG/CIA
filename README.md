# Invoice Generator

A professional invoice generator application with support for USD and INR currencies.

## Features

- Modern UI with glass morphism design
- Authentication system
- Dual currency support (USD and INR)
- PDF generation and download
- Email sending capability
- Tax calculation
- Professional invoice preview

## How to Use

1. Login using the credentials:
   - Email: user@example.com
   - Password: password123
   
2. Fill in your company and client details
3. Add invoice items
4. Preview, download as PDF, or send via email

## Demo

![Demo Screenshot](https://i.imgur.com/UwVEIyM.png)

## Technologies Used

- HTML5
- CSS3 with modern glass morphism design
- Vanilla JavaScript
- jsPDF library for PDF generation
- html2canvas for HTML to PDF conversion
- EmailJS for sending emails

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/invoice-generator.git
```

2. Open the `index.html` file in your web browser.

## Usage

### Login

Use the following credentials to access the application:
- **Email:** user@example.com
- **Password:** password123

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
   - Enter item names, descriptions
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

## Customization

You can customize various aspects of the invoice:

- **Company Details:** Update your company information in the sender section
- **Bank Details:** Modify the payment information in the notes section
- **Invoice Design:** Edit the CSS in the `<style>` section of the HTML file

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [jsPDF](https://github.com/MrRio/jsPDF) - For PDF generation
- [html2canvas](https://html2canvas.hertzen.com/) - For HTML to image conversion
- [EmailJS](https://www.emailjs.com/) - For email integration


