# Clear existing data in development
if Rails.env.development?
  puts "Clearing existing data..."
  Comment.destroy_all
  ForumPost.destroy_all
  Subforum.destroy_all
  Forum.destroy_all
  ListingImage.destroy_all
  Listing.destroy_all
  ProfilePicture.destroy_all
  Address.destroy_all
  ArtistResource.destroy_all
  Residency.destroy_all
  User.destroy_all
  Borough.destroy_all
  puts "✓ Existing data cleared"
end

puts "🎨 Seeding RARE NY Database..."

# Seed Boroughs
puts "\n📍 Creating NYC Boroughs..."
boroughs = {}
['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'].each do |name|
  boroughs[name] = Borough.create!(name: name)
  puts "  ✓ #{name}"
end

# Seed Users (Artists)
puts "\n👩‍🎨 Creating Artist Profiles..."
disciplines = [
  'Visual Artist', 'Photographer', 'Sculptor', 'Painter', 'Digital Artist',
  'Mixed Media', 'Ceramics', 'Printmaking', 'Installation Artist', 'Performance Artist',
  'Street Artist', 'Textile Artist', 'Video Artist', 'Sound Artist', 'Conceptual Artist'
]

artist_usernames = [
  'studio_maven', 'clay_dreamer', 'pixel_painter', 'bronze_sculptor', 'light_weaver',
  'canvas_rebel', 'digital_mystic', 'street_poet', 'ceramic_soul', 'print_wizard',
  'mixed_visions', 'color_alchemist', 'space_creator', 'sound_sculptor', 'visual_nomad',
  'art_explorer', 'texture_hunter', 'form_finder', 'paint_dancer', 'lens_master',
  'creative_spirit', 'art_wanderer', 'studio_dweller', 'color_keeper', 'shape_shifter',
  'art_dreamer', 'visual_storyteller', 'creative_soul', 'art_seeker', 'studio_sage'
]

users = []
30.times do |i|
  username = artist_usernames[i] || "artist_#{i + 1}"
  discipline = disciplines.sample
  
  bio_options = [
    "#{discipline} based in NYC. Exploring themes of urban identity and community through #{discipline.downcase} work. Graduate of #{['Parsons', 'SVA', 'Pratt', 'NYU', 'Columbia'].sample}.",
    "Emerging #{discipline.downcase} focused on #{['sustainability', 'social justice', 'human connection', 'cultural identity', 'technological integration'].sample}. Looking to connect with fellow artists and find affordable studio space.",
    "Established #{discipline.downcase} with #{rand(5..20)} years experience. Work has been shown in galleries across NYC. Passionate about mentoring emerging artists.",
    "#{discipline} working primarily with #{['found materials', 'traditional techniques', 'digital media', 'mixed materials', 'experimental processes'].sample}. Always seeking new collaborations and studio opportunities.",
    "Brooklyn-based #{discipline.downcase} exploring #{['memory and place', 'identity and belonging', 'nature in urban spaces', 'community and connection', 'time and transformation'].sample}. Open to studio shares and artist exchanges."
  ]
  
  website_options = [
    "https://#{username}.com",
    "https://www.instagram.com/#{username}",
    "https://#{username}.cargo.site",
    "https://www.behance.net/#{username}",
    nil
  ]
  
  user = User.create!(
    username: username,
    password: 'password123',
    discipline: discipline,
    bio: bio_options.sample,
    website: website_options.sample,
    created_at: rand(2.years.ago..1.week.ago)
  )
  users << user
  puts "  ✓ #{username} (#{discipline})"
end

# Seed Forums and Subforums
puts "\n💬 Creating Forum Structure..."
forum_data = {
  'General Discussion' => ['Welcome & Introductions', 'Community Announcements', 'General Chat', 'NYC Art Scene'],
  'Opportunities' => ['Calls for Artists', 'Exhibitions', 'Grants & Funding', 'Residencies', 'Collaborations'],
  'Critiques & Feedback' => ['Work in Progress', 'Finished Pieces', 'Portfolio Reviews'],
  'Technical & Materials' => ['Traditional Techniques', 'Digital Tools', 'Material Sources', 'Studio Setup'],
  'Local NYC' => ['Manhattan Events', 'Brooklyn Scene', 'Queens Artists', 'Bronx Community', 'Staten Island'],
  'Marketplace' => ['Studio Spaces', 'Equipment For Sale', 'Materials Exchange', 'Services Offered']
}

