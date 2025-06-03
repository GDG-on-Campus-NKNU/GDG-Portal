import sequelize from './server/config/database.js';
import Gallery from './server/model/galleryModel.js';

async function checkGalleryData() {
  try {
    await sequelize.authenticate();
    console.log('Database connection successful');

    // 檢查所有Gallery資料，不包括關聯
    const galleries = await Gallery.findAll({
      order: [['id', 'ASC']]
    });    console.log('\n=== ALL GALLERIES ===');
    galleries.forEach(gallery => {
      console.log(`ID: ${gallery.id}`);
      console.log(`Title: ${gallery.title}`);
      console.log(`Is Featured: ${gallery.is_featured}`);
      console.log(`Photo Count: ${gallery.photo_count}`);
      console.log(`Date Taken: ${gallery.date_taken}`);
      console.log(`Event ID: ${gallery.event_id}`);
      console.log(`Images: ${gallery.images ? gallery.images.length : 0} photos`);
      console.log('---');
    });

    // 檢查featured galleries
    const featuredGalleries = await Gallery.findAll({
      where: { is_featured: true }
    });

    console.log('\n=== FEATURED GALLERIES ONLY ===');
    console.log(`Found ${featuredGalleries.length} featured galleries`);
    featuredGalleries.forEach(gallery => {
      console.log(`- ${gallery.title} (ID: ${gallery.id})`);
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await sequelize.close();
  }
}

checkGalleryData();
