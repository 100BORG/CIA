import React, { useState, useEffect, useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import emailjs from '@emailjs/browser'; // Updated import

import InvoiceForm from './InvoiceForm';
import InvoicePreview from '../InvoicePreview/InvoicePreview';
import { formatDate, formatDateForInput } from '../../utils/dateUtils';

import './InvoiceGenerator.css';

function InvoiceGenerator({ onSignOut }) {
  // Initialize EmailJS - no init needed with @emailjs/browser
  useEffect(() => {
    // emailjs.init no longer needed with @emailjs/browser
  }, []);

  const [showPreview, setShowPreview] = useState(false);
  const invoicePreviewRef = useRef(null);
  
  // Invoice state
  const [invoiceData, setInvoiceData] = useState({
    // Initialize with default values
    invoiceNumber: generateInvoiceNumber(),
    invoiceDate: formatDateForInput(new Date()),
    currency: 'USD ($)',
    taxRate: '0',
    senderName: 'Suprayoga Solutions LLP',
    senderAddress: 'K No 1117.88 SY No 022/1,\nBelathur Village Kadugodi,\nBangalore, KA - 560067',
    senderGSTIN: 'GSTIN : ',
    recipientName: '',
    recipientEmail: '',
    recipientAddress: '',
    recipientPhone: '',
    recipientGSTIN: 'GSTIN : ',
    recipientPAN: 'PAN No :',
    notes: 'Account Name: Suprayoga Solutions LLP\nBank Name: Yes Bank Limited\nAccount Number: 1111111111\nIFSC Code: 11111',
    items: [
      {
        id: 1,
        name: '',
        description: '',
        amountUSD: 0,
        amountINR: 0,
        isNested: false,
        parentId: null
      }
    ],
    subtotalUSD: 0,
    subtotalINR: 0,
    taxAmountUSD: 0,
    taxAmountINR: 0,
    totalUSD: 0,
    totalINR: 0,
    companyLogo: null
  });

  // Generate a new invoice number
  function generateInvoiceNumber() {
    const currentYear = new Date().getFullYear();
    let lastInvoiceNumber = parseInt(localStorage.getItem('lastInvoiceNumber')) || 0;
    lastInvoiceNumber += 1;
    localStorage.setItem('lastInvoiceNumber', lastInvoiceNumber);
    return `${currentYear}-${lastInvoiceNumber}`;
  }

  // Update calculations when items or tax rate change
  useEffect(() => {
    updateCalculations();
  }, [invoiceData.items, invoiceData.taxRate]);

  // Update calculations
  const updateCalculations = () => {
    let subtotalUSD = 0;
    let subtotalINR = 0;
    
    invoiceData.items.forEach(item => {
      subtotalUSD += parseFloat(item.amountUSD) || 0;
      subtotalINR += parseFloat(item.amountINR) || 0;
    });
    
    const taxRate = parseFloat(invoiceData.taxRate) || 0;
    const taxAmountUSD = subtotalUSD * (taxRate / 100);
    const taxAmountINR = subtotalINR * (taxRate / 100);
    
    const totalUSD = subtotalUSD + taxAmountUSD;
    const totalINR = subtotalINR + taxAmountINR;
    
    setInvoiceData(prevData => ({
      ...prevData,
      subtotalUSD,
      subtotalINR,
      taxAmountUSD,
      taxAmountINR,
      totalUSD,
      totalINR
    }));
  };

  // Handle form changes
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setInvoiceData(prevData => ({
      ...prevData,
      [id]: value
    }));
  };

  // Handle logo upload
  const handleLogoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setInvoiceData(prevData => ({
          ...prevData,
          companyLogo: event.target.result
        }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  // Manage invoice items
  const addItem = () => {
    const newItem = {
      id: Date.now(),
      name: '',
      description: '',
      amountUSD: 0,
      amountINR: 0,
      isNested: false,
      parentId: null
    };
    
    setInvoiceData(prevData => ({
      ...prevData,
      items: [...prevData.items, newItem]
    }));
  };

  const addNestedItem = (parentId) => {
    const newItem = {
      id: Date.now(),
      name: '',
      description: '',
      amountUSD: 0,
      amountINR: 0,
      isNested: true,
      parentId
    };
    
    const parentIndex = invoiceData.items.findIndex(item => item.id === parentId);
    
    if (parentIndex !== -1) {
      const newItems = [...invoiceData.items];
      newItems.splice(parentIndex + 1, 0, newItem);
      
      setInvoiceData(prevData => ({
        ...prevData,
        items: newItems
      }));
    }
  };

  const removeItem = (id) => {
    // Remove the item and any nested items
    const newItems = invoiceData.items.filter(
      item => item.id !== id && item.parentId !== id
    );
    
    if (newItems.length === 0) {
      // Always keep at least one item
      newItems.push({
        id: Date.now(),
        name: '',
        description: '',
        amountUSD: 0,
        amountINR: 0,
        isNested: false,
        parentId: null
      });
    }
    
    setInvoiceData(prevData => ({
      ...prevData,
      items: newItems
    }));
  };

  const handleItemChange = (id, field, value) => {
    const usdToInrRate = 82;
    const updatedItems = invoiceData.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        
        // Auto-convert between USD and INR
        if (field === 'amountUSD') {
          updatedItem.amountINR = (parseFloat(value) || 0) * usdToInrRate;
        } else if (field === 'amountINR') {
          updatedItem.amountUSD = (parseFloat(value) || 0) / usdToInrRate;
        }
        
        return updatedItem;
      }
      return item;
    });
    
    setInvoiceData(prevData => ({
      ...prevData,
      items: updatedItems
    }));
  };

  // Preview, Download and Send functions
  const handlePreview = () => {
    setShowPreview(true);
    setTimeout(() => {
      window.print();
      setShowPreview(false);
    }, 100);
  };

  const handleDownloadPDF = () => {
    setShowPreview(true);
    setTimeout(() => {
      if (invoicePreviewRef.current) {
        // Enhanced html2canvas configuration
        const options = {
          scale: 2,
          useCORS: true,
          allowTaint: true,
          scrollX: 0,
          scrollY: 0,
          backgroundColor: '#ffffff',
          logging: false,
          windowWidth: document.documentElement.offsetWidth,
          windowHeight: document.documentElement.offsetHeight
        };

        html2canvas(invoicePreviewRef.current, options).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          // Create PDF with better configuration
          const pdf = new jsPDF({
            orientation: 'portrait',
            unit: 'mm',
            format: 'a4',
            compress: true
          });
          
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
          const imgWidth = canvas.width;
          const imgHeight = canvas.height;
          const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
          const imgX = (pdfWidth - imgWidth * ratio) / 2;
          const imgY = 10;
        
          pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
          pdf.save(`Invoice-${invoiceData.invoiceNumber}.pdf`);
        
          setShowPreview(false);
        });
      }
    }, 300); // Increased timeout for better rendering
  };

  const handleSendInvoice = () => {
    if (!invoiceData.recipientEmail) {
      alert('Please enter the recipient\'s email address.');
      return;
    }
    
    setShowPreview(true);
    setTimeout(() => {
      if (invoicePreviewRef.current) {
        html2canvas(invoicePreviewRef.current).then(canvas => {
          const imgData = canvas.toDataURL('image/png');
          
          const emailParams = {
            to_email: invoiceData.recipientEmail,
            subject: `Invoice - ${invoiceData.invoiceNumber}`,
            message: 'Please find attached invoice.',
            invoice_image: imgData
          };
          
          emailjs.send('service_y4713fo', 'template_fadjy8l', emailParams, 'E6klVgu7C2hAkoxFM')
            .then(() => {
              alert('Invoice sent successfully!');
            })
            .catch((error) => {
              console.error('Error sending email:', error);
              alert('Failed to send the invoice. Please try again.');
            })
            .finally(() => {
              setShowPreview(false);
            });
        });
      }
    }, 100);
  };

  const handleNewInvoice = () => {
    if (window.confirm('Are you sure you want to create a new invoice? All current data will be lost.')) {
      setInvoiceData({
        ...invoiceData,
        invoiceNumber: generateInvoiceNumber(),
        invoiceDate: formatDateForInput(new Date()),
        taxRate: '0',
        recipientName: '',
        recipientEmail: '',
        recipientAddress: '',
        recipientPhone: '',
        recipientGSTIN: 'GSTIN : ',
        recipientPAN: 'PAN No :',
        items: [
          {
            id: Date.now(),
            name: '',
            description: '',
            amountUSD: 0,
            amountINR: 0,
            isNested: false,
            parentId: null
          }
        ]
      });
    }
  };

  return (
    <>
      <div className="container">
        <header className="app-header">
          <h1 className="app-title"><span className="logo">Invoice</span>Generator</h1>
          <div className="app-actions">
            <button className="btn btn-secondary" onClick={handlePreview}>Preview</button>
            <button className="btn btn-primary" onClick={handleDownloadPDF}>Download PDF</button>
            <button className="btn btn-primary" onClick={handleSendInvoice}>Send Invoice</button>
            <button className="btn btn-secondary" onClick={handleNewInvoice}>New Invoice</button>
            <button className="btn btn-danger" onClick={onSignOut}>Sign Out</button>
          </div>
        </header>
        
        <InvoiceForm 
          invoiceData={invoiceData}
          onInputChange={handleInputChange}
          onLogoChange={handleLogoChange}
          onAddItem={addItem}
          onAddNestedItem={addNestedItem}
          onRemoveItem={removeItem}
          onItemChange={handleItemChange}
        />
      </div>
      
      {showPreview && (
        <InvoicePreview 
          ref={invoicePreviewRef}
          invoiceData={invoiceData}
          formatDate={formatDate}
        />
      )}
    </>
  );
}

export default InvoiceGenerator;