forums = {}
forum_data.each do |forum_name, subforum_names|
  forum = Forum.create!(name: forum_name)
  forums[forum_name] = forum
  puts "  ✓ #{forum_name}"
  
  subforum_names.each do |subforum_name|
    Subforum.create!(name: subforum_name, forum: forum)
    puts "    • #{subforum_name}"
  end
end

# Seed Artist Resources
puts "\n🏢 Creating Artist Resources..."
resource_data = {
  'Manhattan' => [
    {name: 'Guerra Paint & Pigment', location: 'East Village', phone: 2125290628, website: 'http://www.guerrapaint.com/', description: 'At Guerra Paint and Pigment Corp., we specialize in color. Since 1986 we have produced the largest selection of water based single pigment concentrates in the world.'},
    {name: 'Soho Art Materials', location: 'Soho', phone: 2124313938, website: 'https://sohoartmaterials.com/', description: 'The last independent art supply shop in NYC, serving artists since 1999 with high-quality materials and expert advice.'},
    {name: 'Canal Plastics Center', location: 'Chinatown', phone: 2129251032, website: 'https://www.canalplastic.com/', description: 'Plastics and fabrication services specializing in hard to find acrylic colors and small-scale projects for artists and designers.'},
    {name: 'Printed Matter, Inc.', location: 'Chelsea', phone: 2129250325, website: 'https://www.printedmatter.org/', description: 'The world\'s leading non-profit organization dedicated to artists\' books and related publications.'},
    {name: 'Materials for the Arts', location: 'LIC', phone: 7182784240, website: 'https://www1.nyc.gov/site/dcla/services/materials-for-the-arts.page', description: 'NYC\'s creative reuse program providing free materials to artists, teachers, and nonprofits.'},
    {name: 'Tenement Museum Shop', location: 'Lower East Side', phone: 2124318865, website: 'https://www.tenement.org/', description: 'Unique art supplies and books focusing on immigrant and working-class history.'},
    {name: 'Paula Cooper Gallery', location: 'Chelsea', phone: 2122550247, website: 'https://paulacoopergallery.com/', description: 'Pioneer contemporary art gallery showcasing established and emerging artists since 1968.'},
    {name: 'The Drawing Center', location: 'Soho', phone: 2122194166, website: 'https://drawingcenter.org/', description: 'The only nonprofit museum in the US focused solely on the exhibition of drawings.'},
    {name: 'Apex Art', location: 'Tribeca', phone: 2127359119, website: 'https://www.apexart.org/', description: 'Alternative exhibition space supporting experimental curatorial projects and emerging artists.'},
    {name: 'Camera Club of New York', location: 'Midtown', phone: 2126622430, website: 'https://www.cameraclubny.org/', description: 'Historic photography organization offering darkroom access and community for photographers.'},
    {name: 'Open Studio Project', location: 'East Village', phone: 2122280051, website: 'https://www.openstudioproject.com/', description: 'Affordable printmaking studio and gallery space for artists at all levels.'},
    {name: 'ABC No Rio', location: 'Lower East Side', phone: 2124540718, website: 'http://www.abcnorio.org/', description: 'Collectively-run center for art and activism with darkroom, gallery, and community programs.'}
  ],
  'Brooklyn' => [
    {name: 'Artist & Craftsman Supply', location: 'Park Slope', phone: 7184998080, website: 'https://artistcraftsman.com/', description: 'Art supply store offering a wide range of materials for traditional and contemporary art practices.'},
    {name: 'Simon Liu, Inc.', location: 'Greenwood', phone: 7185672011, website: 'https://simonliuinc.com/', description: 'Fine art supports with mechanical engineering expertise, serving conservators, artists, and museums.'},
    {name: 'Picture Room', location: 'Brooklyn Heights', phone: 3479874675, website: 'https://pictureroom.shop/', description: 'Gallery and shop selling work by emerging and established contemporary artists, plus rare prints and books.'},
    {name: 'Gowanus Print Lab', location: 'Gowanus', phone: 7183692763, website: 'https://www.gowanusprintlab.com/', description: 'Community printmaking studio offering workshops, residencies, and equipment access.'},
    {name: 'Morbid Anatomy Museum', location: 'Gowanus', phone: 3479995700, website: 'https://www.morbidanatomymuseum.org/', description: 'Museum and library focusing on the intersections of art and medicine, death and culture.'},
    {name: 'Industry City', location: 'Sunset Park', phone: 7186881911, website: 'https://industrycity.com/', description: '16-building complex with artist studios, maker spaces, and creative businesses.'},
    {name: 'Brooklyn Museum Art School', location: 'Crown Heights', phone: 7186383341, website: 'https://www.brooklynmuseum.org/education/adult_programs', description: 'Art classes and workshops for adults in painting, drawing, sculpture, and more.'},
    {name: 'Pioneer Works', location: 'Red Hook', phone: 7182221607, website: 'https://pioneerworks.org/', description: 'Cultural center supporting innovative and interdisciplinary work in the arts and sciences.'},
    {name: 'Invisible Dog Art Center', location: 'Boerum Hill', phone: 3478290425, website: 'https://theinvisibledog.org/', description: 'Multi-disciplinary art center with gallery spaces and artist studios.'},
    {name: 'Green-Wood Cemetery', location: 'Greenwood Heights', phone: 7187686720, website: 'https://www.green-wood.com/', description: 'Historic cemetery offering art installations, artist residencies, and cultural programming.'},
    {name: 'Smack Mellon', location: 'DUMBO', phone: 7184349601, website: 'https://www.smackmellon.org/', description: 'Non-profit gallery supporting emerging and mid-career artists with exhibitions and programming.'},
    {name: 'BRIC Arts Media', location: 'Fort Greene', phone: 7187835375, website: 'https://www.bricartsmedia.org/', description: 'Multidisciplinary arts and media organization with galleries, studios, and performance spaces.'}
  ],
  'Queens' => [
    {name: 'UOVO', location: 'Dutch Kills', phone: 2122653111, website: 'https://uovo.art/', description: 'Art storage and services with climate-controlled facilities and logistics support.'},
    {name: 'Secret Riso Club', location: 'Ridgewood', phone: 0000000000, website: 'https://secretrisoclub.com/', description: 'Risograph studio focusing on social justice, art, design and community building.'},
    {name: 'Socrates Sculpture Park', location: 'Astoria', phone: 7189563419, website: 'https://socratessculpturepark.org/', description: 'Outdoor sculpture park and artist residency program in a waterfront setting.'},
    {name: 'Queens Museum', location: 'Corona', phone: 7185925555, website: 'https://queensmuseum.org/', description: 'Contemporary art museum reflecting Queens\' diverse communities through exhibitions and programs.'},
    {name: 'Flux Factory', location: 'Long Island City', phone: 7183611245, website: 'https://fluxfactory.org/', description: 'Artist collective and residency program supporting experimental and collaborative practices.'},
    {name: 'MoMA PS1', location: 'Long Island City', phone: 7187842084, website: 'https://www.moma.org/ps1/', description: 'Contemporary art institution focused on experimental and innovative work by emerging artists.'},
    {name: 'Knockdown Center', location: 'Maspeth', phone: 7187069780, website: 'https://knockdown.center/', description: 'Multi-use arts and events space in a converted 19th-century factory building.'},
    {name: 'Matteawan Gallery', location: 'Fishkill', phone: 8452022205, website: 'https://matteawan.com/', description: 'Contemporary art gallery showcasing emerging and established artists.'},
    {name: 'Cuchifritos Gallery + Project Space', location: 'LES', phone: 6466099885, website: 'http://www.cuchifritos.org/', description: 'Artist-run space supporting experimental contemporary art and community engagement.'},
    {name: 'Triangle Arts Association', location: 'Astoria', phone: 7187266818, website: 'https://www.triangleartsassociation.org/', description: 'Community arts organization offering classes, workshops, and exhibition opportunities.'},
    {name: 'Ely Center of Contemporary Art', location: 'New Haven', phone: 2037772000, website: 'https://elycenter.org/', description: 'Contemporary art center with residencies, exhibitions, and community programs.'},
    {name: 'Chocolate Factory Theater', location: 'Long Island City', phone: 7184827088, website: 'https://chocolatefactorytheater.org/', description: 'Performance venue supporting experimental theater, dance, and interdisciplinary art.'}
  ],
  'Bronx' => [
    {name: 'New Yorker Arts', location: 'Mott Haven', phone: 7182923099, website: 'https://www.newyorkerarts.com/', description: 'Art storage and transport company with 60,000 square feet of climate-controlled space.'},
    {name: 'Bronx Museum of the Arts', location: 'Grand Concourse', phone: 7186814000, website: 'https://www.bronxmuseum.org/', description: 'Contemporary art museum showcasing artists of African, Asian, and Latin American ancestry.'},
    {name: 'Longwood Art Gallery', location: 'Longwood', phone: 7187488020, website: 'https://www.longwoodartgallery.org/', description: 'Community gallery supporting local artists and fostering cultural exchange.'},
    {name: 'BronxArtSpace', location: 'Mott Haven', phone: 7186650261, website: 'https://www.bronxartspace.com/', description: 'Artist studios and gallery space in the heart of the South Bronx arts district.'},
    {name: 'Wave Hill', location: 'Riverdale', phone: 7185493200, website: 'https://www.wavehill.org/', description: 'Public garden and cultural center with artist residencies and nature-inspired programming.'},
    {name: 'Hostos Center for the Arts', location: 'South Bronx', phone: 7185180000, website: 'https://www.hostos.cuny.edu/Administrative-Offices/Arts-Culture', description: 'Performing arts center and gallery at Hostos Community College.'},
    {name: 'Mind-Builders Creative Arts Center', location: 'Williamsbridge', phone: 7188826990, website: 'https://www.mind-builders.org/', description: 'Community arts center offering classes and programming for all ages.'},
    {name: 'Concrete Plant Park', location: 'Soundview', phone: 7184308684, website: 'https://www.nycgovparks.org/parks/concrete-plant-park', description: 'Waterfront park with public art installations and community programming.'},
    {name: 'The Point CDC', location: 'Hunts Point', phone: 7189428000, website: 'https://thepoint.org/', description: 'Community development corporation with arts programming and youth initiatives.'},
    {name: 'Pregones/PRTT', location: 'Mott Haven', phone: 7185925599, website: 'https://pregonesprtt.org/', description: 'Latino theater company with community engagement and artistic development programs.'},
    {name: 'Arthur Avenue Retail Market', location: 'Belmont', phone: 7182953440, website: 'https://www.arthuravenuebronx.com/', description: 'Historic market with artisanal food vendors and community gathering space.'},
    {name: 'Woodlawn Cemetery', location: 'Woodlawn', phone: 7189207727, website: 'https://thewoodlawncemetery.org/', description: 'Historic cemetery with sculptural monuments and cultural programming.'}
  ],
  'Staten Island' => [
    {name: 'Staten Island Arts', location: 'Stapleton Heights', phone: 7184473329, website: 'https://statenislandarts.org/', description: 'Arts council cultivating a sustainable and diverse cultural community for Richmond County.'},
    {name: 'Snug Harbor Cultural Center', location: 'Livingston', phone: 7184480000, website: 'https://snug-harbor.org/', description: '83-acre cultural center with galleries, gardens, and artist studios.'},
    {name: 'Noble Maritime Collection', location: 'Livingston', phone: 7184471878, website: 'https://noblemaritime.org/', description: 'Maritime museum and cultural center with artist studios and exhibitions.'},
    {name: 'St. George Theatre', location: 'St. George', phone: 7184422900, website: 'https://stgeorgetheatre.com/', description: 'Historic theater hosting performances and community events.'},
    {name: 'Alice Austen House', location: 'Rosebank', phone: 7184471986, website: 'https://aliceausten.org/', description: 'Historic house museum dedicated to photographer Alice Austen.'},
    {name: 'SI MakerSpace', location: 'Stapleton', phone: 7182730718, website: 'https://simakerspace.org/', description: 'Community workshop with tools and equipment for makers and artists.'},
    {name: 'Art Lab', location: 'St. George', phone: 7186982787, website: 'https://www.artlabsi.org/', description: 'Contemporary art gallery and education center.'},
    {name: 'Staten Island Museum', location: 'Stapleton Heights', phone: 7187272645, website: 'https://statenislandmuseum.org/', description: 'Natural science and local history museum with art exhibitions.'},
    {name: 'Conference House Park', location: 'Tottenville', phone: 7184524886, website: 'https://www.nycgovparks.org/parks/conference-house-park', description: 'Historic park with cultural programming and community events.'},
    {name: 'Silver Lake Park', location: 'Silver Lake', phone: 7183568659, website: 'https://www.nycgovparks.org/parks/silver-lake-park', description: 'Large park with recreational facilities and community programming.'}
  ]
}

