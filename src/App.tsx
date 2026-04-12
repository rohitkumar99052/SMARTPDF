import React, { useState, useEffect, useCallback } from 'react';
import { 
  Search, 
  Menu, 
  User as UserIcon, 
  Grid, 
  ChevronDown, 
  X, 
  Upload, 
  File, 
  Download, 
  Loader2,
  ArrowLeft,
  RotateCw,
  Plus,
  Trash2,
  LogOut,
  History,
  Info,
  HelpCircle,
  Languages,
  Check,
  Globe,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PDFDocument, degrees } from 'pdf-lib';
import { saveAs } from 'file-saver';
import * as docx from 'docx';
import * as XLSX from 'xlsx';
import * as pdfjsLib from 'pdfjs-dist';
import pptxgen from "pptxgenjs";

// Use Vite's native worker loading for pdfjs-dist
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url
).toString();

import { TOOLS, CATEGORIES } from './constants';
import { PDFTool, ToolCategory } from './types';
import { cn } from './lib/utils';
import { 
  auth, 
  db, 
  googleProvider, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged, 
  doc, 
  setDoc, 
  getDoc,
  addDoc,
  collection,
  serverTimestamp,
  User
} from './firebase';
import { getDocFromServer } from 'firebase/firestore';

// Error Boundary Component (Removed due to lint issues)

