-- 重構資料庫關係的SQL腳本
-- 這個腳本會重建所有表格之間的外鍵關係，但不會修改或刪除現有資料

-- 確保使用正確的資料庫
USE `dev_gdg`;

-- 開始重建外鍵關係
SELECT 'Begin rebuilding foreign key relationships' AS 'Info';

-- ===== 一級關係 =====

-- 添加 profiles 表的外鍵
SELECT 'Adding foreign key to profiles table...' AS 'Info';
ALTER TABLE profiles
ADD CONSTRAINT fk_profiles_users
FOREIGN KEY (user_id) REFERENCES users(id) 
ON DELETE CASCADE ON UPDATE CASCADE;

-- 添加 core_teams 表的外鍵
SELECT 'Adding foreign key to core_teams table...' AS 'Info';
ALTER TABLE core_team
ADD CONSTRAINT fk_core_team_users
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE SET NULL ON UPDATE CASCADE;

-- 添加 events 表的外鍵 (如果有 created_by 欄位)
SELECT 'Checking and adding foreign key to events table...' AS 'Info';
SET @column_exists = 0;
SELECT COUNT(*) INTO @column_exists 
FROM information_schema.columns 
WHERE table_schema = DATABASE() 
AND table_name = 'events' 
AND column_name = 'created_by';

SET @sql = IF(@column_exists > 0, 
    'ALTER TABLE events
     ADD CONSTRAINT fk_events_users
     FOREIGN KEY (created_by) REFERENCES users(id)
     ON DELETE SET NULL ON UPDATE CASCADE',
    'SELECT "created_by column does not exist in events table, skipping" AS "Info"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 添加 announcements 表的外鍵 (如果有 created_by 欄位)
SELECT 'Checking and adding foreign key to announcements table...' AS 'Info';
SET @column_exists = 0;
SELECT COUNT(*) INTO @column_exists 
FROM information_schema.columns 
WHERE table_schema = DATABASE() 
AND table_name = 'announcements' 
AND column_name = 'created_by';

SET @sql = IF(@column_exists > 0, 
    'ALTER TABLE announcements
     ADD CONSTRAINT fk_announcements_users
     FOREIGN KEY (created_by) REFERENCES users(id)
     ON DELETE SET NULL ON UPDATE CASCADE',
    'SELECT "created_by column does not exist in announcements table, skipping" AS "Info"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- ===== 二級關係 =====

-- 添加 event_registrations 表的外鍵
SELECT 'Adding foreign keys to event_registrations table...' AS 'Info';

-- 用戶關係
ALTER TABLE event_registrations
ADD CONSTRAINT fk_event_registrations_users
FOREIGN KEY (user_id) REFERENCES users(id)
ON DELETE CASCADE ON UPDATE CASCADE;

-- 活動關係
ALTER TABLE event_registrations
ADD CONSTRAINT fk_event_registrations_events
FOREIGN KEY (event_id) REFERENCES events(id)
ON DELETE CASCADE ON UPDATE CASCADE;

-- 添加 galleries 表的外鍵
SELECT 'Adding foreign keys to galleries table...' AS 'Info';

-- 創建者關係
ALTER TABLE gallery
ADD CONSTRAINT fk_galleries_users
FOREIGN KEY (created_by) REFERENCES users(id)
ON DELETE SET NULL ON UPDATE CASCADE;

-- 活動關係 (如果有 event_id 欄位)
SET @column_exists = 0;
SELECT COUNT(*) INTO @column_exists 
FROM information_schema.columns 
WHERE table_schema = DATABASE() 
AND table_name = 'galleries' 
AND column_name = 'event_id';

SET @sql = IF(@column_exists > 0, 
    'ALTER TABLE galleries
     ADD CONSTRAINT fk_galleries_events
     FOREIGN KEY (event_id) REFERENCES events(id)
     ON DELETE SET NULL ON UPDATE CASCADE',
    'SELECT "event_id column does not exist in galleries table, skipping" AS "Info"');
PREPARE stmt FROM @sql;
EXECUTE stmt;
DEALLOCATE PREPARE stmt;

-- 添加 core_team_categories 表的外鍵
SELECT 'Adding foreign keys to core_team_categories table...' AS 'Info';
ALTER TABLE core_team_categories
ADD CONSTRAINT fk_core_team_categories_core_teams
FOREIGN KEY (member_id) REFERENCES core_teams(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE core_team_categories
ADD CONSTRAINT fk_core_team_categories_categories
FOREIGN KEY (category_id) REFERENCES categories(id)
ON DELETE CASCADE ON UPDATE CASCADE;

-- 添加 event_speakers 表的外鍵
SELECT 'Adding foreign keys to event_speakers table...' AS 'Info';
ALTER TABLE event_speakers
ADD CONSTRAINT fk_event_speakers_events
FOREIGN KEY (event_id) REFERENCES events(id)
ON DELETE CASCADE ON UPDATE CASCADE;

-- 添加 event_tag_relationships 表的外鍵
SELECT 'Adding foreign keys to event_tag_relationships table...' AS 'Info';
ALTER TABLE event_tag_relationships
ADD CONSTRAINT fk_event_tag_relationships_events
FOREIGN KEY (event_id) REFERENCES events(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE event_tag_relationships
ADD CONSTRAINT fk_event_tag_relationships_event_tags
FOREIGN KEY (tag_id) REFERENCES event_tags(id)
ON DELETE CASCADE ON UPDATE CASCADE;

-- 添加 announcement_tag_relationships 表的外鍵
SELECT 'Adding foreign keys to announcement_tag_relationships table...' AS 'Info';
ALTER TABLE announcement_tag_relationships
ADD CONSTRAINT fk_announcement_tag_relationships_announcements
FOREIGN KEY (announcement_id) REFERENCES announcements(id)
ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE announcement_tag_relationships
ADD CONSTRAINT fk_announcement_tag_relationships_announcement_tags
FOREIGN KEY (tag_id) REFERENCES announcement_tags(id)
ON DELETE CASCADE ON UPDATE CASCADE;

-- 完成
SELECT 'All foreign key relationships have been rebuilt successfully' AS 'Info';