artist_resources = []
resource_data.each do |borough_name, resources|
  borough = boroughs[borough_name]
  puts "  📍 #{borough_name}:"
  
  resources.each do |resource_data|
    resource = ArtistResource.create!(
      name: resource_data[:name],
      location: resource_data[:location],
      phone: resource_data[:phone],
      website: resource_data[:website],
      description: resource_data[:description],
      borough: borough
    )
    artist_resources << resource
    puts "    ✓ #{resource_data[:name]}"
    
    # Create address for each resource
    if resource_data[:name] == 'Guerra Paint & Pigment'
      Address.create!(street: '510 East 13th Street', city: 'New York', state: 'NY', zip: '10009', artist_resource: resource)
    elsif resource_data[:name] == 'Soho Art Materials'
      Address.create!(street: '3 Wooster Street', city: 'New York', state: 'NY', zip: '10013', artist_resource: resource)
    else
      # Generate realistic NYC addresses
      street_number = rand(1..9999)
      street_names = ['Broadway', 'Canal Street', 'Houston Street', 'Grand Street', 'Delancey Street', 'Atlantic Avenue', 'Flatbush Avenue', 'Northern Boulevard', 'Queens Boulevard', 'Fordham Road', 'Richmond Avenue']
      city = borough_name == 'Manhattan' ? 'New York' : borough_name
      zip_codes = {
        'Manhattan' => ['10001', '10002', '10003', '10009', '10010', '10011', '10013', '10014', '10016', '10019', '10021', '10024', '10025', '10027', '10028', '10029'],
        'Brooklyn' => ['11201', '11205', '11206', '11215', '11217', '11220', '11222', '11225', '11226', '11232', '11238', '11249'],
        'Queens' => ['11101', '11102', '11103', '11104', '11105', '11106', '11354', '11355', '11356', '11357', '11358', '11360', '11361', '11362', '11363', '11364', '11365', '11366', '11367', '11368', '11369', '11370', '11372', '11373', '11374', '11375', '11377', '11378', '11379', '11385', '11411', '11412', '11413', '11414', '11415', '11416', '11417', '11418', '11419', '11420', '11421', '11422', '11423', '11424', '11425', '11426', '11427', '11428', '11429', '11430', '11432', '11433', '11434', '11435', '11436', '11691', '11692', '11693', '11694', '11697'],
        'Bronx' => ['10451', '10452', '10453', '10454', '10455', '10456', '10457', '10458', '10459', '10460', '10461', '10462', '10463', '10464', '10465', '10466', '10467', '10468', '10469', '10470', '10471', '10472', '10473', '10474', '10475'],
        'Staten Island' => ['10301', '10302', '10303', '10304', '10305', '10306', '10307', '10308', '10309', '10310', '10312', '10314']
      }
      
      Address.create!(
        street: "#{street_number} #{street_names.sample}",
        city: city,
        state: 'NY',
        zip: zip_codes[borough_name].sample,
        artist_resource: resource
      )
    end
  end
