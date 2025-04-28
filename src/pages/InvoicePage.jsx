import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import InvoiceForm from '../components/InvoiceForm';
import InvoicePreview from '../components/InvoicePreview';
import invoiceLogic from '../lib/invoiceLogic';
import { defaultLogo, companyName } from '../assets/logoData';

const InvoicePage = ({ onLogout, darkMode, toggleDarkMode }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showPreview, setShowPreview] = useState(false);
  
  // Get the selected company from localStorage if available
  const [selectedCompany, setSelectedCompany] = useState(() => {
    const companyData = localStorage.getItem('selectedCompany');
    return companyData ? JSON.parse(companyData) : null;
  });
  
  // Define initial state
  const initialInvoiceData = {
    invoiceNumber: invoiceLogic.generateInvoiceNumber(selectedCompany?.name),
    invoiceDate: new Date().toISOString().split('T')[0],
    senderName: selectedCompany?.name || companyName,
    senderAddress: selectedCompany?.address || '',
    senderGSTIN: selectedCompany?.gstin || '',
    recipientName: '',
    recipientAddress: '',
    recipientGSTIN: '',
    recipientPAN: '',
    recipientEmail: '',
    recipientPhone: '',
    recipientWebsite: '',
    taxRate: 18,
    subtotalUSD: 0,
    subtotalINR: 0,
    taxAmountUSD: 0,
    taxAmountINR: 0,
    totalUSD: 0,
    totalINR: 0,
    currency: 'USD',
    exchangeRate: 82,
    logoUrl: selectedCompany?.logo || defaultLogo,
    notes: '',
    items: [
      {
        id: `item-${Math.random().toString(36).substr(2, 9)}`,
        name: '',
        description: '',
        amountUSD: 0,
        amountINR: 0,
        subServices: [], // Use subServices consistently instead of nestedRows
        type: 'main'
      }
    ],
    // Bank details
    accountName: selectedCompany?.bankDetails?.accountName || '',
    bankName: selectedCompany?.bankDetails?.bankName || '',
    accountNumber: selectedCompany?.bankDetails?.accountNumber || '',
    ifscCode: selectedCompany?.bankDetails?.ifscCode || ''
  };
  
  const [invoiceData, setInvoiceData] = useState(initialInvoiceData);
  const [isLoading, setIsLoading] = useState(false);

  // Generate invoice number on load OR load existing invoice if id is provided
  useEffect(() => {
    // Check if we're editing an existing invoice
    if (id && id !== 'new') {
      // Load the existing invoice data
      const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices')) || [];
      
      // Log for debugging purposes
      console.log('Loading invoice with ID:', id);
      
      // Find invoice by unique ID (primary lookup method)
      const existingInvoice = savedInvoices.find(invoice => invoice.id === id);
      
      if (existingInvoice) {
        console.log('Found existing invoice by ID:', existingInvoice.invoiceNumber);
        
        // Process items to ensure they have the correct structure
        const processedItems = (existingInvoice.items || []).map(item => {
          // Determine which property to use for sub-services (standardize on subServices)
          const sourceSubServices = item.subServices || item.nestedRows || [];
          
          // Process subServices recursively to ensure they have the correct structure
          const processedSubServices = sourceSubServices.map(subService => {
            return {
              id: subService.id || `subitem-${Math.random().toString(36).substr(2, 9)}`,
              name: subService.name || '',
              description: subService.description || '',
              amountUSD: parseFloat(subService.amountUSD) || 0,
              amountINR: parseFloat(subService.amountINR) || 0
            };
          });
          
          // For backward compatibility, check if this is a main service or a direct service item
          const isMainService = item.type === 'main' || Array.isArray(sourceSubServices);
          
          // Ensure all item properties exist
          return {
            id: item.id || `item-${Math.random().toString(36).substr(2, 9)}`,
            name: item.name || '',
            description: item.description || '',
            amountUSD: parseFloat(item.amountUSD) || 0,
            amountINR: parseFloat(item.amountINR) || 0,
            // Always use the processed subServices and explicitly remove nestedRows to avoid confusion
            subServices: isMainService ? processedSubServices : [],
            // Ensure type is properly set
            type: isMainService ? 'main' : (item.type || 'main')
          };
        });
        
        console.log('Processed invoice items:', processedItems);
        
        // If no items exist, add a default empty item
        if (processedItems.length === 0) {
          processedItems.push({
            id: `item-${Math.random().toString(36).substr(2, 9)}`,
            name: '',
            description: '',
            amountUSD: 0,
            amountINR: 0,
            subServices: [],
            type: 'main'
          });
        }
        
        // Set loaded company if the invoice has a companyId
        if (existingInvoice.companyId) {
          const companies = JSON.parse(localStorage.getItem('userCompanies')) || [];
          const invoiceCompany = companies.find(c => c.id === existingInvoice.companyId);
          if (invoiceCompany && invoiceCompany.id !== selectedCompany?.id) {
            setSelectedCompany(invoiceCompany);
          }
        }
        
        // Extract the stored calculation values and ensure they're numeric
        const {
          subtotalUSD = 0,
          subtotalINR = 0,
          taxAmountUSD = 0,
          taxAmountINR = 0,
          totalUSD = 0,
          totalINR = 0,
          exchangeRate = 82,
          taxRate = 18
        } = existingInvoice;
        
        // Create a deep copy of the existing invoice with all necessary properties
        const loadedInvoice = {
          // Set default values first to ensure all expected properties exist
          ...initialInvoiceData,
          // Then apply all existing invoice data
          ...existingInvoice,
          // Explicitly set the processed items to ensure proper structure
          items: processedItems,
          // Explicitly set the calculation values as numbers to ensure consistency
          subtotalUSD: parseFloat(subtotalUSD) || 0,
          subtotalINR: parseFloat(subtotalINR) || 0,
          taxAmountUSD: parseFloat(taxAmountUSD) || 0,
          taxAmountINR: parseFloat(taxAmountINR) || 0,
          totalUSD: parseFloat(totalUSD) || 0,
          totalINR: parseFloat(totalINR) || 0,
          exchangeRate: parseFloat(exchangeRate) || 82,
          taxRate: parseFloat(taxRate) || 18
        };
        
        // Apply the loaded invoice to state
        setInvoiceData(loadedInvoice);
        
        console.log('Loaded invoice with calculations:', {
          subtotalUSD: loadedInvoice.subtotalUSD,
          subtotalINR: loadedInvoice.subtotalINR,
          taxAmountUSD: loadedInvoice.taxAmountUSD,
          taxAmountINR: loadedInvoice.taxAmountINR,
          totalUSD: loadedInvoice.totalUSD,
          totalINR: loadedInvoice.totalINR
        });
        
        return; // Exit early, don't generate a new invoice number
      } else {
        console.log('Invoice not found with ID:', id);
        
        // Invoice not found, show error and redirect
        alert('Invoice not found.');
        navigate('/dashboard');
        return;
      }
    }
  }, [id, navigate, selectedCompany, defaultLogo, companyName, initialInvoiceData]);

  // Format date for input field (YYYY-MM-DD)
  const formatDateForInput = (date) => {
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${d.getFullYear()}-${month}-${day}`;
  };

  // Format date for display (DD/MM/YYYY)
  const formatDateForDisplay = (dateString) => {
    const d = new Date(dateString);
    const month = `${d.getMonth() + 1}`.padStart(2, '0');
    const day = `${d.getDate()}`.padStart(2, '0');
    return `${day}/${month}/${d.getFullYear()}`;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({ ...invoiceData, [name]: value });
  };

  const handlePreview = () => {
    setShowPreview(true);
  };

  const closePreview = () => {
    setShowPreview(false);
  };

  // Save invoice to localStorage
  const saveInvoice = () => {
    // Check if invoice number is empty and needs to be generated
    if (!invoiceData.invoiceNumber.trim()) {
      // Generate a new invoice number using the company name
      const newInvoiceNumber = invoiceLogic.generateInvoiceNumber(invoiceData.senderName);
      
      // Set the new invoice number
      setInvoiceData(prevData => ({
        ...prevData,
        invoiceNumber: newInvoiceNumber
      }));
      
      // Return early - we'll let the state update and then save
      setTimeout(() => saveInvoice(), 100);
      return;
    }

    // Validate invoice has required fields
    if (!invoiceData.invoiceNumber || !invoiceData.invoiceDate || !invoiceData.senderName) {
      alert('Please fill in required fields: Invoice Number, Date, and Company Name');
      return;
    }

    setIsLoading(true);

    try {
      // Get existing invoices from localStorage or initialize empty array
      const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices')) || [];
      
      // Process the items to ensure correct structure before saving
      const processedItems = invoiceData.items.map(item => {
        // Make sure we're handling sub-services properly
        const processedSubServices = (item.subServices || []).map(subService => ({
          id: subService.id || `subitem-${Math.random().toString(36).substr(2, 9)}`,
          name: subService.name || '',
          description: subService.description || '',
          amountUSD: parseFloat(subService.amountUSD) || 0,
          amountINR: parseFloat(subService.amountINR) || 0
        }));
        
        return {
          id: item.id || `item-${Math.random().toString(36).substr(2, 9)}`,
          name: item.name || '',
          description: item.description || '',
          amountUSD: parseFloat(item.amountUSD) || 0,
          amountINR: parseFloat(item.amountINR) || 0,
          // Always use subServices and not nestedRows to ensure consistency
          subServices: processedSubServices,
          type: item.type || 'main'
        };
      });
      
      console.log('Saving invoice with processed items:', processedItems);
      
      // Check if this invoice already has an ID (existing invoice)
      let invoiceToSave = {
        ...invoiceData,
        // Ensure processed items are used
        items: processedItems,
        // Ensure calculation values are numbers
        subtotalUSD: parseFloat(invoiceData.subtotalUSD) || 0,
        subtotalINR: parseFloat(invoiceData.subtotalINR) || 0,
        taxAmountUSD: parseFloat(invoiceData.taxAmountUSD) || 0,
        taxAmountINR: parseFloat(invoiceData.taxAmountINR) || 0,
        totalUSD: parseFloat(invoiceData.totalUSD) || 0,
        totalINR: parseFloat(invoiceData.totalINR) || 0,
        // Ensure companyId is explicitly set from the selected company
        companyId: selectedCompany?.id || invoiceData.companyId,
        timestamp: new Date().getTime(),
        status: invoiceData.status || 'Pending' // Set default status if not already set
      };
      
      // If no ID exists, generate one
      if (!invoiceToSave.id) {
        invoiceToSave.id = invoiceLogic.generateUniqueId();
      }
      
      // Check if invoice with this ID already exists
      const existingInvoiceIndex = savedInvoices.findIndex(
        invoice => invoice.id === invoiceToSave.id
      );
      
      // Either update existing invoice or add new one
      if (existingInvoiceIndex >= 0) {
        savedInvoices[existingInvoiceIndex] = invoiceToSave;
      } else {
        savedInvoices.push(invoiceToSave);
      }
      
      // Save updated invoices array back to localStorage
      localStorage.setItem('savedInvoices', JSON.stringify(savedInvoices));
      
      setIsLoading(false);
      alert('Invoice saved successfully!');
      
      // Navigate back to dashboard 
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving invoice:', error);
      setIsLoading(false);
      alert('Failed to save invoice. Please try again.');
    }
  };

  const resetForm = () => {
    if (window.confirm('Are you sure you want to create a new invoice? All current data will be lost.')) {
      const today = new Date();
      
      setInvoiceData({
        id: '', // Reset the unique ID
        invoiceNumber: '', // Leave empty for user to fill in or auto-generate on save
        invoiceDate: formatDateForInput(today),
        taxRate: '5',
        currency: 'USD',
        logoUrl: selectedCompany?.logo || defaultLogo,
        senderName: selectedCompany?.name || companyName,
        companyId: selectedCompany?.id || null, // Store the company ID for linking to company
        senderAddress: selectedCompany?.address || '', // Populate company address
        senderGSTIN: selectedCompany?.gstin || '', // Populate company GSTIN
        // Bank details from the company
        accountName: selectedCompany?.bankDetails?.accountName || '',
        bankName: selectedCompany?.bankDetails?.bankName || '',
        accountNumber: selectedCompany?.bankDetails?.accountNumber || '',
        ifscCode: selectedCompany?.bankDetails?.ifscCode || '',
        recipientName: '',
        recipientEmail: '',
        recipientAddress: '',
        recipientPhone: '',
        recipientGSTIN: '',
        recipientPAN: '',
        notes: '',
        items: [
          {
            type: 'main',
            name: '',
            description: '',
            amountUSD: 0,
            amountINR: 0,
            subServices: []
          }
        ],
        subtotalUSD: 0,
        subtotalINR: 0,
        taxAmountUSD: 0,
        taxAmountINR: 0,
        totalUSD: 0,
        totalINR: 0
      });
    }
  };

  // Delete the current invoice
  const deleteInvoice = () => {
    if (window.confirm('Are you sure you want to delete this invoice? This action cannot be undone.')) {
      try {
        // Get existing invoices from localStorage
        const savedInvoices = JSON.parse(localStorage.getItem('savedInvoices')) || [];
        
        // Filter out the current invoice using the unique ID
        const updatedInvoices = savedInvoices.filter(
          invoice => invoice.id !== invoiceData.id
        );
        
        // Save updated invoices array back to localStorage
        localStorage.setItem('savedInvoices', JSON.stringify(updatedInvoices));
        
        // Trigger a custom event to notify other components about the change
        window.dispatchEvent(new Event('invoicesUpdated'));
        
        // Navigate back to dashboard
        navigate('/dashboard');
      } catch (error) {
        console.error('Error deleting invoice:', error);
        alert('Failed to delete invoice. Please try again.');
      }
    }
  };

  return (
    <div className="container">
      {!showPreview && (
        <header className="header">
          <div className="logo" onClick={() => navigate('/dashboard')} style={{ cursor: 'pointer' }}>
            <img 
              src={selectedCompany?.logo || defaultLogo} 
              alt={selectedCompany?.name || companyName}
              style={{ maxHeight: '40px' }}
            />
            {selectedCompany?.name || companyName}
          </div>
          <div className="user-actions">
            <button 
              onClick={toggleDarkMode} 
              className="btn btn-secondary"
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              style={{ padding: '8px 15px' }}
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            <button onClick={() => navigate('/profile')} className="btn btn-secondary">Profile</button>
            <button onClick={onLogout} className="btn">Logout</button>
          </div>
        </header>
      )}
      
      {showPreview ? (
        <InvoicePreview 
          invoiceData={invoiceData}
          formatDate={formatDateForDisplay}
          onClose={closePreview}
        />
      ) : (
        <InvoiceForm 
          invoiceData={invoiceData}
          setInvoiceData={setInvoiceData}
          handleInputChange={handleInputChange}
          onPreview={handlePreview}
          onReset={resetForm}
          onSave={saveInvoice}
          onDelete={deleteInvoice}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          id={id}
        />
      )}
      
      {isLoading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <span>Processing...</span>
        </div>
      )}
    </div>
  );
};

export default InvoicePage;