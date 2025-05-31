import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Navbar } from '../components/general/Navbar';
import { Footer } from '../components/Footer';
import { BackgroundEffects } from '../components/general/BackgroundEffects';
import { ScrollEffects } from '../components/general/ScrollEffects';
import PageBanner from '../components/general/PageBanner';
import GalleryFilterSection from '../components/event/GalleryFilterSection';
import GalleryGrid from '../components/event/GalleryGrid';
import GallerySidebar from '../components/event/GallerySidebar';
import GalleryModal from '../components/event/GalleryModal';
import LoadingSpinner from '../components/general/LoadingSpinner';
import galleryData from '../data/gallery.json';

export default function EventGalleryPage() {
  const [galleries, setGalleries] = useState([]);
  const [filteredGalleries, setFilteredGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentGallery, setCurrentGallery] = useState(null);
  const [filters, setFilters] = useState({
    keyword: '',
    eventType: '',
    year: '',
    tags: []
  });

  // 模擬載入數據
  useEffect(() => {
    const loadGalleries = async () => {
      setLoading(true);
      // 模擬 API 呼叫延遲
      await new Promise(resolve => setTimeout(resolve, 1000));
      setGalleries(galleryData.galleries);
      setFilteredGalleries(galleryData.galleries);
      setLoading(false);
    };

    loadGalleries();
  }, []);

  // 篩選邏輯
  useEffect(() => {
    let filtered = galleries;

    if (filters.keyword) {
      filtered = filtered.filter(gallery =>
        gallery.title.toLowerCase().includes(filters.keyword.toLowerCase()) ||
        gallery.description.toLowerCase().includes(filters.keyword.toLowerCase())
      );
    }

    if (filters.eventType) {
      filtered = filtered.filter(gallery => gallery.eventType === filters.eventType);
    }

    if (filters.year) {
      filtered = filtered.filter(gallery => 
        new Date(gallery.date).getFullYear().toString() === filters.year
      );
    }

    if (filters.tags.length > 0) {
      filtered = filtered.filter(gallery =>
        filters.tags.every(tag => 
          gallery.tags.some(galleryTag => 
            galleryTag.toLowerCase().includes(tag.toLowerCase())
          )
        )
      );
    }

    setFilteredGalleries(filtered);
  }, [filters, galleries]);

  // 動畫設定
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10
      }
    }
  };

  const handleImageClick = (image, gallery) => {
    setSelectedImage(image);
    setCurrentGallery(gallery);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
    setCurrentGallery(null);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      keyword: '',
      eventType: '',
      year: '',
      tags: []
    });
  };

  const handleTagClick = (tag) => {
    setFilters(prev => ({
      ...prev,
      tags: prev.tags.includes(tag) 
        ? prev.tags.filter(t => t !== tag)
        : [...prev.tags, tag]
    }));
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-slate-50 via-indigo-50/30 to-purple-50/50 text-slate-800 relative overflow-hidden">
      {/* 動態背景效果 */}
      <BackgroundEffects />
      
      {/* 滾動效果 */}
      <ScrollEffects />

      <Navbar />
      
      <motion.main
        initial="hidden"
        animate="show"
        variants={containerVariants}
        className="flex-1 w-full max-w-[1400px] mx-auto px-6 lg:px-8 xl:px-12 py-8 relative z-10"
      >
        {/* Header Banner */}
        <motion.div variants={itemVariants} className="mb-8">
          <PageBanner
            title="活動相簿"
            description="回顧 GDG on Campus NKNU 的精彩時光，透過照片重溫每一個難忘的學習與交流時刻。"
            style="relative bg-gradient-to-br from-indigo-600/90 via-purple-600/80 to-pink-700/90 backdrop-blur-sm rounded-2xl p-6 lg:p-8 text-white shadow-2xl overflow-hidden"
          />
        </motion.div>

        <div className="flex flex-col xl:flex-row gap-8 xl:gap-10">
          {/* Main Content Area */}
          <motion.div
            variants={itemVariants}
            className="flex-1 xl:flex-grow space-y-8"
          >
            {/* Filter Section */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-6 shadow-xl border border-white/20">
              <GalleryFilterSection
                filters={filters}
                onFiltersChange={handleFiltersChange}
                onClearFilters={handleClearFilters}
                eventTypes={galleryData.eventTypes}
                years={galleryData.years}
              />
            </div>

            {/* Gallery Grid */}
            {loading ? (
              <div className="flex justify-center p-20">
                <LoadingSpinner size={16} />
              </div>
            ) : (
              <GalleryGrid
                galleries={filteredGalleries}
                onImageClick={handleImageClick}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
              />
            )}
          </motion.div>

          {/* Sidebar */}
          <GallerySidebar 
            galleries={galleries}
            eventTypes={galleryData.eventTypes}
            totalImages={galleries.reduce((sum, gallery) => sum + gallery.imageCount, 0)}
            onTagClick={handleTagClick}
          />
        </div>
      </motion.main>

      {/* Image Modal */}
      {selectedImage && currentGallery && (
        <GalleryModal
          image={selectedImage}
          gallery={currentGallery}
          onClose={handleCloseModal}
        />
      )}
      
      <Footer />
    </div>
  );
}
