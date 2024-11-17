"use client";

import { Facebook, Instagram, LinkedIn, X } from '@mui/icons-material';
import React from 'react';

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 inconsolata">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between">
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">The Ndaobong Family</h2>
            <p className="text-gray-400">
              God's own Family!
            </p>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul>
              <li><a href="#about" className="hover:underline">About Us</a></li>
              <li><a href="#contact" className="hover:underline">Contact</a></li>
              <li><a href="#terms" className="hover:underline">Terms of Service</a></li>
              <li><a href="#privacy" className="hover:underline">Privacy Policy</a></li>
            </ul>
          </div>
          <div className="mb-4 md:mb-0">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#fb" rel="noopener noreferrer" className="hover:text-gray-300"><Facebook/></a>
              <a href="#x" rel="noopener noreferrer" className="hover:text-gray-300"><X/></a>
              <a href="#insta" rel="noopener noreferrer" className="#"><Instagram/></a>
              <a href="#linked" rel="noopener noreferrer" className="hover:text-gray-300"><LinkedIn/></a>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Subscribe to Our Newsletter</h3>
          <form className="flex flex-col md:flex-row">
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded-l-md focus:outline-none  text-black"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 p-2 rounded-r-md hover:bg-blue-700 transition duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
        <div className="mt-4 text-center">
          <p className="text-gray-400">&copy; {new Date().getFullYear()} Ndaobong Family Catalogue. Built with 🖤 by Ndaobong Brothers.</p>
        </div>
      </div>
    </footer>
  );
}
