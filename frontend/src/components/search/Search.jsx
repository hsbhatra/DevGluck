import React from 'react';
import { SearchIcon } from "lucide-react";

export default function Search() {
  return (
    <div className="w-1/2 max-w-md relative">
        <input
          type="text"
          placeholder="Search..."
          className="w-full px-4 py-2 pl-10 rounded-md border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
        <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
    </div>
  )
}
