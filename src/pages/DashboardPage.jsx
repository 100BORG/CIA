import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiSearch, FiSettings, FiLogOut, FiUser, FiPlus, FiChevronDown, FiUsers } from 'react-icons/fi';
import { FiSun, FiMoon } from 'react-icons/fi';
import '../App.css';
import { defaultLogo } from '../assets/logoData';

const DashboardPage = ({ onLogout, darkMode, toggleDarkMode }) => {
  const navigate = useNavigate();
  
  const [companies, setCompanies] = useState(() => {
    const savedCompanies = localStorage.getItem('userCompanies');
    return savedCompanies ? JSON.parse(savedCompanies) : [];
  });
  
  // State for selected company and dashboard view
  const [selectedCompany, setSelectedCompany] = useState(() => {
    const savedCompany = localStorage.getItem('selectedCompany');
    return savedCompany ? JSON.parse(savedCompany) : null;
  });
  
  // State for users
  const [users, setUsers] = useState(() => {
    const savedUsers = JSON.parse(localStorage.getItem('users')) || [];
    // If no users exist yet, create a demo user
    if (savedUsers.length === 0) {
      const demoUser = {
        id: 'demo_user',
        name: 'Demo User',
        email: 'user@example.com',
        role: 'admin',
        position: 'CEO'
      };
      localStorage.setItem('users', JSON.stringify([demoUser]));
      return [demoUser];
    }
    return savedUsers;
  });
  
  const [showAllInvoices, setShowAllInvoices] = useState(true);
  const [selectedAssignee, setSelectedAssignee] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Invoice status state
  const [invoiceStatuses, setInvoiceStatuses] = useState(() => {
    const savedStatuses = localStorage.getItem('invoiceStatuses');
    return savedStatuses ? JSON.parse(savedStatuses) : {};
  });
  
  // Sort state
  const [sortField, setSortField] = useState('date');
  const [sortDirection, setSortDirection] = useState('desc');
  const [showSortOptions, setShowSortOptions] = useState(false);
  
  // State for saved invoices
  const [savedInvoices, setSavedInvoices] = useState(() => {
    const invoices = JSON.parse(localStorage.getItem('savedInvoices')) || [];
    return invoices;
  });
  
  // Current user ID
  const currentUserId = localStorage.getItem('userId') || 'demo_user';
  
  // Update localStorage when selected company changes
  useEffect(() => {
    if (selectedCompany) {
      localStorage.setItem('selectedCompany', JSON.stringify(selectedCompany));
      setShowAllInvoices(false);
      setSelectedAssignee(null);
    }
  }, [selectedCompany]);
  
  // Save invoice statuses to localStorage when they change
  useEffect(() => {
    localStorage.setItem('invoiceStatuses', JSON.stringify(invoiceStatuses));
  }, [invoiceStatuses]);
  
  // Listen for changes in the userCompanies localStorage item
  useEffect(() => {
    const handleStorageChange = () => {
      const savedCompanies = localStorage.getItem('userCompanies');
      if (savedCompanies) {
        setCompanies([...JSON.parse(savedCompanies)]);
      } else {
        setCompanies([]);
      }

      // Also refresh the saved invoices
      const invoices = JSON.parse(localStorage.getItem('savedInvoices')) || [];
      setSavedInvoices(invoices);
      
      // Refresh users list
      const updatedUsers = JSON.parse(localStorage.getItem('users')) || [];
      setUsers(updatedUsers);
    };
    
    // Listen for the custom invoicesUpdated event
    const handleInvoicesUpdated = () => {
      const invoices = JSON.parse(localStorage.getItem('savedInvoices')) || [];
      setSavedInvoices(invoices);
    };
    
    // Set up event listeners
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('invoicesUpdated', handleInvoicesUpdated);
    
    // Clean up event listeners
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('invoicesUpdated', handleInvoicesUpdated);
    };
  }, []);
  
  // Need to manually refresh when returning from CompanyPage or InvoicePage
  useEffect(() => {
    // Check for updates to companies when the component mounts
    const savedCompanies = localStorage.getItem('userCompanies');
    if (savedCompanies) {
      setCompanies([...JSON.parse(savedCompanies)]);
    } else {
      setCompanies([]);
    }

    // Also refresh saved invoices
    const invoices = JSON.parse(localStorage.getItem('savedInvoices')) || [];
    setSavedInvoices(invoices);
    
    // Refresh users list
    const updatedUsers = JSON.parse(localStorage.getItem('users')) || [];
    setUsers(updatedUsers);
    
    // Add a focus event listener to refresh data when returning to this tab/window
    const handleFocus = () => {
      const refreshedInvoices = JSON.parse(localStorage.getItem('savedInvoices')) || [];
      setSavedInvoices(refreshedInvoices);
      
      const refreshedCompanies = JSON.parse(localStorage.getItem('userCompanies')) || [];
      setCompanies(refreshedCompanies);
      
      const refreshedUsers = JSON.parse(localStorage.getItem('users')) || [];
      setUsers(refreshedUsers);
    };
    
    window.addEventListener('focus', handleFocus);
    
    // Clean up event listener
    return () => {
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setShowAllInvoices(false);
    setSelectedAssignee(null);
  };
  
  const handleShowAllInvoices = () => {
    setShowAllInvoices(true);
    setSelectedAssignee(null);
  };
  
  const handleAssigneeSelect = (userId) => {
    setSelectedAssignee(userId);
    setShowAllInvoices(false);
    setSelectedCompany(null);
  };
  
  // Sort handlers
  const handleSortChange = (field) => {
    if (sortField === field) {
      // Toggle direction if same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field with default desc direction
      setSortField(field);
      setSortDirection('desc');
    }
    setShowSortOptions(false);
  };
  
  const toggleSortOptions = () => {
    setShowSortOptions(!showSortOptions);
  };
  
  const getSortLabel = () => {
    const labels = {
      'date': 'Date',
      'name': 'Company Name',
      'amount': 'Amount',
      'status': 'Status'
    };
    return `Sort by: ${labels[sortField]} (${sortDirection === 'asc' ? 'Ascending' : 'Descending'})`;
  };
  
  const handleCreateInvoice = () => {
    navigate('/invoice/new');
  };
  
  // Function to toggle invoice status
  const toggleInvoiceStatus = (e, invoiceId) => {
    e.stopPropagation(); // Prevent navigating to invoice detail page
    
    setInvoiceStatuses(prevStatuses => {
      const newStatuses = { ...prevStatuses };
      const statusOptions = ['Paid', 'Pending', 'Draft', 'Cancelled'];
      
      if (newStatuses[invoiceId]) {
        // Find current status in the cycle
        const currentIndex = statusOptions.indexOf(newStatuses[invoiceId]);
        // Move to next status (or back to first if at end)
        const nextIndex = (currentIndex + 1) % statusOptions.length;
        newStatuses[invoiceId] = statusOptions[nextIndex];
      } else {
        // If no saved status, set the next status after the default
        const defaultStatus = parseInt(invoiceId.split('-')[1]) % 2 === 0 ? 'Paid' : 'Pending';
        const defaultIndex = statusOptions.indexOf(defaultStatus);
        const nextIndex = (defaultIndex + 1) % statusOptions.length;
        newStatuses[invoiceId] = statusOptions[nextIndex];
      }
      
      return newStatuses;
    });
  };
  
  // Function to assign an invoice to a user
  const assignInvoice = (e, invoiceId, assigneeId) => {
    e.stopPropagation(); // Prevent navigating to invoice detail page
    
    // Update the invoice with the new assignee
    const updatedInvoices = savedInvoices.map(invoice => {
      if (invoice.id === invoiceId) {
        return {
          ...invoice,
          assigneeId,
          assigneeName: users.find(user => user.id === assigneeId)?.name || 'Unassigned'
        };
      }
      return invoice;
    });
    
    // Save updated invoices to localStorage
    localStorage.setItem('savedInvoices', JSON.stringify(updatedInvoices));
    setSavedInvoices(updatedInvoices);
    
    // Dispatch event to notify other components about the change
    window.dispatchEvent(new Event('invoicesUpdated'));
  };
  
  // Function to get assignee name from ID
  const getAssigneeName = (assigneeId) => {
    if (!assigneeId) return 'Unassigned';
    const assignee = users.find(user => user.id === assigneeId);
    return assignee ? assignee.name : 'Unknown User';
  };
  
  // Function to sort invoices
  const sortInvoices = (invoices) => {
    return [...invoices].sort((a, b) => {
      let comparison = 0;
      
      // Extract the values to compare based on the sort field
      let aValue, bValue;
      switch (sortField) {
        case 'date':
          aValue = new Date(a.invoiceDate);
          bValue = new Date(b.invoiceDate);
          break;
        case 'name':
          aValue = a.senderName;
          bValue = b.senderName;
          break;
        case 'amount':
          aValue = a.totalUSD;
          bValue = b.totalUSD;
          break;
        case 'status':
          aValue = a.status || 'Pending';
          bValue = b.status || 'Pending';
          break;
        default:
          aValue = a.timestamp || 0;
          bValue = b.timestamp || 0;
      }
      
      // Compare the values
      if (aValue < bValue) {
        comparison = -1;
      } else if (aValue > bValue) {
        comparison = 1;
      }
      
      // Reverse for descending order
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  };
  
  return (
    <div className="dashboard-container">
      {/* Sidebar with company list */}
      <aside className="dashboard-sidebar">
        <div className="company-logo-container">
          <img src="/images/c-logo.png" alt="CIA App" className="main-company-logo" />
          <h3>CIA App</h3>
        </div>
        
        <div className="company-list">
          <div 
            className={`company-item ${showAllInvoices ? 'active' : ''}`}
            onClick={handleShowAllInvoices}
          >
            <FiUser className="company-icon" />
            <span className="company-name" style={{ fontSize: '18px', color: 'white' }}>Show All Invoices</span>
          </div>
          
          <div className="section-title" style={{ padding: '10px', fontSize: '12px', color: 'var(--light-text)', fontWeight: 'bold' }}>
            YOUR COMPANIES
          </div>
          
          {companies.map((company) => (
            <div 
              key={company.id}
              className={`company-item ${selectedCompany?.id === company.id && !showAllInvoices && !selectedAssignee ? 'active' : ''}`}
              onClick={() => handleCompanySelect(company)}
            >
              <img src={company.logo} alt={company.name} className="company-icon" />
              <span className="company-name" style={{ fontSize: '18px', color: 'white' }}>{company.name}</span>
            </div>
          ))}
          
          <div 
            className="company-item"
            style={{ marginTop: '10px', color: 'var(--light-text)' }}
            onClick={() => navigate('/company')}
          >
            <FiPlus className="company-icon" />
            <span className="company-name" style={{ fontSize: '18px', color: 'white' }}>Add New Company</span>
          </div>
          
          {/* Users/Assignees Section */}
          <div className="section-title" style={{ 
            padding: '10px', 
            fontSize: '12px', 
            color: 'var(--light-text)', 
            fontWeight: 'bold',
            marginTop: '20px' 
          }}>
            ASSIGNEES
          </div>
          
          {users.map((user) => (
            <div 
              key={user.id}
              className={`company-item ${selectedAssignee === user.id ? 'active' : ''}`}
              onClick={() => handleAssigneeSelect(user.id)}
            >
              {user.avatar ? (
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  style={{ 
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    marginRight: '10px'
                  }}
                />
              ) : (
                <div className="avatar-small" style={{ 
                  width: '24px',
                  height: '24px',
                  borderRadius: '50%',
                  backgroundColor: user.id === currentUserId ? 'var(--primary-color)' : 'var(--secondary-color)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '12px',
                  marginRight: '10px'
                }}>
                  {user.name[0].toUpperCase()}
                </div>
              )}
              <span className="company-name" style={{ fontSize: '18px', color: 'white' }}>
                {user.name} {user.id === currentUserId && '(You)'}
              </span>
            </div>
          ))}
        </div>
        
        <div className="sidebar-footer">
          <button onClick={onLogout} className="btn-logout" title="Logout">
            <FiLogOut style={{ marginRight: '5px' }} /> Logout
          </button>
        </div>
      </aside>
      
      {/* Top navigation bar */}
      <div className="dashboard-topbar" style={{
        gridArea: 'topbar',
        padding: '17px 25px',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        borderBottom: '1px solid var(--border-color)',
        backgroundColor: 'var(--card-bg)'
      }}>
        <div className="user-actions" style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div className="theme-switch-wrapper">
            <label className="theme-switch">
              <input type="checkbox" checked={darkMode} onChange={toggleDarkMode} />
              <span className="slider">
                <span className="sun-icon"><FiSun /></span>
                <span className="moon-icon"><FiMoon /></span>
              </span>
            </label>
          </div>
          <div className="user-profile" style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            cursor: 'pointer'
          }} onClick={() => navigate('/profile')}>
            {localStorage.getItem('userAvatar') ? (
              <img 
                src={localStorage.getItem('userAvatar')} 
                alt="Profile" 
                className="header-avatar"
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
              />
            ) : (
              <div className="avatar" style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: 'var(--primary-color)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--dark-text)',
                fontWeight: 'bold'
              }}>
                {(localStorage.getItem('userName') || 'U')[0].toUpperCase()}
              </div>
            )}
            <span>My Profile</span>
          </div>
        </div>
      </div>
      
      {/* Main content area */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <h2>
            {selectedAssignee
              ? `Invoices Assigned to ${getAssigneeName(selectedAssignee)}`
              : (showAllInvoices 
                ? 'All Invoices' 
                : selectedCompany 
                  ? `${selectedCompany.name} Invoices` 
                  : 'Invoices')}
          </h2>
          <div className="dashboard-controls">
            <div className="search-container">
              <FiSearch className="search-icon" />
              <input 
                type="text" 
                placeholder="Search invoices..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            {/* Sort dropdown */}
            <div className="sort-container" style={{ position: 'relative' }}>
              <button 
                className="btn-sort" 
                onClick={toggleSortOptions}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  background: 'var(--card-bg)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '4px',
                  padding: '8px 12px',
                  fontSize: '14px',
                  cursor: 'pointer',
                  color: 'var(--text-color)'
                }}
              >
                {getSortLabel()} <FiChevronDown />
              </button>
              
              {showSortOptions && (
                <div 
                  className="sort-options" 
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: '0',
                    width: '200px',
                    backgroundColor: 'var(--card-bg)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '4px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    zIndex: 10,
                    marginTop: '5px'
                  }}
                >
                  <div className="sort-option-group" style={{ padding: '10px' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Sort by:</div>
                    {['date', 'name', 'amount', 'status'].map(field => (
                      <div 
                        key={field}
                        className={`sort-option ${sortField === field ? 'active' : ''}`}
                        onClick={() => handleSortChange(field)}
                        style={{
                          padding: '8px 10px',
                          cursor: 'pointer',
                          backgroundColor: sortField === field ? 'var(--primary-color-light)' : 'transparent',
                          borderRadius: '4px',
                          margin: '2px 0',
                          display: 'flex',
                          justifyContent: 'space-between',
                          color: 'var(--text-color)'
                        }}
                      >
                        <span>{field === 'date' ? 'Date' : 
                               field === 'name' ? 'Company Name' : 
                               field === 'amount' ? 'Amount' : 'Status'}</span>
                        {sortField === field && (
                          <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                        )}
                      </div>
                    ))}
                  </div>
                  
                  <div className="sort-direction-group" style={{ padding: '10px', borderTop: '1px solid var(--border-color)' }}>
                    <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>Direction:</div>
                    <div 
                      className={`sort-option ${sortDirection === 'asc' ? 'active' : ''}`}
                      onClick={() => setSortDirection('asc')}
                      style={{
                        padding: '8px 10px',
                        cursor: 'pointer',
                        backgroundColor: sortDirection === 'asc' ? 'var(--primary-color-light)' : 'transparent',
                        borderRadius: '4px',
                        margin: '2px 0',
                        color: 'var(--text-color)'
                      }}
                    >
                      Ascending (A-Z, 0-9)
                    </div>
                    <div 
                      className={`sort-option ${sortDirection === 'desc' ? 'active' : ''}`}
                      onClick={() => setSortDirection('desc')}
                      style={{
                        padding: '8px 10px',
                        cursor: 'pointer',
                        backgroundColor: sortDirection === 'desc' ? 'var(--primary-color-light)' : 'transparent',
                        borderRadius: '4px',
                        margin: '2px 0',
                        color: 'var(--text-color)'
                      }}
                    >
                      Descending (Z-A, 9-0)
                    </div>
                  </div>
                </div>
              )}
            </div>
            
            <button className="btn-create" onClick={handleCreateInvoice}>
              Create New Invoice
            </button>
          </div>
        </header>
        
        {/* Invoice List */}
        <div className="invoice-list">
          {savedInvoices.length > 0 ? (
            sortInvoices(savedInvoices)
              .filter(invoice => {
                // If a company is selected, only show invoices for that company
                if (!showAllInvoices && selectedCompany && !selectedAssignee) {
                  // Check if the companyId is missing or doesn't match
                  if (!invoice.companyId || invoice.companyId !== selectedCompany.id) {
                    // As a fallback, also check if the company name matches
                    if (invoice.senderName !== selectedCompany.name) {
                      return false;
                    }
                  }
                }
                
                // If an assignee is selected, only show invoices assigned to them
                if (selectedAssignee) {
                  if (invoice.assigneeId !== selectedAssignee) {
                    return false;
                  }
                }
                
                // Filter by search term if provided
                if (searchTerm && 
                    !invoice.invoiceNumber?.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    !invoice.senderName?.toLowerCase().includes(searchTerm.toLowerCase()) &&
                    !invoice.recipientName?.toLowerCase().includes(searchTerm.toLowerCase())) {
                  return false;
                }
                
                return true;
              })
              .map((invoice, index) => {
                // Find company info for this invoice
                const invoiceCompany = companies.find(c => c.id === invoice.companyId) || {
                  name: invoice.senderName,
                  logo: invoice.logoUrl || defaultLogo
                };
                
                // Format the invoice date for display
                const invoiceDate = new Date(invoice.invoiceDate);
                
                // Get status for this invoice
                const invoiceStatus = invoice.status || 'Pending';
                
                return (
                  <div key={index} className="invoice-card" onClick={() => navigate(`/invoice/${invoice.id}`)}>
                    <div className="invoice-card-header">
                      <img 
                        src={invoiceCompany.logo} 
                        alt={invoiceCompany.name} 
                        className="invoice-company-logo"
                      />
                      <div className="invoice-info">
                        <span className="invoice-number">{invoice.invoiceNumber}</span>
                        <span className="invoice-company">{invoiceCompany.name}</span>
                      </div>
                    </div>
                    <div className="invoice-card-details">
                      <div className="invoice-amount">
                        <span className="amount">${invoice.totalUSD.toLocaleString()}</span>
                        <span className="currency">{invoice.currency}</span>
                      </div>
                      <div className="invoice-date">
                        <span className="label">Date:</span>
                        <span className="value">{invoiceDate.toLocaleDateString()}</span>
                      </div>
                      <div className="invoice-status">
                        <span 
                          className={`status ${invoiceStatus.toLowerCase()}`} 
                          onClick={(e) => {
                            e.stopPropagation();
                            // Toggle status for this invoice
                            const statusOptions = ['Paid', 'Pending', 'Draft', 'Cancelled'];
                            const currentIndex = statusOptions.indexOf(invoiceStatus);
                            const nextIndex = (currentIndex + 1) % statusOptions.length;
                            const newStatus = statusOptions[nextIndex];
                            
                            // Update invoice status in local state
                            const updatedInvoices = savedInvoices.map(inv => 
                              inv.id === invoice.id 
                                ? {...inv, status: newStatus} 
                                : inv
                            );
                            
                            // Save to localStorage
                            localStorage.setItem('savedInvoices', JSON.stringify(updatedInvoices));
                            setSavedInvoices(updatedInvoices);
                          }}
                          style={{ 
                            cursor: 'pointer', 
                            position: 'relative',
                            backgroundColor: invoiceStatus === 'Paid' ? 'var(--success-color, #4caf50)' : 
                                            invoiceStatus === 'Pending' ? 'var(--warning-color, #ff9800)' :
                                            invoiceStatus === 'Draft' ? 'var(--info-color, #2196f3)' :
                                            invoiceStatus === 'Cancelled' ? 'var(--danger-color, #f44336)' : 'gray'
                          }}
                          title="Click to change status"
                        >
                          {invoiceStatus}
                        </span>
                      </div>
                    </div>
                    <div className="invoice-assignee-row">
                      <div className="assignee-label">Assigned to:</div>
                      <div className="assignee-select-container">
                        <select 
                          className="assignee-select"
                          value={invoice.assigneeId || ''}
                          onChange={(e) => assignInvoice(e, invoice.id, e.target.value)}
                          onClick={(e) => e.stopPropagation()}
                        >
                          <option value="">Unassigned</option>
                          {users.map(user => (
                            <option key={user.id} value={user.id}>
                              {user.name} {user.id === currentUserId ? '(You)' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })
          ) : (
            <div className="no-invoices-message">
              <h3>No Invoices Yet</h3>
              <p>You haven't created any invoices yet. Click the "Create New Invoice" button to get started.</p>
              <button className="btn" onClick={handleCreateInvoice} style={{ marginTop: '15px' }}>
                Create Your First Invoice
              </button>
            </div>
          )}
          
          {/* Show message if no invoices match the filter */}
          {savedInvoices.length > 0 && 
           sortInvoices(savedInvoices).filter(invoice => {
              if (selectedAssignee) {
                if (invoice.assigneeId !== selectedAssignee) {
                  return false;
                }
              } else if (!showAllInvoices && selectedCompany) {
                // Check if the companyId is missing or doesn't match
                if (!invoice.companyId || invoice.companyId !== selectedCompany.id) {
                  // As a fallback, also check if the company name matches
                  if (invoice.senderName !== selectedCompany.name) {
                    return false;
                  }
                }
              }
              if (searchTerm && 
                  !invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  !invoice.senderName.toLowerCase().includes(searchTerm.toLowerCase()) &&
                  !invoice.recipientName.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
              }
              return true;
            }).length === 0 && (
              <div className="no-invoices-message">
                <p>No invoices found with the current filter.</p>
                <button className="btn-clear-filter" onClick={() => {
                  setSearchTerm('');
                  if (selectedAssignee) {
                    setSelectedAssignee(null);
                    setShowAllInvoices(true);
                  }
                }}>
                  Clear Filters
                </button>
              </div>
            )
          }
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;