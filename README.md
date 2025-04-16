# Invoice Generator

![Invoice Generator Banner](https://i.imgur.com/EKJvz0f.jpg)

A modern, feature-rich web application for generating professional invoices with support for both USD and INR currencies.

## Features

- **User Authentication** - Secure login system to protect your invoice data
- **Professional Templates** - Clean and modern invoice design
- **Dual Currency Support** - Automatically calculate amounts in both USD and INR
- **Tax Calculations** - Automatic tax calculations based on configurable tax rates
- **PDF Export** - Download your invoices as professional PDF documents
- **Email Integration** - Send invoices directly to clients via email
- **Company Branding** - Add your company logo and details to the invoice
- **GST/PAN Support** - Fields for GST and PAN numbers for Indian businesses
- **Responsive Design** - Works on desktop and mobile devices

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


