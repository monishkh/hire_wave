import React from "react";
import { InstagramIcon, FacebookIcon, X } from "lucide-react"; // Import social media icons

const Footer = () => {
    return (
        <footer className="bg-slate-100 py-10 ">
            <div className="container mx-auto flex flex-col items-center md:flex-row md:justify-between">

                
                <div className="mb-4 md:mb-0 text-center md:text-left">
                    <h1 className='text-3xl font-bold cursor-pointer ' > Hire<span className='text-blue-500 text-1sxl' >Wave</span> </h1>
                    <p className="text-gray-500 bold">Connecting talent with opportunity.</p>
                </div>


                <div className="flex space-x-4">
                    <InstagramIcon className="w-6 h-6 hover:text-pink-500" />
                    <FacebookIcon className="w-6 h-6 hover:text-blue-600" />
                    <X className="w-6 h-6 hover:text-blue-400" />

                </div>
            </div>
        </footer>
    );
};

export default Footer;
