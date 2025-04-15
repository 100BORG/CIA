import html2canvas from 'html2canvas';
import { jsPDF } from 'jspdf';

/**
 * Generates a PDF from an HTML element
 * @param {HTMLElement} element - The HTML element to convert to PDF
 * @param {string} filename - The filename for the PDF
 * @param {Object} options - Additional options for PDF generation
 * @returns {Promise<boolean>} - True if PDF was generated successfully, false otherwise
 */
export const generatePDF = async (element, filename, options = {}) => {
  if (!element) {
    console.error('No element provided to generatePDF');
    return false;
  }

  // Default options
  const canvasOptions = {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    scrollX: 0,
    scrollY: 0,
    backgroundColor: '#ffffff',
    logging: false,
    windowWidth: document.documentElement.offsetWidth,
    windowHeight: document.documentElement.offsetHeight,
    ...options.canvasOptions
  };

  try {
    const canvas = await html2canvas(element, canvasOptions);
    const imgData = canvas.toDataURL('image/png');
    
    // Create PDF
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true,
      ...options.pdfOptions
    });
    
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 10;
  
    pdf.addImage(imgData, 'PNG', imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(filename);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    return false;
  }
};

/**
 * Creates a data URL from an HTML element
 * @param {HTMLElement} element - The HTML element to convert to an image
 * @param {Object} options - Options for html2canvas
 * @returns {Promise<string>} - The data URL of the image
 */
export const elementToDataUrl = async (element, options = {}) => {
  if (!element) {
    throw new Error('No element provided to elementToDataUrl');
  }
  
  try {
    const canvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      allowTaint: true,
      ...options
    });
    
    return canvas.toDataURL('image/png');
  } catch (error) {
    console.error('Error converting element to data URL:', error);
    throw error;
  }
};