end

# Seed Listings
puts "\n🏠 Creating Studio Listings..."
neighborhoods = {
  'Manhattan' => ['East Village', 'Lower East Side', 'Soho', 'Tribeca', 'Chelsea', 'Hell\'s Kitchen', 'Upper West Side', 'Harlem', 'Washington Heights'],
  'Brooklyn' => ['Williamsburg', 'Bushwick', 'Park Slope', 'Gowanus', 'Red Hook', 'DUMBO', 'Crown Heights', 'Bed-Stuy', 'Sunset Park', 'Greenpoint'],
  'Queens' => ['Long Island City', 'Astoria', 'Ridgewood', 'Forest Hills', 'Flushing', 'Jackson Heights', 'Elmhurst'],
  'Bronx' => ['Mott Haven', 'South Bronx', 'Hunts Point', 'Fordham', 'Riverdale', 'Concourse'],
  'Staten Island' => ['St. George', 'Stapleton', 'Tottenville', 'New Brighton']
}

listing_types = [
  'Private Studio Space', 'Shared Studio', 'Desk Space in Studio', 'Equipment Rental', 
  'Temporary Studio', 'Storage Space', 'Gallery Rental', 'Workshop Space', 'Darkroom Access'
]

50.times do |i|
  borough = ['Manhattan', 'Brooklyn', 'Queens', 'Bronx', 'Staten Island'].sample
  neighborhood = neighborhoods[borough].sample
  listing_type = listing_types.sample
  
  # Price ranges based on borough and type
  price_ranges = {
    'Manhattan' => [800, 4000],
    'Brooklyn' => [500, 2500], 
    'Queens' => [400, 1800],
    'Bronx' => [300, 1200],
    'Staten Island' => [250, 1000]
  }
  
  base_price = rand(price_ranges[borough][0]..price_ranges[borough][1])
  sq_footage = rand(150..2000)
  
  title_options = [
    "#{listing_type} in #{neighborhood}",
    "Bright #{listing_type} - #{neighborhood}",
    "Artist #{listing_type} Available in #{neighborhood}",
    "Creative Space: #{listing_type} in #{neighborhood}",
    "#{neighborhood} #{listing_type} - Great Light"
  ]
  
  description_templates = [
    "Beautiful #{listing_type.downcase} located in the heart of #{neighborhood}. Features excellent natural light, high ceilings, and easy access to public transportation. Perfect for #{users.sample.discipline.downcase} work. Available immediately.",
    "Spacious #{sq_footage} sq ft #{listing_type.downcase} in a converted warehouse building. Shared common areas include kitchen, bathroom, and loading dock. Great community of artists. #{neighborhood} location with easy subway access.",
    "Seeking artist to share #{listing_type.downcase} in #{neighborhood}. Previous tenant was a #{disciplines.sample.downcase}. Space includes built-in storage, good ventilation, and 24/7 access. Looking for clean, respectful studio mate.",
    "#{listing_type} available in artist building. #{neighborhood} has amazing art scene with galleries, supply stores, and artist community nearby. Space suitable for #{disciplines.sample.downcase} or similar practice. Utilities included.",
    "Rare find in #{neighborhood}! #{listing_type.downcase} with #{sq_footage} sq ft of creative space. Building has freight elevator, loading dock, and other artist tenants. Walking distance to subway and art supplies."
  ]
  
  owner = users.sample
  listing = Listing.create!(
    title: title_options.sample,
    price: base_price,
    sq_footage: sq_footage,
    email: "#{owner.username}@email.com",
    description: description_templates.sample,
    neighborhood: neighborhood,
    nyc_borough: borough,
    user: owner,
    created_at: rand(6.months.ago..1.day.ago)
  )
  
  # Add multiple images to some listings
  if rand < 0.7 # 70% of listings have images
    image_count = rand(1..5)
    images = {}
    image_count.times do |img_index|
      images["image#{img_index + 1}"] = "https://picsum.photos/800/600?random=#{listing.id}_#{img_index}"
    end
    listing.update!(images)
  end
  
  puts "  ✓ #{listing.title} - $#{listing.price}/month (#{listing.sq_footage} sq ft)"
