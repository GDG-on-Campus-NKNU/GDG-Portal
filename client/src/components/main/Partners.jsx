export function Partners() {  
 return (  
   <section className="mt-12 mb-8">
     <h2 className="text-3xl font-bold bg-gradient-to-r from-slate-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-8 text-center tracking-tight">
       合作夥伴
     </h2>
     <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
       <a href="https://www.secondspace.dev/zh/" target="_blank" rel="noopener noreferrer" className="group">
         <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 overflow-hidden">
           {/* 背景光暈效果 */}
           <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
           <img 
             src="/assets/SecondSpace.svg" 
             alt="Partner 1" 
             className="h-12 grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10" 
           />
         </div>
       </a>
       
       <a href="https://placeholder.com" target="_blank" rel="noopener noreferrer" className="group">
         <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-green-400/10 to-blue-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
           <img 
             src="/api/placeholder/120/60" 
             alt="Partner 2" 
             className="h-12 grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10" 
           />
         </div>
       </a>
       
       <a href="https://placeholder.com" target="_blank" rel="noopener noreferrer" className="group">
         <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 to-pink-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
           <img 
             src="/api/placeholder/120/60" 
             alt="Partner 3" 
             className="h-12 grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10" 
           />
         </div>
       </a>
       
       <a href="https://placeholder.com" target="_blank" rel="noopener noreferrer" className="group">
         <div className="relative bg-white/70 backdrop-blur-xl border border-white/20 rounded-3xl p-6 shadow-xl hover:shadow-2xl transform hover:scale-110 transition-all duration-300 overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-br from-orange-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
           <img 
             src="/api/placeholder/120/60" 
             alt="Partner 4" 
             className="h-12 grayscale group-hover:grayscale-0 transition-all duration-300 relative z-10" 
           />
         </div>
       </a>
     </div>
   </section>  
 );  
}
