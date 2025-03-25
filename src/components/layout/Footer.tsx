import React from 'react';
import Link from 'next/link';
import { FaHeart, FaTwitter, FaFacebook, FaInstagram, FaLinkedin, FaGithub } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div>
            <h3 className="footer-title">About ToolsFree Online</h3>
            <p className="mb-4">
              ToolsFree Online provides 30+ free online tools to help you with everyday tasks. 
              Our mission is to make powerful tools accessible to everyone, completely free.
            </p>
            <div className="flex space-x-4">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                <FaTwitter size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                <FaFacebook size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                <FaInstagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                <FaLinkedin size={20} />
              </a>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="footer-link">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
          
          {/* Popular Tools */}
          <div>
            <h3 className="footer-title">Popular Tools</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools/text/text-to-speech" className="footer-link">
                  Text to Speech
                </Link>
              </li>
              <li>
                <Link href="/tools/image/image-compressor" className="footer-link">
                  Image Compressor
                </Link>
              </li>
              <li>
                <Link href="/tools/video/all-in-one-downloader" className="footer-link">
                  All-in-One Downloader
                </Link>
              </li>
              <li>
                <Link href="/tools/video/video-editor" className="footer-link">
                  Video Editor
                </Link>
              </li>
              <li>
                <Link href="/tools/text/plagiarism-checker" className="footer-link">
                  Plagiarism Checker
                </Link>
              </li>
              <li>
                <Link href="/tools/converters/pdf-to-word" className="footer-link">
                  PDF to Word
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Tool Categories */}
          <div>
            <h3 className="footer-title">Tool Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/categories/text-tools" className="footer-link">
                  Text Tools
                </Link>
              </li>
              <li>
                <Link href="/categories/image-tools" className="footer-link">
                  Image Tools
                </Link>
              </li>
              <li>
                <Link href="/categories/video-tools" className="footer-link">
                  Video Tools
                </Link>
              </li>
              <li>
                <Link href="/categories/audio-tools" className="footer-link">
                  Audio Tools
                </Link>
              </li>
              <li>
                <Link href="/categories/converters" className="footer-link">
                  Converters
                </Link>
              </li>
              <li>
                <Link href="/categories/calculators" className="footer-link">
                  Calculators
                </Link>
              </li>
            </ul>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="footer-title">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="footer-link">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="footer-link">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="footer-link">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms-of-service" className="footer-link">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/sitemap" className="footer-link">
                  Sitemap
                </Link>
              </li>
              <li>
                <Link href="/faq" className="footer-link">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Footer */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <p>
            © {currentYear} ToolsFree Online. All rights reserved.
          </p>
          <p className="mt-2 flex items-center justify-center">
            Made with <FaHeart className="text-red-500 mx-1" /> for everyone
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
