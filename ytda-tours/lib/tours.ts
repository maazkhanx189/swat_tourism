export type TourPackage = {
  name: string;
  price: string;
  duration: string;
  description: string;
  destinations: string[];
  includes: string[];
  image: string;
  badge?: string;
};

export const featuredTourPackages: TourPackage[] = [
  {
    name: "Swat Heritage Day Tour",
    price: "$23 per person",
    duration: "1 day",
    description: "A culture-rich city tour through Swat's historic landmarks and museum treasures.",
    destinations: ["Swat Museum", "Butkara Stupa", "Shahi Bagh", "Lunch"],
    includes: ["Professional local guide", "Transport", "Entry tickets"],
    image: "/swat mesum.jpeg",
  },
  {
    name: "Malam Jabba & Gabin Jabba Adventure",
    price: "$32 per person",
    duration: "1 day",
    description: "Discover scenic mountain roads, chairlift adventures, and vast valley views.",
    destinations: ["Malam Jabba chairlift", "Scenic mountain views", "Gabin Jabba sightseeing"],
    includes: ["Local guide", "Transport", "Snacks"],
    image: "/malamjabba.jpeg",
  },
  {
    name: "Kalam & Ushu Forest – 3 Days",
    price: "$100 per person",
    duration: "3 days",
    description: "A peaceful valley escape with meadows, rivers, forest walks, and mountain scenery.",
    destinations: ["Beautiful meadows", "Swat River", "Ushu Forest walks", "Mountain scenery"],
    includes: ["Hotel accommodation", "Breakfast and dinner", "Transport", "Local guide"],
    image: "/kalam.jpeg",
  },
  {
    name: "Swat Complete Experience – 5 Days",
    price: "$160 per person",
    duration: "5 days",
    description: "A complete mix of heritage, nature, and mountain experiences across the valley.",
    destinations: ["Swat Museum", "Shahi Bagh", "Marghazar", "Gabin Jabba", "Malam Jabba", "Kalam"],
    includes: ["Hotel accommodation", "All meals", "Transport", "Local guide"],
    image: "/swat valley.jpeg",
    badge: "BEST VALUE",
  },
  {
    name: "Family Package – 4 Days",
    price: "$195 per family of 4",
    duration: "4 days",
    description: "A memorable family holiday combining heritage, nature, and child-friendly sightseeing.",
    destinations: ["Swat heritage stops", "Valley viewpoints", "Forest walks", "Family-friendly sightseeing"],
    includes: ["Hotel accommodation", "All meals", "Transport", "Local guide"],
    image: "/Marghazar White Palace.jpeg",
  },
];

export const destinationHighlights = [
  {
    title: "Swat Museum",
    description:
      "Discover Gandhara Buddhist sculptures, ancient artefacts, and the remarkable history of the region.",
    image: "/swat mesum.jpeg",
  },
  {
    title: "Butkara Stupa and Buddhist Sites",
    description:
      "Explore the ancient Buddhist archaeological sites that make Swat an important part of Gandhara civilization.",
    image: "/Butkara Stupa and Buddhist Sites.jpeg",
  },
  {
    title: "Shahi Bagh",
    description: "Experience the royal garden and cultural heritage of Swat's princely era.",
    image: "/Shahi Bagh.jpeg",
  },
  {
    title: "Gabin Jabba",
    description: "Discover a beautiful mountain resort area surrounded by green meadows and spectacular mountain scenery.",
    image: "/Gabin Jabba.jpeg",
  },
  {
    title: "Marghazar White Palace",
    description: "Visit the historic summer residence of the Wali of Swat, known for its beautiful architecture and royal heritage.",
    image: "/Marghazar White Palace.jpeg",
  },
];

export const galleryImages = [
  { src: "/swat valley.jpeg", alt: "Swat Valley", caption: "Swat Valley" },
  { src: "/kalam.jpeg", alt: "Kalam Valley", caption: "Kalam Valley" },
  { src: "/kalam3.jpeg", alt: "Kalam Valley mountains", caption: "Kalam Valley" },
  { src: "/malamjabba.jpeg", alt: "Malam Jabba", caption: "Malam Jabba" },
  { src: "/malmjabba.jpeg", alt: "Malam Jabba mountain resort", caption: "Malam Jabba" },
  { src: "/Gabin Jabba.jpeg", alt: "Gabin Jabba", caption: "Gabin Jabba" },
  { src: "/swat mesum.jpeg", alt: "Swat Museum", caption: "Swat Museum" },
  { src: "/Butkara Stupa and Buddhist Sites.jpeg", alt: "Butkara Stupa and Buddhist Sites", caption: "Butkara Stupa" },
  { src: "/Butkara Stupa and Buddhist Sites2.jpeg", alt: "Butkara Buddhist heritage site", caption: "Buddhist Heritage" },
  { src: "/Gandhara Heritage.jpeg", alt: "Gandhara Heritage", caption: "Gandhara Heritage" },
  { src: "/gha.jpeg", alt: "Gandhara heritage", caption: "Gandhara Heritage" },
  { src: "/Shahi Bagh.jpeg", alt: "Shahi Bagh", caption: "Shahi Bagh" },
  { src: "/Marghazar White Palace.jpeg", alt: "Marghazar White Palace", caption: "White Palace" },
  { src: "/Marghazar White Palace2.jpeg", alt: "Marghazar White Palace", caption: "White Palace" },
];
