USE [BookSaleDbManagement]
GO
/****** Object:  Table [dbo].[Book]    Script Date: 11/26/2023 12:01:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Book](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Code] [nvarchar](20) NOT NULL,
	[Title] [nvarchar](500) NOT NULL,
	[Available] [int] NOT NULL,
	[Cost] [float] NOT NULL,
	[Publisher] [nvarchar](500) NULL,
	[Author] [nvarchar](250) NOT NULL,
	[CreatedOn] [datetime2](7) NOT NULL,
	[GenreId] [int] NOT NULL,
	[IsActive] [bit] NOT NULL,
	[Description] [nvarchar](max) NOT NULL,
 CONSTRAINT [PK_Book] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Genre]    Script Date: 11/26/2023 12:01:27 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Genre](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Name] [nvarchar](500) NOT NULL,
	[IsActive] [bit] NOT NULL,
 CONSTRAINT [PK_Genre] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Book] ON 

INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (13, N'0Z0SHt19JK', N'The Shining', 100, 12000, NULL, N'Stephen King', CAST(N'2023-10-25T00:00:00.0000000' AS DateTime2), 3, 1, N'he Shining is a 1977 horror novel by American author Stephen King. It is King''s third published novel and first hardcover bestseller; its success firmly established King as a preeminent author in the horror genre.')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (14, N'qzZX5mULMR', N'The Hundred Years'' War on Palestine', 34, 120000, NULL, N'Rashid Khalidi', CAST(N'2023-11-26T11:17:37.1340042' AS DateTime2), 2, 1, N'In 1899, Yusuf Diya al-Khalidi, mayor of Jerusalem, alarmed by the Zionist call to create a Jewish national home in Palestine, wrote a letter aimed at Theodore Herzl: the country had an indigenous people who would not easily accept their own displacement.')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (15, N'PP8pNpCucW', N'America (12th ed.)', 50, 67000, NULL, N'David E. Shi', CAST(N'2023-11-26T11:19:34.1280879' AS DateTime2), 2, 1, N'The best-selling storytelling approach with tools that develop history skills')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (16, N'rnHpK2oOMc', N'Dark Sun', 40, 150000, NULL, N'Richard Rhodes', CAST(N'2023-11-26T11:20:49.5335325' AS DateTime2), 2, 1, N'Here, for the first time, in a brilliant, panoramic portrait by the Pulitzer Prize-winning author of The Making of the Atomic Bomb, is the definitive, often shocking story of the politics and the science behind the development of the hydrogen bomb')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (18, N'UBH1y!VPtn', N'A Revolution Down on the Farm', 50, 80000, NULL, N'Paul K. Conkin', CAST(N'2023-11-26T11:22:24.0086348' AS DateTime2), 2, 1, N'Agriculture is the most fundamental of all human activities. Today, those who till the soil or tend livestock feed a world population of approximately 6.5 billion.')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (19, N'wZxiyo@56H', N'Latin America in Colonial Times (2nd ed.)', 200, 85000, NULL, N'Matthew Restall, Kris Lane', CAST(N'2023-11-26T11:28:31.4693928' AS DateTime2), 2, 1, N'This second edition is a concise history of Latin America from the Aztecs and Incas to Independence.')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (20, N'u3RxH2@uRk', N'Art Theory: A Very Short Introduction', 54, 47000, NULL, N'Cynthia Freeland', CAST(N'2023-11-26T11:29:58.8216279' AS DateTime2), 3, 1, N'Cynthia Freeland explains why innovation and controversy are valued in the arts, weaving together philosophy, art theory, and many engrossing examples. She discusses blood, beauty, culture, money, sex, web sites, and research on the brain''s role in perceiving art.')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (21, N'gJSZCcYNt8', N'Everyday Watercolor', 100, 99000, NULL, N'Jenna Rainey', CAST(N'2023-11-26T11:31:13.2637955' AS DateTime2), 3, 1, N'A contemporary paint-every-day watercolor guide that explores foundational strokes and patterns and then builds new skills upon the foundations over the course of 30 days to create finished pieces. ')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (22, N'PszwVwhAR8', N'Grammar of the Edit (5th ed.)', 40, 145000, NULL, N'Christopher J. Bowen', CAST(N'2023-11-26T11:33:27.6365147' AS DateTime2), 3, 1, N'This newly revised and updated fifth edition of Grammar of the Edit will teach anyone who needs to use video as a communication tool how to show more effective visual stories. This accessible resource presents both traditional and cutting-edge methodologies that address the all-important questions of when to cut and why')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (23, N'p05e7wZDp8', N'Standing Soldiers, Kneeling Slaves (2nd ed.)', 53, 100000, NULL, N'Kirk Savage', CAST(N'2023-11-26T11:35:25.9125430' AS DateTime2), 3, 1, N'A history of U.S. Civil War monuments that shows how they distort history and perpetuate white supremacy The United States began as a slave society, holding millions of Africans and their descendants in bondage')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (24, N'I2HHP#kkPI', N'John Carpenters Toxic Commando Rise Of The Sludge God #1', 200, 18000, NULL, N'Michael Moreci ', CAST(N'2023-11-26T11:38:38.5546932' AS DateTime2), 1, 1, N'A normal day for Obsidian CEO Leon Dorsey becomes horrific when his search for clean energy accidentally awakens an ancient, Sludgey evil. Humanity''s last hope against a toxic future rests with a private group of commandos... Written by Michael Morecci and featuring artwork by Alberto J. Albuquerque, Rise of the Sludge God is a prequel to the upcoming game by Saber Interactive & Focus Entertainment, John Carpenter''s Toxic Commando."')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (25, N'iV61uvPMoh', N'Goon Them That Dont Stay Dead #1', 120, 21000, NULL, N' Eric Powell', CAST(N'2023-11-26T11:40:59.4843032' AS DateTime2), 1, 1, N'To mark the 25th anniversary of The Goon, Eric Powell returns with an all-new miniseries, Them That Don''t Stay Dead! The return to Lonely Street hasn''t been easy for the Goon and Franky. And just as they''ve finally got the various gangs of blood suckers and night stalkers back in line, and they can finally relax with a nice night out bowling, a new threat appears. ')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (26, N'tG6T7ORZLJ', N'One Piece Vol 100 Wano GN', 200, 180000, NULL, N'Eiichiro Oda ', CAST(N'2023-11-26T11:43:02.8294160' AS DateTime2), 1, 1, N'The big powers converge as Luffy, Law and Kid face off against Kaido and Big Mom. Is there any hope of victory against this ultimate alliance?! Onigashima quakes with power as some of the fiercest pirates in the world go head-to-head!!')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (27, N'0nMmtHL5HM', N'One Piece Wano 94-95-96 TP', 80, 90000, NULL, N'Eiichiro Oda ', CAST(N'2023-11-26T11:51:18.9363682' AS DateTime2), 1, 1, N'In the land of Wano, Luffy and the Straw Hats hastily attempt to recruit allies in preparation for an imminent raid. But unbeknownst to the crew, the balance of world power is about to be thrown further askew when Big Mom shows up and forms a pirate alliance with Kaido! How will this potent union affect Luffy''s recovering crew?')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (28, N'Nxq76CnMhd', N'My Hero Academia Official Easy Illustration Guide TP', 70, 30000, NULL, N'Kouhei Horikoshi ', CAST(N'2023-11-26T11:52:35.4148192' AS DateTime2), 1, 1, N'Take your art PLUS ULTRA!! with My Hero Academia: The Official Easy Illustration Guide. Mika Fujisawa is here to teach you the quickest and most fun way to draw your favorite heroes, whether you''ve never picked up a pencil or you''re already a manga master!')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (29, N'CN6WKOLLoY', N'Kaiju No 8 Vol 8 GN', 170, 28000, NULL, N'Naoyo Matsumoto', CAST(N'2023-11-26T11:53:54.7328733' AS DateTime2), 1, 1, N'Reno''s chance to show off the fruits of his Numbers Weapon training arrives when he''s ordered to take part in a live kaiju-combat field test. Meanwhile, Iharu, feeling left behind after witnessing Reno''s explosive progress, shifts his focus to improving his own skills-that is, until an abnormality strikes Reno during their neutralization mission and forces Iharu into action!')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (30, N'yzK!Ll5x#s', N'Record Of Ragnarok Vol 8 GN', 130, 28000, NULL, N'Shinya Umemura ', CAST(N'2023-11-26T11:55:09.2487733' AS DateTime2), 1, 1, N'Humanity''s greatest heroes battle the gods for the survival of the human race! Once every millennium, the gods assemble to decide if humanity is worthy of its continued existence or if it should be destroyed! When the verdict is destruction, the final battle between the gods and mortal heroes will decide the survival or extinction of the human race-a battle known as Ragnarok! Round four of Ragnarok has ended in a shocking win for humanity, with Jack the Ripper standing victorious over the fallen Heracles. With the score now tied, the gods are absolutely determined not to let humanity get ahead. Raring to go since the start, Shiva, the Destroyer, finally gets his chance to enter the Valhalla arena. With an opportunity to take the lead, Brunhilde calls upon the unbridled strength of the greatest (and horniest) sumo wrestler in history, Raiden Tameemon!')
INSERT [dbo].[Book] ([Id], [Code], [Title], [Available], [Cost], [Publisher], [Author], [CreatedOn], [GenreId], [IsActive], [Description]) VALUES (31, N'N#96C#SFpR', N'Betwixt A Horror Manga Anthology HC', 80, 35000, N'Various', N'Various', CAST(N'2023-11-26T11:56:28.7612385' AS DateTime2), 1, 1, N'Manga creators from Japan and the US present an international showcase of horror. Collected for the first time in Betwixt: A Horror Manga Anthology, six short stories reveal the universal fear of the space between the known and unknown. Will anyone cross that border?')
SET IDENTITY_INSERT [dbo].[Book] OFF
GO
SET IDENTITY_INSERT [dbo].[Genre] ON 

INSERT [dbo].[Genre] ([Id], [Name], [IsActive]) VALUES (1, N'Comic', 1)
INSERT [dbo].[Genre] ([Id], [Name], [IsActive]) VALUES (2, N'History', 1)
INSERT [dbo].[Genre] ([Id], [Name], [IsActive]) VALUES (3, N'Arts', 1)
SET IDENTITY_INSERT [dbo].[Genre] OFF
GO
ALTER TABLE [dbo].[Book] ADD  CONSTRAINT [DF__Book__Descriptio__75A278F5]  DEFAULT (N'') FOR [Description]
GO
ALTER TABLE [dbo].[Book]  WITH CHECK ADD  CONSTRAINT [FK_Book_Genre_GenreId] FOREIGN KEY([GenreId])
REFERENCES [dbo].[Genre] ([Id])
ON DELETE CASCADE
GO
ALTER TABLE [dbo].[Book] CHECK CONSTRAINT [FK_Book_Genre_GenreId]
GO
