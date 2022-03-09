# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

puts "Seeding Forums."

f1 = Forum.create(name: "General")
f2 = Forum.create(name: "Materials")
f3 = Forum.create(name: "Work Opportunities")
f4 = Forum.create(name: "For Sale")
f5 = Forum.create(name: "MFA Programs")
f6 = Forum.create(name: "Shows")
f7 = Forum.create(name: "Discover Artists")



puts "Seeding Boroughs."

b1 = Borough.create(name: 'Manhattan')
b2 = Borough.create(name: 'Brooklyn')
b3 = Borough.create(name: 'Queens')
b4 = Borough.create(name: 'Bronx')
b5 = Borough.create(name: 'Staten Island')

puts "Seeding Artist Resources."

ar1 = ArtistResource.create({
    name: "Guerra Paint & Pigment",
    location: "East Village",
    phone: 2125290628,
    website: "http://www.guerrapaint.com/",
    description: "At Guerra Paint and Pigment Corp.,we specialize in color. Since 1986 we have produced the largest selection of water based single pigment concentrates in the world. Our dispersions are made in small batches the old fashioned way in ceramic mills. Our large inventory of lightfast pigments which range from contemporary and historical, to rare and extinct are ground to the finest particle size. This method yields the brightest, most intense color possible. Guerra Paint and Pigment Corp. color concentrates go seamlessly into any water based binder (medium) of your choosing or may be used as part of our own paint component system of high resin binders, fillers and additives to create the best paint possible.",
    borough_id: b1.id
})

ar2 = ArtistResource.create({
    name: "Soho Art Materials",
    location: "Soho",
    phone: 2124313938,
    website: "https://sohoartmaterials.com/",
    description: "In 1999, we opened our first shop on Grand Street with a handful of  sketchbooks,brushes, paint, and our Tri-Mar Stretcher Bars.  From that point, we have been an integral part of the artistic fabric of New York City. 
    Over the years we have seen many artists, young and old, famous and rising stars, walk through our doors.  We take pride in what  we do as the last independent art supply shop in NYC, and we will continue to keep our product assortments and standards high.",
    borough_id: b1.id
})

ar3 = ArtistResource.create({
    name: "Canal Plastics Center",
    location: "Chinatown",
    phone: 2129251032,
    website: "https://www.canalplastic.com/",
    description: "Canal Plastics Center offers plastics and fabrication services with a specialty in hard to find acrylic colors and small-scale projects for both industry and individuals. Our diverse customer base includes designers, artists, filmmakers, photography studios, architectural firms, galleries, retail stores, event planners, contractors, signmakers and more. With decades of experience, our expert fabricators can get the job done quickly and with the quality that you expect. Located in New York City, we have proudly served our customers for over 50 years.",
    borough_id: b1.id
})

ar4 = ArtistResource.create({
    name: "Happy Medium",
    location: "Two Bridges",
    phone: 6465128840,
    website: "https://happy-medium.co/",
    description: "Happy Medium exists to create and curate the best supplies, content, and events for casual artists. There's a lot of stuff out there for kids and capital A Artists, but there isn't much for those that fall somewhere in between. We are on a mission to fill the gap.
    We want to be part of a world where more people feel emboldened to create things with their hands, just for the hell of it - because the real thrill simply lies in the making.",
    borough_id: b1.id
})

ar5 = ArtistResource.create({
    name: "Printed Matter, Inc.",
    location: "Chelsea",
    phone: 2129250325,
    website: "https://www.printedmatter.org/",
    description: "Founded in 1976, Printed Matter, Inc. is the world’s leading non-profit organization dedicated to the dissemination, understanding and appreciation of artists’ books and related publications.",
    borough_id: b1.id
})

ar6 = ArtistResource.create({
    name: "Artist & Craftsman Supply",
    location: "Park Slope",
    phone: 7184998080,
    website: "https://artistcraftsman.com/",
    description: "Artist & Craftsman Supply was founded in 1985 as a small upstart art supply store in the Portland, Maine area. At the time, the art materials retail landscape was dominated by independent “mom & pop” storefronts that often sold a mix of stationery, hardware, and office supplies. Catalog-based companies were also a major player since the internet as we know if was in its infancy. We were able to carve out a little corner in northern New England.",
    borough_id: b2.id
})

ar7 = ArtistResource.create({
    name: "Simon Liu, Inc.",
    location: "Greenwood",
    phone: 7185672011,
    website: "https://simonliuinc.com/",
    description: "For more than 30 years, Simon Liu Inc. has integrated mechanical engineering know-how with the visual arts, bringing an unrivaled level of craftsmanship and quality to fine art supports. Our customers range from leading conservators, blue-chip artists and world-renowned museums to emerging talents and students.",
    borough_id: b2.id
})

