import { 
  Merge, 
  Scissors, 
  Zap, 
  FileText, 
  Presentation, 
  Table, 
  FileJson, 
  Image as ImageIcon, 
  PenTool, 
  Lock, 
  Unlock, 
  RotateCw, 
  Hash, 
  Search, 
  Languages, 
  FileSearch, 
  ShieldCheck, 
  FileSignature, 
  Type, 
  Layout, 
  FileCode,
  FileCheck,
  Crop,
  Eraser
} from 'lucide-react';
import { PDFTool, ToolCategory } from './types';

export const TOOLS: PDFTool[] = [
  {
    id: 'remove-bg',
    title: 'Remove Background',
    description: 'Instantly remove image backgrounds with AI precision. Perfect for profile photos and product images.',
    icon: Eraser,
    category: ['All', 'Edit PDF'],
    color: 'bg-indigo-600',
    action: 'convert',
    featured: true
  },
  {
    id: 'jpg-to-pdf',
    title: 'JPG to PDF',
    description: 'Convert JPG images to PDF in seconds. Easily adjust orientation and margins.',
    icon: ImageIcon,
    category: ['All', 'Convert PDF'],
    color: 'bg-yellow-600',
    action: 'convert',
    featured: true
  },
  {
    id: 'compress',
    title: 'Compress PDF',
    description: 'Reduce file size while optimizing for maximal PDF quality.',
    icon: Zap,
    category: ['All', 'Optimize PDF'],
    color: 'bg-blue-500',
    action: 'compress',
    featured: true
  },
  {
    id: 'compress-jpg',
    title: 'Compress JPG',
    description: 'Reduce JPG image size while maintaining quality. Set your target size in MB or KB.',
    icon: ImageIcon,
    category: ['All', 'Optimize PDF'],
    color: 'bg-orange-500',
    action: 'compress',
    featured: true
  },
  {
    id: 'merge',
    title: 'Merge PDF',
    description: 'Combine PDFs in the order you want with the easiest PDF merger available.',
    icon: Merge,
    category: ['All', 'Organize PDF'],
    color: 'bg-orange-500',
    action: 'merge',
    featured: true
  },
  {
    id: 'pdf-to-jpg',
    title: 'PDF to JPG',
    description: 'Convert each PDF page into a JPG or extract all images contained in a PDF.',
    icon: ImageIcon,
    category: ['All', 'Convert PDF'],
    color: 'bg-yellow-500',
    action: 'convert',
    featured: true
  },
  {
    id: 'split',
    title: 'Split PDF',
    description: 'Separate one page or a whole set for easy conversion into independent PDF files.',
    icon: Scissors,
    category: ['All', 'Organize PDF'],
    color: 'bg-red-500',
    action: 'split'
  },
  {
    id: 'pdf-to-word',
    title: 'PDF to Word',
    description: 'Easily convert your PDF files into easy to edit DOC and DOCX documents.',
    icon: FileText,
    category: ['All', 'Convert PDF'],
    color: 'bg-blue-600',
    action: 'convert'
  },
  {
    id: 'pdf-to-powerpoint',
    title: 'PDF to PowerPoint',
    description: 'Turn your PDF files into easy to edit PPT and PPTX slideshows.',
    icon: Presentation,
    category: ['All', 'Convert PDF'],
    color: 'bg-orange-600',
    action: 'convert'
  },
  {
    id: 'pdf-to-excel',
    title: 'PDF to Excel',
    description: 'Pull data straight from PDFs into Excel spreadsheets in a few short seconds.',
    icon: Table,
    category: ['All', 'Convert PDF'],
    color: 'bg-green-600',
    action: 'convert'
  },
  {
    id: 'word-to-pdf',
    title: 'Word to PDF',
    description: 'Make DOC and DOCX files easy to read by converting them to PDF.',
    icon: FileText,
    category: ['All', 'Convert PDF'],
    color: 'bg-blue-400',
    action: 'convert'
  },
  {
    id: 'powerpoint-to-pdf',
    title: 'PowerPoint to PDF',
    description: 'Make PPT and PPTX slideshows easy to view by converting them to PDF.',
    icon: Presentation,
    category: ['All', 'Convert PDF'],
    color: 'bg-orange-400',
    action: 'convert'
  },
  {
    id: 'excel-to-pdf',
    title: 'Excel to PDF',
    description: 'Make EXCEL spreadsheets easy to read by converting them to PDF.',
    icon: Table,
    category: ['All', 'Convert PDF'],
    color: 'bg-green-400',
    action: 'convert'
  },
  {
    id: 'edit-pdf',
    title: 'Edit PDF',
    description: 'Add text, images, shapes or freehand annotations to a PDF document.',
    icon: PenTool,
    category: ['All', 'Edit PDF'],
    color: 'bg-purple-500',
    action: 'edit'
  },
  {
    id: 'sign-pdf',
    title: 'Sign PDF',
    description: 'Sign yourself or request electronic signatures from others.',
    icon: FileSignature,
    category: ['All', 'Edit PDF'],
    color: 'bg-indigo-500',
    action: 'sign'
  },
  {
    id: 'watermark',
    title: 'Watermark',
    description: 'Stamp an image or text over your PDF in seconds. Choose typography, transparency and position.',
    icon: Type,
    category: ['All', 'Edit PDF'],
    color: 'bg-pink-500',
    action: 'watermark'
  },
  {
    id: 'rotate-pdf',
    title: 'Rotate PDF',
    description: 'Rotate your PDFs the way you need them. You can even rotate multiple PDFs at once!',
    icon: RotateCw,
    category: ['All', 'Organize PDF'],
    color: 'bg-blue-300',
    action: 'rotate'
  },
  {
    id: 'html-to-pdf',
    title: 'HTML to PDF',
    description: 'Convert webpages in HTML to PDF. Copy and paste the URL of the page you want and convert it to PDF with a click.',
    icon: FileCode,
    category: ['All', 'Convert PDF'],
    color: 'bg-gray-500',
    action: 'convert'
  },
  {
    id: 'unlock-pdf',
    title: 'Unlock PDF',
    description: 'Remove PDF password security, giving you the freedom to use your PDFs as you want.',
    icon: Unlock,
    category: ['All', 'PDF Security'],
    color: 'bg-cyan-500',
    action: 'unlock'
  },
  {
    id: 'protect-pdf',
    title: 'Protect PDF',
    description: 'Protect PDF files with a password. Encrypt PDF documents to prevent unauthorized access.',
    icon: Lock,
    category: ['All', 'PDF Security'],
    color: 'bg-cyan-700',
    action: 'protect'
  },
  {
    id: 'organize-pdf',
    title: 'Organize PDF',
    description: 'Sort pages of your PDF file however you like. Delete PDF pages or add PDF pages to your document at your convenience.',
    icon: Layout,
    category: ['All', 'Organize PDF'],
    color: 'bg-red-400',
    action: 'organize'
  },
  {
    id: 'pdf-to-pdfa',
    title: 'PDF to PDF/A',
    description: 'Transform your PDF to PDF/A, the ISO-standardized version of PDF for long-term archiving.',
    icon: FileCheck,
    category: ['All', 'Convert PDF'],
    color: 'bg-gray-600',
    action: 'convert'
  },
  {
    id: 'repair-pdf',
    title: 'Repair PDF',
    description: 'Repair a damaged PDF and recover data from corrupt PDF. Fix PDF files with our Repair tool.',
    icon: Zap,
    category: ['All', 'Optimize PDF'],
    color: 'bg-green-500',
    action: 'repair'
  },
  {
    id: 'page-numbers',
    title: 'Page numbers',
    description: 'Add page numbers into PDFs with ease. Choose your positions, dimensions, typography.',
    icon: Hash,
    category: ['All', 'Edit PDF'],
    color: 'bg-rose-500',
    action: 'edit'
  },
  {
    id: 'scan-to-pdf',
    title: 'Scan to PDF',
    description: 'Capture document scans from your mobile device and send them instantly to your browser.',
    icon: Search,
    category: ['All', 'Convert PDF'],
    color: 'bg-orange-500',
    action: 'convert'
  },
  {
    id: 'ocr-pdf',
    title: 'OCR PDF',
    description: 'Easily convert scanned PDF into searchable and selectable documents.',
    icon: FileSearch,
    category: ['All', 'PDF Intelligence'],
    color: 'bg-emerald-500',
    action: 'ocr'
  },
  {
    id: 'compare-pdf',
    title: 'Compare PDF',
    description: 'Show a side-by-side document comparison and easily spot changes between different file versions.',
    icon: Layout,
    category: ['All', 'PDF Intelligence'],
    color: 'bg-slate-500',
    action: 'compare'
  },
  {
    id: 'redact-pdf',
    title: 'Redact PDF',
    description: 'Redact text and graphics to permanently remove sensitive information from a PDF.',
    icon: Eraser,
    category: ['All', 'PDF Security'],
    color: 'bg-black',
    action: 'redact'
  },
  {
    id: 'crop-pdf',
    title: 'Crop PDF',
    description: 'Crop margins of PDF documents or select specific areas, then apply the changes to one page or the whole document.',
    icon: Crop,
    category: ['All', 'Edit PDF'],
    color: 'bg-fuchsia-500',
    action: 'edit'
  }
];

export const CATEGORIES: ToolCategory[] = [
  'All',
  'Workflows',
  'Organize PDF',
  'Optimize PDF',
  'Convert PDF',
  'Edit PDF',
  'PDF Security',
  'PDF Intelligence'
];
