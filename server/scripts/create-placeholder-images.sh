#!/bin/bash
# 創建佔位圖片檔案

echo "🖼️ 創建佔位圖片檔案..."

# 創建成員圖片
touch "/workspaces/GDG-Portal/client/public/assets/members/yen_profile.jpg"

# 創建相簿封面圖片
touch "/workspaces/GDG-Portal/client/public/assets/gallery/founding_event/cover.jpg"
touch "/workspaces/GDG-Portal/client/public/assets/gallery/react_workshop/cover.jpg"
touch "/workspaces/GDG-Portal/client/public/assets/gallery/gcp_lecture/cover.jpg"
touch "/workspaces/GDG-Portal/client/public/assets/gallery/team_building/cover.jpg"

echo "✅ 佔位圖片檔案創建完成！"
echo ""
echo "📁 創建的檔案："
echo "  - /assets/members/yen_profile.jpg"
echo "  - /assets/gallery/founding_event/cover.jpg"
echo "  - /assets/gallery/react_workshop/cover.jpg"
echo "  - /assets/gallery/gcp_lecture/cover.jpg"
echo "  - /assets/gallery/team_building/cover.jpg"
echo ""
echo "💡 這些是空的佔位檔案，您可以稍後替換為實際的圖片。"