ar8 = ArtistResource.create({
    name: "Picture Room",
    location: "Brooklyn Heights",
    phone: 3479874675,
    website: "https://pictureroom.shop/",
    description: "At Picture Room, we sell work by emerging and established contemporary artists as well as rare prints, posters, artists’ books, and art publications. We work with individual artists, institutions, and collectors to discover and showcase works that might not otherwise find their way into a traditional retail environment. It's our mission to provide access to a diverse, researched, relevant collection in an open and informed environment.",
    borough_id: b2.id
})

ar9 = ArtistResource.create({
    name: "UOVO",
    location: "Dutch Kills",
    phone:  2122653111,
    website: "https://uovo.art/",
    description: "UOVO is reimagining storage and services for collectors, artists, fashion designers, galleries, museums, institutions, and more. We offer nearly 900,000 square feet of climate-controlled storage across 10 locations in New York, Delaware, Florida, and California, bolstered by a complete suite of logistics including transportation, shipping, packing, and installation.",
    borough_id: b3.id
})

ar10 = ArtistResource.create({
    name: "Secret Riso Club",
    location: "Ridgewood",
    phone: 0000000000,
    website: "https://secretrisoclub.com/",
    description: "Secret Riso Club is a graphic design and risograph studio that focuses its work on the intersection of social justice, art, design and community building. In our practice, we work to build a platform that serves as a collaborative space for developing ideas and new projects. SRC is run in collaboration between Gonzalo Guerrero and Tara Ridgedell.",
    borough_id: b3.id
})

ar11 = ArtistResource.create({
    name: "New Yorker Arts",
    location: "Mott Haven",
    phone: 7182923099,
    website: "https://www.newyorkerarts.com/",
    description: "Established in 1960, New Yorker Arts is an art storage and transport company specializing in fine art handling and art-related services. New Yorker Arts is a 60,000 square foot facility with climate control and a custom made closed circuit  security system. Thick exterior brick walls complete the already solid masonry construction.  We offer interim, short term, long term climate controlled and non climate controlled storage.",
    borough_id: b4.id
})

ar12 = ArtistResource.create({
    name: "Staten Island Arts",
    location: "Stapleton Heights",
    phone: 7184473329,
    website: "https://statenislandarts.org/",
    description: "Staten Island Arts’ mission is to cultivate a sustainable and diverse cultural community for the people of Richmond County. Our programs strive to make the arts accessible to every member of the community; support and build recognition for artistic achievement; and provide artists, organizations, and arts educators with the technical, financial, and social resources to encourage cultural production. We are proud to spotlight the unique character of our local cultural resources so that they can be appreciated by a wider audience. ",
    borough_id: b5.id
})

puts "Seeding Artist Addresses."

add1 = Address.create({
    street: "510 East 13th Street",
    city: "New York",
    state: "NY",
    zip: "10009",
    artist_resource_id: ar1.id
})

add2 = Address.create({
    street: "3 Wooster Street",
    city: "New York",
    state: "NY",
    zip: "10013",
    artist_resource_id: ar2.id
})

add3 = Address.create({
    street: "345 Canal Street",
    city: "New York",
    state: "NY",
    zip: "10013",
    artist_resource_id: ar3.id
})

add4 = Address.create({
    street: "49 Market St",
    city: "New York",
    state: "NY",
    zip: "10002",
    artist_resource_id: ar4.id
})

add5 = Address.create({
    street: "231 11th Avenue",
    city: "New York",
    state: "NY",
    zip: "10001",
    artist_resource_id: ar5.id
})

add6 = Address.create({
    street: "307 2nd Street",
    city: "Brooklyn",
    state: "NY",
    zip: "11215",
    artist_resource_id: ar6.id
})

add7 = Address.create({
    street: "280 24th Street",
    city: "Brooklyn",
    state: "NY",
    zip: "11232",
    artist_resource_id: ar7.id
})

add8 = Address.create({
    street: "117 Atlantic Avenue",
    city: "Brooklyn",
    state: "NY",
    zip: "11201",
    artist_resource_id: ar8.id
})

add9 = Address.create({
    street: "41-54 22nd Street",
    city: "Queens",
    state: "NY",
    zip: "11101",
    artist_resource_id: ar9.id
})

add10 = Address.create({
    street: "Secret Location",
    city: "Queens",
    state: "NY",
    zip: "11385",
    artist_resource_id: ar10.id
})

add11 = Address.create({
    street: "5 Canal Place",
    city: "Bronx",
    state: "NY",
    zip: "10451",
    artist_resource_id: ar11.id
})

add12 = Address.create({
    street: "7 Navy Pier Ct",
    city: "Staten Island",
    state: "NY",
    zip: "10304",
    artist_resource_id: ar12.id
})