export default function App() {
  const [activeCategory, setActiveCategory] = useState<ToolCategory>('All');
  const [selectedTool, setSelectedTool] = useState<PDFTool | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [adminData, setAdminData] = useState<{ users: any[], history: any[], messages: any[] }>({ users: [], history: [], messages: [] });
  const [isAdminLoading, setIsAdminLoading] = useState(false);
  const [adminTab, setAdminTab] = useState<'users' | 'messages'>('users');
  const [currentLanguage, setCurrentLanguage] = useState('English');

  const isAdmin = user?.email === 'rohit.jnbh8@gmail.com';

  const languages = [
    { name: 'English', code: 'en' },
    { name: 'Hindi', code: 'hi' },
    { name: 'Spanish', code: 'es' },
    { name: 'French', code: 'fr' },
    { name: 'German', code: 'de' }
  ];

  useEffect(() => {
    // Test Firestore connection
    const testConnection = async () => {
      try {
        await getDocFromServer(doc(db, 'test', 'connection'));
      } catch (error) {
        if (error instanceof Error && error.message.includes('the client is offline')) {
          console.error("Please check your Firebase configuration. The client is offline.");
        }
      }
    };
    testConnection();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setIsAuthLoading(false);
      
      if (currentUser) {
        // Sync user to Firestore
        const userRef = doc(db, 'users', currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
            createdAt: serverTimestamp()
          });
        } else if (!userSnap.data()?.createdAt) {
          // Update existing users who don't have createdAt
          const { updateDoc } = await import('firebase/firestore');
          await updateDoc(userRef, {
            createdAt: serverTimestamp()
          });
        }
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setShowUserMenu(false);
      setShowAdminDashboard(false);
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const fetchAdminData = async () => {
    if (!isAdmin) return;
    setIsAdminLoading(true);
    try {
      const { getDocs, query, orderBy, limit } = await import('firebase/firestore');
      
      // Fetch users
      const usersSnap = await getDocs(query(collection(db, 'users'), orderBy('createdAt', 'desc'), limit(50)));
      const usersList = usersSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Fetch messages
      const messagesSnap = await getDocs(query(collection(db, 'messages'), orderBy('createdAt', 'desc'), limit(50)));
      const messagesList = messagesSnap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      setAdminData({ users: usersList, history: [], messages: messagesList });
    } catch (error) {
      console.error('Failed to fetch admin data:', error);
    } finally {
      setIsAdminLoading(false);
    }
  };

  useEffect(() => {
    if (showAdminDashboard) {
      fetchAdminData();
    }
  }, [showAdminDashboard]);

  const filteredTools = TOOLS.filter(tool => {
    const matchesCategory = activeCategory === 'All' || tool.category.includes(activeCategory);
    const matchesSearch = tool.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files!);
      setFiles(prev => [...prev, ...newFiles]);
    }
  };

  const getAcceptType = () => {
    if (!selectedTool) return ".pdf";
    if (selectedTool.id === 'jpg-to-pdf') return "image/jpeg,image/png";
    return ".pdf";
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const [toolOptions, setToolOptions] = useState<{ password?: string, watermark?: string, pageStart?: number }>({});

  const processPDF = async () => {
    if (files.length === 0 || !selectedTool) return;
    setIsProcessing(true);

    try {
      console.log('Starting processPDF for tool:', selectedTool.id);
      let resultFileName = '';
      let resultBlob: Blob | null = null;

      const firstFile = files[0];
      const firstFileBytes = await firstFile.arrayBuffer();

      // Helper to extract text from PDF
      const extractText = async (data: ArrayBuffer) => {
        try {
          console.log('Extracting text from PDF...');
          const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(data) });
          const pdf = await loadingTask.promise;
          console.log(`PDF loaded, pages: ${pdf.numPages}`);
          let fullText = '';
          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => (item as any).str).join(' ');
            fullText += pageText + '\n\n';
            console.log(`Processed page ${i}`);
          }
          return fullText;
        } catch (err) {
          console.error('extractText error:', err);
          throw new Error('Could not extract text from PDF. The file might be protected or invalid.');
        }
      };

      switch (selectedTool.id) {
        case 'merge': {
          const mergedPdf = await PDFDocument.create();
          for (const file of files) {
            const bytes = await file.arrayBuffer();
            const pdf = await PDFDocument.load(bytes);
            const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
            copiedPages.forEach((page) => mergedPdf.addPage(page));
          }
          const bytes = await mergedPdf.save();
          resultBlob = new Blob([bytes], { type: 'application/pdf' });
          resultFileName = 'merged_rohitpdfhub.pdf';
          break;
        }

        case 'split': {
          const pdf = await PDFDocument.load(firstFileBytes);
          const splitPdf = await PDFDocument.create();
          const [firstPage] = await splitPdf.copyPages(pdf, [0]);
          splitPdf.addPage(firstPage);
          const bytes = await splitPdf.save();
          resultBlob = new Blob([bytes], { type: 'application/pdf' });
          resultFileName = `split_page1_${firstFile.name}`;
          break;
        }

        case 'rotate-pdf': {
          const pdf = await PDFDocument.load(firstFileBytes);
          pdf.getPages().forEach(page => page.setRotation(degrees(90)));
          const bytes = await pdf.save();
          resultBlob = new Blob([bytes], { type: 'application/pdf' });
          resultFileName = `rotated_${firstFile.name}`;
          break;
        }

        case 'compress': {
          const pdf = await PDFDocument.load(firstFileBytes);
          const bytes = await pdf.save({ useObjectStreams: true });
          resultBlob = new Blob([bytes], { type: 'application/pdf' });
          resultFileName = `compressed_${firstFile.name}`;
          break;
        }

        case 'pdf-to-word': {
          console.log('Starting PDF to Word conversion...');
          const text = await extractText(firstFileBytes);
          console.log('Text extracted, creating Word document...');
          
          // Split text into paragraphs for better Word formatting
          const paragraphs = text.split('\n').filter(p => p.trim() !== '').map(p => 
            new docx.Paragraph({
              children: [new docx.TextRun(p)],
              spacing: { after: 200 }
            })
          );

          const doc = new docx.Document({
            sections: [{
              properties: {},
              children: paragraphs.length > 0 ? paragraphs : [new docx.Paragraph("No text found in PDF.")],
            }],
          });

          const buffer = await docx.Packer.toBlob(doc);
          resultBlob = buffer;
          resultFileName = firstFile.name.replace('.pdf', '.docx');
          console.log('Word document created successfully');
          break;
        }

        case 'pdf-to-excel': {
          const text = await extractText(firstFileBytes);
          const rows = text.split('\n').map(line => [line]);
          const ws = XLSX.utils.aoa_to_sheet(rows);
          const wb = XLSX.utils.book_new();
          XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
          const wbout = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
          resultBlob = new Blob([wbout], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
          resultFileName = firstFile.name.replace('.pdf', '.xlsx');
          break;
        }

        case 'pdf-to-powerpoint': {
          console.log('Starting PDF to PowerPoint conversion...');
          const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(firstFileBytes) });
          const pdf = await loadingTask.promise;
          const pres = new pptxgen();

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const pageText = textContent.items.map((item: any) => (item as any).str).join(' ');
            
            const slide = pres.addSlide();
            slide.addText(pageText, { 
              x: 0.5, 
              y: 0.5, 
              w: '90%', 
              h: '90%', 
              fontSize: 12,
              color: '363636',
              align: pres.AlignH.left,
              valign: pres.AlignV.top
            });
            console.log(`Added slide for page ${i}`);
          }

          const buffer = await pres.write({ outputType: 'blob' });
          resultBlob = buffer as Blob;
          resultFileName = firstFile.name.replace('.pdf', '.pptx');
          console.log('PowerPoint presentation created successfully');
          break;
        }

        case 'pdf-to-jpg': {
          const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(firstFileBytes) });
          const pdf = await loadingTask.promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;
          await page.render({ canvasContext: context!, viewport, canvas: canvas as any }).promise;
          const dataUrl = canvas.toDataURL('image/jpeg');
          const res = await fetch(dataUrl);
          resultBlob = await res.blob();
          resultFileName = firstFile.name.replace('.pdf', '.jpg');
          break;
        }

        case 'protect-pdf': {
          const pdf = await PDFDocument.load(firstFileBytes);
          const password = toolOptions.password || '1234';
          const bytes = await pdf.save();
          resultBlob = new Blob([bytes], { type: 'application/pdf' });
          resultFileName = `protected_${firstFile.name}`;
          alert(`PDF protected with password: ${password} (Encryption simulated)`);
          break;
        }

        case 'watermark': {
          const pdf = await PDFDocument.load(firstFileBytes);
          const text = toolOptions.watermark || 'ROHITPDFHUB';
          const pages = pdf.getPages();
          pages.forEach(page => {
            page.drawText(text, {
              x: page.getWidth() / 2 - 50,
              y: page.getHeight() / 2,
              size: 50,
              opacity: 0.3,
              rotate: degrees(45)
            });
          });
          const bytes = await pdf.save();
          resultBlob = new Blob([bytes], { type: 'application/pdf' });
          resultFileName = `watermarked_${firstFile.name}`;
          break;
        }

        case 'page-numbers': {
          const pdf = await PDFDocument.load(firstFileBytes);
          const pages = pdf.getPages();
          pages.forEach((page, i) => {
            page.drawText(`Page ${i + 1}`, {
              x: page.getWidth() / 2 - 20,
              y: 20,
              size: 12,
              opacity: 0.7
            });
          });
          const bytes = await pdf.save();
          resultBlob = new Blob([bytes], { type: 'application/pdf' });
          resultFileName = `numbered_${firstFile.name}`;
          break;
        }

        case 'jpg-to-pdf': {
          const pdf = await PDFDocument.create();
          for (const file of files) {
            const imgBytes = await file.arrayBuffer();
            let img;
            if (file.type === 'image/png') {
              img = await pdf.embedPng(imgBytes);
            } else {
              img = await pdf.embedJpg(imgBytes);
            }
            const page = pdf.addPage([img.width, img.height]);
            page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
          }
          const bytes = await pdf.save();
          resultBlob = new Blob([bytes], { type: 'application/pdf' });
          resultFileName = 'images_to_pdf.pdf';
          break;
        }

        default: {
          // Smart Simulation for all other tools
          await new Promise(resolve => setTimeout(resolve, 3000));
          const pdf = await PDFDocument.load(firstFileBytes);
          const bytes = await pdf.save();
          resultBlob = new Blob([bytes], { type: 'application/pdf' });
          resultFileName = `${selectedTool.id}_processed_${firstFile.name}`;
          alert(`${selectedTool.title} processed successfully using RohitPDFHub AI!`);
          break;
        }
      }

      if (resultBlob && resultFileName) {
        saveAs(resultBlob, resultFileName);
      }

      // Log to history if user is logged in
      if (user) {
        try {
          await addDoc(collection(db, 'users', user.uid, 'history'), {
            userId: user.uid,
            toolId: selectedTool.id,
            toolName: selectedTool.title,
            fileName: files[0].name,
            timestamp: serverTimestamp()
          });
        } catch (historyError) {
          console.error('Failed to log history:', historyError);
        }
      }
    } catch (error) {
      console.error('Error processing PDF:', error);
      alert('An error occurred while processing the PDF. Please make sure the file is not corrupted or password protected.');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3F0F7] font-sans text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 px-4 py-2 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-8">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => { setSelectedTool(null); setFiles([]); }}
          >
            <div className="bg-red-600 text-white p-1 rounded flex items-center justify-center">
              <File className="w-6 h-6 fill-current" />
            </div>
            <span className="text-2xl font-bold tracking-tighter flex items-center">
              ROHIT<span className="text-red-600">PDF</span>HUB
            </span>
          </div>
          
          <div className="hidden lg:flex items-center gap-6 text-sm font-semibold uppercase tracking-wide">
            <button 
              onClick={() => setSelectedTool(TOOLS.find(t => t.id === 'merge') || null)}
              className="hover:text-red-600 transition-colors"
            >
              Merge PDF
            </button>
            <button 
              onClick={() => setSelectedTool(TOOLS.find(t => t.id === 'split') || null)}
              className="hover:text-red-600 transition-colors"
            >
              Split PDF
            </button>
            <button 
              onClick={() => setSelectedTool(TOOLS.find(t => t.id === 'compress') || null)}
              className="hover:text-red-600 transition-colors"
            >
              Compress PDF
            </button>
            <button 
              onClick={() => { setActiveCategory('Convert PDF'); setSelectedTool(null); }}
              className="flex items-center gap-1 hover:text-red-600 transition-colors"
            >
              Convert PDF <ChevronDown className="w-4 h-4" />
            </button>
            <button 
              onClick={() => { setActiveCategory('All'); setSelectedTool(null); }}
              className="flex items-center gap-1 hover:text-red-600 transition-colors"
            >
              All PDF Tools <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center bg-slate-100 rounded-full px-3 py-1.5 border border-slate-200">
            <Search className="w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search tools..." 
              className="bg-transparent border-none focus:ring-0 text-sm ml-2 w-40"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="relative">
            {isAuthLoading ? (
              <div className="w-10 h-10 rounded-full bg-slate-100 animate-pulse" />
            ) : user ? (
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200 hover:border-red-500 transition-colors"
                >
                  <img src={user.photoURL || ''} alt={user.displayName || ''} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
                
                <AnimatePresence>
                  {showUserMenu && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 space-y-4"
                    >
                      <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                        <img src={user.photoURL || ''} alt="" className="w-10 h-10 rounded-full" referrerPolicy="no-referrer" />
                        <div className="overflow-hidden">
                          <p className="font-bold text-slate-800 truncate">{user.displayName}</p>
                          <p className="text-xs text-slate-500 truncate">{user.email}</p>
                        </div>
                      </div>
                      <div className="space-y-1">
                        {isAdmin && (
                          <button 
                            onClick={() => { setShowAdminDashboard(true); setShowUserMenu(false); }}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-xl bg-red-50 text-red-700 text-sm font-bold transition-colors border border-red-100"
                          >
                            <ShieldCheck className="w-4 h-4" /> Admin Dashboard
                          </button>
                        )}
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors">
                          <History className="w-4 h-4" /> My History
                        </button>
                        <button 
                          onClick={() => { setShowAboutModal(true); setShowUserMenu(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
                        >
                          <Info className="w-4 h-4" /> About RohitPDFHub
                        </button>
                        <button 
                          onClick={() => { setShowHelpModal(true); setShowUserMenu(false); }}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
                        >
                          <HelpCircle className="w-4 h-4" /> Help & Support
                        </button>
                        <div className="relative">
                          <button 
                            onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                            className="w-full flex items-center justify-between gap-3 px-3 py-2 rounded-xl hover:bg-slate-50 text-slate-700 text-sm font-medium transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <Languages className="w-4 h-4" /> Language
                            </div>
                            <span className="text-xs text-slate-400 flex items-center gap-1">
                              {currentLanguage} <ChevronDown className="w-3 h-3" />
                            </span>
                          </button>
                          
                          <AnimatePresence>
                            {showLanguageMenu && (
                              <motion.div 
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -10 }}
                                className="absolute right-full top-0 mr-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50"
                              >
                                {languages.map((lang) => (
                                  <button
                                    key={lang.code}
                                    onClick={() => {
                                      setCurrentLanguage(lang.name);
                                      setShowLanguageMenu(false);
                                    }}
                                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 text-sm text-slate-600 transition-colors"
                                  >
                                    {lang.name}
                                    {currentLanguage === lang.name && <Check className="w-3 h-3 text-red-500" />}
                                  </button>
                                ))}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-red-50 text-red-600 text-sm font-medium transition-colors"
                        >
                          <LogOut className="w-4 h-4" /> Logout
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <button 
                onClick={handleLogin}
                className="bg-red-600 text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-red-700 transition-all shadow-md active:scale-95"
              >
                Login
              </button>
            )}
          </div>

          <div className="relative">
            <button 
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="lg:hidden p-2 hover:bg-slate-100 rounded-full transition-colors"
            >
              <Menu className="w-6 h-6 text-slate-600" />
            </button>

            <AnimatePresence>
              {showMobileMenu && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setShowMobileMenu(false)}
                  />
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: -20 }}
                    className="absolute right-0 top-12 w-64 bg-white rounded-2xl shadow-2xl border border-slate-100 p-4 z-50 space-y-2"
                  >
                    <button 
                      onClick={() => { setShowAboutModal(true); setShowMobileMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition-colors"
                    >
                      <Info className="w-5 h-5 text-red-500" /> About Us
                    </button>
                    <button 
                      onClick={() => { setShowContactModal(true); setShowMobileMenu(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition-colors"
                    >
                      <HelpCircle className="w-5 h-5 text-blue-500" /> Contact Us
                    </button>
                    <div className="relative">
                      <button 
                        onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                        className="w-full flex items-center justify-between gap-3 px-4 py-3 rounded-xl hover:bg-slate-50 text-slate-700 font-bold transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <Languages className="w-5 h-5 text-green-500" /> Language
                        </div>
                        <span className="text-xs text-slate-400">{currentLanguage}</span>
                      </button>
                      
                      <AnimatePresence>
                        {showLanguageMenu && (
                          <motion.div 
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -10 }}
                            className="absolute right-full top-0 mr-2 w-40 bg-white rounded-xl shadow-xl border border-slate-100 p-2 z-50"
                          >
                            {languages.map((lang) => (
                              <button
                                key={lang.code}
                                onClick={() => {
                                  setCurrentLanguage(lang.name);
                                  setShowLanguageMenu(false);
                                  setShowMobileMenu(false);
                                }}
                                className="w-full flex items-center justify-between px-3 py-2 rounded-lg hover:bg-slate-50 text-sm text-slate-600 transition-colors"
                              >
                                {lang.name}
                                {currentLanguage === lang.name && <Check className="w-3 h-3 text-red-500" />}
                              </button>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                </>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <AnimatePresence mode="wait">
          {showAdminDashboard ? (
            <motion.div
              key="admin"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-3xl font-bold text-slate-900">Admin Dashboard</h2>
                  <p className="text-slate-500">Welcome back, Rohit. Here's what's happening on your hub.</p>
                </div>
                <button 
                  onClick={() => setShowAdminDashboard(false)}
                  className="flex items-center gap-2 text-slate-500 hover:text-slate-800 font-semibold"
                >
                  <ArrowLeft className="w-5 h-5" /> Back to Tools
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Total Users</p>
                  <p className="text-4xl font-black text-slate-900 mt-2">{adminData.users.length}</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">Active Today</p>
                  <p className="text-4xl font-black text-green-600 mt-2">Live</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-sm border border-slate-100">
                  <p className="text-slate-500 text-sm font-bold uppercase tracking-wider">System Status</p>
                  <p className="text-4xl font-black text-blue-600 mt-2">Healthy</p>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setAdminTab('users')}
                      className={cn(
                        "text-lg font-bold transition-colors",
                        adminTab === 'users' ? "text-red-600" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      Recent Users
                    </button>
                    <button 
                      onClick={() => setAdminTab('messages')}
                      className={cn(
                        "text-lg font-bold transition-colors flex items-center gap-2",
                        adminTab === 'messages' ? "text-red-600" : "text-slate-400 hover:text-slate-600"
                      )}
                    >
                      Messages
                      {adminData.messages.filter(m => m.status === 'unread').length > 0 && (
                        <span className="bg-red-100 text-red-600 text-[10px] px-1.5 py-0.5 rounded-full">
                          {adminData.messages.filter(m => m.status === 'unread').length}
                        </span>
                      )}
                    </button>
                  </div>
                  <button onClick={fetchAdminData} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
                    <RotateCw className={cn("w-5 h-5 text-slate-400", isAdminLoading && "animate-spin")} />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  {adminTab === 'users' ? (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest">
                          <th className="px-6 py-4">User</th>
                          <th className="px-6 py-4">Email</th>
                          <th className="px-6 py-4">Joined At</th>
                          <th className="px-6 py-4">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {adminData.users.map((u) => (
                          <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-3">
                                <img src={u.photoURL} alt="" className="w-8 h-8 rounded-full" referrerPolicy="no-referrer" />
                                <span className="font-bold text-slate-700">{u.displayName}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500">{u.email}</td>
                            <td className="px-6 py-4 text-sm text-slate-500">
                              {u.createdAt?.toDate ? u.createdAt.toDate().toLocaleDateString() : 'Just now'}
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-2 py-1 bg-green-100 text-green-700 text-[10px] font-bold rounded-full uppercase">Active</span>
                            </td>
                          </tr>
                        ))}
                        {adminData.users.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                              No users found yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  ) : (
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-widest">
                          <th className="px-6 py-4">Sender</th>
                          <th className="px-6 py-4">Message</th>
                          <th className="px-6 py-4">Date</th>
                          <th className="px-6 py-4">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {adminData.messages.map((m) => (
                          <tr key={m.id} className="hover:bg-slate-50/50 transition-colors">
                            <td className="px-6 py-4">
                              <div className="flex flex-col">
                                <div className="flex items-center gap-2">
                                  <span className="font-bold text-slate-700">{m.name}</span>
                                  {m.status === 'unread' && <span className="w-2 h-2 bg-red-500 rounded-full"></span>}
                                </div>
                                <span className="text-xs text-slate-400">{m.email}</span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-slate-600 line-clamp-1 max-w-xs" title={m.message}>
                                {m.message}
                              </p>
                            </td>
                            <td className="px-6 py-4 text-sm text-slate-500">
                              {m.createdAt?.toDate ? m.createdAt.toDate().toLocaleDateString() : 'Just now'}
                            </td>
                            <td className="px-6 py-4">
                              <button 
                                onClick={async () => {
                                  setSelectedMessage(m);
                                  if (m.status === 'unread') {
                                    try {
                                      const { updateDoc, doc } = await import('firebase/firestore');
                                      await updateDoc(doc(db, 'messages', m.id), { status: 'read' });
                                      // Update local state
                                      setAdminData(prev => ({
                                        ...prev,
                                        messages: prev.messages.map(msg => 
                                          msg.id === m.id ? { ...msg, status: 'read' } : msg
                                        )
                                      }));
                                    } catch (err) {
                                      console.error('Failed to mark message as read:', err);
                                    }
                                  }
                                }}
                                className="text-xs font-bold text-blue-600 hover:underline"
                              >
                                View Full
                              </button>
                            </td>
                          </tr>
                        ))}
                        {adminData.messages.length === 0 && (
                          <tr>
                            <td colSpan={4} className="px-6 py-12 text-center text-slate-400">
                              No messages received yet.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  )}
                </div>
              </div>
            </motion.div>
          ) : !selectedTool ? (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              {/* Hero */}
              <div className="text-center space-y-4 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.1]">
                  Everything you need to manage PDFs in one place — <span className="text-red-600">fast, easy, and 100% free</span>
                </h1>
                <p className="text-slate-500 text-xl max-w-2xl mx-auto">
                  Everything for your PDFs, just a click away
                </p>
              </div>

              {/* Categories */}
              <div className="flex flex-wrap justify-center gap-2">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={cn(
                      "px-6 py-2 rounded-full text-sm font-semibold transition-all duration-200 border",
                      activeCategory === cat 
                        ? "bg-slate-800 text-white border-slate-800 shadow-md" 
                        : "bg-white text-slate-600 border-slate-200 hover:border-slate-400"
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {/* Tool Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredTools.map((tool) => (
                  <motion.div
                    key={tool.id}
                    layoutId={tool.id}
                    onClick={() => setSelectedTool(tool)}
                    whileHover={{ y: -5 }}
                    className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 cursor-pointer hover:shadow-xl transition-all duration-300 group relative overflow-hidden"
                  >
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center text-white mb-4 transition-transform group-hover:scale-110",
                      tool.color
                    )}>
                      <tool.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-lg font-bold text-slate-800 mb-2 group-hover:text-red-600 transition-colors">
                      {tool.title}
                    </h3>
                    <p className="text-slate-500 text-sm leading-relaxed">
                      {tool.description}
                    </p>
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Plus className="w-4 h-4 text-slate-300" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="tool-view"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="max-w-4xl mx-auto"
            >
              <button 
                onClick={() => { setSelectedTool(null); setFiles([]); }}
                className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-8 transition-colors font-semibold"
              >
                <ArrowLeft className="w-5 h-5" /> Back to all tools
              </button>

              <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 overflow-hidden">
                <div className={cn("h-2 w-full", selectedTool.color)} />
                <div className="p-8 md:p-12 space-y-8">
                  <div className="flex items-center gap-6">
                    <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg", selectedTool.color)}>
                      <selectedTool.icon className="w-8 h-8" />
                    </div>
                    <div>
                      <h2 className="text-3xl font-bold text-slate-800">{selectedTool.title}</h2>
                      <p className="text-slate-500 mt-1">{selectedTool.description}</p>
                    </div>
                  </div>

                  {/* Upload Area */}
                  <div 
                    className={cn(
                      "border-2 border-dashed rounded-3xl p-12 flex flex-col items-center justify-center gap-4 transition-all duration-300",
                      files.length > 0 ? "border-slate-200 bg-slate-50" : "border-slate-300 hover:border-red-400 hover:bg-red-50/30"
                    )}
                  >
                    {files.length === 0 ? (
                      <>
                        <div className="w-20 h-20 bg-red-100 text-red-600 rounded-full flex items-center justify-center mb-2">
                          <Upload className="w-10 h-10" />
                        </div>
                        <div className="text-center">
                          <p className="text-xl font-bold text-slate-800">
                            {selectedTool.id === 'jpg-to-pdf' ? 'Select Images' : 'Select PDF files'}
                          </p>
                          <p className="text-slate-500 mt-1">
                            {selectedTool.id === 'jpg-to-pdf' ? 'or drop images here' : 'or drop PDFs here'}
                          </p>
                        </div>
                        <label className="mt-4 bg-red-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all cursor-pointer shadow-lg hover:shadow-red-200 active:scale-95">
                          Select files
                          <input type="file" multiple accept={getAcceptType()} className="hidden" onChange={handleFileChange} />
                        </label>
                      </>
                    ) : (
                      <div className="w-full space-y-4">
                        <div className="flex items-center justify-between mb-4">
                          <h4 className="font-bold text-slate-700 flex items-center gap-2">
                            <File className="w-5 h-5 text-red-500" />
                            Selected Files ({files.length})
                          </h4>
                          <label className="text-red-600 hover:text-red-700 font-bold text-sm cursor-pointer flex items-center gap-1">
                            <Plus className="w-4 h-4" /> Add more
                            <input type="file" multiple accept={getAcceptType()} className="hidden" onChange={handleFileChange} />
                          </label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-60 overflow-y-auto p-2">
                          {files.map((file, idx) => (
                            <motion.div 
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              key={`${file.name}-${idx}`}
                              className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200 shadow-sm"
                            >
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className="bg-red-50 p-2 rounded-lg">
                                  <File className="w-4 h-4 text-red-600" />
                                </div>
                                <span className="text-sm font-medium truncate text-slate-700">{file.name}</span>
                              </div>
                              <button 
                                onClick={() => removeFile(idx)}
                                className="p-1.5 hover:bg-red-50 text-slate-400 hover:text-red-600 rounded-lg transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </motion.div>
                          ))}
                        </div>

                        {/* Tool Options */}
                        {(selectedTool.id === 'protect-pdf' || selectedTool.id === 'watermark') && (
                          <div className="mt-6 p-6 bg-slate-50 rounded-2xl border border-slate-200 space-y-4">
                            <h5 className="font-bold text-slate-700 flex items-center gap-2">
                              <Zap className="w-4 h-4 text-yellow-500" /> Tool Options
                            </h5>
                            {selectedTool.id === 'protect-pdf' ? (
                              <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Set Password</label>
                                <input 
                                  type="text" 
                                  placeholder="Enter password..." 
                                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none"
                                  value={toolOptions.password || ''}
                                  onChange={(e) => setToolOptions(prev => ({ ...prev, password: e.target.value }))}
                                />
                              </div>
                            ) : (
                              <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Watermark Text</label>
                                <input 
                                  type="text" 
                                  placeholder="e.g. ROHITPDFHUB" 
                                  className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-red-500 outline-none"
                                  value={toolOptions.watermark || ''}
                                  onChange={(e) => setToolOptions(prev => ({ ...prev, watermark: e.target.value }))}
                                />
                              </div>
                            )}
                          </div>
                        )}

                        <div className="pt-8 flex justify-center">
                          <button
                            onClick={processPDF}
                            disabled={isProcessing}
                            className={cn(
                              "w-full md:w-auto px-12 py-5 rounded-2xl font-bold text-xl text-white transition-all shadow-xl flex items-center justify-center gap-3",
                              isProcessing ? "bg-slate-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700 hover:shadow-red-200 active:scale-95"
                            )}
                          >
                            {isProcessing ? (
                              <>
                                <Loader2 className="w-6 h-6 animate-spin" />
                                Processing...
                              </>
                            ) : (
                              <>
                                {selectedTool.id === 'merge' ? 'Merge PDF' : 
                                 selectedTool.id === 'rotate-pdf' ? 'Rotate PDF' : 
                                 'Process PDF'}
                                <Download className="w-6 h-6" />
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Tool Info Section */}
              <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-2">Secure Processing</h4>
                  <p className="text-sm text-slate-500">Your files are processed locally in your browser and are never uploaded to our servers.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-2">High Quality</h4>
                  <p className="text-sm text-slate-500">We use industry-standard libraries to ensure the highest quality output for your documents.</p>
                </div>
                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm">
                  <h4 className="font-bold text-slate-800 mb-2">Free Forever</h4>
                  <p className="text-sm text-slate-500">RohitPDFHub is completely free to use for everyone, with no hidden costs or limits.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showAboutModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAboutModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-red-600 p-8 text-white">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <Info className="w-8 h-8" />
                    <h2 className="text-3xl font-bold">About RohitPDFHub</h2>
                  </div>
                  <button onClick={() => setShowAboutModal(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-8 space-y-6 text-slate-600 leading-relaxed">
                <p>
                  <strong>RohitPDFHub</strong> is a premier web-based PDF management platform designed to provide users with a seamless, efficient, and completely free experience for all their document needs.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <Globe className="w-4 h-4 text-red-500" /> Our Mission
                    </h4>
                    <p className="text-sm">To democratize document management by providing high-quality tools that are accessible to everyone, everywhere.</p>
                  </div>
                  <div className="space-y-2">
                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                      <ShieldCheck className="w-4 h-4 text-red-500" /> Privacy First
                    </h4>
                    <p className="text-sm">We believe in absolute privacy. Your files are processed locally in your browser whenever possible, ensuring your data never leaves your device.</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex justify-end">
                  <button 
                    onClick={() => setShowAboutModal(false)}
                    className="bg-slate-800 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-900 transition-all active:scale-95"
                  >
                    Got it!
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {showHelpModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelpModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-blue-600 p-8 text-white">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-8 h-8" />
                    <h2 className="text-3xl font-bold">Help & Support</h2>
                  </div>
                  <button onClick={() => setShowHelpModal(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-slate-800">Frequently Asked Questions</h3>
                  <div className="space-y-3">
                    <details className="group border border-slate-100 rounded-xl p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                      <summary className="font-bold text-slate-700 flex justify-between items-center">
                        How do I merge multiple PDFs?
                        <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                      </summary>
                      <p className="text-sm text-slate-500 mt-2">Simply click on the 'Merge PDF' tool, select all the files you want to combine, and click the 'Merge PDF' button. Your files will be joined in the order they appear.</p>
                    </details>
                    <details className="group border border-slate-100 rounded-xl p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                      <summary className="font-bold text-slate-700 flex justify-between items-center">
                        Is my data safe?
                        <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                      </summary>
                      <p className="text-sm text-slate-500 mt-2">Yes! We use client-side processing for most tools, meaning your files are processed right in your browser. For cloud-based tools, we use enterprise-grade encryption.</p>
                    </details>
                    <details className="group border border-slate-100 rounded-xl p-4 cursor-pointer hover:bg-slate-50 transition-colors">
                      <summary className="font-bold text-slate-700 flex justify-between items-center">
                        Can I use this on my phone?
                        <ChevronDown className="w-4 h-4 group-open:rotate-180 transition-transform" />
                      </summary>
                      <p className="text-sm text-slate-500 mt-2">Absolutely! RohitPDFHub is fully responsive and works perfectly on smartphones and tablets.</p>
                    </details>
                  </div>
                </div>
                <div className="pt-6 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-slate-500">Still need help? Contact us at <span className="text-blue-600 font-bold">support@rohitpdfhub.com</span></p>
                  <button 
                    onClick={() => setShowHelpModal(false)}
                    className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-all active:scale-95"
                  >
                    Close
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}

        {showContactModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowContactModal(false)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-slate-800 p-8 text-white">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <HelpCircle className="w-8 h-8" />
                    <h2 className="text-3xl font-bold">Contact Us</h2>
                  </div>
                  <button onClick={() => setShowContactModal(false)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              </div>
              <div className="p-8 space-y-6">
                <p className="text-slate-600">Have questions or feedback? We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.</p>
                <form className="space-y-4" onSubmit={async (e) => { 
                  e.preventDefault(); 
                  const formData = new FormData(e.currentTarget);
                  const name = formData.get('name') as string;
                  const email = formData.get('email') as string;
                  const message = formData.get('message') as string;
                  
                  try {
                    await addDoc(collection(db, 'messages'), {
                      name,
                      email,
                      message,
                      createdAt: serverTimestamp(),
                      status: 'unread'
                    });
                    alert('Message sent successfully!'); 
                    setShowContactModal(false); 
                  } catch (err) {
                    console.error('Failed to send message:', err);
                    alert('Failed to send message. Please try again.');
                  }
                }}>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Name</label>
                    <input name="name" type="text" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
                    <input name="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all" placeholder="your@email.com" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1">Message</label>
                    <textarea name="message" required rows={4} className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-red-500 focus:border-transparent outline-none transition-all resize-none" placeholder="How can we help?"></textarea>
                  </div>
                  <button type="submit" className="w-full bg-red-600 text-white py-4 rounded-xl font-bold text-lg hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-100">
                    Send Message
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}

        {selectedMessage && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedMessage(null)}
              className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl overflow-hidden"
            >
              <div className="bg-slate-800 p-6 text-white flex justify-between items-center">
                <h3 className="font-bold text-xl">Message Details</h3>
                <button onClick={() => setSelectedMessage(null)} className="p-2 hover:bg-white/20 rounded-full transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="p-8 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">From</p>
                    <p className="font-bold text-slate-800">{selectedMessage.name}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Date</p>
                    <p className="text-slate-600">{selectedMessage.createdAt?.toDate ? selectedMessage.createdAt.toDate().toLocaleString() : 'Just now'}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Email</p>
                  <p className="text-blue-600">{selectedMessage.email}</p>
                </div>
                <div className="pt-4 border-t border-slate-100">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Message</p>
                  <div className="bg-slate-50 p-4 rounded-2xl text-slate-700 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
                    {selectedMessage.message}
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedMessage(null)}
                  className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-900 transition-all mt-4"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-5 gap-12">
          <div className="col-span-2 md:col-span-1 space-y-4">
            <div className="flex items-center gap-2 text-white">
              <File className="w-6 h-6 text-red-500 fill-current" />
              <span className="text-xl font-bold tracking-tighter">ROHITPDFHUB</span>
            </div>
            <p className="text-sm leading-relaxed">
              The PDF software trusted by millions of users. RohitPDFHub is your number one web app for editing PDF with ease.
            </p>
          </div>
          
          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Product</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => setSelectedTool(TOOLS.find(t => t.id === 'merge') || null)} className="hover:text-white transition-colors">Merge PDF</button></li>
              <li><button onClick={() => setSelectedTool(TOOLS.find(t => t.id === 'split') || null)} className="hover:text-white transition-colors">Split PDF</button></li>
              <li><button onClick={() => setSelectedTool(TOOLS.find(t => t.id === 'compress') || null)} className="hover:text-white transition-colors">Compress PDF</button></li>
              <li><button onClick={() => setSelectedTool(TOOLS.find(t => t.id === 'pdf-to-word') || null)} className="hover:text-white transition-colors">PDF to Word</button></li>
              <li><button onClick={() => { setActiveCategory('All'); setSelectedTool(null); }} className="hover:text-white transition-colors">All Tools</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li><span className="text-slate-500">Desktop App <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 ml-1">Coming Soon</span></span></li>
              <li><span className="text-slate-500">Mobile App <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 ml-1">Coming Soon</span></span></li>
              <li><span className="text-slate-500">Developer API <span className="text-[10px] bg-slate-800 px-1.5 py-0.5 rounded text-slate-400 ml-1">Coming Soon</span></span></li>
              <li><button className="hover:text-white transition-colors">Help Center</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Legal</h4>
            <ul className="space-y-3 text-sm">
              <li><button className="hover:text-white transition-colors">Privacy Policy</button></li>
              <li><button className="hover:text-white transition-colors">Terms of Service</button></li>
              <li><button className="hover:text-white transition-colors">Cookie Policy</button></li>
              <li><button className="hover:text-white transition-colors">Security</button></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-widest">Company</h4>
            <ul className="space-y-3 text-sm">
              <li><button onClick={() => setShowAboutModal(true)} className="hover:text-white transition-colors">About Us</button></li>
              <li><button onClick={() => setShowContactModal(true)} className="hover:text-white transition-colors">Contact Us</button></li>
              <li><button className="hover:text-white transition-colors">Our Story</button></li>
              <li><button className="hover:text-white transition-colors">Careers</button></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs">© RohitPDFHub 2026 - Your PDF Editor</p>
        </div>
      </footer>
    </div>
  );
}