end

# Seed Residencies
puts "\n🏛️ Creating Artist Residency Programs..."
residency_names = [
  'Brooklyn Bridge Residency', 'Manhattan Arts Initiative', 'Queens Contemporary Program',
  'Bronx Community Artist Space', 'Staten Island Nature Residency', 'NYC Emerging Artists Program',
  'Urban Arts Collective', 'Metro Arts Fellowship', 'Five Borough Artists Program',
  'NYC Studio Residency', 'Brooklyn Maker Residency', 'Harlem Arts Residency',
  'Lower East Side Artist Program', 'Williamsburg Creative Residency', 'LIC Artist Initiative'
]

15.times do |i|
  name = residency_names[i] || "Community Arts Residency #{i + 1}"
  is_free = [true, false].sample
  
  deadlines = [
    'January 15, 2024', 'March 1, 2024', 'May 15, 2024', 'July 30, 2024',
    'September 15, 2024', 'November 1, 2024', 'December 31, 2024',
    'February 28, 2024', 'April 15, 2024', 'June 30, 2024', 'August 15, 2024', 'October 1, 2024'
  ]
  
  descriptions = [
    "#{name} supports emerging and mid-career artists working in all media. The program provides studio space, mentorship, and exhibition opportunities in NYC. Participants receive 24/7 studio access and participate in critiques and professional development workshops.",
    "A #{is_free ? 'fully funded' : 'fee-based'} residency program focused on community engagement and artistic excellence. #{name} offers artists the opportunity to develop new work while connecting with NYC's vibrant art scene. Includes studio space and networking events.",
    "#{name} is designed for artists exploring themes of urban life, community, and social justice. The program provides dedicated studio space, access to equipment, and opportunities to engage with local communities through public projects and exhibitions.",
    "An intensive #{is_free ? 'fellowship' : 'residency'} program supporting innovative artistic practices. #{name} offers professional development, exhibition opportunities, and connections to NYC galleries, museums, and art organizations. Open to artists working in any medium.",
    "#{name} provides artists with time, space, and resources to develop significant new work. The program includes studio visits from curators and critics, peer critiques, and a final exhibition. Located in NYC's thriving arts district."
  ]
  
  Residency.create!(
    name: name,
    deadline: deadlines.sample,
    free: is_free,
    description: descriptions.sample,
    created_at: rand(1.year.ago..1.month.ago)
  )
  
  puts "  ✓ #{name} (#{is_free ? 'Free' : 'Fee-based'}) - Deadline: #{deadlines.sample}"
