import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

const factory = new PrismaLibSql({ url: 'file:./prisma/dev.db' })
const prisma = new PrismaClient({ adapter: factory } as any)

async function main() {
  // Clear existing data
  await prisma.booking.deleteMany()
  await prisma.lead.deleteMany()
  await prisma.property.deleteMany()
  await prisma.user.deleteMany()

  // Create admin user
  const hashedPassword = await bcrypt.hash('demo1234', 12)
  const admin = await prisma.user.create({
    data: {
      email: 'admin@homesforworkers.co.uk',
      password: hashedPassword,
      name: 'Admin User',
      role: 'admin',
    },
  })
  console.log('Created admin:', admin.email)

  // Create properties
  const properties = await Promise.all([
    prisma.property.create({
      data: {
        title: 'Gerrards Cross Executive House',
        address: '14 Windsor Road',
        city: 'Gerrards Cross',
        postcode: 'SL9 8AA',
        bedrooms: 5,
        bathrooms: 3,
        maxGuests: 8,
        type: 'House',
        status: 'active',
        amenities: JSON.stringify(['WiFi', 'Kitchen', 'Parking', 'Laundry', 'Garden', 'TV']),
        description: 'Spacious executive house perfect for contractor teams. Located in the heart of Gerrards Cross with excellent transport links to London and the M40. Fully furnished with high-speed WiFi and all bills included.',
        pricePerNight: 180,
        available: true,
      },
    }),
    prisma.property.create({
      data: {
        title: 'Grays Modern Townhouse',
        address: '7 Thames View Close',
        city: 'Grays',
        postcode: 'RM17 5AB',
        bedrooms: 4,
        bathrooms: 2,
        maxGuests: 6,
        type: 'House',
        status: 'active',
        amenities: JSON.stringify(['WiFi', 'Kitchen', 'Parking', 'Laundry', 'TV']),
        description: 'Modern townhouse in Grays, Essex. Perfect for teams working on Thames Gateway projects. Easy access to Grays station and the A13. All utilities included, fast WiFi throughout.',
        pricePerNight: 140,
        available: true,
      },
    }),
    prisma.property.create({
      data: {
        title: 'Mill Hill Contractor Apartment',
        address: '22 The Ridgeway',
        city: 'Mill Hill',
        postcode: 'NW7 1RN',
        bedrooms: 3,
        bathrooms: 2,
        maxGuests: 4,
        type: 'Apartment',
        status: 'active',
        amenities: JSON.stringify(['WiFi', 'Kitchen', 'Laundry', 'TV']),
        description: 'Well-appointed apartment in Mill Hill, North London. Ideal for small contractor teams working across North London. Excellent Northern Line connections, quiet residential area.',
        pricePerNight: 160,
        available: true,
      },
    }),
    prisma.property.create({
      data: {
        title: 'St Helens Team House',
        address: '45 College Street',
        city: 'St Helens',
        postcode: 'WA10 1TQ',
        bedrooms: 6,
        bathrooms: 3,
        maxGuests: 10,
        type: 'House',
        status: 'active',
        amenities: JSON.stringify(['WiFi', 'Kitchen', 'Parking', 'Laundry', 'Garden', 'TV']),
        description: 'Large team house in St Helens, perfect for infrastructure and industrial project crews. Ample parking, large kitchen, and outdoor space. Close to major road networks in the North West.',
        pricePerNight: 200,
        available: true,
      },
    }),
    prisma.property.create({
      data: {
        title: 'Basildon Construction Crew House',
        address: '12 Honywood Road',
        city: 'Basildon',
        postcode: 'SS14 1EL',
        bedrooms: 4,
        bathrooms: 2,
        maxGuests: 7,
        type: 'House',
        status: 'pending',
        amenities: JSON.stringify(['WiFi', 'Kitchen', 'Parking', 'Laundry', 'TV']),
        description: 'Solid family home in Basildon, ideal for construction teams working across Essex. Good access to the A127 and A13. Fully equipped kitchen, drying room for workwear, and secure parking.',
        pricePerNight: 130,
        available: false,
      },
    }),
  ])
  console.log(`Created ${properties.length} properties`)

  // Create leads
  const leads = await Promise.all([
    prisma.lead.create({
      data: {
        name: 'James Thornton',
        email: 'j.thornton@buildcorp.co.uk',
        phone: '07700 900123',
        location: 'Manchester',
        workers: '8-10',
        checkin: '2024-02-01',
        checkout: '2024-04-30',
        budget: '£3000/month',
        sharedRooms: 'Yes',
        message: 'Need accommodation for a civil engineering crew working on the Trafford Park redevelopment.',
        status: 'booked',
        source: 'website',
      },
    }),
    prisma.lead.create({
      data: {
        name: 'Sarah Mitchell',
        email: 's.mitchell@infrastructure-uk.com',
        phone: '07800 456789',
        location: 'Birmingham',
        workers: '4-6',
        checkin: '2024-03-15',
        checkout: '2024-06-15',
        budget: '£2000/month',
        sharedRooms: 'Yes',
        message: 'Electrical engineers working on HS2 enabling works near Birmingham New Street.',
        status: 'quoted',
        source: 'website',
      },
    }),
    prisma.lead.create({
      data: {
        name: 'David Patel',
        email: 'dpatel@constructco.com',
        phone: '07900 112233',
        location: 'Leeds',
        workers: '12-16',
        checkin: '2024-04-01',
        checkout: '2024-07-31',
        budget: '£5000/month',
        sharedRooms: 'Yes',
        message: 'Large construction crew for the new Leeds city centre development. Need multiple properties or one large house.',
        status: 'contacted',
        source: 'website',
      },
    }),
    prisma.lead.create({
      data: {
        name: 'Emma Clarke',
        email: 'eclarke@renewables.org.uk',
        phone: '07711 223344',
        location: 'Grays',
        workers: '3-4',
        checkin: '2024-02-20',
        checkout: '2024-05-20',
        budget: '£1500/month',
        sharedRooms: 'No',
        message: 'Wind turbine engineers, prefer separate rooms. Close to the Thames Estuary sites.',
        status: 'new',
        source: 'website',
      },
    }),
    prisma.lead.create({
      data: {
        name: 'Robert Walsh',
        email: 'r.walsh@walshbuilding.ie',
        phone: '07822 334455',
        location: 'London',
        workers: '6-8',
        checkin: '2024-03-01',
        checkout: '2024-08-31',
        budget: '£4000/month',
        sharedRooms: 'Yes',
        message: 'Irish construction team, 6 months accommodation needed in North or East London. Must have parking.',
        status: 'new',
        source: 'contact',
      },
    }),
    prisma.lead.create({
      data: {
        name: 'Tony Bergström',
        email: 't.bergstrom@nordeng.se',
        phone: '07933 445566',
        location: 'St Helens',
        workers: '1-2',
        checkin: '2024-01-15',
        checkout: '2024-02-28',
        budget: '£800/month',
        sharedRooms: 'No',
        message: 'Two Scandinavian engineers for a short stint. Need good WiFi for remote work.',
        status: 'lost',
        source: 'website',
      },
    }),
  ])
  console.log(`Created ${leads.length} leads`)

  // Create bookings
  const bookings = await Promise.all([
    prisma.booking.create({
      data: {
        propertyId: properties[3].id, // St Helens
        leadId: leads[0].id,
        guestName: 'James Thornton',
        guestEmail: 'j.thornton@buildcorp.co.uk',
        checkin: new Date('2024-02-01'),
        checkout: new Date('2024-04-30'),
        workers: 9,
        totalCost: 9000,
        status: 'confirmed',
        notes: 'BuildCorp crew. James is the main contact. Late check-in on day 1 — leaving keys in lockbox.',
      },
    }),
    prisma.booking.create({
      data: {
        propertyId: properties[1].id, // Grays
        leadId: leads[3].id,
        guestName: 'Emma Clarke',
        guestEmail: 'eclarke@renewables.org.uk',
        checkin: new Date('2024-02-20'),
        checkout: new Date('2024-05-20'),
        workers: 4,
        totalCost: 4500,
        status: 'checked-in',
        notes: 'Renewables team. Prefer early morning access. Have company van requiring driveway parking.',
      },
    }),
    prisma.booking.create({
      data: {
        propertyId: properties[0].id, // Gerrards Cross
        guestName: 'Michael Downes',
        guestEmail: 'm.downes@londonbuild.co.uk',
        checkin: new Date('2023-11-01'),
        checkout: new Date('2024-01-31'),
        workers: 6,
        totalCost: 8100,
        status: 'completed',
        notes: 'Completed stay. No issues. Positive feedback received.',
      },
    }),
  ])
  console.log(`Created ${bookings.length} bookings`)

  console.log('\n✅ Seed complete!')
  console.log('Admin login: admin@homesforworkers.co.uk / demo1234')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
