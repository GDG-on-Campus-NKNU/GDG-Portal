   import { useEffect } from 'react';

   export function usePageShow(callback) {
     useEffect(() => {
       const handlePageShow = (event) => {
         if (event.persisted) {
           callback();
         }
       };

       window.addEventListener('pageshow', handlePageShow);
       return () => {
         window.removeEventListener('pageshow', handlePageShow);
       };
     }, [callback]);
   }