end

# Seed Forum Posts and Comments
puts "\n📝 Creating Forum Discussions..."
all_subforums = Subforum.all

# Create forum posts
post_titles = [
  'New to NYC - Looking for Studio Recommendations',
  'Best places to buy canvas in bulk?',
  'Affordable framing services in Brooklyn?',
  'Anyone interested in a group studio share?',
  'Critique Welcome: Recent Paintings',
  'Tips for applying to galleries in Chelsea?',
  'Darkroom access in Manhattan?',
  'Anyone working with sustainable materials?',
  'MFA programs worth considering?',
  'Pop-up exhibition space available',
  'Looking for printmaking collaborators',
  'Artist talk recommendations this month',
  'Kiln sharing in Queens?',
  'Digital portfolio tips needed',
  'Community art project in Bronx',
  'Best art supply stores for oil painting',
  'Anyone using Procreate for sketches?',
  'Studio insurance recommendations?',
  'Photography studio rental options',
  'Mixed media artists - let\'s connect!',
  'Grant writing workshop interest?',
  'Sculpture installation help needed',
  'Artist residency application tips',
  'Video art screening opportunities',
  'Looking for ceramic studio access'
]

post_bodies = [
  "Just moved to NYC and overwhelmed by all the options. I work primarily in oils and need a space with good ventilation. Budget is around $800-1200/month. Any neighborhoods I should focus on? Thanks!",
  "I go through a lot of canvas and buying individual pieces is getting expensive. Anyone know of wholesalers or bulk suppliers in the area? Willing to organize a group buy if there's interest.",
  "My usual framing place closed down and I have a show coming up. Need someone reliable and reasonably priced in Brooklyn. Custom sizes required. Recommendations welcome!",
  "Looking to split a larger studio space with 2-3 other artists. I'm a painter, prefer working with people who aren't too messy. Ideally Brooklyn or Queens. Let me know if interested!",
  "Been working on this series for months and could use some fresh eyes. Happy to reciprocate with feedback on your work. Mostly abstract paintings exploring urban landscapes.",
  "I've been painting for 5 years but never shown in a gallery. The Chelsea scene seems intimidating. Any advice on approaching galleries or building relationships with curators?",
  "Working on a photography project that requires darkroom access. Most places I've found are either too expensive or have very limited hours. Any hidden gems out there?",
  "Really interested in reducing my environmental impact through my art practice. Anyone else working with recycled materials or eco-friendly supplies? Would love to share resources.",
  "Considering going back to school for an MFA. Looking at programs in the NYC area. Current working artists - was it worth it? Did it help your career significantly?",
  "Have access to a great gallery space in LES for one month. Looking for 3-4 artists interested in a group show. Professional presentation required. Split costs evenly.",
  "Working on a large-scale print project and would love to collaborate with other printmakers. I have etching experience, looking for someone with lithography or screen printing skills.",
  "There are so many gallery talks and artist presentations happening. Anyone have recommendations for must-see events this month? Particularly interested in contemporary painting.",
  "My ceramics practice is outgrowing my tiny apartment studio. Anyone know of kiln sharing opportunities in Queens? Or interested in starting a ceramics collective?",
  "Applying for grants and residencies that require digital portfolios. Any photographers or designers who could help with professional documentation? Happy to pay or trade artwork.",
  "Organizing a community mural project in the Bronx. Looking for artists interested in working with local youth. Some funding available. Experience with community work preferred.",
  "Just started working with oils after years of acrylic. The material costs are shocking! Where do you buy your supplies? Any strategies for managing expenses?",
  "Been sketching digitally on my iPad and really loving it. Anyone else using Procreate? Would love to share techniques and maybe organize a digital art meetup.",
  "Studio got broken into last month and I realized I have no insurance coverage for my artwork. Anyone have recommendations for art-specific insurance companies?",
  "Need to rent a photography studio for a portrait session next week. Professional lighting and backdrop setup required. Budget around $200 for half day. Suggestions?",
  "I work with found objects, paint, digital elements - pretty much everything. Always looking to connect with other mixed media artists for idea sharing and potential collaborations.",
  "Thinking of organizing a grant writing workshop. There's so much funding available but the application process is daunting. Anyone interested in group learning session?",
  "Installing a large sculpture next month and could use some extra hands. Happy to pay for labor or trade studio assistance. Experience with heavy lifting required!",
  "Applied to 15 residencies last year, got into none. Clearly doing something wrong with my applications. Anyone willing to share successful application strategies?",
  "Working on video art and looking for screening opportunities. Alternative spaces, artist-run venues, anything goes. Want to get my work seen by other video artists.",
  "My painting practice is expanding into ceramics but I don't have access to kilns or proper glazing facilities. Anyone know of ceramic studios that rent time/space?"
]

