```puml

entity Announcement{
	* id : int <<PK>> <<AI>>
	  adminRole_id : int <<FK>> (author)
	--
	* heading : varchar
	* publish_date : date
		excerpt : text
	* content : text
	* isPinned : boolean
	* coverImage : blob   
}

entity AnnouncementTag {
	* id : int <<PK>> <<AI>>
	--
	* name : varchar
}

entity Announcement_AnnouncementTag {
	* announcement_id : int <<PK,FK>> <<AI>>
	* announcementTag_id          : int <<PK,FK>>
}

entity User {
	* id : int <<PK>> <<AI>>
	--
		google_id : varchar
	* name : varchar
	* avatar : blob
	* email : varchar
	* password : varchar
	*	isEmailVerified : boolean
	* lastLogin : datetime
	* refreshToken : varchar
	* isActive : boolean

}

entity Role {
  * id : int <<PK>> <<AI>>
  --
  * type : varchar
}

entity User_Role {
  * user_id : int <<PK,FK>>
  * role_id : int <<PK,FK>>
}

entity CoreRole {
	* id : int <<PK>> <<AI>>
	* user_id : int <<FK>>
	--
	* title : varchar
	* department : varchar
	* year : varchar
	* description : text
	* fullbio : text
	* contactEmail : varchar

}

entity MemberRole {
  * id : int <<PK>> <<AI>>
	* user_id : int <<FK>>
	--
	* department : varchar
	* year : varchar
}


entity AdminRole {
	* id : int <<PK>> <<AI>>
	* user.id : int <<FK>>
}

entity SocialLink {
	* id : int <<PK>> <<AI>>
	* user_id : int <<FK>>
	--
	* platform : varchar
	* url : varchar
}

entity SkillTag {
	* id : int <<PK>> <<AI>>
	--
	* name : varchar
}

entity CoreRole_SkillTag {
	* coreRole_id : int <<PK,FK>>
	* skillTag_id : int <<PK,FK>>
}

entity Achievement {
	* id : int <<PK>> <<AI>>
	* coreRole_id : int <<FK>>
	--
	* description : text
}

entity AdditionalPhoto {
	* id : int <<PK>> <<AI>>
	* user_id : int <<FK>>
	--
	* photo : blob
}

entity Event {
	* id : int <<PK>> <<AI>>
	  adminRole_id : int <<FK>> (author)
	--
	* heading : varchar
	* startDate : datetime
	* endDate : datetime
	* location : varchar
		excerpt : varchar
	* description : text
  * registrationUrl : varchar
  * coverImage : blob
}

entity EventTag {
	* id : int <<PK>> <<AI>>
	--
	* name : varchar
}

entity Event_EventTag {
	* event_id : int <<PK,FK>>
	* eventTag_id : int <<PK,FK>>
}

entity Speaker {
	* id :　int <<PK>> <<AI>>
	--
	* name : varchar
	* title : varchar
	* bio : text
	* avatar : blob
}

entity Event_Speaker {
	* event_id : int <<PK,FK>>
	* speaker_id : int <<PK,FK>>
}
 


User                ||--o{ SocialLink
User                ||--|{ User_Role
Role                ||--o{ User_Role
User                ||--o| CoreRole
User                ||--o| MemberRole
User                ||--o| AdminRole
User                ||--o{ AdditionalPhoto


CoreRole            ||--o{ Announcement
CoreRole            ||--o{ CoreRole_SkillTag
SkillTag            ||--o{ CoreRole_SkillTag

AdminRole           ||--o{ Achievement
AdminRole           ||--o{ Event

Announcement        ||--o{ Announcement_AnnouncementTag
AnnouncementTag     ||--o{ Announcement_AnnouncementTag

Event               ||--o{ Event_EventTag
EventTag            ||--o{ Event_EventTag
Event               ||--|{ Event_Speaker
Speaker             ||--o{ Event_Speaker

```
