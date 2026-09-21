export type Calc = {
  slug: string;
  to: string;
  name: string;
  tagline: string;
  group: "Everyday" | "Health & Time" | "Finance" | "Conversion";
};

export const calculators: Calc[] = [
  { slug: "basic", to: "/basic", name: "Basic Calculator", tagline: "Add, subtract, multiply and divide.", group: "Everyday" },
  { slug: "scientific", to: "/scientific", name: "Scientific Calculator", tagline: "Trigonometry, logs, powers and roots.", group: "Everyday" },
  { slug: "percentage", to: "/percentage", name: "Percentage Calculator", tagline: "Percent of, change and share.", group: "Everyday" },
  { slug: "tip", to: "/tip", name: "Tip Calculator", tagline: "Split a bill and tip fairly.", group: "Everyday" },
  { slug: "age", to: "/age", name: "Age Calculator", tagline: "Exact age in years, months, days.", group: "Health & Time" },
  { slug: "bmi", to: "/bmi", name: "BMI Calculator", tagline: "Body mass index, metric or imperial.", group: "Health & Time" },
  { slug: "date", to: "/date", name: "Date Calculator", tagline: "Days between dates, add or subtract.", group: "Health & Time" },
  { slug: "time-duration", to: "/time-duration", name: "Time Duration", tagline: "Hours and minutes between two times.", group: "Health & Time" },
  { slug: "loan", to: "/loan", name: "Loan Calculator", tagline: "Monthly payment and total interest.", group: "Finance" },
  { slug: "mortgage", to: "/mortgage", name: "Mortgage Calculator", tagline: "Home loan payment with tax & insurance.", group: "Finance" },
  { slug: "unit-converter", to: "/unit-converter", name: "Unit Converter", tagline: "Length, weight, temperature, volume.", group: "Conversion" },
];

export const groups: Calc["group"][] = ["Everyday", "Health & Time", "Finance", "Conversion"];

export function meta(title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  };
}