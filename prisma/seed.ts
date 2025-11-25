import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // Seed Skills
  console.log('📝 Seeding Skills...');
  const skills = await Promise.all([
    prisma.skill.upsert({
      where: { name: 'Oil Change' },
      update: {},
      create: {
        id: 'skill_1',
        name: 'Oil Change',
        category: 'Maintenance',
      },
    }),
    prisma.skill.upsert({
      where: { name: 'Brake Pads Replacement' },
      update: {},
      create: {
        id: 'skill_2',
        name: 'Brake Pads Replacement',
        category: 'Brakes',
      },
    }),
    prisma.skill.upsert({
      where: { name: 'Battery Replacement' },
      update: {},
      create: {
        id: 'skill_3',
        name: 'Battery Replacement',
        category: 'Electrical',
      },
    }),
    prisma.skill.upsert({
      where: { name: 'Pre-purchase Car Inspection' },
      update: {},
      create: {
        id: 'skill_4',
        name: 'Pre-purchase Car Inspection',
        category: 'Inspection',
      },
    }),
    prisma.skill.upsert({
      where: { name: 'Car is not starting Diagnostic' },
      update: {},
      create: {
        id: 'skill_5',
        name: 'Car is not starting Diagnostic',
        category: 'Diagnostic',
      },
    }),
    prisma.skill.upsert({
      where: { name: 'Check Engine Light Diagnostic' },
      update: {},
      create: {
        id: 'skill_6',
        name: 'Check Engine Light Diagnostic',
        category: 'Diagnostic',
      },
    }),
    prisma.skill.upsert({
      where: { name: 'Towing and Roadside' },
      update: {},
      create: {
        id: 'skill_7',
        name: 'Towing and Roadside',
        category: 'Emergency',
      },
    }),
    prisma.skill.upsert({
      where: { name: 'Engine Repair' },
      update: {},
      create: {
        id: 'skill_8',
        name: 'Engine Repair',
        category: 'Engine',
      },
    }),
    prisma.skill.upsert({
      where: { name: 'Transmission Service' },
      update: {},
      create: {
        id: 'skill_9',
        name: 'Transmission Service',
        category: 'Transmission',
      },
    }),
    prisma.skill.upsert({
      where: { name: 'AC Repair' },
      update: {},
      create: {
        id: 'skill_10',
        name: 'AC Repair',
        category: 'HVAC',
      },
    }),
  ]);
  console.log(`✅ Seeded ${skills.length} skills`);

  // Seed Mechanics
  console.log('🔧 Seeding Mechanics...');
  const mechanics = await Promise.all([
    prisma.mechanic.upsert({
      where: { slug: 'rocco' },
      update: {},
      create: {
        id: 'mech_1',
        name: 'Rocco',
        slug: 'rocco',
        bio: 'Rocco has been a mechanic for over 20 years. He is an ASE certified Master Technician and has worked on all makes and models of cars. He is passionate about cars and loves to help people. Rocco is a true professional and will always go the extra mile to make sure his customers are happy. He is honest, reliable, and always on time. Rocco is a great choice for all your car repair needs.',
        location: 'Los Angeles, CA',
        yearsExperience: 26,
        rating: 5.0,
        reviewCount: 303,
        jobsCompleted: 1000,
        sinceYear: 2014,
        certifications: ['ASE Master Technician'],
        badges: [],
        isActive: true,
      },
    }),
    prisma.mechanic.upsert({
      where: { slug: 'robert' },
      update: {},
      create: {
        id: 'mech_2',
        name: 'Robert',
        slug: 'robert',
        bio: 'Robert is a highly experienced mechanic with over 35 years in the field. Specializing in diagnostics and complex repairs, he is dedicated to providing top-notch service and ensuring customer satisfaction. His extensive knowledge covers a wide range of vehicle makes and models.',
        location: 'Los Angeles, CA',
        yearsExperience: 35,
        rating: 5.0,
        reviewCount: 675,
        jobsCompleted: 800,
        sinceYear: 2000,
        certifications: ['ASE Master Technician', 'Hybrid Certified'],
        badges: ['Top Rated', 'Expert'],
        isActive: true,
      },
    }),
    prisma.mechanic.upsert({
      where: { slug: 'grzegorz' },
      update: {},
      create: {
        id: 'mech_3',
        name: 'Grzegorz',
        slug: 'grzegorz',
        bio: 'Grzegorz brings 45 years of automotive expertise to every job. Known for his meticulous attention to detail and comprehensive understanding of both classic and modern vehicles.',
        location: 'Los Angeles, CA',
        yearsExperience: 45,
        rating: 5.0,
        reviewCount: 473,
        jobsCompleted: 1200,
        sinceYear: 1979,
        certifications: [],
        badges: ['Top Rated', 'Expert'],
        isActive: true,
      },
    }),
    prisma.mechanic.upsert({
      where: { slug: 'mike-johnson' },
      update: {},
      create: {
        id: 'mech_4',
        name: 'Mike Johnson',
        slug: 'mike-johnson',
        bio: 'Mike is a professional mechanic with extensive experience in engine diagnostics and repairs. He is known for his quick problem-solving skills and excellent customer service.',
        location: 'Los Angeles, CA',
        yearsExperience: 15,
        rating: 5.0,
        reviewCount: 150,
        jobsCompleted: 500,
        sinceYear: 2009,
        certifications: ['ASE'],
        badges: [],
        isActive: true,
      },
    }),
    prisma.mechanic.upsert({
      where: { slug: 'david-chen' },
      update: {},
      create: {
        id: 'mech_5',
        name: 'David Chen',
        slug: 'david-chen',
        bio: 'David specializes in electrical systems and modern vehicle diagnostics. He stays up-to-date with the latest automotive technology and diagnostic tools.',
        location: 'San Francisco, CA',
        yearsExperience: 12,
        rating: 5.0,
        reviewCount: 200,
        jobsCompleted: 600,
        sinceYear: 2012,
        certifications: ['ASE'],
        badges: [],
        isActive: true,
      },
    }),
    prisma.mechanic.upsert({
      where: { slug: 'james-wilson' },
      update: {},
      create: {
        id: 'mech_6',
        name: 'James Wilson',
        slug: 'james-wilson',
        bio: 'James is an expert in brake systems and suspension work. He has a reputation for thorough inspections and quality repairs.',
        location: 'San Diego, CA',
        yearsExperience: 18,
        rating: 5.0,
        reviewCount: 180,
        jobsCompleted: 550,
        sinceYear: 2006,
        certifications: ['ASE'],
        badges: [],
        isActive: true,
      },
    }),
    prisma.mechanic.upsert({
      where: { slug: 'robert-martinez' },
      update: {},
      create: {
        id: 'mech_7',
        name: 'Robert Martinez',
        slug: 'robert-martinez',
        bio: 'Robert specializes in starter and charging system repairs. He is known for his efficient service and fair pricing.',
        location: 'Austin, TX',
        yearsExperience: 20,
        rating: 5.0,
        reviewCount: 220,
        jobsCompleted: 650,
        sinceYear: 2004,
        certifications: ['ASE'],
        badges: [],
        isActive: true,
      },
    }),
    prisma.mechanic.upsert({
      where: { slug: 'thomas-anderson' },
      update: {},
      create: {
        id: 'mech_8',
        name: 'Thomas Anderson',
        slug: 'thomas-anderson',
        bio: 'Thomas is a brake specialist with years of experience in both disc and drum brake systems. He provides reliable and professional service.',
        location: 'Phoenix, AZ',
        yearsExperience: 14,
        rating: 5.0,
        reviewCount: 160,
        jobsCompleted: 480,
        sinceYear: 2010,
        certifications: ['ASE'],
        badges: [],
        isActive: true,
      },
    }),
    prisma.mechanic.upsert({
      where: { slug: 'william-brown' },
      update: {},
      create: {
        id: 'mech_9',
        name: 'William Brown',
        slug: 'william-brown',
        bio: 'William is an experienced mechanic specializing in routine maintenance services. He is known for his friendly demeanor and attention to detail.',
        location: 'Seattle, WA',
        yearsExperience: 16,
        rating: 5.0,
        reviewCount: 190,
        jobsCompleted: 520,
        sinceYear: 2008,
        certifications: ['ASE'],
        badges: [],
        isActive: true,
      },
    }),
    prisma.mechanic.upsert({
      where: { slug: 'richard-taylor' },
      update: {},
      create: {
        id: 'mech_10',
        name: 'Richard Taylor',
        slug: 'richard-taylor',
        bio: 'Richard is a battery and electrical systems expert. He provides quick and reliable service for all your battery needs.',
        location: 'Denver, CO',
        yearsExperience: 13,
        rating: 5.0,
        reviewCount: 170,
        jobsCompleted: 490,
        sinceYear: 2011,
        certifications: ['ASE'],
        badges: [],
        isActive: true,
      },
    }),
    prisma.mechanic.upsert({
      where: { slug: 'joseph-white' },
      update: {},
      create: {
        id: 'mech_11',
        name: 'Joseph White',
        slug: 'joseph-white',
        bio: 'Joseph specializes in pre-purchase inspections and comprehensive vehicle diagnostics. He helps customers make informed decisions about vehicle purchases.',
        location: 'Miami, FL',
        yearsExperience: 19,
        rating: 5.0,
        reviewCount: 210,
        jobsCompleted: 580,
        sinceYear: 2005,
        certifications: ['ASE'],
        badges: [],
        isActive: true,
      },
    }),
  ]);
  console.log(`✅ Seeded ${mechanics.length} mechanics`);

  // Seed MechanicSkills
  console.log('🔗 Linking Mechanics to Skills...');
  const mechanicSkills = [
    { id: 'ms_1', mechanicId: 'mech_1', skillId: 'skill_1' },
    { id: 'ms_2', mechanicId: 'mech_1', skillId: 'skill_2' },
    { id: 'ms_3', mechanicId: 'mech_1', skillId: 'skill_3' },
    { id: 'ms_4', mechanicId: 'mech_1', skillId: 'skill_4' },
    { id: 'ms_5', mechanicId: 'mech_1', skillId: 'skill_5' },
    { id: 'ms_6', mechanicId: 'mech_1', skillId: 'skill_6' },
    { id: 'ms_7', mechanicId: 'mech_2', skillId: 'skill_5' },
    { id: 'ms_8', mechanicId: 'mech_2', skillId: 'skill_6' },
    { id: 'ms_9', mechanicId: 'mech_2', skillId: 'skill_8' },
    { id: 'ms_10', mechanicId: 'mech_3', skillId: 'skill_1' },
    { id: 'ms_11', mechanicId: 'mech_3', skillId: 'skill_2' },
    { id: 'ms_12', mechanicId: 'mech_3', skillId: 'skill_4' },
    { id: 'ms_13', mechanicId: 'mech_3', skillId: 'skill_8' },
    { id: 'ms_14', mechanicId: 'mech_4', skillId: 'skill_5' },
    { id: 'ms_15', mechanicId: 'mech_4', skillId: 'skill_6' },
    { id: 'ms_16', mechanicId: 'mech_4', skillId: 'skill_8' },
    { id: 'ms_17', mechanicId: 'mech_5', skillId: 'skill_3' },
    { id: 'ms_18', mechanicId: 'mech_5', skillId: 'skill_5' },
    { id: 'ms_19', mechanicId: 'mech_5', skillId: 'skill_6' },
    { id: 'ms_20', mechanicId: 'mech_6', skillId: 'skill_2' },
    { id: 'ms_21', mechanicId: 'mech_6', skillId: 'skill_1' },
    { id: 'ms_22', mechanicId: 'mech_7', skillId: 'skill_5' },
    { id: 'ms_23', mechanicId: 'mech_7', skillId: 'skill_3' },
    { id: 'ms_24', mechanicId: 'mech_8', skillId: 'skill_2' },
    { id: 'ms_25', mechanicId: 'mech_9', skillId: 'skill_1' },
    { id: 'ms_26', mechanicId: 'mech_10', skillId: 'skill_3' },
    { id: 'ms_27', mechanicId: 'mech_11', skillId: 'skill_4' },
  ];

  // Delete existing mechanic skills first, then recreate
  await prisma.mechanicSkill.deleteMany({
    where: {
      id: { in: mechanicSkills.map((ms) => ms.id) },
    },
  });

  await Promise.all(
    mechanicSkills.map((ms) => prisma.mechanicSkill.create({ data: ms })),
  );
  console.log(`✅ Linked ${mechanicSkills.length} mechanic-skill relationships`);

  // Seed Reviews
  console.log('⭐ Seeding Reviews...');
  const reviews = [
    {
      id: 'rev_1',
      rating: 5,
      reviewerName: 'John D.',
      reviewerLocation: 'Los Angeles, CA',
      reviewText: 'Excellent service! Mike was professional, on time, and did a great job fixing my engine noise issue. Highly recommend!',
      carModel: '2007 BMW 335i',
      carYear: 2007,
      serviceDescription: 'Noise from engine or exhaust',
      mechanicId: 'mech_4',
    },
    {
      id: 'rev_2',
      rating: 5,
      reviewerName: 'Sarah M.',
      reviewerLocation: 'San Francisco, CA',
      reviewText: "Power door locks weren't working and David fixed them quickly. Very satisfied with the service and pricing.",
      carModel: '2020 RAM 1500',
      carYear: 2020,
      serviceDescription: 'Power door locks are not working',
      mechanicId: 'mech_5',
    },
    {
      id: 'rev_3',
      rating: 5,
      reviewerName: 'Michael R.',
      reviewerLocation: 'San Diego, CA',
      reviewText: 'Got my brake pads replaced and air filter changed. James was thorough and explained everything clearly. Great experience!',
      carModel: '2019 KIA FORTE',
      carYear: 2019,
      serviceDescription: 'Brake Pads Replacement (Front, Rear) Air Filter',
      mechanicId: 'mech_6',
    },
    {
      id: 'rev_4',
      rating: 5,
      reviewerName: 'Emily T.',
      reviewerLocation: 'Austin, TX',
      reviewText: "My car wouldn't start and Robert diagnosed and fixed the starter issue. Professional and efficient service.",
      carModel: '2007 NISSAN FRONTIER',
      carYear: 2007,
      serviceDescription: 'Starter',
      mechanicId: 'mech_7',
    },
    {
      id: 'rev_5',
      rating: 5,
      reviewerName: 'Chris L.',
      reviewerLocation: 'Phoenix, AZ',
      reviewText: 'Front brake pads replacement was done perfectly. Thomas was on time and the price was fair. Will use again!',
      carModel: '2013 HYUNDAI ELANTRA COUPE',
      carYear: 2013,
      serviceDescription: 'Brake Pads Replacement (Front)',
      mechanicId: 'mech_8',
    },
    {
      id: 'rev_6',
      rating: 5,
      reviewerName: 'Jessica K.',
      reviewerLocation: 'Seattle, WA',
      reviewText: 'Oil change service was quick and professional. William was friendly and explained the process. Great value!',
      carModel: '2018 HONDA CIVIC',
      carYear: 2018,
      serviceDescription: 'Oil Change',
      mechanicId: 'mech_9',
    },
    {
      id: 'rev_7',
      rating: 5,
      reviewerName: 'Daniel P.',
      reviewerLocation: 'Denver, CO',
      reviewText: 'Battery replacement was done in my driveway. Richard was knowledgeable and the service was completed quickly.',
      carModel: '2015 TOYOTA CAMRY',
      carYear: 2015,
      serviceDescription: 'Battery Replacement',
      mechanicId: 'mech_10',
    },
    {
      id: 'rev_8',
      rating: 5,
      reviewerName: 'Amanda H.',
      reviewerLocation: 'Miami, FL',
      reviewText: 'Pre-purchase inspection helped me make an informed decision. Joseph was thorough and provided a detailed report.',
      carModel: '2017 FORD F-150',
      carYear: 2017,
      serviceDescription: 'Pre-purchase Car Inspection',
      mechanicId: 'mech_11',
    },
  ];

  // Delete existing reviews first to avoid conflicts, then create
  await prisma.review.deleteMany({
    where: {
      id: { in: reviews.map((r) => r.id) },
    },
  });

  await Promise.all(
    reviews.map((review) => prisma.review.create({ data: review })),
  );
  console.log(`✅ Seeded ${reviews.length} reviews`);

  // Update mechanic ratings and review counts
  console.log('📊 Updating mechanic statistics...');
  const allMechanics = await prisma.mechanic.findMany();
  for (const mechanic of allMechanics) {
    const mechanicReviews = await prisma.review.findMany({
      where: { mechanicId: mechanic.id },
    });
    const avgRating =
      mechanicReviews.length > 0
        ? mechanicReviews.reduce((sum, r) => sum + r.rating, 0) / mechanicReviews.length
        : 0;

    await prisma.mechanic.update({
      where: { id: mechanic.id },
      data: {
        rating: avgRating,
        reviewCount: mechanicReviews.length,
      },
    });
  }
  console.log('✅ Updated mechanic statistics');

  console.log('🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

