export default function NotFound() {
  return (
    <main className="tools-page flex flex-col items-center justify-center min-h-screen bg-black text-white">
      <div className="tools-container w-full flex flex-col items-center justify-center">
        <div className="tools-header mb-12 text-center">
          <div className="tools-title text-7xl font-bold mb-4 tracking-tight" style={{textShadow: '0 4px 32px #0f3460'}}>404</div>
          <div className="tool-content-title text-3xl font-semibold mb-2">Page Not Found</div>
          <div className="tool-content-desc text-lg text-gray-400 mb-8 max-w-xl mx-auto">
            The toolbox you seek is lost in the void.<br />
            Try another path or return to the homepage.
          </div>
          <a
            href="/"
            className="convert-btn mt-8"
          >
            Go Home
          </a>
        </div>
      </div>
    </main>
  );
}

// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { FileText, Image as ImageIcon, Type, Code, Upload, Download, Copy, Check, ChevronDown } from 'lucide-react';
// import { saveAs } from 'file-saver';
// import * as pdfjsLib from 'pdfjs-dist';
// import './tools.css';

// // Set up PDF.js worker
// if (typeof window !== 'undefined') {
//   pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
// }

// export default function ToolsPage() {
//   const [activeTab, setActiveTab] = useState('pdf');
//   const [file, setFile] = useState<File | null>(null);
//   const [outputFormat, setOutputFormat] = useState('docx');
//   const [text, setText] = useState('');
//   const [copied, setCopied] = useState(false);
//   const [processing, setProcessing] = useState(false);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [successMessage, setSuccessMessage] = useState('');
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const tools = [
//     { id: 'pdf', name: 'PDF Converter', icon: FileText, description: 'Convert PDF to various formats' },
//     { id: 'image', name: 'Image Converter', icon: ImageIcon, description: 'Convert between image formats' },
//     { id: 'text', name: 'Text Tools', icon: Type, description: 'Format and transform text' },
//     { id: 'dev', name: 'Dev Tools', icon: Code, description: 'Developer utilities' },
//   ];

//   const formatOptions: Record<string, { value: string; label: string }[]> = {
//     pdf: [
//       { value: 'docx', label: 'DOCX (Word)' },
//       { value: 'txt', label: 'TXT (Text)' },
//       { value: 'png', label: 'PNG (Images)' },
//       { value: 'jpg', label: 'JPG (Images)' },
//     ],
//     image: [
//       { value: 'png', label: 'PNG' },
//       { value: 'jpg', label: 'JPG' },
//       { value: 'webp', label: 'WEBP' },
//       { value: 'gif', label: 'GIF' },
//     ],
//   };

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const uploadedFile = e.target.files?.[0];
//     if (uploadedFile) {
//       setFile(uploadedFile);
//     }
//   };

//   const handleConvert = async () => {
//     if (!file) return;
//     setProcessing(true);
//     setSuccessMessage('');

//     try {
//       if (activeTab === 'pdf') {
//         await convertPDF(file, outputFormat);
//       } else if (activeTab === 'image') {
//         await convertImage(file, outputFormat);
//       }
//       setSuccessMessage('Conversion complete! Check your downloads.');
//       setTimeout(() => setSuccessMessage(''), 5000);
//     } catch (error) {
//       console.error('Conversion error:', error);
//       alert('Conversion failed. Please try again.');
//     } finally {
//       setProcessing(false);
//     }
//   };

//   const convertPDF = async (file: File, format: string) => {
//     const arrayBuffer = await file.arrayBuffer();
    
//     if (format === 'txt') {
//       // Convert PDF to text
//       const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
//       let fullText = '';
      
//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const textContent = await page.getTextContent();
//         const pageText = textContent.items
//           .map((item: any) => item.str)
//           .join(' ');
//         fullText += pageText + '\n\n';
//       }
      
//       const blob = new Blob([fullText], { type: 'text/plain' });
//       saveAs(blob, file.name.replace('.pdf', '.txt'));
//     } else if (format === 'png' || format === 'jpg') {
//       // Convert PDF to images
//       const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      
//       for (let i = 1; i <= pdf.numPages; i++) {
//         const page = await pdf.getPage(i);
//         const viewport = page.getViewport({ scale: 2.0 });
        
//         const canvas = document.createElement('canvas');
//         const context = canvas.getContext('2d')!;
//         canvas.height = viewport.height;
//         canvas.width = viewport.width;
        
//         await page.render({
//           canvasContext: context,
//           viewport: viewport
//         }).promise;
        
//         canvas.toBlob((blob) => {
//           if (blob) {
//             saveAs(blob, `${file.name.replace('.pdf', '')}-page${i}.${format}`);
//           }
//         }, `image/${format}`);
//       }
//     } else {
//       alert('DOCX conversion requires a server-side API. Coming soon!');
//     }
//   };

//   const convertImage = async (file: File, format: string) => {
//     return new Promise<void>((resolve, reject) => {
//       const reader = new FileReader();
      
//       reader.onload = (e) => {
//         const img = new Image();
//         img.onload = () => {
//           const canvas = document.createElement('canvas');
//           canvas.width = img.width;
//           canvas.height = img.height;
          
//           const ctx = canvas.getContext('2d')!;
//           ctx.drawImage(img, 0, 0);
          
//           canvas.toBlob((blob) => {
//             if (blob) {
//               saveAs(blob, file.name.replace(/\.[^.]+$/, `.${format}`));
//               resolve();
//             } else {
//               reject(new Error('Conversion failed'));
//             }
//           }, `image/${format}`);
//         };
        
//         img.onerror = reject;
//         img.src = e.target?.result as string;
//       };
      
//       reader.onerror = reject;
//       reader.readAsDataURL(file);
//     });
//   };

//   const handleCopy = () => {
//     navigator.clipboard.writeText(text);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const formatText = (type: string) => {
//     switch (type) {
//       case 'upper':
//         setText(text.toUpperCase());
//         break;
//       case 'lower':
//         setText(text.toLowerCase());
//         break;
//       case 'title':
//         setText(text.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()));
//         break;
//       case 'removeSpaces':
//         setText(text.replace(/\s+/g, ''));
//         break;
//       case 'trim':
//         setText(text.trim());
//         break;
//     }
//   };

//   const CustomSelect = ({ value, options, onChange }: { 
//     value: string; 
//     options: { value: string; label: string }[];
//     onChange: (value: string) => void;
//   }) => {
//     const selectedOption = options.find(opt => opt.value === value);
    
//     return (
//       <div className="custom-select" ref={dropdownRef}>
//         <div 
//           className="custom-select-trigger"
//           onClick={() => setDropdownOpen(!dropdownOpen)}
//         >
//           <span>{selectedOption?.label || 'Select format'}</span>
//           <ChevronDown className={`custom-select-arrow ${dropdownOpen ? 'open' : ''}`} />
//         </div>
        
//         {dropdownOpen && (
//           <div className="custom-select-dropdown">
//             {options.map((option) => (
//               <div
//                 key={option.value}
//                 className={`custom-select-option ${option.value === value ? 'selected' : ''}`}
//                 onClick={() => {
//                   onChange(option.value);
//                   setDropdownOpen(false);
//                 }}
//               >
//                 {option.label}
//               </div>
//             ))}
//           </div>
//         )}
//       </div>
//     );
//   };

//   const renderToolContent = () => {
//     switch (activeTab) {
//       case 'pdf':
//         return (
//           <div className="tool-content">
//             <h3 className="tool-content-title">PDF Converter</h3>
//             <p className="tool-content-desc">Convert PDF files to DOCX, TXT, or images</p>
            
//             <div className="file-upload-area">
//               <input
//                 type="file"
//                 accept=".pdf"
//                 onChange={handleFileUpload}
//                 className="file-input"
//                 id="pdf-upload"
//               />
//               <label htmlFor="pdf-upload" className="file-upload-label">
//                 <Upload className="w-8 h-8 mb-2" />
//                 <span>{file ? file.name : 'Click to upload PDF'}</span>
//                 <span className="file-upload-hint">or drag and drop</span>
//               </label>
//             </div>

//             {file && (
//               <div className="conversion-options">
//                 <label className="option-label">Convert to:</label>
//                 <CustomSelect
//                   value={outputFormat}
//                   options={formatOptions.pdf}
//                   onChange={setOutputFormat}
//                 />

//                 <button 
//                   onClick={handleConvert}
//                   disabled={processing}
//                   className="convert-btn"
//                 >
//                   {processing ? (
//                     <>Processing...</>
//                   ) : (
//                     <>
//                       <Download className="w-4 h-4" />
//                       Convert & Download
//                     </>
//                   )}
//                 </button>

//                 {successMessage && (
//                   <div className="success-message">
//                     <Check className="w-4 h-4" />
//                     {successMessage}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         );

//       case 'image':
//         return (
//           <div className="tool-content">
//             <h3 className="tool-content-title">Image Converter</h3>
//             <p className="tool-content-desc">Convert between PNG, JPG, WEBP, and more</p>
            
//             <div className="file-upload-area">
//               <input
//                 type="file"
//                 accept="image/*"
//                 onChange={handleFileUpload}
//                 className="file-input"
//                 id="image-upload"
//               />
//               <label htmlFor="image-upload" className="file-upload-label">
//                 <ImageIcon className="w-8 h-8 mb-2" />
//                 <span>{file ? file.name : 'Click to upload image'}</span>
//                 <span className="file-upload-hint">PNG, JPG, WEBP, GIF</span>
//               </label>
//             </div>

//             {file && (
//               <div className="conversion-options">
//                 <label className="option-label">Convert to:</label>
//                 <CustomSelect
//                   value={outputFormat}
//                   options={formatOptions.image}
//                   onChange={setOutputFormat}
//                 />

//                 <button 
//                   onClick={handleConvert}
//                   disabled={processing}
//                   className="convert-btn"
//                 >
//                   {processing ? (
//                     <>Processing...</>
//                   ) : (
//                     <>
//                       <Download className="w-4 h-4" />
//                       Convert & Download
//                     </>
//                   )}
//                 </button>

//                 {successMessage && (
//                   <div className="success-message">
//                     <Check className="w-4 h-4" />
//                     {successMessage}
//                   </div>
//                 )}
//               </div>
//             )}
//           </div>
//         );

//       case 'text':
//         return (
//           <div className="tool-content">
//             <h3 className="tool-content-title">Text Formatter</h3>
//             <p className="tool-content-desc">Transform and format text with one click</p>
            
//             <textarea
//               value={text}
//               onChange={(e) => setText(e.target.value)}
//               placeholder="Paste your text here..."
//               className="text-area"
//             />

//             <div className="text-tools">
//               <button onClick={() => formatText('upper')} className="text-tool-btn">
//                 UPPERCASE
//               </button>
//               <button onClick={() => formatText('lower')} className="text-tool-btn">
//                 lowercase
//               </button>
//               <button onClick={() => formatText('title')} className="text-tool-btn">
//                 Title Case
//               </button>
//               <button onClick={() => formatText('removeSpaces')} className="text-tool-btn">
//                 Remove Spaces
//               </button>
//               <button onClick={() => formatText('trim')} className="text-tool-btn">
//                 Trim
//               </button>
//               <button onClick={handleCopy} className="text-tool-btn copy-btn">
//                 {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
//                 {copied ? 'Copied!' : 'Copy'}
//               </button>
//             </div>

//             <div className="text-stats">
//               <span>Characters: {text.length}</span>
//               <span>Words: {text.trim() ? text.trim().split(/\s+/).length : 0}</span>
//               <span>Lines: {text.split('\n').length}</span>
//             </div>
//           </div>
//         );

//       case 'dev':
//         return (
//           <div className="tool-content">
//             <h3 className="tool-content-title">Developer Tools</h3>
//             <p className="tool-content-desc">Common utilities for developers</p>
            
//             <div className="dev-tools-grid">
//               <div className="dev-tool-card">
//                 <Code className="w-6 h-6 mb-2" />
//                 <h4>JSON Formatter</h4>
//                 <p>Format and validate JSON</p>
//               </div>
//               <div className="dev-tool-card">
//                 <Type className="w-6 h-6 mb-2" />
//                 <h4>Base64 Encoder</h4>
//                 <p>Encode/decode Base64</p>
//               </div>
//               <div className="dev-tool-card">
//                 <Code className="w-6 h-6 mb-2" />
//                 <h4>Hash Generator</h4>
//                 <p>MD5, SHA-256, SHA-512</p>
//               </div>
//               <div className="dev-tool-card">
//                 <Type className="w-6 h-6 mb-2" />
//                 <h4>URL Encoder</h4>
//                 <p>Encode/decode URLs</p>
//               </div>
//             </div>
//             <p className="coming-soon">More tools coming soon...</p>
//           </div>
//         );
//     }
//   };

//   return (
//     <main className="tools-page">
//       <div className="tools-container">
//         <div className="tools-header">
//           <h1 className="tools-title">Toolbox</h1>
//           <p className="tools-subtitle">All-in-one productivity tools for developers</p>
//         </div>

//         <div className="tools-layout">
//           <div className="tools-sidebar">
//             {tools.map((tool) => {
//               const Icon = tool.icon;
//               return (
//                 <button
//                   key={tool.id}
//                   onClick={() => setActiveTab(tool.id)}
//                   className={`tool-tab ${activeTab === tool.id ? 'active' : ''}`}
//                 >
//                   <Icon className="tool-tab-icon" />
//                   <div className="tool-tab-content">
//                     <h3 className="tool-tab-name">{tool.name}</h3>
//                     <p className="tool-tab-desc">{tool.description}</p>
//                   </div>
//                 </button>
//               );
//             })}
//           </div>

//           <div className="tools-main">
//             {renderToolContent()}
//           </div>
//         </div>
//       </div>
//     </main>
//   );
// }
// */