30.times do |i|
  subforum = all_subforums.sample
  author = users.sample
  title = post_titles[i] || "General Discussion Post #{i + 1}"
  body = post_bodies[i] || "This is a general discussion post about art and NYC community. Looking forward to connecting with fellow artists and sharing experiences in the city."
  
  post = ForumPost.create!(
    title: title,
    body: body,
    subforum: subforum,
    user: author,
    created_at: rand(3.months.ago..1.day.ago)
  )
  
  # Add comments to posts
  comment_count = rand(0..8)
  comment_count.times do
    commenter = users.sample
    next if commenter == author && rand < 0.7 # Author less likely to comment on own post
    
    comment_texts = [
      "Really helpful information, thanks for sharing!",
      "I'm in a similar situation - following this thread for updates.",
      "Have you considered checking out [location/resource]? They might have what you're looking for.",
      "I'd be interested in collaborating on this. DMing you now!",
      "This is exactly what the community needs. Count me in!",
      "Had a similar experience last year. Happy to share what I learned.",
      "Your work sounds fascinating - would love to see more.",
      "Thanks for posting this. The timing is perfect.",
      "I know someone who might be able to help. Let me connect you.",
      "Been thinking about this same issue. Glad someone brought it up.",
      "This is a great resource - bookmarking for later.",
      "I'm local to that area and might be able to help out.",
      "Love seeing artists supporting each other like this.",
      "Your approach sounds really innovative. Keep us updated!",
      "I've been looking for exactly this kind of opportunity."
    ]
    
    Comment.create!(
      body: comment_texts.sample,
      user: commenter,
      forum_post: post,
      created_at: rand(post.created_at..Time.current)
    )
  end
  
  puts "  ✓ #{title} (#{comment_count} comments)"
end

puts "\n✨ Database seeding completed successfully!"
puts "\n📊 RARE NY Database Summary:"
puts "  👤 Users: #{User.count}"
puts "  📍 Boroughs: #{Borough.count}"
puts "  🏢 Artist Resources: #{ArtistResource.count}"
puts "  🏠 Listings: #{Listing.count}"
puts "  🏛️ Residencies: #{Residency.count}"
puts "  💬 Forums: #{Forum.count}"
puts "  📂 Subforums: #{Subforum.count}"
puts "  📝 Forum Posts: #{ForumPost.count}"
puts "  💭 Comments: #{Comment.count}"
puts "  📮 Addresses: #{Address.count}"
puts "\n🎨 Ready to explore the RARE NY artist community!"