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
import { useGalleryData, useGalleryStats } from '../hooks/useGalleryData';
import galleryData from '../data/gallery.json';

export default function EventGalleryPage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentGallery, setCurrentGallery] = useState(null);
  const [filters, setFilters] = useState({
    keyword: '',
    eventType: '',
    year: '',
    tags: []
  });

  // 使用 hook 獲取相簿資料
  const {
    galleries,
    loading,
    error,
    totalPages,
    totalImages
  } = useGalleryData({
    page: 1,
    limit: 50, // 一次載入較多資料，避免分頁問題
    keyword: filters.keyword,
    eventType: filters.eventType,
    year: filters.year,
    tags: filters.tags
  });

  // 使用 hook 獲取統計資料
  const { stats, loading: statsLoading } = useGalleryStats();

  // 頁面載入時滾動到頂部
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

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

  // 使用統計資料或 fallback 到 JSON 資料
  const eventTypes = stats.eventTypes?.length > 0 ? stats.eventTypes : galleryData.eventTypes;
  const years = stats.years?.length > 0 ? stats.years : galleryData.years;
  const displayTotalImages = totalImages > 0 ? totalImages : galleryData.galleries?.reduce((sum, gallery) => sum + gallery.imageCount, 0) || 0;

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
                eventTypes={eventTypes}
                years={years}
              />
            </div>

            {/* Error Display */}
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
                <div className="text-red-600 font-medium mb-2">載入失敗</div>
                <div className="text-red-500 text-sm">{error}</div>
              </div>
            )}

            {/* Gallery Grid */}
            {loading ? (
              <div className="flex justify-center p-20">
                <LoadingSpinner size={16} />
              </div>
            ) : (
              <GalleryGrid
                galleries={galleries}
                onImageClick={handleImageClick}
                containerVariants={containerVariants}
                itemVariants={itemVariants}
              />
            )}
          </motion.div>

          {/* Sidebar */}
          <GallerySidebar 
            galleries={galleries}
            eventTypes={eventTypes}
            totalImages={displayTotalImages}
            onTagClick={handleTagClick}
            loading={statsLoading}
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
